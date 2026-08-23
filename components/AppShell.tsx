"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon, Logo } from "@/components/Icon";

const links = [
  { href: "/", label: "Home" },
  { href: "/puzzles", label: "Puzzles" },
  { href: "/daily", label: "Daily" },
  { href: "/stats", label: "Stats" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-shell">
      <header className="border-b border-[var(--line)] bg-[var(--paper)]">
        <div className="page-width flex min-h-[76px] items-center justify-between gap-6">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            aria-label="Puzzie home"
          >
            <Logo />
          </Link>

          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Primary navigation"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-extrabold transition-colors hover:bg-[var(--mint)] ${isActive(pathname, link.href) ? "bg-[var(--surface)] text-[var(--ink)] shadow-[var(--shadow-small)]" : "text-[var(--ink-muted)]"}`}
                aria-current={
                  isActive(pathname, link.href) ? "page" : undefined
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/daily"
              className="header-daily button-primary min-h-[44px] px-4 text-sm"
            >
              <Icon name="flame" size={17} />
              Play daily
            </Link>
            <button
              className="mobile-menu-trigger button-quiet min-h-[44px] w-11 px-0"
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              <Icon name={mobileOpen ? "x" : "menu"} size={22} />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav
            className="menu-settle page-width grid gap-2 border-t border-[var(--line)] py-3 md:hidden"
            aria-label="Mobile navigation"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex min-h-12 items-center px-4 font-extrabold ${isActive(pathname, link.href) ? "bg-[var(--surface)]" : "text-[var(--ink-muted)]"}`}
                aria-current={
                  isActive(pathname, link.href) ? "page" : undefined
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
      <main id="main-content" key={pathname} className="route-settle">
        {children}
      </main>
      <footer className="page-width mt-16 flex flex-col gap-2 border-t border-[var(--line)] py-8 text-sm text-[var(--ink-muted)] sm:flex-row sm:items-center sm:justify-between">
        <span className="font-extrabold text-[var(--ink)]">puzzie</span>
        <span>A little puzzle for your brain.</span>
      </footer>
    </div>
  );
}
