import { cardStatus } from '../lib/srs.js';
import { playAudio } from '../lib/audio.js';

const STATUS_LABEL = { new: 'New', learning: 'Learning', mastered: 'Mastered' };

export function StatusPill({ progress, cardId }) {
  const s = cardStatus(progress, cardId);
  return <span className={'pill ' + s}>{STATUS_LABEL[s]}</span>;
}

export function PlayButton({ audioId, text, className = 'iconbtn', style }) {
  return (
    <button className={className} style={style} onClick={() => playAudio(audioId, text)} aria-label="Play audio">
      🔊
    </button>
  );
}

export function SectionTitle({ title, aside, small, style }) {
  return (
    <div className="section-title" style={style}>
      <h2 style={small ? { fontSize: small } : undefined}>{title}</h2>
      {aside && (
        <span className="muted" style={{ fontSize: 12.5 }}>
          {aside}
        </span>
      )}
    </div>
  );
}

export function LetterForms({ letter, withAlone }) {
  const forms = [
    [letter.initial, 'Initial'],
    [letter.medial, 'Medial'],
    [letter.final, 'Final'],
  ];
  if (withAlone) forms.push([letter.letter, 'Alone']);
  return (
    <div className="forms-row" style={{ width: '100%' }}>
      {forms.map(([f, k]) => (
        <div key={k}>
          <div className="f">{f}</div>
          <div className="k">{k}</div>
        </div>
      ))}
    </div>
  );
}
