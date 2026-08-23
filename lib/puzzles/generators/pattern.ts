import type { PatternPuzzle } from "@/lib/types";
import {
  createPuzzleBase,
  type PuzzleMetadata,
} from "@/lib/puzzles/generators/shared";

export type PatternPuzzleSpec = Omit<PuzzleMetadata, "hints"> & {
  cycle: string[];
  visibleItems: number;
  options: string[];
  hints: string[];
  explanation: string;
};

export function createPatternPuzzle(spec: PatternPuzzleSpec): PatternPuzzle {
  const { cycle, visibleItems, options, explanation, hints, ...metadata } =
    spec;
  const answer = cycle[visibleItems % cycle.length];

  return {
    ...createPuzzleBase("pattern", { ...metadata, hints }),
    pattern: [
      ...Array.from(
        { length: visibleItems },
        (_, index) => cycle[index % cycle.length],
      ),
      "?",
    ],
    options,
    answer,
    explanation,
  };
}
