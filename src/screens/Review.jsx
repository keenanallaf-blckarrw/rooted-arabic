import { useEffect, useState } from 'react';
import { CARD_BY_ID, cardAudioId } from '../data/cards.js';
import { buildChoices } from '../lib/srs.js';
import { playAudio } from '../lib/audio.js';
import { Sheet } from '../components/Sheet.jsx';
import { LetterForms } from '../components/common.jsx';

const KIND_LABEL = { letter: 'Letter', vocab: 'Word', phrase: 'Phrase' };
const AR_SIZE = { letter: 64, vocab: 46, phrase: 38 };

// A multiple-choice review session over `cardIds`. Each answer is graded immediately via onGrade.
export function Review({ cardIds, onGrade, onClose }) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState(null);
  const card = CARD_BY_ID[cardIds[index]];
  const [choices, setChoices] = useState(() => buildChoices(card));

  // Auto-play each card's audio when it appears.
  useEffect(() => {
    if (card) playAudio(cardAudioId(card), card.ar);
  }, [card]);

  if (!card) {
    return (
      <Sheet onClose={onClose}>
        <div style={{ textAlign: 'center', padding: '30px 10px' }}>
          <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 20 }}>Session complete</h3>
          <p className="muted" style={{ marginTop: 8 }}>
            You reviewed {cardIds.length} cards.
          </p>
          <button className="btn primary" style={{ marginTop: 16 }} onClick={onClose}>
            Done
          </button>
        </div>
      </Sheet>
    );
  }

  const answered = picked !== null;

  const answer = (idx) => {
    if (answered) return;
    setPicked(idx);
    onGrade(card.id, choices[idx].correct ? 'good' : 'again');
  };

  const next = () => {
    const nextCard = CARD_BY_ID[cardIds[index + 1]];
    setIndex(index + 1);
    setPicked(null);
    if (nextCard) setChoices(buildChoices(nextCard));
  };

  const choiceClass = (opt, idx) => {
    if (!answered) return 'choice-btn';
    if (opt.correct) return 'choice-btn correct';
    return idx === picked ? 'choice-btn wrong' : 'choice-btn disabled';
  };

  return (
    <Sheet onClose={onClose}>
      <div className="sheet-head">
        <span className="muted" style={{ fontSize: 12 }}>
          {index + 1} / {cardIds.length}
        </span>
        <button className="iconbtn" onClick={onClose} aria-label="End review">
          ✕
        </button>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: Math.round((index / cardIds.length) * 100) + '%' }} />
      </div>
      <div className="review-card">
        <div className="kind">{KIND_LABEL[card.kind]}</div>
        <div className="ar-display" style={{ fontSize: AR_SIZE[card.kind] }}>
          {card.ar}
        </div>
        <button className="audio-btn" onClick={() => playAudio(cardAudioId(card), card.ar)} aria-label="Play audio">
          🔊
        </button>
        {!answered && <p className="prompt-hint">Listen, then pick what it means.</p>}
        <div className="choices">
          {choices.map((opt, idx) => (
            <button key={idx} className={choiceClass(opt, idx)} disabled={answered} onClick={() => answer(idx)}>
              {opt.label}
            </button>
          ))}
        </div>
        {answered && (
          <>
            <div style={{ width: '100%', marginTop: 14, textAlign: 'left' }}>
              <CardDetail card={card} />
            </div>
            <button className="btn primary continue-btn" onClick={next}>
              Continue
            </button>
          </>
        )}
      </div>
    </Sheet>
  );
}

function CardDetail({ card }) {
  const noteStyle = { fontSize: 13, color: 'var(--ink-soft)', textAlign: 'left' };
  if (card.kind === 'letter') {
    return (
      <>
        <LetterForms letter={card.data} />
        <p style={{ ...noteStyle, marginTop: 8 }}>{card.data.sound}</p>
      </>
    );
  }
  if (card.kind === 'phrase') return card.data.note ? <p style={noteStyle}>{card.data.note}</p> : null;
  return (
    <p style={noteStyle}>
      Root: {card.data.root.letters.join(' ')} — {card.data.root.meaning}
    </p>
  );
}
