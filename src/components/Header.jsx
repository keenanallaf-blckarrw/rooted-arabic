export const TABS = [
  { id: 'dashboard', label: 'Dashboard', short: 'Home', icon: '⌂' },
  { id: 'script', label: 'Script', short: 'Script', icon: 'أ' },
  { id: 'roots', label: 'Roots', short: 'Roots', icon: 'ج' },
  { id: 'reading', label: 'Reading', short: 'Reading', icon: '📖' },
  { id: 'speak', label: 'Speak', short: 'Speak', icon: '🎙' },
];

export function Header({ tab, onTab, streak, xp }) {
  return (
    <header className="top">
      <div className="top-inner">
        <div className="brand-row">
          <div className="brand">
            <div className="brand-mark">ر</div>
            <h1>Rooted Arabic</h1>
          </div>
          <div className="chips">
            <div className="chip" title="Day streak">
              🔥 <span>{streak}</span>
            </div>
            <div className="chip" title="Experience points">
              ✦ <span>{xp}</span>
            </div>
          </div>
        </div>
        <nav className="tabs">
          {TABS.map((t) => (
            <button key={t.id} className={tab === t.id ? 'active' : ''} onClick={() => onTab(t.id)}>
              {t.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

// Phone-width navigation; CSS shows this and hides the top tabs below 640px.
export function BottomNav({ tab, onTab }) {
  return (
    <div className="bottomnav">
      <div className="row">
        {TABS.map((t) => (
          <button key={t.id} className={tab === t.id ? 'active' : ''} onClick={() => onTab(t.id)}>
            <span className="ic">{t.icon}</span>
            {t.short}
          </button>
        ))}
      </div>
    </div>
  );
}
