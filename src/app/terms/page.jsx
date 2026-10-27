import Terms from "@/views/Terms";
import { pageMetadata } from "@/lib/pageMeta";

export const metadata = pageMetadata("/terms");

export default function Page() {
  return <Terms />;
}
