interface ResourceBarProps {
  label: string;
  current: number;
  max: number;
  color: string;
  onSet?: (value: number) => void;
  showInput?: boolean;
}

export function ResourceBar({ label, current, max, color, onSet, showInput = true }: ResourceBarProps) {
  const pct = max > 0 ? Math.min(1, current / max) : 0;
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12 }}>
        <span style={{ color: '#999', letterSpacing: 1, textTransform: 'uppercase' }}>{label}</span>
        <span style={{ color: '#ddd' }}>{current} / {max}</span>
      </div>
      <div style={{ background: '#111', border: '1px solid #2e2e2e', height: 14, position: 'relative' }}>
        <div style={{
          width: `${pct * 100}%`, height: '100%',
          background: color, transition: 'width 0.2s',
        }} />
      </div>
      {showInput && onSet && (
        <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
          <button className="small icon-btn" onClick={() => onSet(Math.max(0, current - 1))}>−</button>
          <input
            type="number"
            value={current}
            min={0}
            max={max}
            onChange={e => onSet(parseInt(e.target.value) || 0)}
            style={{ flex: 1, padding: '2px 6px', textAlign: 'center', fontSize: 12 }}
          />
          <button className="small icon-btn" onClick={() => onSet(Math.min(max, current + 1))}>+</button>
        </div>
      )}
    </div>
  );
}
