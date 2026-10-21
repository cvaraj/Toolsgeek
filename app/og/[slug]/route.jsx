import { ImageResponse } from "next/og";
import { toolBySlug } from "../../tools/tool-catalog";

export const runtime = "edge";
export const alt = "ToolsGeek online tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function GET(_request, { params }) {
  const { slug } = await params;
  const tool = toolBySlug[slug];
  const titles = {
    home: "Useful tools. Made simple.",
    tools: "Find a tool. Find your flow.",
    "background-generator": "Create your own background.",
  };
  const title = titles[slug] || tool?.title || "Free online tools";
  const description = slug === "home"
    ? "Free browser tools for design, images, writing, and everyday tasks."
    : slug === "tools"
      ? "A growing collection of helpful little things."
      : tool?.description || "Handy tools for everyday things.";
  const category = tool?.category?.toUpperCase() || "TOOLS FOR EVERYDAY WORK";

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "62px 72px", color: "#f6f5f0", background: "radial-gradient(circle at 90% 43%, #9dda6a33 0, transparent 27%), linear-gradient(125deg, #14251f 0%, #244532 58%, #496b3c 100%)", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 25, fontWeight: 700 }}><div style={{ width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 13, background: "#b8f36b", color: "#18231f", fontSize: 30, fontWeight: 800 }}>t</div>toolsgeek</div>
        <div style={{ color: "#c9d1bd", fontSize: 13, letterSpacing: 2 }}>TOOLSGEEK.ONLINE</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 990 }}>
        <div style={{ marginBottom: 20, color: "#c2ed8c", fontSize: 15, letterSpacing: 3 }}>{category}</div>
        <div style={{ fontSize: title.length > 38 ? 57 : 72, fontWeight: 700, letterSpacing: -3, lineHeight: 1.04 }}>{title}</div>
        <div style={{ maxWidth: 840, marginTop: 22, color: "#d1d9ce", fontSize: 23, lineHeight: 1.45 }}>{description}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "#c9d1bd", fontSize: 14, letterSpacing: 1.5 }}><span>FREE · PRIVATE · IN YOUR BROWSER</span><span style={{ color: "#b8f36b" }}>TOOLS GEEK ↗</span></div>
    </div>,
    { ...size },
  );
}
