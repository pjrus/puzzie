"use client";

import Link from "next/link";
import { Icon } from "@/components/Icon";
import { DifficultyBadge, TypeGlyph } from "@/components/Ui";
import { PuzzlePlayer } from "@/components/PuzzlePlayer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/hooks/useProgress";
import { getDailyPuzzle } from "@/lib/puzzles";
import { formatDate, formatDuration, localDateKey } from "@/lib/storage";
import { puzzleTypeLabels } from "@/lib/types";

export default function DailyPage() {
  const { progress, hydrated } = useProgress();
  const puzzle = getDailyPuzzle();
  const today = localDateKey();
  const completed =
    hydrated &&
    progress.lastDailyPuzzleDate === today &&
    progress.dailyPuzzleCompleted;
  const result = progress.puzzleHistory.find(
    (entry) => entry.id === puzzle.id && entry.completedAt.startsWith(today),
  );

  if (completed && result) {
    return (
      <div className="page-width pb-20 pt-10 lg:pt-16">
        <div className="mx-auto max-w-3xl">
          <Button asChild variant="ghost" className="px-0">
            <Link href="/">
              <Icon name="arrow-left" size={17} />
              Back home
            </Link>
          </Button>
          <div className="mt-8 flex items-start justify-between gap-5">
            <div>
              <p className="eyebrow">Today's puzzle · {formatDate(today)}</p>
              <h1 className="mt-2 text-5xl font-semibold">You showed up.</h1>
              <p className="mt-3 max-w-xl text-lg leading-8 text-[var(--ink-muted)]">
                The daily puzzle is tucked away until tomorrow. Your result is
                safe, and your streak is still warm.
              </p>
            </div>
            <TypeGlyph type={puzzle.type} size="lg" />
          </div>
          <Card tone="mint" className="mt-8 overflow-hidden p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="eyebrow">Daily result</p>
                <h2 className="mt-1 text-3xl font-semibold">{puzzle.title}</h2>
                <p className="mt-2 text-[var(--ink-muted)]">
                  {puzzleTypeLabels[puzzle.type]} · {puzzle.difficulty}
                </p>
              </div>
              <Badge className="gap-2 bg-[var(--surface)] px-4 py-2 text-[var(--ink)]">
                <Icon name="check" size={17} />
                Complete
              </Badge>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <ResultTile label="Score" value={`+${result.score}`} />
              <ResultTile
                label="Time"
                value={formatDuration(result.timeSeconds)}
              />
              <ResultTile
                label="Streak"
                value={`${progress.currentStreak} days`}
              />
            </div>
            <p className="mt-6 border-t border-[#bad7ca] pt-5 font-extrabold text-[var(--mint-dark)]">
              Come back tomorrow for a fresh little challenge.
            </p>
          </Card>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/puzzles">
                Find another puzzle <Icon name="arrow-right" size={16} />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/stats">See your stats</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-width pb-8 pt-10 lg:pt-16">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="eyebrow inline-flex items-center gap-2">
                <Icon name="calendar" size={15} /> {formatDate(today)}
              </p>
              <h1 className="mt-3 text-5xl font-semibold leading-[0.95] sm:text-6xl">
                Today's puzzle.
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-8 text-[var(--ink-muted)]">
                One fresh challenge, picked for today. Take a breath, have a go,
                and let your streak do the cheering.
              </p>
            </div>
            <TypeGlyph type={puzzle.type} size="lg" />
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="bg-[var(--surface)] text-sm normal-case tracking-normal"
            >
              {puzzleTypeLabels[puzzle.type]}
            </Badge>
            <DifficultyBadge difficulty={puzzle.difficulty} />
            <span className="text-sm font-extrabold text-[var(--ink-muted)]">
              {puzzle.estimatedTime} · {puzzle.points} points
            </span>
          </div>
        </div>
      </div>
      <PuzzlePlayer puzzle={puzzle} daily />
    </div>
  );
}

function ResultTile({ label, value }: { label: string; value: string }) {
  return (
    <Card className="border-[#bad7ca] bg-[var(--surface)] p-4">
      <p className="text-xs font-black uppercase tracking-[0.1em] text-[var(--ink-muted)]">
        {label}
      </p>
      <p className="display-font mt-1 text-2xl font-semibold">{value}</p>
    </Card>
  );
}
