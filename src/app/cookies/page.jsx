import Cookies from "@/views/Cookies";
import { pageMetadata } from "@/lib/pageMeta";

export const metadata = pageMetadata("/cookies");

export default function Page() {
  return <Cookies />;
}
