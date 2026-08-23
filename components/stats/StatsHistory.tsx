"use client";

import Link from "next/link";
import { Icon } from "@/components/Icon";
import { TypeGlyph } from "@/components/Ui";
import { useProgress } from "@/hooks/useProgress";
import { formatDate, formatDuration } from "@/lib/storage";
import { puzzleTypeLabels } from "@/lib/types";

export function StatsHistory() {
  const { progress, hydrated } = useProgress();
  const history = progress.puzzleHistory;

  return (
    <div className="page-width pb-20 pt-10 lg:pt-16">
      <Link href="/stats" className="button-quiet px-0">
        <Icon name="arrow-left" size={17} />
        Stats overview
      </Link>
      <header className="mt-8 max-w-3xl">
        <p className="eyebrow">The paper trail</p>
        <h1 className="mt-2 text-5xl font-semibold leading-[0.95] sm:text-6xl">
          Puzzle history.
        </h1>
        <p className="mt-4 text-lg leading-8 text-[var(--ink-muted)]">
          Your completed puzzles, newest first. Results are stored on this
          device.
        </p>
      </header>

      <div className="surface-card mt-8 overflow-hidden" aria-live="polite">
        {!hydrated ? (
          <p className="p-6 text-[var(--ink-muted)]">Loading results…</p>
        ) : history.length === 0 ? (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-semibold">No results yet.</h2>
            <p className="mt-2 text-[var(--ink-muted)]">
              Complete a puzzle and it will appear here.
            </p>
            <Link href="/puzzles" className="button-primary mt-6">
              Browse puzzles <Icon name="arrow-right" size={16} />
            </Link>
          </div>
        ) : (
          history.map((entry, index) => (
            <article
              key={`${entry.id}-${entry.completedAt}`}
              className={`flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 ${
                index > 0 ? "border-t border-[var(--line)]" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <TypeGlyph type={entry.type} size="sm" />
                <div>
                  <h2 className="font-extrabold">{entry.title}</h2>
                  <p className="text-xs font-bold text-[var(--ink-muted)]">
                    {puzzleTypeLabels[entry.type]} ·{" "}
                    {formatDate(entry.completedAt.slice(0, 10))}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5 text-sm">
                <span className="font-extrabold text-[var(--ink-muted)]">
                  {formatDuration(entry.timeSeconds)}
                </span>
                <span className="display-font text-xl font-semibold text-[var(--coral-dark)]">
                  +{entry.score}
                </span>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
