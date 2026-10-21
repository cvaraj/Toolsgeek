"use client";

import { useMemo, useState } from "react";
import { CopyButton, Field, ToolButton } from "./tool-ui";

export function WordCounter() {
  const [text, setText] = useState("");
  const stats = useMemo(() => {
    const words = text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) || [];
    const sentences = text.trim() ? (text.trim().match(/[^.!?]+[.!?]+|[^.!?]+$/g) || []).filter((s) => s.trim()).length : 0;
    const paragraphs = text.trim() ? text.trim().split(/\n\s*\n/).filter((part) => part.trim()).length : 0;
    return { words: words.length, characters: text.length, noSpaces: text.replace(/\s/g, "").length, sentences, paragraphs, reading: Math.max(1, Math.ceil(words.length / 200)) };
  }, [text]);
  return <><Field label="Paste or type your text"><textarea className="large-textarea" value={text} onChange={(e) => setText(e.target.value)} placeholder="Start typing or paste text here…" /></Field><div className="stat-grid">{[["Words", stats.words], ["Characters", stats.characters], ["No spaces", stats.noSpaces], ["Sentences", stats.sentences], ["Paragraphs", stats.paragraphs], ["Reading time", `${stats.reading} min`]].map(([label, value]) => <div className="stat-card" key={label}><span>{label}</span><b>{value}</b></div>)}</div><div className="tool-footer-line"><span>Reading time estimate: 200 words per minute.</span><ToolButton secondary onClick={() => setText("")} disabled={!text}>Clear text</ToolButton></div></>;
}

function convertCase(text, mode) {
  if (mode === "upper") return text.toLocaleUpperCase();
  if (mode === "lower") return text.toLocaleLowerCase();
  if (mode === "sentence") return text.toLocaleLowerCase().replace(/(^\s*\p{L}|[.!?]\s+\p{L})/gu, (match) => match.toLocaleUpperCase());
  if (mode === "title") return text.toLocaleLowerCase().replace(/(^|\s|[-'])\p{L}/gu, (match) => match.toLocaleUpperCase());
  const words = text.match(/[\p{L}\p{N}]+/gu) || [];
  if (mode === "camel") return words.map((word, i) => i === 0 ? word.toLocaleLowerCase() : word[0].toLocaleUpperCase() + word.slice(1).toLocaleLowerCase()).join("");
  if (mode === "snake") return words.map((word) => word.toLocaleLowerCase()).join("_");
  return text;
}
const CASES = [["sentence", "Sentence case"], ["title", "Title Case"], ["upper", "UPPERCASE"], ["lower", "lowercase"], ["camel", "camelCase"], ["snake", "snake_case"]];
export function CaseConverter() {
  const [text, setText] = useState(""); const [mode, setMode] = useState("sentence");
  const result = useMemo(() => convertCase(text, mode), [text, mode]);
  return <div className="tool-layout two-col"><Field label="Your text"><textarea className="large-textarea" value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste the text you want to convert…" /></Field><div className="tool-control-stack"><Field label="Convert to"><select value={mode} onChange={(e) => setMode(e.target.value)}>{CASES.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></Field><Field label="Converted text"><textarea className="large-textarea" readOnly value={result} placeholder="Your converted text appears here…" /></Field><CopyButton value={result}>Copy converted text</CopyButton></div></div>;
}

function diffLines(before, after) {
  const a = before ? before.split("\n") : [], b = after ? after.split("\n") : [], n = a.length, m = b.length;
  if (n * m > 1440000) return null;
  const width = m + 1, table = new Uint16Array((n + 1) * width);
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) table[i * width + j] = a[i] === b[j] ? table[(i + 1) * width + j + 1] + 1 : Math.max(table[(i + 1) * width + j], table[i * width + j + 1]);
  const rows = []; let i = 0, j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) { rows.push({ type: "same", text: a[i++] }); j++; }
    else if (table[(i + 1) * width + j] >= table[i * width + j + 1]) rows.push({ type: "removed", text: a[i++] });
    else rows.push({ type: "added", text: b[j++] });
  }
  while (i < n) rows.push({ type: "removed", text: a[i++] });
  while (j < m) rows.push({ type: "added", text: b[j++] });
  return rows;
}
export function TextDiffChecker() {
  const [left, setLeft] = useState(""); const [right, setRight] = useState("");
  const result = useMemo(() => left || right ? diffLines(left, right) : [], [left, right]);
  const added = result?.filter((row) => row.type === "added").length || 0, removed = result?.filter((row) => row.type === "removed").length || 0;
  return <><div className="tool-layout two-col"><Field label="Original text"><textarea className="large-textarea diff-input" value={left} onChange={(e) => setLeft(e.target.value)} placeholder="Paste the original version…" /></Field><Field label="Updated text"><textarea className="large-textarea diff-input" value={right} onChange={(e) => setRight(e.target.value)} placeholder="Paste the updated version…" /></Field></div><div className="diff-toolbar"><span>Line by line comparison</span>{result?.length > 0 && <b><i className="diff-added-count">+{added}</i> <i className="diff-removed-count">−{removed}</i></b>}</div><div className="diff-result" aria-live="polite">{result === null ? <p>These texts are too large for an in-browser comparison. Try comparing fewer lines at a time.</p> : result.length ? result.map((row, index) => <div className={`diff-row ${row.type}`} key={`${index}-${row.type}`}><span>{row.type === "added" ? "+" : row.type === "removed" ? "−" : " "}</span><code>{row.text || " "}</code></div>) : <div className="empty-preview">Add text to both boxes to compare line changes.</div>}</div></>;
}

const LOREM = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure dolor reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum".split(" ");
export function LoremIpsumGenerator() {
  const [amount, setAmount] = useState(3); const [unit, setUnit] = useState("paragraphs"); const [startLorem, setStartLorem] = useState(true); const [result, setResult] = useState("");
  const generate = () => {
    const count = Math.max(1, Math.min(100, Number(amount) || 1));
    if (unit === "words") { const starter = startLorem ? "Lorem ipsum dolor sit amet consectetur adipiscing elit".split(" ") : []; const words = Array.from({ length: Math.max(0, count - starter.length) }, (_, i) => LOREM[i % LOREM.length]); const output = [...starter.slice(0, count), ...words].slice(0, count); setResult(`${output.join(" ")}.`); return; }
    const sentence = () => Array.from({ length: 8 + Math.floor(Math.random() * 8) }, () => LOREM[Math.floor(Math.random() * LOREM.length)]).join(" ").replace(/^\w/, (c) => c.toUpperCase()) + ".";
    if (unit === "sentences") { const sentences = Array.from({ length: count }, sentence); if (startLorem) sentences[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."; setResult(sentences.join(" ")); }
    else setResult(Array.from({ length: count }, (_, i) => `${startLorem && i === 0 ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " : ""}${Array.from({ length: 4 }, sentence).join(" ")}`).join("\n\n"));
  };
  return <div className="tool-layout two-col"><div className="tool-control-stack"><Field label="Amount"><input type="number" min="1" max="100" value={amount} onChange={(e) => setAmount(e.target.value)} /></Field><Field label="Generate"><select value={unit} onChange={(e) => setUnit(e.target.value)}><option value="paragraphs">Paragraphs</option><option value="sentences">Sentences</option><option value="words">Words</option></select></Field><label className="check-row"><input type="checkbox" checked={startLorem} onChange={(e) => setStartLorem(e.target.checked)} /> Start with “Lorem ipsum...”</label><ToolButton onClick={generate}>Generate text</ToolButton></div><div className="tool-control-stack"><Field label="Generated placeholder text"><textarea className="large-textarea" value={result} readOnly placeholder="Your generated text will appear here…" /></Field><CopyButton value={result}>Copy text</CopyButton></div></div>;
}
