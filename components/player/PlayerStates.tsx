import Link from "next/link";
import { Icon } from "@/components/Icon";
import type { PlayerResult } from "@/components/player/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
        <Button asChild variant="ghost" className="px-0">
          <Link href={daily ? "/daily" : "/puzzles"}>
            <Icon name="arrow-left" size={17} />
            Back to {daily ? "daily" : "puzzles"}
          </Link>
        </Button>
        <span className="text-sm font-extrabold text-(--ink-muted)">
          {daily ? "Daily puzzle" : "Puzzle complete"}
        </span>
      </div>
      <Card
        tone="dark"
        className="completion-card mt-8 overflow-hidden border-(--ink) p-7 sm:p-10"
      >
        <div className="flex items-center gap-3">
          <span className="completion-mark grid h-12 w-12 place-items-center bg-(--mint) text-(--ink)">
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
            delay={120}
          />
          <ResultStat
            label="Time"
            value={formatDuration(result.timeSeconds)}
            delay={170}
          />
          <ResultStat label="Attempts" value={result.attempts} delay={220} />
          <ResultStat label="Hints" value={result.hintsUsed} delay={270} />
        </div>
        {daily ? (
          <div className="mt-5 flex items-center gap-2 border border-[#4f655e] bg-[#2b3c38] p-4 font-extrabold">
            <Icon name="flame" size={19} className="text-(--sun)" />
            {result.streak} day streak. Keep it going tomorrow.
          </div>
        ) : null}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link
              href={
                nextPuzzle && nextPuzzle.type !== "quickfire"
                  ? `/play/${nextPuzzle.id}`
                  : "/puzzles"
              }
            >
              Next puzzle <Icon name="arrow-right" size={16} />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-[#71837c] text-(--surface) hover:bg-(--surface) hover:text-(--ink)"
          >
            <Link href="/stats">
              See my stats <Icon name="bar-chart" size={16} />
            </Link>
          </Button>
        </div>
      </Card>
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
      <Button asChild variant="ghost" className="px-0">
        <Link href={daily ? "/daily" : "/puzzles"}>
          <Icon name="arrow-left" size={17} />
          Back to {daily ? "daily" : "puzzles"}
        </Link>
      </Button>
      <Card
        tone="danger"
        className="feedback-settle mt-8 border-(--coral-border) p-7 sm:p-10"
      >
        <p className="eyebrow">Almost there</p>
        <h1 className="mt-2 text-4xl font-semibold">That one got away.</h1>
        <p className="mt-3 max-w-lg text-(--ink-muted)">
          No score this time, but the answer is still waiting for your next
          attempt. Give your brain a reset and try another puzzle.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild>
            <Link href={`/play/${puzzle.id}`}>
              Try again <Icon name="refresh" size={16} />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/puzzles">Choose another</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}

function ResultStat({
  label,
  value,
  accent,
  delay = 0,
}: {
  label: string;
  value: string | number;
  accent?: string;
  delay?: number;
}) {
  return (
    <div
      className="completion-stat border border-[#4f655e] bg-[#2b3c38] p-4"
      style={{ animationDelay: `${delay}ms` }}
    >
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
      <Card className="p-8 text-center">
        <p className="eyebrow">Puzzle fog</p>
        <h1 className="mt-2 text-4xl font-semibold">
          That puzzle wandered off.
        </h1>
        <p className="mt-3 text-(--ink-muted)">
          Try another one and your brain will be back on track.
        </p>
        <Button asChild className="mt-6">
          <Link href="/puzzles">
            Browse puzzles <Icon name="arrow-right" size={16} />
          </Link>
        </Button>
      </Card>
    </div>
  );
}
