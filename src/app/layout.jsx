import { Inter, JetBrains_Mono } from "next/font/google";
import AppShell from "@/components/AppShell";
import { SITE_NAME, SITE_SCHEMA, SITE_URL } from "@/lib/pageMeta";
import "@/index.css";

const sans = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: "Starlapse Solutions, Inc.", url: "https://www.starsolenterprise.com/" }],
  creator: "Starlapse Solutions, Inc.",
  publisher: "Starlapse Solutions, Inc.",
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${sans.variable} ${mono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_SCHEMA).replace(/</g, "\\u003c") }} />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
