import "./site.css";

export const metadata = {
  title: {
    default: "ToolsGeek — Useful tools, made simple",
    template: "%s | ToolsGeek",
  },
  description: "A growing collection of simple, useful tools for your everyday work.",
  metadataBase: new URL("https://teelsgeek.online"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
