import Link from "next/link";
import Breadcrumbs from "./breadcrumbs";
import SiteFooter from "./site-footer";

export default function TrustPage({ title, path, eyebrow = "TOOLS GEEK", children }) {
  return <main className="site-shell trust-shell">
    <header className="site-header"><Link className="brand" href="/" aria-label="ToolsGeek home"><span className="brand-mark">t</span><span>toolsgeek<span className="brand-dot">.</span></span></Link><nav className="site-nav" aria-label="Main navigation"><Link className="nav-link" href="/tools">All tools</Link><Link className="nav-cta" href="/tools">Browse tools <span aria-hidden="true">↗</span></Link></nav></header>
    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title, href: path }]} />
    <section className="trust-content"><div className="eyebrow"><span className="status-dot" /> {eyebrow}</div><h1>{title}</h1><div className="trust-prose">{children}</div></section>
    <SiteFooter />
  </main>;
}
