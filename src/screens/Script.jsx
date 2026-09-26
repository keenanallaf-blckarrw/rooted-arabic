import { useEffect, useRef, useState } from 'react';
import { LETTERS, DIACRITICS, PHRASES, ROOTS, CHAR_TO_LETTER } from '../data/content.js';
import { Sheet, SheetHead } from '../components/Sheet.jsx';
import { LetterForms, PlayButton, SectionTitle } from '../components/common.jsx';
import { useToast } from '../components/Toast.jsx';
import { shuffle, stripAr } from '../lib/utils.js';

export function Script({ onOpenLetter, onOpenQuiz }) {
  return (
    <>
      <SectionTitle title="The alphabet" aside={`${LETTERS.length} letters`} />
      <div className="grid cols-4">
        {LETTERS.map((l) => (
          <button key={l.id} className="letter-tile" onClick={() => onOpenLetter(l.id)}>
            <span className="lg">{l.letter}</span>
            <span className="tr">{l.translit}</span>
          </button>
        ))}
      </div>

      <div className="card">
        <SectionTitle title="Vowels & marks" small={17} />
        <p className="muted" style={{ fontSize: 13, marginTop: 2 }}>
          Short vowels aren't letters — they're small marks above or below a letter. Everyday Levantine writing usually drops them; we show them here
          so you can hear exactly what they do.
        </p>
        <div className="grid cols-3" style={{ marginTop: 12 }}>
          {DIACRITICS.map((d) => (
            <div key={d.name} className="letter-tile">
              <span className="lg">{d.demo}</span>
              <span className="tr">
                {d.name} · {d.effect}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <SectionTitle title="Letter match" small={17} />
        <p className="muted" style={{ fontSize: 13, marginTop: 2 }}>
          You'll hear a word you probably already know. Pick the letter it starts with.
        </p>
        <div className="btn-row" style={{ marginTop: 10 }}>
          <button className="btn gold" onClick={onOpenQuiz}>
            Play letter match
          </button>
        </div>
      </div>
    </>
  );
}

export function LetterDetail({ letterId, onClose }) {
  const l = LETTERS.find((x) => x.id === letterId);
  return (
    <Sheet onClose={onClose}>
      <SheetHead title={l.name} onClose={onClose} titleStyle={{ fontFamily: "'Fraunces',serif", fontSize: 19 }} />
      <div style={{ textAlign: 'center' }}>
        <div className="ar-display" style={{ fontSize: 64 }}>
          {l.letter}
        </div>
        <div className="muted">{l.translit}</div>
      </div>
      <LetterForms letter={l} withAlone />
      {!l.connects && (
        <p className="muted" style={{ fontSize: 12.5, textAlign: 'center', marginTop: 8 }}>
          This letter never connects to the letter after it.
        </p>
      )}
      <hr className="thin" />
      <p style={{ fontSize: 14, lineHeight: 1.55 }}>{l.sound}</p>
      <div className="card" style={{ background: 'var(--surface-2)', marginTop: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="ar" style={{ fontSize: 24, flex: 1 }}>
            {l.example.ar}
          </div>
          <PlayButton audioId={'letter-' + l.id} text={l.example.ar} />
        </div>
        <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>
          {l.example.translit} — {l.example.meaning}
        </div>
      </div>
      <hr className="thin" />
      <p className="muted" style={{ fontSize: 12.5 }}>
        Trace it — this is just for feel, nothing is graded.
      </p>
      <TracePad letter={l.letter} />
    </Sheet>
  );
}

// A canvas with a faint letter behind it that you can draw over with a finger or mouse.
function TracePad({ letter }) {
  const canvasRef = useRef(null);
  const redrawRef = useRef(() => {});

  useEffect(() => {
    const cv = canvasRef.current;
    const ctx = cv.getContext('2d');
    const css = getComputedStyle(document.documentElement);

    cv.width = cv.clientWidth * 2;
    cv.height = cv.clientHeight * 2;
    ctx.scale(2, 2);

    const drawGuide = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.direction = 'rtl';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '80px Amiri, serif';
      ctx.fillStyle = css.getPropertyValue('--ink-faint');
      ctx.globalAlpha = 0.35;
      ctx.fillText(letter, cv.clientWidth / 2, cv.clientHeight / 2);
      ctx.globalAlpha = 1;
    };
    drawGuide();
    redrawRef.current = drawGuide;

    ctx.strokeStyle = css.getPropertyValue('--gold');
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    let drawing = false;
    const pos = (e) => {
      const r = cv.getBoundingClientRect();
      const p = e.touches ? e.touches[0] : e;
      return { x: p.clientX - r.left, y: p.clientY - r.top };
    };
    const start = (e) => {
      drawing = true;
      const p = pos(e);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      e.preventDefault();
    };
    const move = (e) => {
      if (!drawing) return;
      const p = pos(e);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      e.preventDefault();
    };
    const end = () => {
      drawing = false;
    };

    cv.addEventListener('mousedown', start);
    cv.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end);
    // Touch listeners must be non-passive so preventDefault can stop the page from scrolling while tracing.
    cv.addEventListener('touchstart', start, { passive: false });
    cv.addEventListener('touchmove', move, { passive: false });
    cv.addEventListener('touchend', end);
    return () => {
      cv.removeEventListener('mousedown', start);
      cv.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', end);
      cv.removeEventListener('touchstart', start);
      cv.removeEventListener('touchmove', move);
      cv.removeEventListener('touchend', end);
    };
  }, [letter]);

  return (
    <>
      <canvas ref={canvasRef} className="trace" height="140" style={{ height: 140 }} />
      <div className="btn-row" style={{ marginTop: 10, justifyContent: 'center' }}>
        <button className="btn ghost" onClick={() => redrawRef.current()}>
          Clear
        </button>
      </div>
    </>
  );
}

const QUIZ_LENGTH = 8;

function newQuizPool() {
  return shuffle([
    ...PHRASES.map((p, i) => ({ id: 'phrase-' + i, ar: p.ar })),
    ...ROOTS.flatMap((r) => r.words.map((w, i) => ({ id: 'vocab-' + r.id + '-' + i, ar: w.ar }))),
  ]).slice(0, QUIZ_LENGTH);
}

function questionFor(word) {
  const correctId = CHAR_TO_LETTER[stripAr(word.ar)[0]];
  const others = shuffle(LETTERS.map((l) => l.id).filter((id) => id !== correctId)).slice(0, 3);
  return { word, correctId, options: shuffle([correctId, ...others]) };
}

export function LetterQuiz({ onClose }) {
  const toast = useToast();
  const [pool, setPool] = useState(newQuizPool);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [question, setQuestion] = useState(() => questionFor(pool[0]));

  const restart = () => {
    const next = newQuizPool();
    setPool(next);
    setIndex(0);
    setCorrect(0);
    setQuestion(questionFor(next[0]));
  };

  const answer = (picked) => {
    if (picked === question.correctId) {
      setCorrect((n) => n + 1);
      toast('Correct 🎉');
    } else {
      toast('It was ' + LETTERS.find((l) => l.id === question.correctId).letter);
    }
    setTimeout(() => {
      const nextIndex = index + 1;
      setIndex(nextIndex);
      if (nextIndex < pool.length) setQuestion(questionFor(pool[nextIndex]));
    }, 500);
  };

  if (index >= pool.length) {
    return (
      <Sheet onClose={onClose}>
        <SheetHead title="Letter match — done" onClose={onClose} />
        <p style={{ textAlign: 'center', fontSize: 16, marginTop: 20 }}>
          {correct} / {pool.length} correct
        </p>
        <div className="btn-row" style={{ justifyContent: 'center', marginTop: 16 }}>
          <button className="btn primary" onClick={restart}>
            Play again
          </button>
        </div>
      </Sheet>
    );
  }

  return (
    <Sheet onClose={onClose}>
      <SheetHead title={`Letter match ${index + 1}/${pool.length}`} onClose={onClose} />
      <div style={{ textAlign: 'center', margin: '18px 0' }}>
        <PlayButton audioId={question.word.id} text={question.word.ar} style={{ width: 56, height: 56, fontSize: 22, margin: '0 auto' }} />
        <p className="muted" style={{ marginTop: 10, fontSize: 13 }}>
          Tap to hear the word, then pick its first letter.
        </p>
      </div>
      <div className="grid cols-4">
        {question.options.map((id) => (
          <button key={id} className="letter-tile" onClick={() => answer(id)}>
            <span className="lg">{LETTERS.find((x) => x.id === id).letter}</span>
          </button>
        ))}
      </div>
    </Sheet>
  );
}
