import Privacy from "@/views/Privacy";
import { pageMetadata } from "@/lib/pageMeta";

export const metadata = pageMetadata("/privacy");

export default function Page() {
  return <Privacy />;
}
