"use client";

import Link from "next/link";
import { HomeCategories } from "@/components/home/HomeCategories";
import { Icon } from "@/components/Icon";
import { PuzzleCard, SectionHeading, StatCard } from "@/components/Ui";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/hooks/useProgress";
import { getDailyPuzzle, puzzles } from "@/lib/puzzles";
import { localDateKey } from "@/lib/storage";
import { puzzleTypeLabels } from "@/lib/types";

export default function HomePage() {
  const { progress, hydrated } = useProgress();
  const daily = getDailyPuzzle();
  const dailyComplete =
    hydrated &&
    progress.lastDailyPuzzleDate === localDateKey() &&
    progress.dailyPuzzleCompleted;
  const recommended = puzzles
    .filter((puzzle) => puzzle.type !== "quickfire" && puzzle.id !== daily.id)
    .slice(0, 3);
  const bestScore = hydrated
    ? Math.max(0, ...progress.puzzleHistory.map((entry) => entry.score))
    : "—";

  return (
    <div>
      <section className="page-width grid gap-8 pb-12 pt-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch lg:pb-20 lg:pt-16">
        <div className="flex flex-col justify-center">
          <div className="max-w-xl">
            <p className="eyebrow inline-flex items-center gap-2">
              <span className="h-2 w-2 bg-[var(--coral)]" />
              Your five-minute brain break
            </p>
            <h1 className="mt-5 text-[clamp(3.4rem,9vw,6rem)] font-semibold leading-[0.9] tracking-[-0.03em]">
              A little puzzle for your brain.
            </h1>
            <p className="mt-7 max-w-md text-lg leading-8 text-[var(--ink-muted)]">
              Pick a puzzle, solve it, earn a few points, and keep your streak
              moving.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href={dailyComplete ? "/puzzles" : "/daily"}>
                  <Icon name="play" size={17} />
                  {dailyComplete
                    ? "Find another puzzle"
                    : "Play today's puzzle"}
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/puzzles">
                  Explore all puzzles <Icon name="arrow-right" size={16} />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-12 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard
              label="Streak"
              value={hydrated ? progress.currentStreak : "—"}
              icon="flame"
              accent="var(--mint)"
              detail="days"
            />
            <StatCard
              label="Solved"
              value={hydrated ? progress.puzzlesSolved : "—"}
              icon="check"
              accent="var(--surface)"
            />
            <StatCard
              label="Score"
              value={hydrated ? progress.totalScore : "—"}
              icon="trophy"
              accent="var(--sun)"
            />
            <StatCard
              label="Best score"
              value={bestScore}
              icon="spark"
              accent="var(--lavender)"
              detail="single puzzle"
            />
          </div>
        </div>

        <Card className="relative min-h-[420px] overflow-hidden border-[var(--ink)] bg-[var(--ink)] p-6 text-[var(--surface)] sm:p-8">
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#b6c7bc]">
                  Today’s puzzle
                </p>
                <h2 className="mt-2 max-w-sm text-4xl font-semibold leading-tight">
                  {daily.title}
                </h2>
              </div>
              <Badge
                variant="outline"
                className="border-[#61716c] text-[#b6c7bc]"
              >
                {daily.difficulty}
              </Badge>
            </div>

            <div className="my-8 flex items-center justify-center">
              <div className="relative grid h-52 w-52 rotate-[-5deg] place-items-center border-2 border-[var(--ink)] bg-[var(--coral)] text-[var(--ink)]">
                <div className="text-center">
                  <span className="display-font block text-7xl font-semibold leading-none">
                    ?
                  </span>
                  <span className="mt-2 block text-xs font-black uppercase tracking-[0.18em]">
                    solve me
                  </span>
                </div>
                <span className="absolute -right-5 -top-5 grid h-14 w-14 place-items-center border-2 border-[var(--ink)] bg-[var(--mint)] text-[var(--ink)]">
                  <Icon name="spark" size={24} />
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-end justify-between gap-4 border-t border-[#46534f] pt-5">
              <div>
                <p className="text-sm text-[#b6c7bc]">
                  {puzzleTypeLabels[daily.type]} · {daily.estimatedTime}
                </p>
                <p className="mt-1 font-extrabold">
                  Worth {daily.points} points
                </p>
              </div>
              {dailyComplete ? (
                <Badge className="gap-2 bg-[var(--mint)] px-3 py-2 text-[var(--ink)]">
                  <Icon name="check" size={15} />
                  Done today
                </Badge>
              ) : (
                <Button asChild size="sm">
                  <Link href="/daily">
                    Start <Icon name="arrow-right" size={15} />
                  </Link>
                </Button>
              )}
            </div>
          </div>
          <div
            className="pointer-events-none absolute -right-14 top-16 h-40 w-40 rotate-12 border-[22px] border-[#354845]"
            aria-hidden="true"
          />
        </Card>
      </section>

      <section className="page-width pb-14 pt-8">
        <SectionHeading
          eyebrow="Keep the momentum"
          title="Try another one"
          description="A few good places to start when you have a spare minute."
          action={
            <Button asChild variant="outline">
              <Link href="/puzzles">
                View all <Icon name="arrow-right" size={16} />
              </Link>
            </Button>
          }
        />
        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {recommended.map((puzzle) => (
            <PuzzleCard key={puzzle.id} puzzle={puzzle} compact />
          ))}
        </div>
      </section>

      <HomeCategories />

      <section className="page-width pb-20 pt-4">
        <Card className="grid gap-6 bg-[var(--mint)] p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
          <div>
            <p className="eyebrow">Small steps count</p>
            <h2 className="mt-1 text-3xl font-semibold">
              Your best streak is {hydrated ? progress.bestStreak : "—"} days.
            </h2>
            <p className="mt-2 max-w-lg text-[var(--ink-muted)]">
              Come back tomorrow for a fresh daily puzzle and keep your little
              brain gym habit going.
            </p>
          </div>
          <Button asChild variant="outline" className="whitespace-nowrap">
            <Link href="/stats">
              See your stats <Icon name="bar-chart" size={16} />
            </Link>
          </Button>
        </Card>
      </section>
    </div>
  );
}
