import "./site.css";
import { SITE_NAME, SITE_URL } from "./seo";

export const metadata = {
  title: {
    default: "Free Online Tools for Design, Images & Everyday Tasks",
    template: "%s | ToolsGeek",
  },
  applicationName: SITE_NAME,
  description: "Free browser-based tools for creating, converting, and getting everyday work done. No sign-up required.",
  metadataBase: new URL(SITE_URL),
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f5f0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-9500588134322363" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9500588134322363"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
