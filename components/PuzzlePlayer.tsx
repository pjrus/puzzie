"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { DifficultyBadge, typeAccent } from "@/components/Ui";
import {
  ConnectionsPuzzle,
  CodeBreakerPuzzle,
  LogicPuzzle,
  MathsPuzzle,
  OddOneOutPuzzle,
  PatternPuzzle,
  QuickfirePuzzle,
  RiddlePuzzle,
  SequencePuzzle,
  SudokuPuzzle,
  TriviaPuzzle,
  WordLadderPuzzle,
  WordScramblePuzzle,
} from "@/components/puzzles";
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
  const [feedback, setFeedback] = useState<{
    kind: "error" | "success";
    message: string;
  } | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [result, setResult] = useState<{
    score: number;
    timeSeconds: number;
    attempts: number;
    hintsUsed: number;
    streak: number;
  } | null>(null);
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

  const renderPuzzle = () => {
    const answerProps = {
      onCorrect: (message?: string) => handleCorrect(message),
      onIncorrect: handleIncorrect,
      disabled: status !== "playing",
    };
    switch (puzzle.type) {
      case "sequence":
        return <SequencePuzzle puzzle={puzzle} {...answerProps} />;
      case "word-scramble":
        return <WordScramblePuzzle puzzle={puzzle} {...answerProps} />;
      case "logic":
        return <LogicPuzzle puzzle={puzzle} {...answerProps} />;
      case "pattern":
        return <PatternPuzzle puzzle={puzzle} {...answerProps} />;
      case "maths":
        return <MathsPuzzle puzzle={puzzle} {...answerProps} />;
      case "riddle":
        return <RiddlePuzzle puzzle={puzzle} {...answerProps} />;
      case "connections":
        return (
          <ConnectionsPuzzle
            puzzle={puzzle}
            {...answerProps}
            onFailed={() => setStatus("failed")}
          />
        );
      case "word-ladder":
        return <WordLadderPuzzle puzzle={puzzle} {...answerProps} />;
      case "odd-one-out":
        return <OddOneOutPuzzle puzzle={puzzle} {...answerProps} />;
      case "trivia":
        return <TriviaPuzzle puzzle={puzzle} {...answerProps} />;
      case "code-breaker":
        return (
          <CodeBreakerPuzzle
            puzzle={puzzle}
            {...answerProps}
            onFailed={() => setStatus("failed")}
          />
        );
      case "sudoku":
        return <SudokuPuzzle puzzle={puzzle} {...answerProps} />;
      case "quickfire":
        return (
          <QuickfirePuzzle
            puzzle={puzzle}
            disabled={status !== "playing"}
            onFinished={(quickfireResult) =>
              handleCorrect(
                "The buzzer has spoken. Here is your sprint score.",
                quickfireResult.score,
                quickfireResult.attempted,
                quickfireResult.timeSeconds,
              )
            }
          />
        );
    }
  };

  if (status === "complete" && result) {
    return (
      <CompletionCard
        puzzle={puzzle}
        result={result}
        daily={daily}
        nextPuzzle={nextPuzzle}
      />
    );
  }

  if (status === "failed") {
    return (
      <div className="page-width-narrow pb-20 pt-10">
        <Link
          href={daily ? "/daily" : "/puzzles"}
          className="button-quiet px-0"
        >
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

  return (
    <div className="page-width-narrow pb-20 pt-8 lg:pt-12">
      <div className="flex items-center justify-between gap-4">
        <Link
          href={daily ? "/daily" : "/puzzles"}
          className="button-quiet px-0"
        >
          <Icon name="arrow-left" size={17} />
          Back
        </Link>
        <span className="text-sm font-extrabold text-[var(--ink-muted)]">
          {daily ? "Daily puzzle" : "Puzzle player"}
        </span>
      </div>
      <div className="mt-8 flex flex-wrap items-start justify-between gap-5 border-b border-[var(--line)] pb-7">
        <div className="flex items-start gap-4">
          <span
            className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl"
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
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 text-xs font-black text-[var(--ink-muted)]">
            <Icon name="clock" size={14} />
            {puzzle.estimatedTime}
          </span>
        </div>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        <div className="surface-card flex items-center justify-between p-4">
          <span className="text-sm font-extrabold text-[var(--ink-muted)]">
            Score
          </span>
          <span className="display-font text-2xl font-semibold">
            {puzzle.type === "quickfire" ? 0 : currentScore}
          </span>
        </div>
        <div className="surface-card flex items-center justify-between p-4">
          <span className="text-sm font-extrabold text-[var(--ink-muted)]">
            Attempts
          </span>
          <span className="display-font text-2xl font-semibold">
            {attempts}
          </span>
        </div>
        <div className="surface-card flex items-center justify-between p-4">
          <span className="text-sm font-extrabold text-[var(--ink-muted)]">
            Time
          </span>
          <span className="display-font text-2xl font-semibold">
            {puzzle.type === "quickfire" ? "60s" : formatDuration(elapsed)}
          </span>
        </div>
      </div>

      <section
        className="surface-card mt-5 p-6 sm:p-9"
        aria-labelledby="puzzle-question"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Your move</p>
            <h2 id="puzzle-question" className="mt-1 text-2xl font-semibold">
              Take your best shot.
            </h2>
          </div>
          <button
            type="button"
            className="button-secondary min-h-11 px-3 text-sm"
            onClick={useHint}
            disabled={hintsUsed >= puzzle.hints.length}
          >
            <Icon name="lightbulb" size={16} />
            Hint{" "}
            <span className="bg-[var(--mint)] px-2 py-0.5 text-xs">
              {Math.max(0, puzzle.hints.length - hintsUsed)}
            </span>
          </button>
        </div>
        {hint && (
          <div
            key={hintsUsed}
            className="hint-settle mt-5 flex items-start gap-3 border border-[#e7cf86] bg-[#fff6d8] p-4 text-sm font-extrabold text-[#705716]"
          >
            <Icon name="lightbulb" size={18} />
            <p>{hint}</p>
          </div>
        )}
        {renderPuzzle()}
      </section>
      {feedback && (
        <div
          key={`${feedback.kind}-${attempts}-${hintsUsed}`}
          className={`${feedback.kind === "error" ? "feedback-error" : "feedback-settle"} mt-5 flex items-start gap-3 border p-4 text-sm font-extrabold ${feedback.kind === "error" ? "border-[#e7bdb7] bg-[#fff1ed] text-[#95403d]" : "border-[#b8d7c6] bg-[var(--mint)] text-[var(--mint-dark)]"}`}
          role={feedback.kind === "error" ? "alert" : "status"}
        >
          <Icon name={feedback.kind === "error" ? "x" : "check"} size={18} />
          <p>{feedback.message}</p>
        </div>
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

function CompletionCard({
  puzzle,
  result,
  daily,
  nextPuzzle,
}: {
  puzzle: Puzzle;
  result: {
    score: number;
    timeSeconds: number;
    attempts: number;
    hintsUsed: number;
    streak: number;
  };
  daily: boolean;
  nextPuzzle?: Puzzle;
}) {
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
      <div className="completion-card surface-card relative mt-8 overflow-hidden border-[var(--ink)] bg-[var(--ink)] p-7 text-[var(--surface)] sm:p-10">
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <span className="completion-mark grid h-12 w-12 place-items-center bg-[var(--mint)] text-[var(--ink)]">
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
              delay={220}
            />
            <ResultStat
              label="Time"
              value={formatDuration(result.timeSeconds)}
              delay={270}
            />
            <ResultStat label="Attempts" value={result.attempts} delay={320} />
            <ResultStat label="Hints" value={result.hintsUsed} delay={370} />
          </div>
          {daily && (
            <div className="feedback-settle mt-5 flex items-center gap-2 border border-[#4f655e] bg-[#2b3c38] p-4 font-extrabold">
              <Icon name="flame" size={19} className="text-[var(--sun)]" />
              {result.streak} day streak. Keep it going tomorrow.
            </div>
          )}
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
        <div
          className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full border-[26px] border-[#31413d]"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

function ResultStat({
  label,
  value,
  accent,
  delay,
}: {
  label: string;
  value: string | number;
  accent?: string;
  delay: number;
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
