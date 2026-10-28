"use client";

import dynamic from "next/dynamic";

const GradientGenerator = dynamic(() => import("./design-tools").then((module) => module.GradientGenerator), { loading: () => <div className="tool-loading" role="status">Preparing this tool…</div> });
const ColorPaletteGenerator = dynamic(() => import("./design-tools").then((module) => module.ColorPaletteGenerator), { loading: () => <div className="tool-loading" role="status">Preparing this tool…</div> });
const ImageCompressor = dynamic(() => import("./image-tools").then((module) => module.ImageCompressor), { loading: () => <div className="tool-loading" role="status">Preparing this tool…</div> });
const SocialImageResizer = dynamic(() => import("./image-tools").then((module) => module.SocialImageResizer), { loading: () => <div className="tool-loading" role="status">Preparing this tool…</div> });
const FaviconGenerator = dynamic(() => import("./image-tools").then((module) => module.FaviconGenerator), { loading: () => <div className="tool-loading" role="status">Preparing this tool…</div> });
const WordCounter = dynamic(() => import("./text-tools").then((module) => module.WordCounter), { loading: () => <div className="tool-loading" role="status">Preparing this tool…</div> });
const CaseConverter = dynamic(() => import("./text-tools").then((module) => module.CaseConverter), { loading: () => <div className="tool-loading" role="status">Preparing this tool…</div> });
const TextDiffChecker = dynamic(() => import("./text-tools").then((module) => module.TextDiffChecker), { loading: () => <div className="tool-loading" role="status">Preparing this tool…</div> });
const LoremIpsumGenerator = dynamic(() => import("./text-tools").then((module) => module.LoremIpsumGenerator), { loading: () => <div className="tool-loading" role="status">Preparing this tool…</div> });
const QRCodeGenerator = dynamic(() => import("./everyday-tools").then((module) => module.QRCodeGenerator), { loading: () => <div className="tool-loading" role="status">Preparing this tool…</div> });
const UnitConverter = dynamic(() => import("./everyday-tools").then((module) => module.UnitConverter), { loading: () => <div className="tool-loading" role="status">Preparing this tool…</div> });
const TimeZonePlanner = dynamic(() => import("./everyday-tools").then((module) => module.TimeZonePlanner), { loading: () => <div className="tool-loading" role="status">Preparing this tool…</div> });
const JSONFormatter = dynamic(() => import("./everyday-tools").then((module) => module.JSONFormatter), { loading: () => <div className="tool-loading" role="status">Preparing this tool…</div> });
const PasswordGenerator = dynamic(() => import("./everyday-tools").then((module) => module.PasswordGenerator), { loading: () => <div className="tool-loading" role="status">Preparing this tool…</div> });
const ImagePdfConverter = dynamic(() => import("./pdf-tools").then((module) => module.ImagePdfConverter), { loading: () => <div className="tool-loading" role="status">Preparing this tool…</div> });
const PdfMergerSplitter = dynamic(() => import("./pdf-tools").then((module) => module.PdfMergerSplitter), { loading: () => <div className="tool-loading" role="status">Preparing this tool…</div> });
const MarkdownEditor = dynamic(() => import("./daily-tools").then((module) => module.MarkdownEditor), { loading: () => <div className="tool-loading" role="status">Preparing this tool…</div> });
const CsvViewer = dynamic(() => import("./daily-tools").then((module) => module.CsvViewer), { loading: () => <div className="tool-loading" role="status">Preparing this tool…</div> });
const DateCalculator = dynamic(() => import("./daily-tools").then((module) => module.DateCalculator), { loading: () => <div className="tool-loading" role="status">Preparing this tool…</div> });
const PomodoroTimer = dynamic(() => import("./daily-tools").then((module) => module.PomodoroTimer), { loading: () => <div className="tool-loading" role="status">Preparing this tool…</div> });
const DailyChecklist = dynamic(() => import("./daily-tools").then((module) => module.DailyChecklist), { loading: () => <div className="tool-loading" role="status">Preparing this tool…</div> });
const BillSplitter = dynamic(() => import("./daily-tools").then((module) => module.BillSplitter), { loading: () => <div className="tool-loading" role="status">Preparing this tool…</div> });
const TypingSpeedTest = dynamic(() => import("./daily-tools").then((module) => module.TypingSpeedTest), { loading: () => <div className="tool-loading" role="status">Preparing this tool…</div> });
const ImageCropper = dynamic(() => import("./daily-tools").then((module) => module.ImageCropper), { loading: () => <div className="tool-loading" role="status">Preparing this tool…</div> });

const VIEWS = {
  "gradient-generator": GradientGenerator,
  "color-palette-generator": ColorPaletteGenerator,
  "image-compressor": ImageCompressor,
  "social-image-resizer": SocialImageResizer,
  "favicon-generator": FaviconGenerator,
  "word-counter": WordCounter,
  "case-converter": CaseConverter,
  "text-diff-checker": TextDiffChecker,
  "lorem-ipsum-generator": LoremIpsumGenerator,
  "qr-code-generator": QRCodeGenerator,
  "unit-converter": UnitConverter,
  "time-zone-planner": TimeZonePlanner,
  "json-formatter": JSONFormatter,
  "password-generator": PasswordGenerator,
  "image-pdf-converter": ImagePdfConverter,
  "pdf-merger-splitter": PdfMergerSplitter,
  "markdown-editor": MarkdownEditor,
  "csv-viewer": CsvViewer,
  "date-calculator": DateCalculator,
  "pomodoro-timer": PomodoroTimer,
  "daily-checklist": DailyChecklist,
  "bill-splitter": BillSplitter,
  "typing-speed-test": TypingSpeedTest,
  "image-cropper": ImageCropper,
};

export default function ToolWorkspace({ tool }) {
  const View = VIEWS[tool.slug];
  return View ? <View /> : null;
}
