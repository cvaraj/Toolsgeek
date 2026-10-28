"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { tools } from "./tool-catalog";

const categories = ["All", "Design", "Image", "Text", "PDF", "Everyday", "Productivity", "Developer"];
const categoryDescriptions = {
  Design: "Build visual assets, color systems, and reusable web styles.",
  Image: "Prepare pictures for websites, social posts, and documents.",
  Text: "Write, transform, compare, and prototype with text tools.",
  PDF: "Convert documents or organize pages without uploading files.",
  Everyday: "Handle quick calculations, sharing, data, and planning tasks.",
  Productivity: "Keep a focus session or a short daily task list moving.",
  Developer: "Format and inspect common data used in software projects.",
};

export default function ToolDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const visibleTools = useMemo(() => tools.filter((tool) => {
    const matchesCategory = category === "All" || tool.category.startsWith(category);
    const searchText = `${tool.title} ${tool.description} ${tool.category}`.toLowerCase();
    return matchesCategory && searchText.includes(query.trim().toLowerCase());
  }), [category, query]);
  const groups = useMemo(() => {
    const grouped = new Map();
    visibleTools.forEach((tool) => {
      const group = tool.category.split(" · ")[0];
      if (!grouped.has(group)) grouped.set(group, []);
      grouped.get(group).push(tool);
    });
    return [...grouped.entries()];
  }, [visibleTools]);

  return (
    <section className="tools-grid-section" aria-labelledby="available-tools">
      <p className="tools-intro-copy">ToolsGeek brings small browser-based utilities together for the practical jobs that interrupt a day: resize or compress an image, prepare a PDF, clean up writing, compare time zones, and more. Choose a category or search by the task you want to finish. Tools that process selected files work locally in your browser, so those files are not uploaded to ToolsGeek.</p>
      <div className="section-heading tools-list-heading">
        <div><div className="eyebrow">MADE TO BE USEFUL</div><h2 id="available-tools">Available tools</h2></div>
        <span className="results-count">{visibleTools.length.toString().padStart(2, "0")} TOOLS</span>
      </div>
      <div className="directory-controls">
        <label className="directory-search"><span aria-hidden="true">⌕</span><input type="search" placeholder="Search tools..." aria-label="Search tools" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
        <div className="category-filters" aria-label="Filter by category">{categories.map((item) => <button type="button" key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div>
      </div>
      {visibleTools.length ? <div className="directory-groups">{groups.map(([group, groupTools]) => <section className="directory-group" key={group} aria-labelledby={`group-${group.toLowerCase()}`}>
        <div className="directory-group-heading"><h3 id={`group-${group.toLowerCase()}`}>{group} tools</h3><p>{categoryDescriptions[group]}</p></div>
        <div className="tools-card-grid">{groupTools.map((tool, index) => <Link className="tool-card" key={tool.slug} href={`/tools/${tool.slug}`}>
          <div className="tool-card-art" style={{ background: tool.accent }}><span className="tool-art-label">{tool.category.toUpperCase()}</span><span className="tool-art-number">{String(index + 1).padStart(2, "0")}</span><span className="tool-art-symbol" aria-hidden="true">{tool.category.startsWith("Image") || tool.category.startsWith("Design") ? "✳" : tool.category.startsWith("Text") ? "Aa" : tool.category.startsWith("Developer") ? "{ }" : "↗"}</span><span className="tool-art-caption">TOOLS GEEK <i>·</i> ONLINE TOOL</span></div>
          <div className="tool-card-content"><div className="tool-card-top"><span className="tool-category">{tool.category.toUpperCase()}</span><span className="tool-card-arrow" aria-hidden="true">↗</span></div><h4>{tool.title}</h4><p>{tool.description}</p><div className="tool-card-bottom"><span>Free · Runs in your browser</span><span className="tool-card-open">Open <span aria-hidden="true">→</span></span></div></div>
        </Link>)}</div>
      </section>)}</div> : <div className="directory-empty"><span>⌕</span><h3>No tools found</h3><p>Try another search or choose a different category.</p><button type="button" onClick={() => { setQuery(""); setCategory("All"); }}>Clear filters</button></div>}
    </section>
  );
}
