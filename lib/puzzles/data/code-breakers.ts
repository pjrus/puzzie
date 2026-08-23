import { createCodeBreakerPuzzle } from "@/lib/puzzles/generators/code-breaker";

export const codeBreakerPuzzles = [
  createCodeBreakerPuzzle({
    id: "code-1",
    title: "Coral code",
    description: "Crack the four-digit code from the clues.",
    difficulty: "Medium",
    estimatedTime: "5 min",
    seed: "coral-code",
    maxAttempts: 7,
  }),
  createCodeBreakerPuzzle({
    id: "code-2",
    title: "Mint machine",
    description: "Use the clues to unlock the machine.",
    difficulty: "Hard",
    estimatedTime: "6 min",
    seed: "mint-machine",
    maxAttempts: 8,
  }),
  createCodeBreakerPuzzle({
    id: "code-3",
    title: "Night shift",
    description: "A compact code for a sharp eye.",
    difficulty: "Hard",
    estimatedTime: "6 min",
    seed: "night-shift",
    maxAttempts: 8,
  }),
];
