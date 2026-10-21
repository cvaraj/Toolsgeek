"use client";

import Link from "next/link";

export function ToolFrame({ tool, children }) {
  return <main className="site-shell workbench-shell">
    <header className="site-header"><Link className="brand" href="/" aria-label="ToolsGeek home"><span className="brand-mark">t</span><span>toolsgeek<span className="brand-dot">.</span></span></Link><nav className="site-nav" aria-label="Main navigation"><Link className="nav-link" href="/tools">All tools</Link><Link className="nav-cta" href="/tools">Browse tools <span aria-hidden="true">↗</span></Link></nav></header>
    <div className="workbench-back"><Link href="/tools">← All tools</Link><span>{tool.category.toUpperCase()}</span></div>
    <section className="workbench-heading"><h1>{tool.title}</h1><p>{tool.description}</p></section>
    <section className="workbench-panel">{children}</section>
    <footer className="site-footer"><Link className="brand" href="/"><span className="brand-mark">t</span><span>toolsgeek<span className="brand-dot">.</span></span></Link><span>Handy things for everyday things.</span><a className="footer-email" href="mailto:support@toolsgeek.online">support@toolsgeek.online</a><span>© 2026 ToolsGeek</span></footer>
  </main>;
}

export function Field({ label, hint, children }) {
  return <label className="tool-field"><span className="tool-field-label">{label}{hint && <small>{hint}</small>}</span>{children}</label>;
}

export function ToolButton({ children, onClick, disabled, secondary = false, type = "button" }) {
  return <button type={type} className={`tool-button${secondary ? " secondary" : ""}`} onClick={onClick} disabled={disabled}>{children}</button>;
}

export function CopyButton({ value, children = "Copy" }) {
  const copy = async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
  };
  return <ToolButton onClick={copy} disabled={!value}>{children}</ToolButton>;
}

export function downloadBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function Output({ children, className = "" }) {
  return <div className={`tool-output ${className}`}>{children}</div>;
}
