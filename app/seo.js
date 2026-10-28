export const SITE_URL = "https://toolsgeek.online";
export const SITE_NAME = "ToolsGeek";

export function pageMetadata({ title, description, path, image = "/og/home", absoluteTitle = false }) {
  const url = new URL(path, SITE_URL).toString();
  const imageUrl = new URL(image, SITE_URL).toString();
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE_NAME,
      title,
      description,
      url,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: `${title} — ${SITE_NAME}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: imageUrl, alt: `${title} — ${SITE_NAME}` }],
    },
  };
}
