import Link from "next/link";

export default function HomePage() {
  return (
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
        <div className="hero-bottom"><span>BUILT FOR THE EVERYDAY</span><span className="hero-bottom-line" /><span>01 TOOL AND COUNTING</span></div>
      </section>

      <section className="intro-section">
        <div><div className="eyebrow">A BETTER KIND OF TOOLBOX</div><h2>Useful by design.<br /><span>Easy by nature.</span></h2></div>
        <p>We’re building a collection of focused, no-fuss tools to help you move from “I need a quick…” to “done.” Pick one, make something, get on with your day.</p>
      </section>

      <section className="featured-section">
        <div className="section-heading"><div><div className="eyebrow">YOUR TOOLBOX STARTS HERE</div><h2>Ready when you are.</h2></div><Link className="text-link" href="/tools">See all tools <span aria-hidden="true">→</span></Link></div>
        <Link className="featured-card" href="/tools">
          <div className="featured-visual"><span className="featured-badge">NOW AVAILABLE</span><div className="featured-preview"><div /><div /><div /><div /></div><span className="visual-word">MAKE<br />SOMETHING<br /><i>beautiful.</i></span><span className="preview-size">1920 × 1080</span></div>
          <div className="featured-info"><div><span className="tool-category">DESIGN · IMAGE</span><h3>Background Generator</h3><p>Create colorful, custom backgrounds in seconds. Tweak the look, pick your size, and download.</p></div><span className="round-arrow" aria-hidden="true">↗</span><div className="featured-meta"><span>Free to use</span><span>·</span><span>No account needed</span></div></div>
        </Link>
      </section>

      <footer className="site-footer"><Link className="brand" href="/"><span className="brand-mark">t</span><span>toolsgeek<span className="brand-dot">.</span></span></Link><span>Handy things for everyday things.</span><a className="footer-email" href="mailto:support@toolsgeek.online">support@toolsgeek.online</a><span>© 2026 ToolsGeek</span></footer>
    </main>
  );
}
