import type { WordScramblePuzzle } from "@/lib/types";
import {
  createPuzzleBase,
  seededShuffle,
  type PuzzleMetadata,
} from "@/lib/puzzles/generators/shared";

export type WordScrambleSpec = Omit<PuzzleMetadata, "hints"> & {
  word: string;
  alternativeAnswers?: string[];
  category: string;
  hints: string[];
  explanation: string;
};

export function createWordScramblePuzzle(
  spec: WordScrambleSpec,
): WordScramblePuzzle {
  const {
    word,
    alternativeAnswers = [],
    category,
    hints,
    explanation,
    ...metadata
  } = spec;
  const originalLetters = [...word.toUpperCase()];
  let letters = seededShuffle(originalLetters, `${spec.id}:scramble:v1`);

  if (letters.join("") === originalLetters.join("")) {
    letters = [...letters.slice(1), letters[0]];
  }

  return {
    ...createPuzzleBase("word-scramble", { ...metadata, hints }),
    letters,
    answers: [word.toLowerCase(), ...alternativeAnswers],
    category,
    explanation,
  };
}
