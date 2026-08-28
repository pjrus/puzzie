import {
  createPuzzleBase,
  seededShuffle,
  type PuzzleMetadata,
} from "@/lib/puzzles/generators/shared";
import type { ZipPuzzle } from "@/lib/types";

type Coordinate = [number, number];

export type ZipPuzzleSpec = Omit<PuzzleMetadata, "hints"> & {
  seed: string;
  size?: number;
};

function rowSnake(size: number): Coordinate[] {
  return Array.from({ length: size }, (_, row) => {
    const columns = Array.from({ length: size }, (_, column) => column);
    if (row % 2 === 1) columns.reverse();
    return columns.map((column) => [row, column] as Coordinate);
  }).flat();
}

function columnSnake(size: number): Coordinate[] {
  return Array.from({ length: size }, (_, column) => {
    const rows = Array.from({ length: size }, (_, row) => row);
    if (column % 2 === 1) rows.reverse();
    return rows.map((row) => [row, column] as Coordinate);
  }).flat();
}

function spiral(size: number): Coordinate[] {
  const path: Coordinate[] = [];
  let top = 0;
  let bottom = size - 1;
  let left = 0;
  let right = size - 1;

  while (top <= bottom && left <= right) {
    for (let column = left; column <= right; column += 1)
      path.push([top, column]);
    top += 1;
    for (let row = top; row <= bottom; row += 1) path.push([row, right]);
    right -= 1;
    if (top <= bottom) {
      for (let column = right; column >= left; column -= 1)
        path.push([bottom, column]);
      bottom -= 1;
    }
    if (left <= right) {
      for (let row = bottom; row >= top; row -= 1) path.push([row, left]);
      left += 1;
    }
  }

  return path;
}

function createPath(size: number, seed: string): Coordinate[] {
  const paths = [rowSnake(size), columnSnake(size), spiral(size)];
  return seededShuffle(paths, `${seed}:paths`)[0];
}

export function createZipPuzzle(spec: ZipPuzzleSpec): ZipPuzzle {
  const { seed, size = 5, ...metadata } = spec;
  const path = createPath(size, seed);
  const solution = Array.from({ length: size }, () => Array(size).fill(0));

  path.forEach(([row, column], index) => {
    solution[row][column] = index + 1;
  });

  // Landmarks make the route deducible without giving away every turn.
  const clueNumbers = Array.from(
    { length: Math.ceil((size * size) / 4) },
    (_, index) => 1 + index * 4,
  );
  const grid = solution.map((row) => row.map(() => 0));
  clueNumbers.forEach((number) => {
    const [row, column] = path[number - 1];
    grid[row][column] = number;
  });

  return {
    ...createPuzzleBase("zip", {
      ...metadata,
      hints: [
        "Start at 1 and move one square up, down, left or right.",
        "Every square must be part of the path, including the numbered landmarks.",
      ],
    }),
    size,
    grid,
    solution,
    explanation:
      "You zipped through every square in order. Nice route planning.",
  };
}
