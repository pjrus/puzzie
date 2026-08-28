import {
  createPuzzleBase,
  seededShuffle,
  type PuzzleMetadata,
} from "@/lib/puzzles/generators/shared";
import type { ZipPuzzle, ZipWall } from "@/lib/types";

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

function edgeKey(left: Coordinate, right: Coordinate) {
  const [first, second] =
    left[0] < right[0] || (left[0] === right[0] && left[1] < right[1])
      ? [left, right]
      : [right, left];
  return `${first[0]}:${first[1]}-${second[0]}:${second[1]}`;
}

function createWalls(
  size: number,
  path: Coordinate[],
  seed: string,
): ZipWall[] {
  const pathEdges = new Set(
    path.slice(1).map((cell, index) => edgeKey(path[index], cell)),
  );
  const candidates: ZipWall[] = [];

  for (let row = 0; row < size; row += 1) {
    for (let column = 0; column < size; column += 1) {
      const cell: Coordinate = [row, column];
      if (column < size - 1) {
        const right: Coordinate = [row, column + 1];
        if (!pathEdges.has(edgeKey(cell, right)))
          candidates.push({ from: cell, to: right });
      }
      if (row < size - 1) {
        const below: Coordinate = [row + 1, column];
        if (!pathEdges.has(edgeKey(cell, below)))
          candidates.push({ from: cell, to: below });
      }
    }
  }

  return seededShuffle(candidates, `${seed}:walls`).slice(
    0,
    Math.floor(size * 1.25),
  );
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
    { length: Math.ceil((size * size) / 5) },
    (_, index) => index * 5,
  );
  const grid = solution.map((row) => row.map(() => 0));
  clueNumbers.forEach((pathIndex, index) => {
    const [row, column] = path[pathIndex];
    grid[row][column] = index + 1;
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
    walls: createWalls(size, path, seed),
    explanation:
      "You zipped through every square in order. Nice route planning.",
  };
}
