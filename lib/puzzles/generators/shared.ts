import type { Difficulty, PuzzleBase, PuzzleType } from "@/lib/types";

const pointsByDifficulty: Record<Difficulty, number> = {
  Easy: 100,
  Medium: 150,
  Hard: 200,
};

export type PuzzleMetadata = Omit<PuzzleBase, "points" | "type"> & {
  points?: number;
};

export function createPuzzleBase<T extends PuzzleType>(
  type: T,
  metadata: PuzzleMetadata,
): PuzzleBase & { type: T } {
  return {
    ...metadata,
    type,
    points: metadata.points ?? pointsByDifficulty[metadata.difficulty],
  };
}

export function createSeededRandom(seed: string): () => number {
  let state = 2_166_136_261;

  for (const character of seed) {
    state ^= character.charCodeAt(0);
    state = Math.imul(state, 16_777_619);
  }

  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
  };
}

export function seededShuffle<T>(items: readonly T[], seed: string): T[] {
  const shuffled = [...items];
  const random = createSeededRandom(seed);

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [
      shuffled[swapIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}
