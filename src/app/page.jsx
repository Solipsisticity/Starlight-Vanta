import Home from "@/views/Home";
import { pageMetadata } from "@/lib/pageMeta";

export const metadata = pageMetadata("/");

export default function Page() {
  return <Home />;
}
