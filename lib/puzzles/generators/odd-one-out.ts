import type { OddOneOutPuzzle } from "@/lib/types";
import {
  createPuzzleBase,
  seededShuffle,
  type PuzzleMetadata,
} from "@/lib/puzzles/generators/shared";

export type OddOneOutSpec = Omit<PuzzleMetadata, "hints"> & {
  relatedItems: string[];
  oddItem: string;
  hints: string[];
  explanation: string;
};

export function createOddOneOutPuzzle(spec: OddOneOutSpec): OddOneOutPuzzle {
  const { relatedItems, oddItem, hints, explanation, ...metadata } = spec;

  return {
    ...createPuzzleBase("odd-one-out", { ...metadata, hints }),
    items: seededShuffle(
      [...relatedItems, oddItem],
      `${spec.id}:odd-one-out:v1`,
    ),
    answer: oddItem,
    explanation,
  };
}
