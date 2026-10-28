import Link from "next/link";
import ToolDirectory from "./directory";
import SeoJsonLd from "../seo-jsonld";
import { SITE_URL, pageMetadata } from "../seo";
import { tools } from "./tool-catalog";
import SiteFooter from "../components/site-footer";

export const metadata = pageMetadata({
  title: "Free Online Tools for Design, Writing & Everyday Tasks",
  description: "Browse 25 free ToolsGeek utilities for design, PDF, image editing, writing, productivity, development, and everyday tasks. Search by name or category.",
  path: "/tools",
  image: "/og/tools",
});

export default function ToolsPage() {
  return (
    <>
    <SeoJsonLd data={{
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "ToolsGeek Online Tools",
      description: "Free browser tools for design, PDF, images, writing, productivity, development, and everyday tasks.",
      url: `${SITE_URL}/tools`,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: tools.map((tool, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: tool.title,
          url: `${SITE_URL}/tools/${tool.slug}`,
        })),
      },
    }} />
    <main className="site-shell tools-shell">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="ToolsGeek home"><span className="brand-mark">t</span><span>toolsgeek<span className="brand-dot">.</span></span></Link>
        <nav className="site-nav" aria-label="Main navigation"><Link className="nav-link" href="/">Home</Link><Link className="nav-cta" href="/tools">All tools <span aria-hidden="true">↗</span></Link></nav>
      </header>

      <section className="tools-heading">
        <div className="eyebrow"><span className="status-dot" /> THE TOOLSHELF</div>
        <h1>Find a tool.<br /><span>Find your flow.</span></h1>
        <p>A growing collection of helpful little things. Pick what you need and jump right in.</p>
        <div className="tools-count"><span>{tools.length}</span> BROWSER TOOLS <i /> FREE TO USE</div>
      </section>
      <ToolDirectory />

      <section className="coming-soon"><span className="coming-icon">✳</span><div><span className="eyebrow">THIS IS JUST THE BEGINNING</span><h2>More useful things<br />are on the way.</h2></div><span className="coming-note">We’re making room<br />in the toolbox.</span></section>
      <SiteFooter />
    </main>
    </>
  );
}
