import BackgroundGenerator from "./background-generator";
import SeoJsonLd from "../seo-jsonld";
import { SITE_URL, pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "Free Background Generator — Custom Wallpapers & Patterns",
  description: "Create custom backgrounds in nine styles. Choose colors, size, scale, angle, and grain, then download your design as a PNG or JPG.",
  path: "/background-generator",
  image: "/og/background-generator",
});

export default function BackgroundGeneratorPage() {
  return <><SeoJsonLd data={{
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Background Generator",
    description: "Create and download custom gradient and pattern backgrounds in your browser.",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    url: `${SITE_URL}/background-generator`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  }} /><BackgroundGenerator /></>;
}
