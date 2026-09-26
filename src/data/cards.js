import { LETTERS, ROOTS, PHRASES } from './content.js';

// Every reviewable item, flattened into one list of flashcards.
export const ALL_CARDS = [
  ...LETTERS.map((l) => ({ id: 'letter-' + l.id, kind: 'letter', ar: l.letter, translit: l.translit, meaning: l.name, data: l })),
  ...ROOTS.flatMap((r) =>
    r.words.map((w, i) => ({ id: 'vocab-' + r.id + '-' + i, kind: 'vocab', ar: w.ar, translit: w.translit, meaning: w.meaning, data: { root: r, word: w } })),
  ),
  ...PHRASES.map((p, i) => ({ id: 'phrase-' + i, kind: 'phrase', ar: p.ar, translit: p.translit, meaning: p.meaning, data: p })),
];

export const CARD_BY_ID = Object.fromEntries(ALL_CARDS.map((c) => [c.id, c]));
export const VOCAB_CARDS = ALL_CARDS.filter((c) => c.kind === 'vocab');
export const VOCAB_PHRASE_CARDS = ALL_CARDS.filter((c) => c.kind !== 'letter');

export function cardAudioId(card) {
  return card.kind === 'letter' ? 'letter-' + card.data.id : card.id;
}
