import type { Puzzle } from "@/lib/types";
import { sequencePuzzles } from "@/lib/puzzles/data/sequences";
import { wordScramblePuzzles } from "@/lib/puzzles/data/word-scrambles";
import { logicPuzzles } from "@/lib/puzzles/data/logic";
import { patternPuzzles } from "@/lib/puzzles/data/patterns";
import { mathsPuzzles } from "@/lib/puzzles/data/maths";
import { riddlePuzzles } from "@/lib/puzzles/data/riddles";
import { connectionsPuzzles } from "@/lib/puzzles/data/connections";
import { wordLadderPuzzles } from "@/lib/puzzles/data/word-ladders";
import { oddOneOutPuzzles } from "@/lib/puzzles/data/odd-one-outs";
import { triviaPuzzles } from "@/lib/puzzles/data/trivia";
import { codeBreakerPuzzles } from "@/lib/puzzles/data/code-breakers";
import { sudokuPuzzles } from "@/lib/puzzles/data/sudoku";
import { zipPuzzles } from "@/lib/puzzles/data/zip";
import { quickfirePuzzles } from "@/lib/puzzles/data/quickfire";
import { validatePuzzleCatalogue } from "@/lib/puzzles/validation";

export const puzzles = [
  ...sequencePuzzles,
  ...wordScramblePuzzles,
  ...logicPuzzles,
  ...patternPuzzles,
  ...mathsPuzzles,
  ...riddlePuzzles,
  ...connectionsPuzzles,
  ...wordLadderPuzzles,
  ...oddOneOutPuzzles,
  ...triviaPuzzles,
  ...codeBreakerPuzzles,
  ...sudokuPuzzles,
  ...zipPuzzles,
  ...quickfirePuzzles,
] satisfies Puzzle[];

validatePuzzleCatalogue(puzzles);
