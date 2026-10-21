"use client";

import { useEffect, useState } from "react";
import { CopyButton, Field, Output, ToolButton, downloadBlob } from "./tool-ui";

function useImageFile() {
  const [file, setFile] = useState(null); const [src, setSrc] = useState("");
  useEffect(() => () => { if (src) URL.revokeObjectURL(src); }, [src]);
  const choose = (next) => { if (next) { setSrc(URL.createObjectURL(next)); setFile(next); } };
  return { file, src, choose };
}
function FilePicker({ onSelect, accept = "image/*" }) {
  return <label className="file-drop"><span className="file-drop-icon">↥</span><b>Choose an image</b><span>JPG, PNG, or WebP · processed on your device</span><input type="file" accept={accept} onChange={(e) => onSelect(e.target.files?.[0])} /></label>;
}
function imageFromUrl(src) { return new Promise((resolve, reject) => { const image = new Image(); image.onload = () => resolve(image); image.onerror = reject; image.src = src; }); }
function formatBytes(bytes) { if (bytes < 1024) return `${bytes} B`; if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`; return `${(bytes / 1048576).toFixed(2)} MB`; }
function canvasBlob(canvas, type, quality) { return new Promise((resolve) => canvas.toBlob(resolve, type, quality)); }

export function ImageCompressor() {
  const { file, src, choose } = useImageFile(); const [quality, setQuality] = useState(78); const [format, setFormat] = useState("image/webp"); const [output, setOutput] = useState(null); const [busy, setBusy] = useState(false);
  useEffect(() => () => { if (output?.url) URL.revokeObjectURL(output.url); }, [output]);
  const compress = async () => {
    if (!file || !src) return;
    setBusy(true); setOutput(null);
    try { const image = await imageFromUrl(src); const canvas = document.createElement("canvas"); canvas.width = image.naturalWidth; canvas.height = image.naturalHeight; canvas.getContext("2d").drawImage(image, 0, 0); const blob = await canvasBlob(canvas, format, quality / 100); if (blob) setOutput({ blob, url: URL.createObjectURL(blob) }); }
    finally { setBusy(false); }
  };
  return <>
    <div className="tool-layout two-col">
      <div className="tool-control-stack"><FilePicker onSelect={choose} />{file && <Output><b>{file.name}</b><span>{formatBytes(file.size)} · {file.type || "image"}</span></Output>}
        <Field label="Output format"><select value={format} onChange={(e) => setFormat(e.target.value)}><option value="image/webp">WebP · smaller files</option><option value="image/jpeg">JPEG</option><option value="image/png">PNG · lossless</option></select></Field>
        {format !== "image/png" && <Field label="Quality" hint={`${quality}%`}><input type="range" min="10" max="100" value={quality} onChange={(e) => setQuality(+e.target.value)} /></Field>}
        <ToolButton onClick={compress} disabled={!file || busy}>{busy ? "Compressing…" : "Compress image"}</ToolButton>
        {output && <Output className="success-output"><b>{formatBytes(output.blob.size)}</b><span>{file.size > 0 ? (() => { const change = (1 - output.blob.size / file.size) * 100; return change >= 0 ? `${change.toFixed(1)}% smaller` : `${Math.abs(change).toFixed(1)}% larger`; })() : "Ready to download"}</span><a className="tool-button" href={output.url} download={`compressed-${file.name.replace(/\.[^.]+$/, "")}.${format.split("/")[1]}`}>Download image</a></Output>}
      </div>
      <div className="image-preview-panel">{src ? <img src={src} alt="Selected image preview" /> : <div className="empty-preview">Your image preview will appear here.</div>}</div>
    </div>
    <p className="privacy-note">Your image is processed locally in this browser. It is not uploaded.</p>
  </>;
}

const PRESETS = [
  ["Square post", 1080, 1080], ["Portrait post", 1080, 1350], ["Story / Reel", 1080, 1920], ["YouTube thumbnail", 1280, 720], ["Facebook cover", 1640, 924], ["LinkedIn cover", 1584, 396], ["Profile photo", 800, 800],
];
export function SocialImageResizer() {
  const { file, src, choose } = useImageFile(); const [preset, setPreset] = useState(0); const [fit, setFit] = useState("cover"); const [format, setFormat] = useState("image/png"); const [background, setBackground] = useState("#ffffff"); const [busy, setBusy] = useState(false);
  const resize = async () => {
    if (!src) return; setBusy(true);
    try {
      const image = await imageFromUrl(src), [, width, height] = PRESETS[preset], canvas = document.createElement("canvas"); canvas.width = width; canvas.height = height;
      const ctx = canvas.getContext("2d"); ctx.fillStyle = background; ctx.fillRect(0, 0, width, height);
      const factor = fit === "cover" ? Math.max(width / image.width, height / image.height) : Math.min(width / image.width, height / image.height);
      const drawW = image.width * factor, drawH = image.height * factor; ctx.drawImage(image, (width - drawW) / 2, (height - drawH) / 2, drawW, drawH);
      const blob = await canvasBlob(canvas, format, .92); if (blob) downloadBlob(blob, `toolsgeek-${PRESETS[preset][0].toLowerCase().replaceAll(" ", "-")}.${format === "image/png" ? "png" : "jpg"}`);
    } finally { setBusy(false); }
  };
  return <>
    <div className="tool-layout two-col"><div className="tool-control-stack"><FilePicker onSelect={choose} />
      <Field label="Target size"> <select value={preset} onChange={(e) => setPreset(+e.target.value)}>{PRESETS.map(([label, width, height], i) => <option key={label} value={i}>{label} · {width} × {height}</option>)}</select></Field>
      <Field label="Image fit"><select value={fit} onChange={(e) => setFit(e.target.value)}><option value="cover">Fill frame · crop edges</option><option value="contain">Fit whole image · add background</option></select></Field>
      <div className="tool-inline-fields"><Field label="Background"><input type="color" value={background} onChange={(e) => setBackground(e.target.value)} /></Field><Field label="Format"><select value={format} onChange={(e) => setFormat(e.target.value)}><option value="image/png">PNG</option><option value="image/jpeg">JPEG</option></select></Field></div>
      <ToolButton onClick={resize} disabled={!file || busy}>{busy ? "Resizing…" : "Resize & download"}</ToolButton>
    </div><div className="image-preview-panel">{src ? <img src={src} alt="Selected image preview" /> : <div className="empty-preview">Choose an image to preview the resize.</div>}<span className="image-dimensions">{file ? `${file.name} · ${PRESETS[preset][1]} × ${PRESETS[preset][2]} px output` : ""}</span></div></div>
    <p className="privacy-note">The resized file is created locally in your browser.</p>
  </>;
}

export function FaviconGenerator() {
  const { file, src, choose } = useImageFile(); const [background, setBackground] = useState("#ffffff"); const [transparent, setTransparent] = useState(true); const [busy, setBusy] = useState(false);
  const makeFavicon = async (size) => {
    if (!src) return; setBusy(true);
    try { const image = await imageFromUrl(src), canvas = document.createElement("canvas"); canvas.width = size; canvas.height = size; const ctx = canvas.getContext("2d"); if (!transparent) { ctx.fillStyle = background; ctx.fillRect(0, 0, size, size); } const factor = Math.max(size / image.width, size / image.height), w = image.width * factor, h = image.height * factor; ctx.drawImage(image, (size - w) / 2, (size - h) / 2, w, h); const blob = await canvasBlob(canvas, "image/png"); if (blob) downloadBlob(blob, `favicon-${size}.png`); }
    finally { setBusy(false); }
  };
  const snippet = '<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">\n<link rel="apple-touch-icon" href="/favicon-180.png">';
  return <><div className="tool-layout two-col"><div className="tool-control-stack"><FilePicker onSelect={choose} /><Field label="Fit image"><span className="field-help">Square crop, centered to fill each icon size.</span></Field><label className="check-row"><input type="checkbox" checked={transparent} onChange={(e) => setTransparent(e.target.checked)} /> Transparent background</label>{!transparent && <Field label="Background color"><input type="color" value={background} onChange={(e) => setBackground(e.target.value)} /></Field>}
      <div className="tool-actions">{[32, 180, 512].map((size) => <ToolButton key={size} onClick={() => makeFavicon(size)} disabled={!file || busy}>Download {size}px</ToolButton>)}</div><Field label="HTML snippet"><textarea readOnly rows={3} className="code-output" value={snippet} /></Field><CopyButton value={snippet}>Copy HTML</CopyButton>
    </div><div className="favicon-preview-panel">{src ? <><div className="favicon-preview-grid"><span className="favicon-size small"><img src={src} alt="Favicon preview at 32 pixels" /></span><span className="favicon-size large"><img src={src} alt="Favicon preview at 180 pixels" /></span></div><span>Preview · centered square crop</span></> : <div className="empty-preview">Upload a square logo or image to preview favicon sizes.</div>}</div></div><p className="privacy-note">PNG icons download individually. Add them to your website, then paste the provided link tags into your page head.</p></>;
}
