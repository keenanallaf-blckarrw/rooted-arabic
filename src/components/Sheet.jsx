// A bottom sheet on phones, a centered dialog on wider screens. Clicking the dim backdrop closes it.
export function Sheet({ onClose, children }) {
  return (
    <div
      className="overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div className="sheet">{children}</div>
    </div>
  );
}

export function SheetHead({ title, onClose, titleClassName, titleStyle }) {
  return (
    <div className="sheet-head">
      <h3 className={titleClassName} style={titleStyle}>
        {title}
      </h3>
      {onClose && (
        <button className="iconbtn" onClick={onClose} aria-label="Close">
          ✕
        </button>
      )}
    </div>
  );
}
