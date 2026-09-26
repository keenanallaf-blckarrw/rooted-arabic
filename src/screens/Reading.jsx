import { PASSAGES } from '../data/content.js';
import { Sheet, SheetHead } from '../components/Sheet.jsx';
import { PlayButton, SectionTitle } from '../components/common.jsx';
import { useToast } from '../components/Toast.jsx';
import { playSequence } from '../lib/audio.js';

export function Reading({ onOpenPassage }) {
  return (
    <>
      <SectionTitle title="Reading" />
      <p className="muted" style={{ fontSize: 13.5, marginTop: -6 }}>
        Short, graded texts built from the roots and phrases you're learning. Tap any word for its meaning.
      </p>
      {PASSAGES.map((p) => (
        <div key={p.id} className="card" style={{ cursor: 'pointer' }} role="button" tabIndex={0} onClick={() => onOpenPassage(p.id)}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h3 style={{ fontSize: 16 }}>{p.title}</h3>
            <span className="muted" style={{ fontSize: 12 }}>
              Read →
            </span>
          </div>
          <p className="muted" style={{ fontSize: 12.5, marginTop: 4 }}>
            {p.level}
          </p>
        </div>
      ))}
    </>
  );
}

export function PassageView({ passageId, onClose }) {
  const toast = useToast();
  const p = PASSAGES.find((x) => x.id === passageId);
  const lineIds = p.lines.map((_, i) => 'passage-' + p.id + '-' + i);

  return (
    <Sheet onClose={onClose}>
      <SheetHead title={p.title} onClose={onClose} />
      <div className="btn-row">
        <button className="btn gold" onClick={() => playSequence(lineIds)}>
          🔊 Play passage
        </button>
      </div>
      <div style={{ marginTop: 14 }}>
        {p.lines.map((line, i) => (
          <div key={i}>
            {line.speaker && <div className="speaker">{line.speaker}</div>}
            <div className="passage-line">
              {line.toks.map((t, j) => (
                <span key={j}>
                  <span className="tok" role="button" tabIndex={0} onClick={() => toast(t.gl)}>
                    {t.ar}
                  </span>{' '}
                </span>
              ))}
              <PlayButton
                audioId={lineIds[i]}
                text={line.toks.map((t) => t.ar).join(' ')}
                style={{ width: 30, height: 30, fontSize: 13, verticalAlign: 'middle', display: 'inline-flex' }}
              />
            </div>
          </div>
        ))}
      </div>
      <hr className="thin" />
      <p className="muted" style={{ fontSize: 12 }}>
        Tap any word above to see its meaning as a quick popup, or tap a line's speaker icon to hear just that line.
      </p>
    </Sheet>
  );
}
