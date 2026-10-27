import Donate from "@/views/Donate";
import { pageMetadata } from "@/lib/pageMeta";

export const metadata = pageMetadata("/donate");

export default function Page() {
  return <Donate />;
}
