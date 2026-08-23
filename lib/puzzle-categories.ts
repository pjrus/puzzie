import { puzzles } from "@/lib/puzzles";
import type { PuzzleType } from "@/lib/types";

export type PuzzleCategorySlug =
  "word" | "numbers" | "logic" | "visual" | "trivia" | "quickfire";

export type PuzzleCategory = {
  slug: PuzzleCategorySlug;
  label: string;
  description: string;
  type: PuzzleType;
  types: PuzzleType[];
};

export const puzzleCategories: PuzzleCategory[] = [
  {
    slug: "word",
    label: "Word",
    description: "Untangle, connect, and climb through words.",
    type: "word-scramble",
    types: ["word-scramble", "riddle", "connections", "word-ladder"],
  },
  {
    slug: "numbers",
    label: "Numbers",
    description: "Spot the rule and make the numbers behave.",
    type: "sequence",
    types: ["sequence", "maths"],
  },
  {
    slug: "logic",
    label: "Logic",
    description: "Follow each clue to the answer that fits.",
    type: "logic",
    types: ["logic", "odd-one-out", "code-breaker", "sudoku"],
  },
  {
    slug: "visual",
    label: "Visual",
    description: "Notice the pattern hiding in plain sight.",
    type: "pattern",
    types: ["pattern"],
  },
  {
    slug: "trivia",
    label: "Trivia",
    description: "Put the useful and curious things you know to work.",
    type: "trivia",
    types: ["trivia"],
  },
  {
    slug: "quickfire",
    label: "Quickfire",
    description: "Race the clock through a rapid mix of questions.",
    type: "quickfire",
    types: ["quickfire"],
  },
];

export const puzzleTypeOrder: PuzzleType[] = [
  "sequence",
  "word-scramble",
  "logic",
  "pattern",
  "maths",
  "riddle",
  "connections",
  "word-ladder",
  "odd-one-out",
  "trivia",
  "code-breaker",
  "sudoku",
  "quickfire",
];

export function getPuzzleCategory(slug: string) {
  return puzzleCategories.find((category) => category.slug === slug);
}

export function getCategoryPuzzles(category: PuzzleCategory) {
  return puzzles.filter((puzzle) => category.types.includes(puzzle.type));
}
