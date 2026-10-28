import { permanentRedirect } from "next/navigation";

export default function LegacyBackgroundGeneratorPage() {
  permanentRedirect("/tools/background-generator");
}
