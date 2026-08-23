import type { PuzzleBase, PuzzleType } from "@/lib/types";

type PuzzleBaseInput<T extends PuzzleType> = Omit<PuzzleBase, "type"> & {
  type: T;
};

export const base = <T extends PuzzleType>(input: PuzzleBaseInput<T>) => input;
