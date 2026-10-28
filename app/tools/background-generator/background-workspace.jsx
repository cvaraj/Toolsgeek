"use client";

import dynamic from "next/dynamic";

const BackgroundGenerator = dynamic(() => import("../../background-generator/background-generator"), {
  loading: () => <div className="tool-loading" role="status">Preparing background canvas…</div>,
});

export default function BackgroundWorkspace() {
  return <BackgroundGenerator />;
}
