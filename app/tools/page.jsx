import Link from "next/link";

export const metadata = {
  title: "All Tools",
  description: "Explore the free, useful tools available from ToolsGeek.",
};

export default function ToolsPage() {
  return (
    <main className="site-shell tools-shell">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="ToolsGeek home"><span className="brand-mark">t</span><span>toolsgeek<span className="brand-dot">.</span></span></Link>
        <nav className="site-nav" aria-label="Main navigation"><Link className="nav-link" href="/">Home</Link><Link className="nav-cta" href="/tools">All tools <span aria-hidden="true">↗</span></Link></nav>
      </header>

      <section className="tools-heading">
        <div className="eyebrow"><span className="status-dot" /> THE TOOLSHELF</div>
        <h1>Find a tool.<br /><span>Find your flow.</span></h1>
        <p>A growing collection of helpful little things. Pick what you need and jump right in.</p>
        <div className="tools-count"><span>01</span> TOOL AVAILABLE <i /> MORE ON THE WAY</div>
      </section>

      <section className="tools-grid-section" aria-labelledby="available-tools">
        <div className="section-heading tools-list-heading"><div><div className="eyebrow">MADE TO BE USEFUL</div><h2 id="available-tools">Available tools</h2></div><span className="results-count">01 TOOL</span></div>
        <Link className="tool-card" href="/background-generator">
          <div className="tool-card-art"><div className="tool-art-glow glow-a" /><div className="tool-art-glow glow-b" /><div className="tool-art-glow glow-c" /><span className="tool-art-label">YOUR NEXT BACKGROUND</span><span className="tool-art-size">1920 × 1080 <i /> PNG · JPG</span><span className="tool-art-stars">✳</span></div>
          <div className="tool-card-content"><div className="tool-card-top"><span className="tool-category">DESIGN · IMAGE</span><span className="tool-card-arrow" aria-hidden="true">↗</span></div><h3>Background Generator</h3><p>Make a background that feels like you. Mix colors, explore nine patterns, then download it in the size you need.</p><div className="tool-card-bottom"><span>Free to use</span><span className="tool-card-open">Open tool <span aria-hidden="true">→</span></span></div></div>
        </Link>
      </section>

      <section className="coming-soon"><span className="coming-icon">✳</span><div><span className="eyebrow">THIS IS JUST THE BEGINNING</span><h2>More useful things<br />are on the way.</h2></div><span className="coming-note">We’re making room<br />in the toolbox.</span></section>
      <footer className="site-footer"><Link className="brand" href="/"><span className="brand-mark">t</span><span>toolsgeek<span className="brand-dot">.</span></span></Link><span>Handy things for everyday things.</span><a className="footer-email" href="mailto:support@toolsgeek.online">support@toolsgeek.online</a><span>© 2026 ToolsGeek</span></footer>
    </main>
  );
}
