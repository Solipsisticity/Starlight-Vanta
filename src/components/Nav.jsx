"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils";
import VantaMark from "./VantaMark";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/generator", label: "Generator" },
  { to: "/collections", label: "Collections" },
  { to: "/presets", label: "Presets" },
  { to: "/builder", label: "Builder" },
  { to: "/saved", label: "Saved" },
  { to: "/settings", label: "Settings" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (link) => (link.end ? pathname === link.to : pathname === link.to || pathname.startsWith(`${link.to}/`));

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4">
      <nav className="w-full max-w-5xl rounded-2xl border border-white/10 bg-black/50 px-4 py-2.5 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <VantaMark className="h-[18px] w-[18px]" />
            <span className="text-sm font-semibold tracking-tight text-white">Starlight Vanta</span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {LINKS.map((link) => (
              <Link
                key={link.to}
                href={link.to}
                aria-current={isActive(link) ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3 py-1.5 text-xs transition-colors duration-300",
                  isActive(link) ? "text-white" : "text-white/45 hover:text-white/80"
                )}
              >
                {isActive(link) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/[0.06]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/donate"
              className={cn(
                "hidden rounded-full border px-3.5 py-1.5 text-xs transition-colors duration-300 sm:inline-block",
                pathname === "/donate"
                  ? "border-violet-400/50 bg-violet-500/15 text-violet-100"
                  : "border-white/12 text-white/60 hover:border-white/25 hover:text-white"
              )}
            >
              Donate
            </Link>
            <Link
              href="/generator"
              className="rounded-full bg-violet-600 px-4 py-1.5 text-xs font-medium text-white transition-colors duration-300 hover:bg-violet-500"
            >
              Generate
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="rounded-full border border-white/10 p-1.5 text-white/60 lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="mt-3 grid grid-cols-2 gap-1 border-t border-white/10 pt-3 lg:hidden">
            {[...LINKS, { to: "/donate", label: "Donate" }].map((link) => (
              <Link
                key={link.to}
                href={link.to}
                onClick={() => setOpen(false)}
                aria-current={isActive(link) ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-2 text-xs transition-colors",
                  isActive(link) ? "bg-white/[0.06] text-white" : "text-white/50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
