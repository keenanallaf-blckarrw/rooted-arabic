// The four-phase path to conversation shown on the dashboard.
import { LETTERS, PASSAGES } from '../data/content.js';
import { VOCAB_PHRASE_CARDS } from '../data/cards.js';

const lettersIntroduced = (p) => LETTERS.filter((l) => p.cards['letter-' + l.id]).length;
const vocabPhraseIntroducedPct = (p) => VOCAB_PHRASE_CARDS.filter((c) => p.cards[c.id]).length / VOCAB_PHRASE_CARDS.length;
const readingPct = (p) => p.passagesRead.length / PASSAGES.length;

export const PHASE_DEFS = [
  {
    key: 'foundations',
    title: 'Foundations',
    desc: 'Learn the letters and connect the sounds you already know to the script.',
    target: '28 of 31 letters practiced',
    pct: (p) => Math.min(1, lettersIntroduced(p) / 28),
    done: (p) => lettersIntroduced(p) >= 28,
  },
  {
    key: 'vocab',
    title: 'Core vocabulary',
    desc: 'Build a working vocabulary through roots — enough to recognize most of what you hear.',
    target: '80% of words & phrases introduced',
    pct: (p) => Math.min(1, vocabPhraseIntroducedPct(p) / 0.8),
    done: (p) => vocabPhraseIntroducedPct(p) >= 0.8,
  },
  {
    key: 'reading',
    title: 'Reading & listening',
    desc: 'Read graded passages and shadow native audio until whole sentences click.',
    target: 'All 3 passages read',
    pct: (p) => readingPct(p),
    done: (p) => readingPct(p) >= 1,
  },
  {
    key: 'conversation',
    title: 'Conversation',
    desc: 'Combine what you know in real exchanges — greetings, family, daily life — out loud.',
    target: 'Ongoing — daily shadowing & speaking practice',
    pct: (p) => PHASE_DEFS.slice(0, 3).reduce((s, ph) => s + ph.pct(p), 0) / 3,
    done: () => false,
  },
];

export function programMeta(track) {
  const totalWeeks = track === 'beginner' ? 24 : track === 'some' ? 8 : 12;
  const label = track === 'beginner' ? '~5–6 months' : track === 'some' ? '~2 months' : '~3 months';
  const bounds = [0, 0.15, 0.5, 0.8, 1];
  const ranges = bounds.slice(0, 4).map((b, i) => {
    const start = Math.max(1, Math.round(totalWeeks * b) + 1);
    const end = Math.round(totalWeeks * bounds[i + 1]);
    if (i === 3) return 'Week ' + start + '+';
    return end > start ? 'Weeks ' + start + '–' + end : 'Week ' + start;
  });
  return { totalWeeks, label, ranges };
}

export function currentPhaseIndex(progress) {
  for (let i = 0; i < PHASE_DEFS.length - 1; i++) {
    if (!PHASE_DEFS[i].done(progress)) return i;
  }
  return PHASE_DEFS.length - 1;
}
