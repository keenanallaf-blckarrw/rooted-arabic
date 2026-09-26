import { MIN_PAIRS, THROAT_TRIO, PHRASES } from '../data/content.js';
import { SectionTitle } from '../components/common.jsx';
import { playAudio, playAudioRepeat } from '../lib/audio.js';
import { ConversationPartner } from './ConversationPartner.jsx';

export const DEFAULT_SPEAK_TARGET = { item: MIN_PAIRS[0].a, audioId: 'pair-0-a' };

// `target` lives in App so the chosen word survives switching tabs.
export function Speaking({ target, onTarget, chat }) {
  const isActive = (item) => target.item.ar === item.ar;

  return (
    <>
      <SectionTitle title="Speaking" />
      <p className="muted" style={{ fontSize: 13.5, marginTop: -6 }}>
        Pick a word below, listen closely, then say it out loud yourself — at full speed and slowed down. This app can't hear you back, but repeating
        out loud (not just listening) is what actually trains the muscle memory for these sounds — that's what "shadowing" practice is.
      </p>

      <SectionTitle title="Minimal pairs" small={16} style={{ marginTop: 2 }} />
      {MIN_PAIRS.map((pair, idx) => (
        <div key={idx} className="card">
          <div className="muted" style={{ fontSize: 11.5, marginBottom: 8 }}>
            {pair.note}
          </div>
          <div className="pair-row">
            {['a', 'b'].map((side) => (
              <WordButton key={side} item={pair[side]} active={isActive(pair[side])} onClick={() => onTarget({ item: pair[side], audioId: `pair-${idx}-${side}` })}>
                {pair[side].translit} · {pair[side].meaning}
              </WordButton>
            ))}
          </div>
        </div>
      ))}

      <SectionTitle title="Three throat sounds" small={16} style={{ marginTop: 2 }} />
      <div className="card">
        <div className="pair-row">
          {THROAT_TRIO.map((w, i) => (
            <WordButton key={i} item={w} active={isActive(w)} onClick={() => onTarget({ item: w, audioId: 'trio-' + i })}>
              {w.letter} · {w.translit}
            </WordButton>
          ))}
        </div>
      </div>

      <SectionTitle title="Everyday phrases" small={16} style={{ marginTop: 2 }} />
      <div className="card">
        {PHRASES.map((p, i) => (
          <div key={i} className="word-row">
            <div style={{ flex: 1 }}>
              <div className="ar" style={{ fontSize: 18 }}>
                {p.ar}
              </div>
              <div className="muted" style={{ fontSize: 12 }}>
                {p.translit}
              </div>
            </div>
            <button className="btn ghost" style={{ padding: '7px 12px', fontSize: 12.5 }} onClick={() => onTarget({ item: p, audioId: 'phrase-' + i })}>
              Practice
            </button>
          </div>
        ))}
      </div>

      <ConversationPartner {...chat} />

      <div style={{ height: 1 }} />
      <PracticeBar target={target} />
    </>
  );
}

function WordButton({ item, active, onClick, children }) {
  return (
    <button className={'word-btn' + (active ? ' active' : '')} onClick={onClick}>
      <span className="ar">{item.ar}</span>
      <span className="tr">{children}</span>
    </button>
  );
}

function PracticeBar({ target }) {
  const { item, audioId } = target;
  return (
    <div className="practice-bar">
      <div className="muted" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.05em' }}>
        Practicing
      </div>
      <div className="ar" style={{ fontSize: 22 }}>
        {item.ar}
      </div>
      <div className="muted" style={{ fontSize: 12 }}>
        {item.translit}
      </div>
      <div className="btn-row" style={{ marginTop: 12 }}>
        <button className="btn gold" style={{ flex: 1 }} onClick={() => playAudio(audioId, item.ar)}>
          🔊 Normal speed
        </button>
        <button className="btn" style={{ flex: 1 }} onClick={() => playAudio(audioId + '-slow', item.ar, 0.55)}>
          🐢 Slowed down
        </button>
        <button className="btn ghost" onClick={() => playAudioRepeat(audioId, item.ar, 3, 0.75)}>
          🔁 ×3
        </button>
      </div>
    </div>
  );
}
