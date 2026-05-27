import { useRef, useEffect, useCallback, useState } from 'react';
import type { WheelItem } from '../lib/types';

interface SpinWheelProps {
  items: WheelItem[];
  label: string;
  onResult: (item: WheelItem) => void;
  size?: number;
}

function adjustColor(hex: string, amt: number): string {
  let h = hex.replace('#', '');
  const num = parseInt(h, 16);
  let r = Math.min(255, Math.max(0, (num >> 16) + amt));
  let g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amt));
  let b = Math.min(255, Math.max(0, (num & 0xff) + amt));
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

export function SpinWheel({ items, label, onResult, size = 360 }: SpinWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    currentAngle: 0,
    spinVelocity: 0,
    isSpinning: false,
    animFrame: 0,
  });
  const [result, setResult] = useState<WheelItem | null>(null);
  const [spinning, setSpinning] = useState(false);

  const totalWeight = items.reduce((s, it) => s + it.tier.weight, 0);

  const draw = useCallback((angle: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r = cx;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let start = angle;
    items.forEach((item, i) => {
      const slice = (item.tier.weight / totalWeight) * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, start + slice);
      ctx.closePath();
      ctx.fillStyle = i % 2 === 0 ? item.tier.color : adjustColor(item.tier.color, 15);
      ctx.fill();
      ctx.strokeStyle = '#111';
      ctx.lineWidth = 1;
      ctx.stroke();
      if (slice > 0.05) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(start + slice / 2);
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ddd';
        const fs = Math.min(10, Math.max(6, slice * 45));
        ctx.font = `${fs}px monospace`;
        ctx.fillText(item.name, r - 12, 0);
        ctx.restore();
      }
      start += slice;
    });
  }, [items, totalWeight]);

  useEffect(() => { draw(0); }, [draw]);

  const stop = useCallback(() => {
    const s = stateRef.current;
    s.isSpinning = false;
    cancelAnimationFrame(s.animFrame);
    const ptr = ((-Math.PI / 2) - s.currentAngle % (2 * Math.PI) + 4 * Math.PI) % (2 * Math.PI);
    let startA = 0;
    let selected = items[0];
    for (const item of items) {
      const slice = (item.tier.weight / totalWeight) * 2 * Math.PI;
      if (ptr >= startA && ptr < startA + slice) { selected = item; break; }
      startA += slice;
    }
    setResult(selected);
    setSpinning(false);
    onResult(selected);
  }, [items, totalWeight, onResult]);

  const animate = useCallback(() => {
    const s = stateRef.current;
    s.currentAngle = (s.currentAngle + s.spinVelocity) % (2 * Math.PI);
    draw(s.currentAngle);
    s.spinVelocity *= 0.985;
    if (s.spinVelocity < 0.001) { stop(); }
    else { s.animFrame = requestAnimationFrame(animate); }
  }, [draw, stop]);

  const spin = useCallback(() => {
    const s = stateRef.current;
    if (s.isSpinning) return;
    s.isSpinning = true;
    s.spinVelocity = Math.random() * 0.2 + 0.3;
    setSpinning(true);
    setResult(null);
    s.animFrame = requestAnimationFrame(animate);
  }, [animate]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{ color: '#999', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ position: 'relative', width: size, height: size }}>
        <div style={{
          position: 'absolute', top: -8, left: '50%',
          transform: 'translateX(-50%)',
          width: 0, height: 0,
          borderLeft: '12px solid transparent',
          borderRight: '12px solid transparent',
          borderTop: '20px solid #ff4444',
          zIndex: 10,
        }} />
        <canvas ref={canvasRef} width={size} height={size}
          style={{ borderRadius: '50%', border: '2px solid #444', display: 'block' }} />
      </div>
      <button onClick={spin} disabled={spinning} className="primary" style={{ width: size }}>
        {spinning ? 'SPINNING...' : `Spin ${label}`}
      </button>
      {result && (
        <div style={{
          background: '#000', border: '1px solid #444',
          padding: 12, width: size, minHeight: 80,
        }}>
          <div style={{ fontSize: 11, color: '#ffaa00', marginBottom: 4 }}>{result.tier.label}</div>
          <div style={{ fontSize: 16, fontWeight: 'bold', color: '#00ffcc', marginBottom: 6 }}>{result.name}</div>
          <div style={{ fontSize: 12, color: '#bbb', lineHeight: 1.4 }}>{result.desc}</div>
        </div>
      )}
    </div>
  );
}
