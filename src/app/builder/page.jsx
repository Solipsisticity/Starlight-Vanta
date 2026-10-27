import Builder from "@/views/Builder";
import { pageMetadata } from "@/lib/pageMeta";

export const metadata = pageMetadata("/builder");

export default function Page() {
  return <Builder />;
}
