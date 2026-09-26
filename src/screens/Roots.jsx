import { ROOTS, PHRASES } from '../data/content.js';
import { VOCAB_CARDS } from '../data/cards.js';
import { Sheet, SheetHead } from '../components/Sheet.jsx';
import { PlayButton, SectionTitle, StatusPill } from '../components/common.jsx';

export function Roots({ onOpenRoot }) {
  return (
    <>
      <SectionTitle title="Roots" aside={`${ROOTS.length} roots · ${VOCAB_CARDS.length} words`} />
      <p className="muted" style={{ fontSize: 13.5, marginTop: -6 }}>
        Most Arabic words are built from a three-letter root carrying a core meaning. Learn the root once, and a whole family of words gets easier.
      </p>
      <div className="grid cols-3">
        {ROOTS.map((r) => (
          <div key={r.id} className="root-tile" role="button" tabIndex={0} onClick={() => onOpenRoot(r.id)}>
            <div className="letters">{r.letters.join(' ')}</div>
            <div className="gloss">{r.meaning}</div>
          </div>
        ))}
      </div>

      <SectionTitle title="Phrases you may already know" style={{ marginTop: 6 }} />
      <div className="card">
        {PHRASES.map((p, i) => (
          <div key={i} className="word-row">
            <div style={{ flex: 1 }}>
              <div className="ar" style={{ fontSize: 19 }}>
                {p.ar}
              </div>
              <div className="muted" style={{ fontSize: 12 }}>
                {p.translit}
              </div>
            </div>
            <div className="en">{p.meaning}</div>
            <PlayButton audioId={'phrase-' + i} text={p.ar} />
          </div>
        ))}
      </div>
    </>
  );
}

export function RootDetail({ rootId, progress, onClose }) {
  const r = ROOTS.find((x) => x.id === rootId);
  return (
    <Sheet onClose={onClose}>
      <SheetHead title={r.letters.join(' ')} onClose={onClose} titleClassName="ar-display" titleStyle={{ fontSize: 26, letterSpacing: 4 }} />
      <p className="muted" style={{ marginTop: -8, fontSize: 13.5 }}>
        Core meaning: <b style={{ color: 'var(--ink)' }}>{r.meaning}</b>
      </p>
      <hr className="thin" />
      {r.words.map((w, i) => {
        const cardId = 'vocab-' + r.id + '-' + i;
        return (
          <div key={cardId} className="word-row">
            <div style={{ flex: 1 }}>
              <div className="ar" style={{ fontSize: 20 }}>
                {w.ar}
              </div>
              <div className="muted" style={{ fontSize: 12.5 }}>
                {w.translit} — {w.meaning}
                {w.note ? ' · ' + w.note : ''}
              </div>
            </div>
            <StatusPill progress={progress} cardId={cardId} />
            <PlayButton audioId={cardId} text={w.ar} />
          </div>
        );
      })}
    </Sheet>
  );
}
