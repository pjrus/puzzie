import Link from "next/link";
import { Icon } from "@/components/Icon";
import type { PlayerResult } from "@/components/player/types";
import { formatDuration } from "@/lib/storage";
import type { Puzzle } from "@/lib/types";

export type CompletionCardProps = {
  result: PlayerResult;
  daily: boolean;
  nextPuzzle?: Puzzle;
};

export function CompletionCard({
  result,
  daily,
  nextPuzzle,
}: CompletionCardProps) {
  return (
    <div className="page-width-narrow pb-20 pt-10">
      <div className="flex items-center justify-between gap-4">
        <Link
          href={daily ? "/daily" : "/puzzles"}
          className="button-quiet px-0"
        >
          <Icon name="arrow-left" size={17} />
          Back to {daily ? "daily" : "puzzles"}
        </Link>
        <span className="text-sm font-extrabold text-[var(--ink-muted)]">
          {daily ? "Daily puzzle" : "Puzzle complete"}
        </span>
      </div>
      <div className="surface-card mt-8 overflow-hidden border-[var(--ink)] bg-[var(--ink)] p-7 text-[var(--surface)] sm:p-10">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center bg-[var(--mint)] text-[var(--ink)]">
            <Icon name="check" size={25} />
          </span>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#b6c7bc]">
              {daily ? "Daily puzzle complete" : "Puzzle complete"}
            </p>
            <h1 className="mt-1 text-4xl font-semibold sm:text-5xl">
              Nice work.
            </h1>
          </div>
        </div>
        <p className="mt-6 max-w-xl text-lg leading-8 text-[#d8e0da]">
          {daily
            ? "You showed up for your brain today. The next daily puzzle unlocks tomorrow."
            : "That answer landed. Take the win, then keep the good streak of curiosity going."}
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-4">
          <ResultStat
            label="Points"
            value={`+${result.score}`}
            accent="var(--coral)"
          />
          <ResultStat label="Time" value={formatDuration(result.timeSeconds)} />
          <ResultStat label="Attempts" value={result.attempts} />
          <ResultStat label="Hints" value={result.hintsUsed} />
        </div>
        {daily ? (
          <div className="mt-5 flex items-center gap-2 border border-[#4f655e] bg-[#2b3c38] p-4 font-extrabold">
            <Icon name="flame" size={19} className="text-[var(--sun)]" />
            {result.streak} day streak. Keep it going tomorrow.
          </div>
        ) : null}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={
              nextPuzzle && nextPuzzle.type !== "quickfire"
                ? `/play/${nextPuzzle.id}`
                : "/puzzles"
            }
            className="button-primary"
          >
            Next puzzle <Icon name="arrow-right" size={16} />
          </Link>
          <Link
            href="/stats"
            className="button-secondary border-[#71837c] text-[var(--surface)] hover:bg-[var(--surface)] hover:text-[var(--ink)]"
          >
            See my stats <Icon name="bar-chart" size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function FailedPuzzle({
  puzzle,
  daily,
}: {
  puzzle: Puzzle;
  daily: boolean;
}) {
  return (
    <div className="page-width-narrow pb-20 pt-10">
      <Link href={daily ? "/daily" : "/puzzles"} className="button-quiet px-0">
        <Icon name="arrow-left" size={17} />
        Back to {daily ? "daily" : "puzzles"}
      </Link>
      <div className="surface-card mt-8 border-[#e7bdb7] bg-[#fff1ed] p-7 sm:p-10">
        <p className="eyebrow">Almost there</p>
        <h1 className="mt-2 text-4xl font-semibold">That one got away.</h1>
        <p className="mt-3 max-w-lg text-[var(--ink-muted)]">
          No score this time, but the answer is still waiting for your next
          attempt. Give your brain a reset and try another puzzle.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href={`/play/${puzzle.id}`} className="button-primary">
            Try again <Icon name="refresh" size={16} />
          </Link>
          <Link href="/puzzles" className="button-secondary">
            Choose another
          </Link>
        </div>
      </div>
    </div>
  );
}

function ResultStat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent?: string;
}) {
  return (
    <div className="border border-[#4f655e] bg-[#2b3c38] p-4">
      <p className="text-xs font-black uppercase tracking-[0.1em] text-[#b6c7bc]">
        {label}
      </p>
      <p
        className="display-font mt-1 text-2xl font-semibold"
        style={accent ? { color: accent } : undefined}
      >
        {value}
      </p>
    </div>
  );
}

export function InvalidPuzzle() {
  return (
    <div className="page-width-narrow pb-20 pt-16">
      <div className="surface-card p-8 text-center">
        <p className="eyebrow">Puzzle fog</p>
        <h1 className="mt-2 text-4xl font-semibold">
          That puzzle wandered off.
        </h1>
        <p className="mt-3 text-[var(--ink-muted)]">
          Try another one and your brain will be back on track.
        </p>
        <Link href="/puzzles" className="button-primary mt-6">
          Browse puzzles <Icon name="arrow-right" size={16} />
        </Link>
      </div>
    </div>
  );
}
