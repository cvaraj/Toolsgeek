import Link from "next/link";
import SeoJsonLd from "../seo-jsonld";
import { SITE_URL } from "../seo";

export default function Breadcrumbs({ items }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${SITE_URL}${item.href}`,
    })),
  };
  return <>
    <SeoJsonLd data={data} />
    <nav className="breadcrumbs" aria-label="Breadcrumb"><ol>{items.map((item, index) => <li key={`${item.href}-${index}`}>{index > 0 && <span aria-hidden="true">/</span>}{index === items.length - 1 ? <span aria-current="page">{item.label}</span> : <Link href={item.href}>{item.label}</Link>}</li>)}</ol></nav>
  </>;
}
