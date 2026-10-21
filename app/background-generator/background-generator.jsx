"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import "./background-generator.css";

const MODES = ["Mesh", "Linear", "Waves", "Blobs", "Dots", "Triangles", "Rings", "Stripes", "Topo"];
const PALETTES = [
  ["#0f172a", "#1e3a8a", "#38bdf8", "#e0f2fe"],
  ["#2b1055", "#7597de", "#f0a6ca", "#fff1f2"],
  ["#14532d", "#16a34a", "#bef264", "#fefce8"],
  ["#7c2d12", "#ea580c", "#fbbf24", "#fff7ed"],
  ["#111827", "#4b5563", "#d1d5db", "#f9fafb"],
  ["#4a044e", "#c026d3", "#fb7185", "#fde68a"],
  ["#042f2e", "#0d9488", "#5eead4", "#f0fdfa"],
  ["#1c1917", "#9a3412", "#d6d3d1", "#fafaf9"],
];

function seededRandom(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return `#${[f(0), f(8), f(4)].map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join("")}`;
}

function randomPalette() {
  const hue = Math.random() * 360;
  const delta = [30, 60, 150, 200][Math.floor(Math.random() * 4)] * (Math.random() < 0.5 ? -1 : 1);
  if (Math.random() < 0.6) {
    return [hslToHex(hue, 55, 10 + Math.random() * 8), hslToHex(hue + delta * 0.5, 60, 30), hslToHex(hue + delta, 70, 55), hslToHex(hue + delta, 60, 88)];
  }
  return [hslToHex(hue, 60, 92), hslToHex(hue + delta * 0.5, 65, 78), hslToHex(hue + delta, 65, 60), hslToHex(hue, 55, 35)];
}

function getDimensions(size, customWidth, customHeight) {
  if (size === "custom") {
    return [Math.min(6000, Math.max(100, Number(customWidth) || 1920)), Math.min(6000, Math.max(100, Number(customHeight) || 1080))];
  }
  return size.split("x").map(Number);
}

function drawBackground(ctx, canvas, { mode, colors, seed, scale, angle, grain, width, height }) {
  const W = width;
  const H = height;
  canvas.width = W;
  canvas.height = H;
  const random = seededRandom(seed);
  const sc = scale / 100;
  const ang = (angle * Math.PI) / 180;
  const max = Math.max(W, H);
  const min = Math.min(W, H);
  const linearGradient = (a) => {
    const cx = W / 2;
    const cy = H / 2;
    const radius = (Math.abs(Math.cos(a) * W) + Math.abs(Math.sin(a) * H)) / 2;
    const gradient = ctx.createLinearGradient(cx - Math.cos(a) * radius, cy - Math.sin(a) * radius, cx + Math.cos(a) * radius, cy + Math.sin(a) * radius);
    colors.forEach((color, i) => gradient.addColorStop(i / (colors.length - 1), color));
    return gradient;
  };

  ctx.clearRect(0, 0, W, H);
  switch (mode) {
    case "Linear":
      ctx.fillStyle = linearGradient(ang); ctx.fillRect(0, 0, W, H); break;
    case "Mesh": {
      ctx.fillStyle = colors[0]; ctx.fillRect(0, 0, W, H);
      const count = 5 + Math.round(sc * 8);
      for (let i = 0; i < count; i += 1) {
        const x = random() * W, y = random() * H, radius = max * (0.25 + random() * 0.45);
        const color = colors[1 + Math.floor(random() * (colors.length - 1))];
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `${color}ee`); gradient.addColorStop(1, `${color}00`);
        ctx.fillStyle = gradient; ctx.fillRect(0, 0, W, H);
      }
      break;
    }
    case "Blobs": {
      ctx.fillStyle = linearGradient(ang); ctx.fillRect(0, 0, W, H);
      const count = 4 + Math.round(sc * 10);
      for (let i = 0; i < count; i += 1) {
        const x = random() * W, y = random() * H, radius = min * (0.1 + random() * 0.35 * (0.4 + sc)), points = 7;
        const color = colors[Math.floor(random() * colors.length)];
        const phases = Array.from({ length: points }, () => 0.7 + random() * 0.6);
        ctx.beginPath();
        for (let k = 0; k <= points; k += 1) {
          const a = (k / points) * Math.PI * 2, a2 = ((k + 1) / points) * Math.PI * 2;
          const p = [x + Math.cos(a) * radius * phases[k % points], y + Math.sin(a) * radius * phases[k % points]];
          const q = [x + Math.cos(a2) * radius * phases[(k + 1) % points], y + Math.sin(a2) * radius * phases[(k + 1) % points]];
          if (k === 0) ctx.moveTo((p[0] + q[0]) / 2, (p[1] + q[1]) / 2);
          else ctx.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2);
        }
        ctx.closePath(); ctx.globalAlpha = 0.55 + random() * 0.35; ctx.fillStyle = color; ctx.fill();
      }
      ctx.globalAlpha = 1; break;
    }
    case "Waves": {
      ctx.fillStyle = linearGradient(Math.PI / 2); ctx.fillRect(0, 0, W, H);
      const layers = 3 + Math.round(sc * 8);
      ctx.save(); ctx.translate(W / 2, H / 2); ctx.rotate(ang); ctx.translate(-W / 2, -H / 2);
      for (let layer = 0; layer < layers; layer += 1) {
        const base = H * (0.15 + 0.9 * layer / layers) - H * 0.1;
        const amplitude = H * (0.04 + random() * 0.08), frequency = (1 + random() * 2.5) / W * Math.PI * 2 * (1 + sc), phase = random() * 7;
        ctx.beginPath(); ctx.moveTo(-W, H * 2);
        for (let x = -W; x <= W * 2; x += 10) ctx.lineTo(x, base + Math.sin(x * frequency + phase) * amplitude + Math.sin(x * frequency * 2.3 + phase * 2) * amplitude * 0.4);
        ctx.lineTo(W * 2, H * 2); ctx.closePath(); ctx.globalAlpha = 0.5 + 0.5 * layer / layers; ctx.fillStyle = colors[1 + layer % (colors.length - 1)]; ctx.fill();
      }
      ctx.restore(); ctx.globalAlpha = 1; break;
    }
    case "Dots": {
      ctx.fillStyle = colors[0]; ctx.fillRect(0, 0, W, H);
      const step = min * (0.015 + 0.07 * (1 - sc)), extent = Math.hypot(W, H) / 2;
      ctx.save(); ctx.translate(W / 2, H / 2); ctx.rotate(ang);
      for (let y = -extent; y < extent; y += step) for (let x = -extent; x < extent; x += step) {
        const d = Math.hypot(x, y) / extent, radius = step * 0.5 * (0.15 + 0.85 * (1 - Math.abs(Math.sin(d * 3 + random() * 0.3))));
        ctx.fillStyle = colors[1 + Math.floor(random() * (colors.length - 1))]; ctx.beginPath(); ctx.arc(x, y, Math.max(0.5, radius), 0, 7); ctx.fill();
      }
      ctx.restore(); break;
    }
    case "Triangles": {
      const side = min * (0.03 + 0.2 * (1 - sc)), triHeight = side * 0.866;
      ctx.fillStyle = colors[0]; ctx.fillRect(0, 0, W, H);
      for (let row = -1; row * triHeight < H + triHeight; row += 1) for (let col = -1; col * side < W + side; col += 1) {
        const x = col * side + (row % 2 ? side / 2 : 0), y = row * triHeight;
        for (let up = 0; up < 2; up += 1) {
          ctx.beginPath();
          if (up) { ctx.moveTo(x, y); ctx.lineTo(x + side, y); ctx.lineTo(x + side / 2, y + triHeight); }
          else { ctx.moveTo(x, y); ctx.lineTo(x + side / 2, y + triHeight); ctx.lineTo(x - side / 2, y + triHeight); }
          ctx.closePath(); const t = (x / W + y / H) / 2;
          const index = Math.min(colors.length - 1, Math.max(0, Math.floor((t + (random() - 0.5) * 0.5) * colors.length)));
          ctx.fillStyle = colors[index]; ctx.globalAlpha = 0.75 + random() * 0.25; ctx.fill();
        }
      }
      ctx.globalAlpha = 1; break;
    }
    case "Rings": {
      ctx.fillStyle = colors[0]; ctx.fillRect(0, 0, W, H);
      const cx = W * (0.3 + random() * 0.4), cy = H * (0.3 + random() * 0.4), count = 6 + Math.round(sc * 30), radius = Math.hypot(W, H);
      for (let i = count; i >= 1; i -= 1) {
        ctx.beginPath(); ctx.arc(cx, cy, radius * i / count * 0.8, 0, 7);
        ctx.fillStyle = colors[(i % (colors.length - 1)) + 1]; ctx.globalAlpha = 0.25 + 0.75 * (1 - i / count); ctx.fill();
      }
      ctx.globalAlpha = 1; break;
    }
    case "Stripes": {
      ctx.fillStyle = colors[0]; ctx.fillRect(0, 0, W, H);
      ctx.save(); ctx.translate(W / 2, H / 2); ctx.rotate(ang);
      const extent = Math.hypot(W, H), count = 4 + Math.round(sc * 30); let x = -extent / 2;
      while (x < extent / 2) { const stripeWidth = extent / count * (0.3 + random() * 1.4); ctx.fillStyle = colors[Math.floor(random() * colors.length)]; ctx.fillRect(x, -extent / 2, stripeWidth, extent); x += stripeWidth; }
      ctx.restore(); break;
    }
    case "Topo": {
      ctx.fillStyle = colors[0]; ctx.fillRect(0, 0, W, H);
      const grid = Math.max(6, Math.round(min / 90)), cols = Math.ceil(W / grid) + 1, rows = Math.ceil(H / grid) + 1;
      const frequency = 0.004 * 1080 / min, ox = random() * 100, oy = random() * 100;
      const value = (x, y) => { const u = x * frequency + ox, v = y * frequency + oy; return Math.sin(u * 1.3 + Math.sin(v * 0.9 + ox)) + Math.cos(v * 1.1 + Math.sin(u * 0.7 + oy)) + 0.5 * Math.sin((u + v) * 2.1); };
      const levels = 8 + Math.round(sc * 14); ctx.lineWidth = Math.max(1, min / 700);
      for (let level = 0; level < levels; level += 1) {
        const threshold = -2.3 + 4.6 * level / levels; ctx.strokeStyle = colors[1 + level % (colors.length - 1)]; ctx.globalAlpha = 0.8; ctx.beginPath();
        for (let j = 0; j < rows; j += 1) for (let i = 0; i < cols; i += 1) {
          const x = i * grid, y = j * grid, a = value(x, y) - threshold, b = value(x + grid, y) - threshold, c = value(x + grid, y + grid) - threshold, d = value(x, y + grid) - threshold;
          const index = (a > 0 ? 8 : 0) | (b > 0 ? 4 : 0) | (c > 0 ? 2 : 0) | (d > 0 ? 1 : 0);
          if (index === 0 || index === 15) continue;
          const lerp = (p, q) => p / (p - q), top = [x + grid * lerp(a, b), y], right = [x + grid, y + grid * lerp(b, c)], bottom = [x + grid * lerp(d, c), y + grid], left = [x, y + grid * lerp(a, d)];
          const segment = (p, q) => { ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); };
          switch (index) {
            case 1: case 14: segment(left, bottom); break; case 2: case 13: segment(bottom, right); break;
            case 3: case 12: segment(left, right); break; case 4: case 11: segment(top, right); break;
            case 5: segment(top, left); segment(bottom, right); break; case 6: case 9: segment(top, bottom); break;
            case 7: case 8: segment(top, left); break; case 10: segment(top, right); segment(left, bottom); break;
          }
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1; break;
    }
    default: break;
  }

  if (grain > 0) {
    const texture = document.createElement("canvas"); texture.width = 256; texture.height = 256;
    const textureCtx = texture.getContext("2d"); const image = textureCtx.createImageData(256, 256); const noise = seededRandom(seed + 7);
    for (let i = 0; i < image.data.length; i += 4) { const value = noise() * 255; image.data[i] = image.data[i + 1] = image.data[i + 2] = value; image.data[i + 3] = 255; }
    textureCtx.putImageData(image, 0, 0); ctx.save(); ctx.globalAlpha = (grain / 100) * 0.35; ctx.globalCompositeOperation = "overlay";
    ctx.fillStyle = ctx.createPattern(texture, "repeat"); ctx.fillRect(0, 0, W, H); ctx.restore();
  }
}

export default function BackgroundGenerator() {
  const canvasRef = useRef(null);
  const [mode, setMode] = useState("Mesh");
  const [colors, setColors] = useState(PALETTES[0]);
  const [seed, setSeed] = useState(0);
  const [size, setSize] = useState("1920x1080");
  const [customWidth, setCustomWidth] = useState(1920);
  const [customHeight, setCustomHeight] = useState(1080);
  const [scale, setScale] = useState(50);
  const [angle, setAngle] = useState(135);
  const [grain, setGrain] = useState(12);
  const [dimensions, setDimensions] = useState([1920, 1080]);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const [width, height] = getDimensions(size, customWidth, customHeight);
    const context = canvas.getContext("2d");
    drawBackground(context, canvas, { mode, colors, seed, scale, angle, grain, width, height });
    setDimensions([width, height]);
  }, [mode, colors, seed, size, customWidth, customHeight, scale, angle, grain]);

  useEffect(() => { setSeed(Math.floor(Math.random() * 1e6)); }, []);
  useEffect(() => { render(); }, [render]);

  function download(type, extension) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `background-${mode.toLowerCase()}-${seed}.${extension}`;
      link.click();
      URL.revokeObjectURL(url);
    }, type, 0.95);
  }

  const updateColor = (index, value) => setColors((current) => current.map((color, i) => i === index ? value : color));

  return (
    <div className="bg-generator">
      <aside className="bg-sidebar">
        <Link className="bg-back-link" href="/tools">← All tools</Link>
        <h1>Background generator</h1>
        <section><span className="bg-label">Style</span><div className="bg-modes">{MODES.map((item) => <button type="button" key={item} className={mode === item ? "on" : ""} onClick={() => setMode(item)}>{item}</button>)}</div></section>
        <section><span className="bg-label">Colors</span><div className="bg-swatches">{colors.map((color, i) => <input key={i} type="color" value={color} aria-label={`Color ${i + 1}`} onChange={(event) => updateColor(i, event.target.value)} />)}</div></section>
        <section><span className="bg-label">Palettes</span><div className="bg-palettes">{PALETTES.map((palette, i) => <button type="button" key={i} aria-label={`Apply palette ${i + 1}`} onClick={() => setColors(palette)}>{palette.map((color) => <i key={color} style={{ backgroundColor: color }} />)}</button>)}</div></section>
        <section>
          <label className="bg-label" htmlFor="bg-size">Size</label>
          <select id="bg-size" value={size} onChange={(event) => setSize(event.target.value)}>
            <option value="1920x1080">Desktop 1920 × 1080</option><option value="2560x1440">QHD 2560 × 1440</option><option value="3840x2160">4K 3840 × 2160</option><option value="1080x1920">Phone 1080 × 1920</option><option value="1080x1080">Square 1080 × 1080</option><option value="1500x500">Banner 1500 × 500</option><option value="custom">Custom…</option>
          </select>
          {size === "custom" && <div className="bg-row"><input type="number" min="100" max="6000" value={customWidth} aria-label="Width" onChange={(event) => setCustomWidth(event.target.value)} /><span>×</span><input type="number" min="100" max="6000" value={customHeight} aria-label="Height" onChange={(event) => setCustomHeight(event.target.value)} /></div>}
        </section>
        <section className="bg-sliders">
          <label className="bg-label" htmlFor="bg-scale">Scale <span>{scale}</span></label><input id="bg-scale" type="range" min="1" max="100" value={scale} onChange={(event) => setScale(Number(event.target.value))} />
          <label className="bg-label" htmlFor="bg-angle">Angle <span>{angle}°</span></label><input id="bg-angle" type="range" min="0" max="360" value={angle} onChange={(event) => setAngle(Number(event.target.value))} />
          <label className="bg-label" htmlFor="bg-grain">Grain <span>{grain}</span></label><input id="bg-grain" type="range" min="0" max="100" value={grain} onChange={(event) => setGrain(Number(event.target.value))} />
        </section>
        <section className="bg-actions"><button type="button" onClick={() => setSeed(Math.floor(Math.random() * 1e6))}>Shuffle</button><button type="button" onClick={() => setColors(randomPalette())}>Random colors</button></section>
        <section className="bg-actions"><button type="button" className="primary" onClick={() => download("image/png", "png")}>Download PNG</button><button type="button" onClick={() => download("image/jpeg", "jpg")}>JPG</button></section>
      </aside>
      <main className="bg-preview"><canvas ref={canvasRef} aria-label="Generated background preview" /><div className="bg-info">{dimensions[0]} × {dimensions[1]} px · seed {seed}</div></main>
    </div>
  );
}
