import type { SudokuPuzzle } from "@/lib/types";
import {
  createPuzzleBase,
  createSeededRandom,
  seededShuffle,
  type PuzzleMetadata,
} from "@/lib/puzzles/generators/shared";

type Grid = number[][];

export type SudokuPuzzleSpec = Omit<PuzzleMetadata, "hints"> & {
  seed: string;
  blanks: number;
};

function isAllowed(grid: Grid, row: number, column: number, value: number) {
  const boxRow = Math.floor(row / 2) * 2;
  const boxColumn = Math.floor(column / 2) * 2;

  return (
    !grid[row].includes(value) &&
    !grid.some((candidateRow) => candidateRow[column] === value) &&
    ![0, 1].some((rowOffset) =>
      [0, 1].some(
        (columnOffset) =>
          grid[boxRow + rowOffset][boxColumn + columnOffset] === value,
      ),
    )
  );
}

export function countSudokuSolutions(grid: Grid, limit = 2): number {
  const workingGrid = grid.map((row) => [...row]);
  let solutions = 0;

  function solve(): void {
    if (solutions >= limit) return;

    let emptyCell: [number, number] | undefined;
    for (let row = 0; row < 4 && !emptyCell; row += 1) {
      for (let column = 0; column < 4; column += 1) {
        if (workingGrid[row][column] === 0) {
          emptyCell = [row, column];
          break;
        }
      }
    }

    if (!emptyCell) {
      solutions += 1;
      return;
    }

    const [row, column] = emptyCell;
    for (let value = 1; value <= 4; value += 1) {
      if (!isAllowed(workingGrid, row, column, value)) continue;
      workingGrid[row][column] = value;
      solve();
      workingGrid[row][column] = 0;
    }
  }

  solve();
  return solutions;
}

function createSolution(seed: string): Grid {
  const baseGrid = Array.from({ length: 4 }, (_, row) =>
    Array.from(
      { length: 4 },
      (_, column) => ((row * 2 + Math.floor(row / 2) + column) % 4) + 1,
    ),
  );
  const random = createSeededRandom(seed);
  const digits = seededShuffle([1, 2, 3, 4], `${seed}:digits`);
  const rowOrders = [
    [0, 1, 2, 3],
    [1, 0, 2, 3],
    [0, 1, 3, 2],
    [2, 3, 0, 1],
    [3, 2, 1, 0],
  ];
  const columnOrders = rowOrders;
  const rows = rowOrders[Math.floor(random() * rowOrders.length)];
  const columns = columnOrders[Math.floor(random() * columnOrders.length)];

  return rows.map((row) =>
    columns.map((column) => digits[baseGrid[row][column] - 1]),
  );
}

function createPlayableGrid(
  solution: Grid,
  blanks: number,
  seed: string,
): Grid {
  const grid = solution.map((row) => [...row]);
  const cells = seededShuffle(
    Array.from({ length: 16 }, (_, index) => index),
    `${seed}:blanks`,
  );
  let removed = 0;

  for (const cell of cells) {
    if (removed >= blanks) break;
    const row = Math.floor(cell / 4);
    const column = cell % 4;
    const previous = grid[row][column];
    grid[row][column] = 0;

    if (countSudokuSolutions(grid) === 1) {
      removed += 1;
    } else {
      grid[row][column] = previous;
    }
  }

  return grid;
}

export function createSudokuPuzzle(spec: SudokuPuzzleSpec): SudokuPuzzle {
  const { seed, blanks, ...metadata } = spec;
  const solution = createSolution(`${seed}:sudoku:v1`);
  const grid = createPlayableGrid(solution, blanks, seed);

  return {
    ...createPuzzleBase("sudoku", {
      ...metadata,
      hints: [
        "Each row needs 1, 2, 3, and 4.",
        "Use rows, columns and 2×2 boxes together.",
      ],
    }),
    grid,
    solution,
    explanation: "Each number appears once in every row, column and 2×2 box.",
  };
}
