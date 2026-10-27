import Generator from "@/views/Generator";
import { pageMetadata } from "@/lib/pageMeta";

export const metadata = pageMetadata("/generator");

export default function Page() {
  return <Generator />;
}
