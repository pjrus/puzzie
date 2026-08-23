import type { QuickfireQuestion } from "@/lib/types";
import { seededShuffle } from "@/lib/puzzles/generators/shared";

export function createQuickfireSession(
  questions: readonly QuickfireQuestion[],
  seed: string,
): QuickfireQuestion[] {
  return seededShuffle(questions, `${seed}:quickfire:v1`);
}
