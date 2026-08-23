"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon, Logo } from "@/components/Icon";
import { Button } from "@/components/ui/button";

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
              <Button
                key={link.href}
                asChild
                variant="ghost"
                size="sm"
                className={
                  isActive(pathname, link.href)
                    ? "bg-[var(--surface)] text-[var(--ink)]"
                    : undefined
                }
              >
                <Link
                  href={link.href}
                  aria-current={
                    isActive(pathname, link.href) ? "page" : undefined
                  }
                >
                  {link.label}
                </Link>
              </Button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild className="header-daily min-h-11 px-4">
              <Link href="/daily">
                <Icon name="flame" size={17} />
                Play daily
              </Link>
            </Button>
            <Button
              className="mobile-menu-trigger"
              type="button"
              variant="ghost"
              size="icon"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              <Icon name={mobileOpen ? "x" : "menu"} size={22} />
            </Button>
          </div>
        </div>

        {mobileOpen && (
          <nav
            className="page-width grid gap-2 border-t border-[var(--line)] py-3 md:hidden"
            aria-label="Mobile navigation"
          >
            {links.map((link) => (
              <Button
                key={link.href}
                asChild
                variant="ghost"
                className={`justify-start ${isActive(pathname, link.href) ? "bg-[var(--surface)] text-[var(--ink)]" : ""}`}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={
                    isActive(pathname, link.href) ? "page" : undefined
                  }
                >
                  {link.label}
                </Link>
              </Button>
            ))}
          </nav>
        )}
      </header>
      <main id="main-content" key={pathname}>
        {children}
      </main>
      <footer className="page-width mt-16 flex flex-col gap-2 border-t border-[var(--line)] py-8 text-sm text-[var(--ink-muted)] sm:flex-row sm:items-center sm:justify-between">
        <span className="font-extrabold text-[var(--ink)]">puzzie</span>
        <span>A little puzzle for your brain.</span>
      </footer>
    </div>
  );
}
