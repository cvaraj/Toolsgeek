import Link from "next/link";
import SeoJsonLd from "./seo-jsonld";
import { SITE_NAME, SITE_URL, pageMetadata } from "./seo";
import { tools } from "./tools/tool-catalog";

const featuredTools = ["background-generator", "image-compressor", "pdf-merger-splitter"]
  .map((slug) => tools.find((tool) => tool.slug === slug))
  .filter(Boolean);

export const metadata = pageMetadata({
  title: "Free Online Tools for Design, PDF, Writing & Everyday Tasks",
  description: "Create, edit, and get things done with 25 free online tools from ToolsGeek for design, PDF, images, writing, productivity, and everyday tasks.",
  path: "/",
  image: "/og/home",
});

export default function HomePage() {
  return (
    <>
    <SeoJsonLd data={{
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "Organization", name: SITE_NAME, url: SITE_URL, email: "support@toolsgeek.online" },
        { "@type": "WebSite", name: SITE_NAME, url: SITE_URL, description: "Free browser-based tools for design, PDF, images, writing, productivity, and everyday tasks." },
      ],
    }} />
    <main className="site-shell">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="ToolsGeek home">
          <span className="brand-mark">t</span><span>toolsgeek<span className="brand-dot">.</span></span>
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          <Link className="nav-link" href="/tools">All tools</Link>
          <Link className="nav-cta" href="/tools">Explore tools <span aria-hidden="true">↗</span></Link>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" /> SMALL TOOLS. BIG HELP.</div>
          <h1>Make room for<br /><span>the good stuff.</span></h1>
          <p className="hero-description">Handy little tools that make everyday tasks feel a little easier. Free to use, right in your browser.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/tools">Find your tool <span aria-hidden="true">→</span></Link>
            <span className="hero-note">No sign-up. Just get things done.</span>
          </div>
          <div className="hero-proof"><div className="proof-avatars"><span>✦</span><span>✳</span><span>◒</span></div><span>A growing toolkit for curious minds</span></div>
        </div>
        <div className="hero-art" aria-label="Abstract colorful background preview" role="img">
          <div className="art-card art-card-back"><span>COLOR, YOUR WAY</span></div>
          <div className="art-card art-card-front"><span className="art-tag">01 / CREATE</span><div className="art-orb orb-one" /><div className="art-orb orb-two" /><div className="art-orb orb-three" /><div className="art-caption"><span>Start with a blank canvas.</span><b>Make it yours ↗</b></div></div>
          <div className="art-spark spark-one">✳</div><div className="art-spark spark-two">✦</div>
          <span className="art-index">TOOLS FOR YOUR NEXT<br />LITTLE BIG IDEA</span>
        </div>
          <div className="hero-bottom"><span>BUILT FOR THE EVERYDAY</span><span className="hero-bottom-line" /><span>{tools.length} TOOLS AND COUNTING</span></div>
      </section>

      <section className="intro-section">
        <div><div className="eyebrow">A BETTER KIND OF TOOLBOX</div><h2>Useful by design.<br /><span>Easy by nature.</span></h2></div>
        <p>We’re building a collection of focused, no-fuss tools to help you move from “I need a quick…” to “done.” Pick one, make something, get on with your day.</p>
      </section>

      <section className="featured-section">
        <div className="section-heading"><div><div className="eyebrow">A FEW USEFUL PLACES TO START</div><h2>Tools for your everyday.</h2></div><Link className="text-link" href="/tools">See all {tools.length} tools <span aria-hidden="true">→</span></Link></div>
        <div className="tools-card-grid home-tool-grid">
          {featuredTools.map((tool, index) => <Link className="tool-card" key={tool.slug} href={tool.slug === "background-generator" ? "/background-generator" : `/tools/${tool.slug}`}>
            <div className="tool-card-art" style={{ background: tool.accent }} aria-hidden="true"><span className="tool-art-label">{tool.category.toUpperCase()}</span><span className="tool-art-number">{String(index + 1).padStart(2, "0")}</span><span className="tool-art-symbol">{tool.category.startsWith("Image") || tool.category.startsWith("Design") ? "✳" : tool.category.startsWith("Text") ? "Aa" : tool.category.startsWith("Developer") ? "{ }" : "↗"}</span><span className="tool-art-caption">TOOLS GEEK <i>·</i> ONLINE TOOL</span></div>
            <div className="tool-card-content"><div className="tool-card-top"><span className="tool-category">{tool.category.toUpperCase()}</span><span className="tool-card-arrow" aria-hidden="true">↗</span></div><h3>{tool.title}</h3><p>{tool.description}</p><div className="tool-card-bottom"><span>Free · Runs in your browser</span><span className="tool-card-open">Open <span aria-hidden="true">→</span></span></div></div>
          </Link>)}
        </div>
      </section>

      <footer className="site-footer"><Link className="brand" href="/"><span className="brand-mark">t</span><span>toolsgeek<span className="brand-dot">.</span></span></Link><span>Handy things for everyday things.</span><a className="footer-email" href="mailto:support@toolsgeek.online">support@toolsgeek.online</a><span>© 2026 ToolsGeek</span></footer>
    </main>
    </>
  );
}
