"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { PuzzleRenderer } from "@/components/player/PuzzleRenderer";
import { CompletionCard, FailedPuzzle } from "@/components/player/PlayerStates";
import type { PlayerFeedback, PlayerResult } from "@/components/player/types";
import { DifficultyBadge, typeAccent } from "@/components/Ui";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { puzzles } from "@/lib/puzzles";
import {
  formatDuration,
  loadProgress,
  localDateKey,
  recordCompletion,
  scoreForPuzzle,
} from "@/lib/storage";
import { puzzleTypeLabels, type Puzzle } from "@/lib/types";

type PlayerStatus = "playing" | "complete" | "failed";

export function PuzzlePlayer({
  puzzle,
  daily = false,
}: {
  puzzle: Puzzle;
  daily?: boolean;
}) {
  const [status, setStatus] = useState<PlayerStatus>("playing");
  const [attempts, setAttempts] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hint, setHint] = useState("");
  const [feedback, setFeedback] = useState<PlayerFeedback | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [result, setResult] = useState<PlayerResult | null>(null);
  const startedAt = useRef(Date.now());
  const dailyDate = localDateKey();

  useEffect(() => {
    if (status !== "playing" || puzzle.type === "quickfire") return;
    const timer = window.setInterval(
      () => setElapsed(Math.floor((Date.now() - startedAt.current) / 1000)),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [status, puzzle.type]);

  const currentScore = useMemo(
    () => scoreForPuzzle(puzzle, Math.max(1, attempts + 1), hintsUsed),
    [attempts, hintsUsed, puzzle],
  );

  const handleIncorrect = (message: string) => {
    setAttempts((current) => current + 1);
    setFeedback({ kind: "error", message });
  };

  const handleCorrect = (
    message = "You spotted it.",
    scoreOverride?: number,
    attemptsOverride?: number,
    timeOverride?: number,
  ) => {
    const finalAttempts = attemptsOverride ?? attempts + 1;
    const finalScore = Math.max(
      0,
      scoreOverride ?? scoreForPuzzle(puzzle, finalAttempts, hintsUsed),
    );
    const finalTime =
      timeOverride ??
      Math.max(1, Math.floor((Date.now() - startedAt.current) / 1000));
    const nextProgress = recordCompletion(
      loadProgress(),
      puzzle,
      finalScore,
      finalAttempts,
      hintsUsed,
      finalTime,
      { daily },
    );
    setResult({
      score: finalScore,
      timeSeconds: finalTime,
      attempts: finalAttempts,
      hintsUsed,
      streak: nextProgress.currentStreak,
    });
    setFeedback({ kind: "success", message });
    setStatus("complete");
    window.requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  };

  const nextPuzzle = useMemo(() => {
    const index = puzzles.findIndex((item) => item.id === puzzle.id);
    return puzzles[(index + 1) % puzzles.length];
  }, [puzzle.id]);

  const useHint = () => {
    if (status !== "playing" || hintsUsed >= puzzle.hints.length) return;
    const nextHintIndex = hintsUsed;
    setHintsUsed((current) => current + 1);
    setHint(puzzle.hints[nextHintIndex]);
    setFeedback({
      kind: "success",
      message:
        "Hint unlocked. It costs 25 points, but a good nudge is sometimes worth it.",
    });
  };

  if (status === "complete" && result) {
    return (
      <CompletionCard result={result} daily={daily} nextPuzzle={nextPuzzle} />
    );
  }

  if (status === "failed") {
    return <FailedPuzzle puzzle={puzzle} daily={daily} />;
  }

  return (
    <div className="page-width-narrow pb-20 pt-8 lg:pt-12">
      <div className="flex items-center justify-between gap-4">
        <Button asChild variant="ghost" className="px-0">
          <Link href={daily ? "/daily" : "/puzzles"}>
            <Icon name="arrow-left" size={17} />
            Back
          </Link>
        </Button>
        <span className="text-sm font-extrabold text-[var(--ink-muted)]">
          {daily ? "Daily puzzle" : "Puzzle player"}
        </span>
      </div>
      <div className="mt-8 flex flex-wrap items-start justify-between gap-5 border-b border-[var(--line)] pb-7">
        <div className="flex items-start gap-4">
          <span
            className="grid h-12 w-12 shrink-0 place-items-center"
            style={{ backgroundColor: typeAccent[puzzle.type].bg }}
          >
            <span className="display-font text-xl font-semibold">
              {typeAccent[puzzle.type].mark}
            </span>
          </span>
          <div>
            <p className="eyebrow">{puzzleTypeLabels[puzzle.type]}</p>
            <h1 className="mt-1 text-4xl font-semibold leading-tight sm:text-5xl">
              {puzzle.title}
            </h1>
            <p className="mt-2 max-w-xl text-[var(--ink-muted)]">
              {puzzle.description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DifficultyBadge difficulty={puzzle.difficulty} />
          <Badge
            variant="outline"
            className="gap-1.5 bg-[var(--surface)] text-[var(--ink-muted)]"
          >
            <Icon name="clock" size={14} />
            {puzzle.estimatedTime}
          </Badge>
        </div>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        <Card className="flex-row items-center justify-between p-4">
          <span className="text-sm font-extrabold text-[var(--ink-muted)]">
            Score
          </span>
          <span className="display-font text-2xl font-semibold">
            {puzzle.type === "quickfire" ? 0 : currentScore}
          </span>
        </Card>
        <Card className="flex-row items-center justify-between p-4">
          <span className="text-sm font-extrabold text-[var(--ink-muted)]">
            Attempts
          </span>
          <span className="display-font text-2xl font-semibold">
            {attempts}
          </span>
        </Card>
        <Card className="flex-row items-center justify-between p-4">
          <span className="text-sm font-extrabold text-[var(--ink-muted)]">
            Time
          </span>
          <span className="display-font text-2xl font-semibold">
            {puzzle.type === "quickfire" ? "60s" : formatDuration(elapsed)}
          </span>
        </Card>
      </div>

      <Card className="mt-5 p-6 sm:p-9" aria-labelledby="puzzle-question">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Your move</p>
            <h2 id="puzzle-question" className="mt-1 text-2xl font-semibold">
              Take your best shot.
            </h2>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={useHint}
            disabled={hintsUsed >= puzzle.hints.length}
          >
            <Icon name="lightbulb" size={16} />
            Hint{" "}
            <span className="bg-[var(--mint)] px-2 py-0.5 text-xs">
              {Math.max(0, puzzle.hints.length - hintsUsed)}
            </span>
          </Button>
        </div>
        {hint && (
          <Alert key={hintsUsed} variant="info" role="status" className="mt-5">
            <Icon name="lightbulb" size={18} />
            <AlertDescription className="font-extrabold">
              {hint}
            </AlertDescription>
          </Alert>
        )}
        <PuzzleRenderer
          puzzle={puzzle}
          disabled={status !== "playing"}
          onCorrect={(message) => handleCorrect(message)}
          onIncorrect={handleIncorrect}
          onFailed={() => setStatus("failed")}
          onQuickfireFinished={(quickfireResult) =>
            handleCorrect(
              "The buzzer has spoken. Here is your sprint score.",
              quickfireResult.score,
              quickfireResult.attempted,
              quickfireResult.timeSeconds,
            )
          }
        />
      </Card>
      {feedback && (
        <Alert
          key={`${feedback.kind}-${attempts}-${hintsUsed}`}
          className="mt-5"
          variant={feedback.kind === "error" ? "destructive" : "success"}
          role={feedback.kind === "error" ? "alert" : "status"}
        >
          <Icon name={feedback.kind === "error" ? "x" : "check"} size={18} />
          <AlertDescription className="font-extrabold">
            {feedback.message}
          </AlertDescription>
        </Alert>
      )}
      <p className="mt-5 text-center text-xs font-bold text-[var(--ink-muted)]">
        Hints cost 25 points · incorrect attempts cost 10 points · score never
        goes below zero
      </p>
      {daily && (
        <p className="mt-2 text-center text-xs font-black text-[var(--coral-dark)]">
          Complete today's puzzle to keep your streak going.
        </p>
      )}
      <span className="sr-only">Today is {dailyDate}</span>
    </div>
  );
}
