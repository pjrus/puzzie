import type { CodeBreakerClue, CodeBreakerPuzzle } from "@/lib/types";
import {
  createPuzzleBase,
  seededShuffle,
  type PuzzleMetadata,
} from "@/lib/puzzles/generators/shared";
export { formatCodeBreakerClue } from "@/lib/puzzles/code-breaker";

export type CodeBreakerPuzzleSpec = Omit<PuzzleMetadata, "hints"> & {
  seed: string;
  maxAttempts: number;
};

const candidateCodes = createCandidateCodes();

function createCandidateCodes(): string[] {
  const codes: string[] = [];
  for (let first = 0; first <= 9; first += 1) {
    for (let second = 0; second <= 9; second += 1) {
      for (let third = 0; third <= 9; third += 1) {
        for (let fourth = 0; fourth <= 9; fourth += 1) {
          const code = `${first}${second}${third}${fourth}`;
          if (new Set(code).size === 4) codes.push(code);
        }
      }
    }
  }
  return codes;
}

export function scoreCodeGuess(code: string, guess: string): CodeBreakerClue {
  let exact = 0;
  let shared = 0;

  for (let index = 0; index < code.length; index += 1) {
    if (code[index] === guess[index]) exact += 1;
    if (code.includes(guess[index])) shared += 1;
  }

  return { guess, exact, misplaced: shared - exact };
}

function sameFeedback(
  candidate: string,
  targetFeedback: CodeBreakerClue,
): boolean {
  const feedback = scoreCodeGuess(candidate, targetFeedback.guess);
  return (
    feedback.exact === targetFeedback.exact &&
    feedback.misplaced === targetFeedback.misplaced
  );
}

function createClues(code: string, seed: string): CodeBreakerClue[] {
  let possibleCodes = candidateCodes;
  const guesses = seededShuffle(candidateCodes, `${seed}:clues`);
  const clues: CodeBreakerClue[] = [];
  let offset = 0;

  while (possibleCodes.length > 1 && clues.length < 8) {
    const candidates = guesses.slice(offset, offset + 128);
    offset += 128;
    let bestGuess = candidates[0];
    let bestRemaining = possibleCodes.length;

    for (const guess of candidates) {
      if (guess === code) continue;
      const feedback = scoreCodeGuess(code, guess);
      const remaining = possibleCodes.reduce(
        (count, candidate) => count + Number(sameFeedback(candidate, feedback)),
        0,
      );
      if (remaining < bestRemaining) {
        bestGuess = guess;
        bestRemaining = remaining;
      }
    }

    const clue = scoreCodeGuess(code, bestGuess);
    clues.push(clue);
    possibleCodes = possibleCodes.filter((candidate) =>
      sameFeedback(candidate, clue),
    );
  }

  if (possibleCodes.length !== 1) {
    throw new Error(`Could not generate a unique code-breaker for ${seed}.`);
  }

  return clues;
}

export function countCodeBreakerSolutions(clues: CodeBreakerClue[]): number {
  return candidateCodes.reduce(
    (count, candidate) =>
      count + Number(clues.every((clue) => sameFeedback(candidate, clue))),
    0,
  );
}

export function createCodeBreakerPuzzle(
  spec: CodeBreakerPuzzleSpec,
): CodeBreakerPuzzle {
  const { seed, maxAttempts, ...metadata } = spec;
  const code = seededShuffle(
    ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    `${seed}:code:v1`,
  )
    .slice(0, 4)
    .join("");
  const clues = createClues(code, seed);

  return {
    ...createPuzzleBase("code-breaker", {
      ...metadata,
      hints: [
        "Compare exact positions before looking for misplaced digits.",
        "The code uses four different digits.",
      ],
    }),
    code,
    clues,
    maxAttempts,
    explanation: `The code is ${code}. Each clue narrows the possible digits and positions.`,
  };
}
