export type PuzzleType =
  | "sequence"
  | "word-scramble"
  | "logic"
  | "pattern"
  | "maths"
  | "riddle"
  | "connections"
  | "word-ladder"
  | "odd-one-out"
  | "trivia"
  | "code-breaker"
  | "sudoku"
  | "zip"
  | "quickfire";

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface PuzzleBase {
  id: string;
  type: PuzzleType;
  title: string;
  description: string;
  difficulty: Difficulty;
  points: number;
  estimatedTime: string;
  hints: string[];
}

export interface SequencePuzzle extends PuzzleBase {
  type: "sequence";
  sequence: Array<number | string>;
  answer: string;
  explanation: string;
}

export interface WordScramblePuzzle extends PuzzleBase {
  type: "word-scramble";
  letters: string[];
  answers: string[];
  category: string;
  explanation: string;
}

export interface LogicPuzzle extends PuzzleBase {
  type: "logic";
  prompt: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface PatternPuzzle extends PuzzleBase {
  type: "pattern";
  pattern: string[];
  options: string[];
  answer: string;
  explanation: string;
}

export interface MathsPuzzle extends PuzzleBase {
  type: "maths";
  question: string;
  answer: string;
  explanation: string;
}

export interface RiddlePuzzle extends PuzzleBase {
  type: "riddle";
  riddle: string;
  answers: string[];
  explanation: string;
}

export interface ConnectionsGroup {
  name: string;
  words: string[];
}

export interface ConnectionsPuzzle extends PuzzleBase {
  type: "connections";
  words: string[];
  groups: ConnectionsGroup[];
  explanation: string;
}

export interface WordLadderPuzzle extends PuzzleBase {
  type: "word-ladder";
  start: string;
  target: string;
  solution: string[];
  hint: string;
  explanation: string;
}

export interface OddOneOutPuzzle extends PuzzleBase {
  type: "odd-one-out";
  items: string[];
  answer: string;
  explanation: string;
}

export interface TriviaPuzzle extends PuzzleBase {
  type: "trivia";
  category: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface CodeBreakerClue {
  guess: string;
  exact: number;
  misplaced: number;
}

export interface CodeBreakerPuzzle extends PuzzleBase {
  type: "code-breaker";
  code: string;
  clues: CodeBreakerClue[];
  maxAttempts: number;
  explanation: string;
}

export interface SudokuPuzzle extends PuzzleBase {
  type: "sudoku";
  grid: number[][];
  solution: number[][];
  explanation: string;
}

export interface ZipPuzzle extends PuzzleBase {
  type: "zip";
  size: number;
  grid: number[][];
  solution: number[][];
  explanation: string;
}

export type QuickfireQuestion = {
  id: string;
  prompt: string;
  kind: "number" | "choice" | "word";
  answer: string;
  options?: string[];
};

export interface QuickfirePuzzle extends PuzzleBase {
  type: "quickfire";
  duration: number;
  questions: QuickfireQuestion[];
}

export type Puzzle =
  | SequencePuzzle
  | WordScramblePuzzle
  | LogicPuzzle
  | PatternPuzzle
  | MathsPuzzle
  | RiddlePuzzle
  | ConnectionsPuzzle
  | WordLadderPuzzle
  | OddOneOutPuzzle
  | TriviaPuzzle
  | CodeBreakerPuzzle
  | SudokuPuzzle
  | ZipPuzzle
  | QuickfirePuzzle;

export const puzzleTypeLabels: Record<PuzzleType, string> = {
  sequence: "Number sequence",
  "word-scramble": "Word scramble",
  logic: "Logic puzzle",
  pattern: "Pattern",
  maths: "Maths",
  riddle: "Riddle",
  connections: "Connections",
  "word-ladder": "Word ladder",
  "odd-one-out": "Odd one out",
  trivia: "Trivia",
  "code-breaker": "Code breaker",
  sudoku: "Sudoku",
  zip: "Zip",
  quickfire: "Quickfire",
};

export const puzzleTypeDescriptions: Record<PuzzleType, string> = {
  sequence: "Spot the rule and finish the sequence.",
  "word-scramble": "Untangle the letters before they tangle you.",
  logic: "Read carefully. One answer follows.",
  pattern: "Find the missing beat in the pattern.",
  maths: "A small sum with a satisfying finish.",
  riddle: "A sideways question for a curious mind.",
  connections: "Find four groups hiding in plain sight.",
  "word-ladder": "Change one letter at a time to climb across.",
  "odd-one-out": "Find the one that breaks the rule.",
  trivia: "A quick question worth knowing.",
  "code-breaker": "Crack the code from the clues.",
  sudoku: "Fill every row, column, and square.",
  zip: "Connect the numbers in order without lifting your finger.",
  quickfire: "How many can you solve in 60 seconds?",
};
