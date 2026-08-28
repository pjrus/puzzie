import { createZipPuzzle } from "@/lib/puzzles/generators/zip";

export const zipPuzzles = [
  createZipPuzzle({
    id: "zip-1",
    title: "First route",
    description: "Connect every square from 1 to 25 in one continuous path.",
    difficulty: "Easy",
    estimatedTime: "3 min",
    seed: "first-route",
  }),
  createZipPuzzle({
    id: "zip-2",
    title: "Corner office",
    description: "A neat little route with a few turns to find.",
    difficulty: "Medium",
    estimatedTime: "4 min",
    seed: "corner-office",
  }),
  createZipPuzzle({
    id: "zip-3",
    title: "Long way round",
    description: "Take the scenic route and fill the whole grid.",
    difficulty: "Hard",
    estimatedTime: "5 min",
    seed: "long-way-round",
  }),
];
