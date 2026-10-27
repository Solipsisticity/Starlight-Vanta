import Saved from "@/views/Saved";
import { pageMetadata } from "@/lib/pageMeta";

export const metadata = pageMetadata("/saved");

export default function Page() {
  return <Saved />;
}
