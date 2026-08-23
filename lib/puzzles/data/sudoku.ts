import { createSudokuPuzzle } from "@/lib/puzzles/generators/sudoku";

export const sudokuPuzzles = [
  createSudokuPuzzle({
    id: "sudoku-1",
    title: "First grid",
    description: "Fill every row, column and 2×2 square.",
    difficulty: "Easy",
    estimatedTime: "4 min",
    seed: "first-grid",
    blanks: 5,
  }),
  createSudokuPuzzle({
    id: "sudoku-2",
    title: "Mint grid",
    description: "A fresh 4×4 Sudoku.",
    difficulty: "Easy",
    estimatedTime: "4 min",
    seed: "mint-grid",
    blanks: 6,
  }),
  createSudokuPuzzle({
    id: "sudoku-3",
    title: "Coral grid",
    description: "A medium 4×4 Sudoku challenge.",
    difficulty: "Medium",
    estimatedTime: "5 min",
    seed: "coral-grid",
    blanks: 7,
  }),
  createSudokuPuzzle({
    id: "sudoku-4",
    title: "Sun grid",
    description: "A 4×4 grid that rewards patience.",
    difficulty: "Medium",
    estimatedTime: "5 min",
    seed: "sun-grid",
    blanks: 8,
  }),
  createSudokuPuzzle({
    id: "sudoku-5",
    title: "Night grid",
    description: "The trickiest little grid in the set.",
    difficulty: "Hard",
    estimatedTime: "6 min",
    seed: "night-grid",
    blanks: 9,
  }),
];
