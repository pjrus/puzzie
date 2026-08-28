import { createZipPuzzle } from "@/lib/puzzles/generators/zip";

export const zipPuzzles = [
  createZipPuzzle({
    id: "zip-1",
    title: "First route",
    description: "Draw one path through every square, passing 1 to 8 in order.",
    difficulty: "Easy",
    estimatedTime: "4 min",
    seed: "first-route",
    size: 6,
  }),
  createZipPuzzle({
    id: "zip-2",
    title: "Corner office",
    description: "A neat 6×6 route with a few walls and turns to find.",
    difficulty: "Medium",
    estimatedTime: "5 min",
    seed: "corner-office",
    size: 6,
  }),
  createZipPuzzle({
    id: "zip-3",
    title: "Long way round",
    description: "Take the scenic route around the walls and fill the grid.",
    difficulty: "Hard",
    estimatedTime: "6 min",
    seed: "long-way-round",
    size: 6,
  }),
];
