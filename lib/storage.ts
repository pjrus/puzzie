import type { Difficulty, Puzzle, PuzzleType } from "@/lib/types";

export const STORAGE_KEY = "puzzie-progress-v1";

export type PuzzleHistoryEntry = {
  id: string;
  title: string;
  type: PuzzleType;
  difficulty: Difficulty;
  score: number;
  attempts: number;
  hintsUsed: number;
  timeSeconds: number;
  completedAt: string;
};

export type PlayerProgress = {
  puzzlesSolved: number;
  totalScore: number;
  currentStreak: number;
  bestStreak: number;
  lastDailyPuzzleDate: string | null;
  dailyPuzzleCompleted: boolean;
  puzzleHistory: PuzzleHistoryEntry[];
  categoryStats: Record<PuzzleType, number>;
  bestQuickfireScore: number;
};

export const emptyCategoryStats = (): Record<PuzzleType, number> => ({
  sequence: 0,
  "word-scramble": 0,
  logic: 0,
  pattern: 0,
  maths: 0,
  riddle: 0,
  connections: 0,
  "word-ladder": 0,
  "odd-one-out": 0,
  trivia: 0,
  "code-breaker": 0,
  sudoku: 0,
  quickfire: 0,
});

export const defaultProgress = (): PlayerProgress => ({
  puzzlesSolved: 0,
  totalScore: 0,
  currentStreak: 0,
  bestStreak: 0,
  lastDailyPuzzleDate: null,
  dailyPuzzleCompleted: false,
  puzzleHistory: [],
  categoryStats: emptyCategoryStats(),
  bestQuickfireScore: 0,
});

export function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function loadProgress(): PlayerProgress {
  if (typeof window === "undefined") return defaultProgress();

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultProgress();
    const parsed = JSON.parse(stored) as Partial<PlayerProgress>;
    return {
      ...defaultProgress(),
      ...parsed,
      categoryStats: {
        ...emptyCategoryStats(),
        ...(parsed.categoryStats ?? {}),
      },
      puzzleHistory: Array.isArray(parsed.puzzleHistory)
        ? parsed.puzzleHistory
        : [],
    };
  } catch {
    return defaultProgress();
  }
}

export function saveProgress(progress: PlayerProgress) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function previousDateKey(date: Date) {
  const previous = new Date(date);
  previous.setDate(previous.getDate() - 1);
  return localDateKey(previous);
}

export function scoreForPuzzle(
  puzzle: Puzzle,
  attempts: number,
  hintsUsed: number,
  fastBonus = 0,
) {
  const difficultyScore: Record<Difficulty, number> = {
    Easy: 100,
    Medium: 150,
    Hard: 200,
  };
  return Math.max(
    0,
    difficultyScore[puzzle.difficulty] -
      Math.max(0, attempts - 1) * 10 -
      hintsUsed * 25 +
      fastBonus,
  );
}

export function recordCompletion(
  previous: PlayerProgress,
  puzzle: Puzzle,
  score: number,
  attempts: number,
  hintsUsed: number,
  timeSeconds: number,
  options: { daily?: boolean; completedAt?: Date } = {},
) {
  const completedAt = options.completedAt ?? new Date();
  const dateKey = localDateKey(completedAt);
  const next = structuredClone(previous);
  const entry: PuzzleHistoryEntry = {
    id: puzzle.id,
    title: puzzle.title,
    type: puzzle.type,
    difficulty: puzzle.difficulty,
    score,
    attempts,
    hintsUsed,
    timeSeconds,
    completedAt: completedAt.toISOString(),
  };

  next.puzzlesSolved += 1;
  next.totalScore += score;
  next.puzzleHistory = [entry, ...next.puzzleHistory].slice(0, 50);
  next.categoryStats[puzzle.type] += 1;

  if (puzzle.type === "quickfire") {
    next.bestQuickfireScore = Math.max(next.bestQuickfireScore, score);
  }

  if (options.daily) {
    const isSameDay = next.lastDailyPuzzleDate === dateKey;
    const completedYesterday =
      next.lastDailyPuzzleDate === previousDateKey(completedAt);
    next.currentStreak = isSameDay
      ? next.currentStreak
      : completedYesterday
        ? next.currentStreak + 1
        : 1;
    next.bestStreak = Math.max(next.bestStreak, next.currentStreak);
    next.lastDailyPuzzleDate = dateKey;
    next.dailyPuzzleCompleted = true;
  }

  saveProgress(next);
  return next;
}

export function formatDate(dateString: string | null) {
  if (!dateString) return "—";
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${dateString}T12:00:00`));
}

export function formatDuration(seconds: number) {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${minutes}m ${String(remaining).padStart(2, "0")}s`;
}
