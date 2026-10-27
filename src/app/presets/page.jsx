import Presets from "@/views/Presets";
import { pageMetadata } from "@/lib/pageMeta";

export const metadata = pageMetadata("/presets");

export default function Page() {
  return <Presets />;
}
