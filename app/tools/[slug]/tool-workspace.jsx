"use client";

import { ToolFrame } from "./tool-ui";
import { GradientGenerator, ColorPaletteGenerator } from "./design-tools";
import { ImageCompressor, SocialImageResizer, FaviconGenerator } from "./image-tools";
import { WordCounter, CaseConverter, TextDiffChecker, LoremIpsumGenerator } from "./text-tools";
import { QRCodeGenerator, UnitConverter, TimeZonePlanner, JSONFormatter, PasswordGenerator } from "./everyday-tools";
import { ImagePdfConverter, PdfMergerSplitter, MarkdownEditor, CsvViewer, DateCalculator, PomodoroTimer, DailyChecklist, BillSplitter, TypingSpeedTest, ImageCropper } from "./daily-tools";

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
  if (!View) return null;
  return <ToolFrame tool={tool}><View /></ToolFrame>;
}
