import Link from "next/link";
import SeoJsonLd from "./seo-jsonld";
import { SITE_NAME, SITE_URL, pageMetadata } from "./seo";
import { tools } from "./tools/tool-catalog";
import SiteFooter from "./components/site-footer";

const featuredTools = ["background-generator", "image-compressor", "pdf-merger-splitter"]
  .map((slug) => tools.find((tool) => tool.slug === slug))
  .filter(Boolean);

export const metadata = pageMetadata({
  title: "ToolsGeek - Free Online Image, PDF & Writing Tools",
  description: "Use free browser tools to compress images, work with PDFs, write, convert data, and plan your day. No account needed; supported files stay on your device.",
  path: "/",
  image: "/og/home",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
    <SeoJsonLd data={{
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "Organization", name: SITE_NAME, url: SITE_URL, logo: `${SITE_URL}/icon.svg`, contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: "support@toolsgeek.online" } },
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
          {featuredTools.map((tool, index) => <Link className="tool-card" key={tool.slug} href={`/tools/${tool.slug}`}>
            <div className="tool-card-art" style={{ background: tool.accent }} aria-hidden="true"><span className="tool-art-label">{tool.category.toUpperCase()}</span><span className="tool-art-number">{String(index + 1).padStart(2, "0")}</span><span className="tool-art-symbol">{tool.category.startsWith("Image") || tool.category.startsWith("Design") ? "✳" : tool.category.startsWith("Text") ? "Aa" : tool.category.startsWith("Developer") ? "{ }" : "↗"}</span><span className="tool-art-caption">TOOLS GEEK <i>·</i> ONLINE TOOL</span></div>
            <div className="tool-card-content"><div className="tool-card-top"><span className="tool-category">{tool.category.toUpperCase()}</span><span className="tool-card-arrow" aria-hidden="true">↗</span></div><h3>{tool.title}</h3><p>{tool.description}</p><div className="tool-card-bottom"><span>Free · Runs in your browser</span><span className="tool-card-open">Open <span aria-hidden="true">→</span></span></div></div>
          </Link>)}
        </div>
      </section>

      <section className="home-category-section"><div className="eyebrow">BROWSE BY WHAT YOU NEED</div><h2>One toolbox, a few kinds of help.</h2><p>Find the right starting point, then open the tool that fits the task.</p><div className="home-category-grid">
        <article><h3>Design</h3><p>Create backgrounds, gradients, and palettes for a visual project.</p><a href="/tools#group-design">Explore design tools →</a></article>
        <article><h3>Images & PDFs</h3><p>Resize, crop, compress, and convert files locally in your browser.</p><a href="/tools#group-image">Explore image tools →</a></article>
        <article><h3>Writing & text</h3><p>Count, convert, compare, and draft text with focused writing utilities.</p><a href="/tools#group-text">Explore text tools →</a></article>
        <article><h3>Everyday & productivity</h3><p>Plan time, calculate dates, split a bill, and keep daily tasks moving.</p><a href="/tools#group-everyday">Explore everyday tools →</a></article>
        <article><h3>Developer</h3><p>Format and validate JSON quickly without sending data elsewhere.</p><a href="/tools#group-developer">Explore developer tools →</a></article>
      </div></section>
      <section className="home-why-section"><div><div className="eyebrow">WHY TOOLSGEEK</div><h2>Useful, simple, and private by design.</h2></div><ul><li><strong>Free to use</strong><span>Open a tool and get started without creating an account.</span></li><li><strong>Runs in your browser</strong><span>Supported file processing happens on your device rather than through a file upload.</span></li><li><strong>Focused controls</strong><span>Each page is made for one small job, with clear settings and downloadable results.</span></li></ul></section>
      <section className="home-faq-section"><div className="eyebrow">COMMON QUESTIONS</div><h2>A few quick answers.</h2><details><summary>Do I need to sign up to use ToolsGeek?</summary><p>No account is required for the tools currently available on the site.</p></details><details><summary>Are my files uploaded?</summary><p>Tools that process files do that work in your browser. Files you select are not uploaded to ToolsGeek.</p></details><details><summary>Does every tool work the same way?</summary><p>Each tool has its own controls, supported formats, and limitations. Read the tool page before using the result in an important workflow.</p></details></section>
      <SiteFooter />
    </main>
    </>
  );
}
