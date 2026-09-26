import { ALL_CARDS, VOCAB_CARDS } from '../data/cards.js';
import { LETTERS, ROOTS, PHRASES } from '../data/content.js';
import { isDue } from '../lib/srs.js';
import { PHASE_DEFS, programMeta, currentPhaseIndex } from '../lib/roadmap.js';
import { todayStr, addDays, formatMonthYear } from '../lib/utils.js';

function TrackIntro({ track }) {
  if (track === 'heritage')
    return (
      <>
        You already understand spoken Arabic — we'll connect what your ear knows to the written script. Start in <b>Script</b> to lock in the
        letters, then head to <b>Roots</b>: you'll recognize far more than you expect.
      </>
    );
  if (track === 'beginner')
    return (
      <>
        Start in <b>Script</b> to learn the alphabet — everything else in the app builds on it.
      </>
    );
  return (
    <>
      Jump into <b>Roots</b> to build vocabulary systematically, and use <b>Script</b> any time you want to review a letter.
    </>
  );
}

const TRACK_PACE = {
  beginner: 'starting from zero',
  some: 'building on what you already studied',
  heritage: 'a heritage learner’s head start',
};

function Roadmap({ progress }) {
  const track = progress.track || 'some';
  const meta = programMeta(track);
  const cur = currentPhaseIndex(progress);
  const targetDate = progress.startDate ? addDays(progress.startDate, meta.totalWeeks * 7) : null;

  return (
    <div className="card">
      <div className="section-title">
        <h2 style={{ fontSize: 17 }}>Your path to conversation</h2>
        <span className="muted" style={{ fontSize: 12 }}>
          {meta.label}
        </span>
      </div>
      <p className="muted" style={{ fontSize: 13, marginTop: 2 }}>
        A realistic sequence, not a countdown — paced for {TRACK_PACE[track]} at roughly 15–20 minutes a day.
        {targetDate && (
          <>
            {' '}
            On track for basic conversation around <b style={{ color: 'var(--ink)' }}>{formatMonthYear(targetDate)}</b> if you keep a steady pace.
          </>
        )}
      </p>
      <div className="roadmap" style={{ marginTop: 6 }}>
        {PHASE_DEFS.map((p, i) => {
          const done = p.done(progress);
          const isCurrent = i === cur && !done;
          return (
            <div key={p.key} className={'phase-row' + (done ? ' done' : '') + (isCurrent ? ' current' : '')}>
              <div className="phase-num">{done ? '✓' : i + 1}</div>
              <div className="phase-body">
                <div className="phase-head">
                  <h3>
                    {p.title}
                    {isCurrent && <span className="here-badge">You are here</span>}
                  </h3>
                  <span className="phase-week">{meta.ranges[i]}</span>
                </div>
                <div className="phase-desc">{p.desc}</div>
                <div className="progress-track" style={{ marginTop: 8 }}>
                  <div className="progress-fill" style={{ width: Math.round(p.pct(progress) * 100) + '%' }} />
                </div>
                <div className="phase-target">{p.target}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Dashboard({ progress, onStartReview, onTab }) {
  const has = (id) => Boolean(progress.cards[id]);
  const due = ALL_CARDS.filter((c) => has(c.id) && isDue(progress, c.id)).length;
  const fresh = ALL_CARDS.filter((c) => !has(c.id)).length;
  const sessionSize = Math.min(due + Math.min(10, fresh), 30) || Math.min(10, fresh);
  const lettersLearned = LETTERS.filter((l) => has('letter-' + l.id)).length;
  const wordsLearned = ROOTS.reduce((n, r) => n + r.words.filter((w, i) => has('vocab-' + r.id + '-' + i)).length, 0);
  const phrasesLearned = PHRASES.filter((p, i) => has('phrase-' + i)).length;
  const lastWeek = [6, 5, 4, 3, 2, 1, 0].map((i) => {
    const d = addDays(todayStr(), -i);
    return { d, on: progress.history.includes(d) };
  });

  return (
    <>
      <div className="hero">
        <div className="eyebrow">Welcome back</div>
        <p style={{ marginTop: 6, fontSize: 14.5, lineHeight: 1.55 }}>
          <TrackIntro track={progress.track} />
        </p>
        <div className="streak-row">
          {lastWeek.map((day) => (
            <div key={day.d} className={'streak-dot' + (day.on ? ' on' : '')}>
              {day.on ? '✓' : ''}
            </div>
          ))}
        </div>
        <div className="btn-row" style={{ marginTop: 16 }}>
          <button className="btn primary" onClick={onStartReview}>
            Start review{sessionSize ? ` (${sessionSize})` : ''}
          </button>
          <button className="btn ghost" onClick={() => onTab(progress.track === 'beginner' || !progress.track ? 'script' : 'roots')}>
            Keep learning
          </button>
        </div>
      </div>

      <Roadmap progress={progress} />

      <div className="grid cols-3">
        <Stat num={`${lettersLearned}/${LETTERS.length}`} label="Letters" />
        <Stat num={`${wordsLearned}/${VOCAB_CARDS.length}`} label="Words" />
        <Stat num={`${phrasesLearned}/${PHRASES.length}`} label="Phrases" />
      </div>

      <div className="card">
        <details className="about">
          <summary>Why this app works the way it does</summary>
          <p>
            Four ideas from language-acquisition research, not gamification: <b>spaced repetition</b> (you review each card right before you'd forget
            it, not on a fixed schedule); <b>root-and-pattern vocabulary</b> (Arabic words cluster around three-letter roots — learn ك‑ت‑ب once and
            كتاب, مكتب, كاتب all become easier); <b>comprehensible input</b> (short graded texts just above your level, not isolated flashcards
            forever); and <b>active recall</b> (you retrieve the answer before seeing it, which builds memory far better than re-reading).
          </p>
        </details>
      </div>
    </>
  );
}

function Stat({ num, label }) {
  return (
    <div className="stat-tile">
      <div className="num">{num}</div>
      <div className="lbl">{label}</div>
    </div>
  );
}
