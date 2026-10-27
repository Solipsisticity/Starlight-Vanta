import Collections from "@/views/Collections";
import { pageMetadata } from "@/lib/pageMeta";

export const metadata = pageMetadata("/collections");

export default function Page() {
  return <Collections />;
}
