import Settings from "@/views/Settings";
import { pageMetadata } from "@/lib/pageMeta";

export const metadata = pageMetadata("/settings");

export default function Page() {
  return <Settings />;
}
