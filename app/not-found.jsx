import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
  description: "This page could not be found. Browse the ToolsGeek collection of free online tools.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <main className="site-shell not-found-page"><Link className="brand" href="/"><span className="brand-mark">t</span><span>toolsgeek<span className="brand-dot">.</span></span></Link><div><span className="eyebrow">404 · PAGE NOT FOUND</span><h1>Looks like this<br /><span>tool got away.</span></h1><p>That page isn’t here. Head back to the toolbox and find another useful tool.</p><Link className="button button-primary" href="/tools">Browse all tools <span aria-hidden="true">→</span></Link></div></main>;
}
