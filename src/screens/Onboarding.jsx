import { Sheet, SheetHead } from '../components/Sheet.jsx';

const PATHS = [
  { track: 'heritage', title: 'I grew up around Arabic', desc: "I understand spoken Arabic and know basic phrases, but I can't really read or write the script." },
  { track: 'beginner', title: 'Complete beginner', desc: "I don't know the alphabet or vocabulary yet — starting from zero." },
  { track: 'some', title: 'Some formal study', desc: "I've studied Arabic before and know some grammar and vocabulary." },
];

export function Onboarding({ onChoose }) {
  return (
    <Sheet>
      <SheetHead title="Marḥaba — welcome" titleStyle={{ fontFamily: "'Fraunces',serif", fontSize: 20 }} />
      <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.55, marginBottom: 14 }}>
        Tell us where you're starting from so the app can point you the right direction. Everything stays unlocked either way.
      </p>
      {PATHS.map((p) => (
        <button key={p.track} className="path-card" onClick={() => onChoose(p.track)}>
          <h3>{p.title}</h3>
          <p>{p.desc}</p>
        </button>
      ))}
      <p className="muted" style={{ fontSize: 12, marginTop: 14, textAlign: 'center' }}>
        Content is tuned for Levantine Arabic alongside Modern Standard Arabic (MSA).
      </p>
    </Sheet>
  );
}
