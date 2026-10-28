import Link from "next/link";

const links = [
  ["About", "/about"],
  ["Contact", "/contact"],
  ["Privacy Policy", "/privacy-policy"],
  ["Terms", "/terms"],
  ["All tools", "/tools"],
  ["Sitemap", "/sitemap.xml"],
];

export default function SiteFooter() {
  return <footer className="site-footer site-footer-expanded">
    <Link className="brand" href="/" aria-label="ToolsGeek home"><span className="brand-mark">t</span><span>toolsgeek<span className="brand-dot">.</span></span></Link>
    <span>Handy things for everyday things.</span>
    <nav className="footer-links" aria-label="Footer navigation">{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav>
    <a className="footer-email" href="mailto:support@toolsgeek.online">support@toolsgeek.online</a>
    <span>© 2026 ToolsGeek</span>
  </footer>;
}
