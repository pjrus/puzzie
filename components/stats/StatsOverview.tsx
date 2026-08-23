"use client";

import Link from "next/link";
import { Icon } from "@/components/Icon";
import { SectionHeading, StatCard, TypeGlyph } from "@/components/Ui";
import { statTypes } from "@/components/stats/shared";
import { useProgress } from "@/hooks/useProgress";
import { formatDuration } from "@/lib/storage";
import { puzzleTypeLabels, type PuzzleType } from "@/lib/types";

export function StatsOverview() {
  const { progress, hydrated } = useProgress();
  const history = progress.puzzleHistory;
  const averageScore = history.length
    ? Math.round(
        history.reduce((total, entry) => total + entry.score, 0) /
          history.length,
      )
    : 0;
  const averageTime = history.length
    ? Math.round(
        history.reduce((total, entry) => total + entry.timeSeconds, 0) /
          history.length,
      )
    : 0;
  const bestScore = history.length
    ? Math.max(...history.map((entry) => entry.score))
    : 0;
  const bestCategory = statTypes.reduce<PuzzleType | null>(
    (best, type) =>
      !best || progress.categoryStats[type] > progress.categoryStats[best]
        ? type
        : best,
    null,
  );
  const maxSolved = Math.max(
    1,
    ...statTypes.map((type) => progress.categoryStats[type]),
  );

  return (
    <div className="page-width pb-20 pt-10 lg:pt-16">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">Your brain ledger</p>
          <h1 className="mt-2 text-5xl font-semibold leading-[0.95]">
            Progress feels good.
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-8 text-[var(--ink-muted)]">
            A running tally of your little wins, kept right here on this device.
          </p>
        </div>
        <Link href="/puzzles" className="button-primary">
          Play another <Icon name="play" size={16} />
        </Link>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Puzzles solved"
          value={hydrated ? progress.puzzlesSolved : "—"}
          icon="check"
          accent="var(--surface)"
        />
        <StatCard
          label="Total score"
          value={hydrated ? progress.totalScore : "—"}
          icon="trophy"
          accent="var(--sun)"
        />
        <StatCard
          label="Current streak"
          value={hydrated ? `${progress.currentStreak} days` : "—"}
          icon="flame"
          accent="var(--mint)"
        />
        <StatCard
          label="Best single score"
          value={hydrated ? bestScore : "—"}
          icon="spark"
          accent="var(--lavender)"
        />
      </div>

      {!hydrated || progress.puzzlesSolved === 0 ? (
        <EmptyStats />
      ) : (
        <>
          <div className="mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <section className="surface-card p-6 sm:p-8">
              <SectionHeading eyebrow="At a glance" title="Your averages" />
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <Metric label="Average score" value={`${averageScore} pts`} />
                <Metric
                  label="Average time"
                  value={formatDuration(averageTime)}
                />
                <Metric
                  label="Best category"
                  value={bestCategory ? puzzleTypeLabels[bestCategory] : "—"}
                />
                <Metric
                  label="Best streak"
                  value={`${progress.bestStreak} days`}
                />
              </div>
            </section>
            <section className="surface-card p-6 sm:p-8">
              <SectionHeading eyebrow="By category" title="Where you shine" />
              <div className="mt-6 space-y-4">
                {statTypes
                  .filter((type) => progress.categoryStats[type] > 0)
                  .slice(0, 7)
                  .map((type) => (
                    <div key={type}>
                      <div className="mb-1.5 flex items-center justify-between gap-3 text-sm font-extrabold">
                        <span className="flex items-center gap-2">
                          <TypeGlyph type={type} size="sm" />
                          {puzzleTypeLabels[type]}
                        </span>
                        <span>{progress.categoryStats[type]}</span>
                      </div>
                      <div className="h-2 overflow-hidden bg-[var(--line)]">
                        <div
                          className="h-full bg-[var(--coral)]"
                          style={{
                            width: `${(progress.categoryStats[type] / maxSolved) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          </div>

          <div className="surface-card mt-8 flex flex-col justify-between gap-5 p-6 sm:flex-row sm:items-center">
            <div>
              <p className="eyebrow">The paper trail</p>
              <h2 className="mt-1 text-2xl font-semibold">
                Every result, in one place.
              </h2>
              <p className="mt-2 text-[var(--ink-muted)]">
                Review your completed puzzles, scores and solve times.
              </p>
            </div>
            <Link href="/stats/history" className="button-secondary">
              View history <Icon name="arrow-right" size={16} />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

function EmptyStats() {
  return (
    <div className="surface-card mt-8 grid gap-6 p-8 sm:grid-cols-[auto_1fr] sm:items-center">
      <div className="grid h-20 w-20 place-items-center rounded-3xl bg-[var(--coral)]">
        <Icon name="bar-chart" size={34} />
      </div>
      <div>
        <p className="eyebrow">No stats yet</p>
        <h2 className="mt-1 text-3xl font-semibold">
          Your first result is one puzzle away.
        </h2>
        <p className="mt-2 text-[var(--ink-muted)]">
          Solve something small and this page will start keeping score.
        </p>
        <Link href="/puzzles" className="button-secondary mt-5">
          Browse puzzles <Icon name="arrow-right" size={16} />
        </Link>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[var(--paper)] p-4">
      <p className="text-xs font-black uppercase tracking-[0.1em] text-[var(--ink-muted)]">
        {label}
      </p>
      <p className="display-font mt-1 text-xl font-semibold">{value}</p>
    </div>
  );
}
