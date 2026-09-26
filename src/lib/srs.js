// Spaced repetition (SM-2 style). Functions that change progress take a draft copy and mutate it.
import { ALL_CARDS } from '../data/cards.js';
import { LETTERS } from '../data/content.js';
import { todayStr, addDays, shuffle } from './utils.js';

export function defaultProgress() {
  return { track: null, onboarded: false, streak: 0, xp: 0, lastActiveDate: null, history: [], cards: {}, passagesRead: [], startDate: null };
}

export function isDue(progress, cardId) {
  const c = progress.cards[cardId];
  if (!c) return true;
  return c.due <= todayStr();
}

export function cardStatus(progress, cardId) {
  const c = progress.cards[cardId];
  if (!c || c.reps === 0) return 'new';
  if (c.reps >= 4 && c.ef >= 2.3) return 'mastered';
  return 'learning';
}

export function gradeCard(draft, cardId, grade) {
  const today = todayStr();
  const c = draft.cards[cardId] || { ef: 2.5, interval: 0, reps: 0, due: today, lastResult: null };
  if (grade === 'again') {
    c.reps = 0;
    c.ef = Math.max(1.3, c.ef - 0.2);
    c.interval = 0;
    c.due = today;
  } else {
    const delta = { hard: -0.15, good: 0, easy: 0.15 }[grade];
    c.ef = Math.max(1.3, c.ef + delta);
    if (c.reps === 0) c.interval = grade === 'easy' ? 3 : 1;
    else if (c.reps === 1) c.interval = grade === 'hard' ? 2 : grade === 'good' ? 3 : 5;
    else c.interval = Math.round(Math.max(1, c.interval) * c.ef * (grade === 'easy' ? 1.3 : 1));
    c.reps += 1;
    c.due = addDays(today, c.interval);
  }
  c.lastResult = grade;
  c.lastReviewed = today;
  draft.cards[cardId] = c;
  bumpStreakAndXp(draft, grade);
}

function bumpStreakAndXp(draft, grade) {
  const today = todayStr();
  draft.xp += grade === 'again' ? 2 : 10;
  if (draft.lastActiveDate !== today) {
    draft.streak = draft.lastActiveDate === addDays(today, -1) ? draft.streak + 1 : 1;
    draft.lastActiveDate = today;
    if (!draft.history.includes(today)) {
      draft.history.push(today);
      if (draft.history.length > 60) draft.history = draft.history.slice(-60);
    }
  }
}

export function buildSession(progress) {
  const due = ALL_CARDS.filter((c) => progress.cards[c.id] && isDue(progress, c.id));
  const fresh = ALL_CARDS.filter((c) => !progress.cards[c.id]);
  return shuffle([...due, ...shuffle(fresh).slice(0, 10)]).map((c) => c.id);
}

function choiceLabel(c) {
  return c.kind === 'letter' ? c.data.translit + ' — ' + c.data.name : c.meaning;
}

export function buildChoices(card) {
  const poolSource =
    card.kind === 'letter'
      ? LETTERS.filter((l) => l.id !== card.data.id).map((l) => ({ kind: 'letter', data: l }))
      : ALL_CARDS.filter((c) => c.kind === card.kind && c.id !== card.id);
  const labels = Array.from(new Set(poolSource.map(choiceLabel)));
  const distractors = shuffle(labels).slice(0, 3);
  return shuffle([{ label: choiceLabel(card), correct: true }, ...distractors.map((l) => ({ label: l, correct: false }))]);
}
