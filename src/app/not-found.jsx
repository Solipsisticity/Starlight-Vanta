import NotFound from "@/views/NotFound";
import { pageMetadata } from "@/lib/pageMeta";

export const metadata = pageMetadata("/404");

export default function PageNotFound() {
  return <NotFound />;
}
