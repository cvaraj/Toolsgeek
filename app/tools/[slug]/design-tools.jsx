"use client";

import { useState } from "react";
import { CopyButton, Field, ToolButton } from "./tool-ui";

function hexToHsl(hex) {
  const rgb = hex.replace("#", "").match(/.{2}/g).map((x) => parseInt(x, 16) / 255);
  const max = Math.max(...rgb), min = Math.min(...rgb), delta = max - min;
  let h = 0; const l = (max + min) / 2; let s = 0;
  if (delta) { s = delta / (1 - Math.abs(2 * l - 1)); switch (max) { case rgb[0]: h = ((rgb[1] - rgb[2]) / delta) % 6; break; case rgb[1]: h = (rgb[2] - rgb[0]) / delta + 2; break; default: h = (rgb[0] - rgb[1]) / delta + 4; } h *= 60; if (h < 0) h += 360; }
  return [h, s, l];
}
function hslHex(h, s, l) {
  const a = s * Math.min(l, 1 - l), k = (n) => (n + h / 30) % 12;
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return `#${[f(0), f(8), f(4)].map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join("")}`;
}
function randomHex() { return `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")}`; }

export function GradientGenerator() {
  const [colors, setColors] = useState(["#73d4b2", "#9076de", "#f590a7"]);
  const [angle, setAngle] = useState(120);
  const css = `background: linear-gradient(${angle}deg, ${colors.join(", ")});`;
  const update = (i, value) => setColors((current) => current.map((color, index) => index === i ? value : color));
  return <>
    <div className="tool-layout two-col">
      <div className="tool-control-stack">
        <Field label="Gradient angle" hint={`${angle}°`}><input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(+e.target.value)} /></Field>
        <div className="tool-color-list"><span className="tool-field-label">Color stops</span>{colors.map((color, i) => <div className="tool-color-row" key={i}><input type="color" value={color} aria-label={`Gradient color ${i + 1}`} onChange={(e) => update(i, e.target.value)} /><code>{color}</code>{colors.length > 2 && <button className="icon-button" onClick={() => setColors((list) => list.filter((_, index) => index !== i))} aria-label={`Remove color ${i + 1}`}>×</button>}</div>)}</div>
        <div className="tool-actions"><ToolButton onClick={() => setColors((current) => current.length < 5 ? [...current, randomHex()] : current)} disabled={colors.length >= 5}>+ Add color</ToolButton><ToolButton secondary onClick={() => setColors([randomHex(), randomHex(), randomHex()])}>Randomize</ToolButton></div>
        <Field label="CSS code"><textarea className="code-output" readOnly value={css} rows={3} /></Field><CopyButton value={css}>Copy CSS</CopyButton>
      </div>
      <div className="tool-preview-wrap"><div className="gradient-live-preview" style={{ background: `linear-gradient(${angle}deg, ${colors.join(", ")})` }} /><div className="preview-caption">LIVE PREVIEW <span>{colors.length} COLOR STOPS</span></div></div>
    </div>
  </>;
}

function luminance(hex) {
  const channels = hex.replace("#", "").match(/.{2}/g).map((part) => parseInt(part, 16) / 255).map((value) => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  return .2126 * channels[0] + .7152 * channels[1] + .0722 * channels[2];
}
function contrast(hex) {
  const light = (1.05) / (luminance(hex) + .05), dark = (luminance(hex) + .05) / .05;
  return Math.max(light, dark).toFixed(1);
}

export function ColorPaletteGenerator() {
  const [locked, setLocked] = useState([false, false, false, false, false]);
  const [colors, setColors] = useState(() => [0, 1, 2, 3, 4].map((i) => hslHex((148 + i * 48) % 360, .54, [.28, .43, .58, .72, .86][i])));
  const randomize = () => {
    const anchor = locked.findIndex(Boolean);
    const nextHue = anchor >= 0 ? (hexToHsl(colors[anchor])[0] - anchor * 43 + 360) % 360 : Math.floor(Math.random() * 360);
    setColors((current) => current.map((color, i) => locked[i] ? color : hslHex((nextHue + i * 43 + Math.floor(Math.random() * 15)) % 360, .48 + Math.random() * .27, [.3, .42, .54, .68, .82][i])));
  };
  const paletteText = colors.join("\n");
  return <>
    <div className="palette-toolbar"><p>Lock colors you want to keep, then generate a fresh palette around them.</p><ToolButton onClick={randomize}>Generate palette ↻</ToolButton></div>
    <div className="palette-strip">{colors.map((color, i) => <div className="palette-swatch" style={{ background: color }} key={i}><button className={`lock-button${locked[i] ? " locked" : ""}`} aria-label={`${locked[i] ? "Unlock" : "Lock"} color ${color}`} onClick={() => setLocked((list) => list.map((v, index) => index === i ? !v : v))}>{locked[i] ? "●" : "○"}</button><input type="color" value={color} aria-label={`Palette color ${i + 1}`} onChange={(e) => setColors((list) => list.map((v, index) => index === i ? e.target.value : v))} /><code>{color.toUpperCase()}</code><small>Best contrast {contrast(color)}:1</small></div>)}</div>
    <div className="palette-footer"><div><b>Accessible text check</b><span>Each swatch shows the stronger black or white text contrast ratio.</span></div><CopyButton value={paletteText}>Copy palette</CopyButton></div>
  </>;
}
