import { puzzles } from "@/lib/puzzles/catalogue";
import type { Puzzle, PuzzleType } from "@/lib/types";

const millisecondsPerDay = 86_400_000;
const puzzleById = new Map<string, Puzzle>(
  puzzles.map((puzzle) => [puzzle.id, puzzle]),
);
const dailyPuzzles: Puzzle[] = puzzles.filter(
  (puzzle) => puzzle.type !== "quickfire",
);

export function getPuzzleById(id: string): Puzzle | undefined {
  return puzzleById.get(id);
}

export function getPuzzlesByType<T extends PuzzleType>(
  type: T,
): Extract<Puzzle, { type: T }>[] {
  return puzzles.filter(
    (puzzle): puzzle is Extract<Puzzle, { type: T }> => puzzle.type === type,
  );
}

function getDayNumber(date: Date | string): number {
  if (typeof date === "string") {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
    if (!match) throw new Error(`Invalid local date key: ${date}`);
    return Math.floor(
      Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])) /
        millisecondsPerDay,
    );
  }

  return Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) /
      millisecondsPerDay,
  );
}

export function getDailyPuzzle(date: Date | string = new Date()): Puzzle {
  const dayNumber = getDayNumber(date);

  return dailyPuzzles[dayNumber % dailyPuzzles.length];
}
