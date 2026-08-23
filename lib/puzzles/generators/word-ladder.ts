import type { WordLadderPuzzle } from "@/lib/types";
import {
  createPuzzleBase,
  type PuzzleMetadata,
} from "@/lib/puzzles/generators/shared";

export type WordLadderSpec = Omit<PuzzleMetadata, "hints"> & {
  start: string;
  target: string;
  dictionary: string[];
  hint: string;
};

function differsByOneLetter(left: string, right: string): boolean {
  if (left.length !== right.length) return false;

  let differences = 0;
  for (let index = 0; index < left.length; index += 1) {
    if (left[index] !== right[index]) differences += 1;
  }
  return differences === 1;
}

function findShortestPath(
  start: string,
  target: string,
  dictionary: string[],
): string[] {
  const allowedWords = new Set(
    [start, target, ...dictionary].map((word) => word.toUpperCase()),
  );
  const queue: string[][] = [[start]];
  const visited = new Set([start]);

  while (queue.length > 0) {
    const path = queue.shift()!;
    const current = path.at(-1)!;
    if (current === target) return path;

    for (const candidate of allowedWords) {
      if (!visited.has(candidate) && differsByOneLetter(current, candidate)) {
        visited.add(candidate);
        queue.push([...path, candidate]);
      }
    }
  }

  throw new Error(`No word ladder path from ${start} to ${target}.`);
}

export function createWordLadderPuzzle(spec: WordLadderSpec): WordLadderPuzzle {
  const { start, target, dictionary, hint, ...metadata } = spec;
  const normalisedStart = start.toUpperCase();
  const normalisedTarget = target.toUpperCase();
  const solution = findShortestPath(
    normalisedStart,
    normalisedTarget,
    dictionary,
  );

  return {
    ...createPuzzleBase("word-ladder", {
      ...metadata,
      hints: [hint, solution.join(" → ")],
    }),
    start: normalisedStart,
    target: normalisedTarget,
    solution,
    hint,
    explanation: `${solution.join(" becomes ")}. Each step changes exactly one letter.`,
  };
}
