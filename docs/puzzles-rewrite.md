# Rewriting `puzzles.ts`

## Summary

`lib/puzzles.ts` should become a small catalogue API backed by separate, type-safe data files. The current file is 1,378 lines long and combines three responsibilities:

- authored puzzle content;
- puzzle construction; and
- catalogue queries.

Separating these concerns would make individual puzzle types easier to edit, improve type checking, and allow mechanically derived puzzle data to be generated or validated instead of maintained by hand.

> **Assumption:** puzzles will remain local to the application for now rather than being loaded from a CMS or external API.

## Proposed structure

```text
lib/
  puzzles/
    data/
      sequences.ts
      word-scrambles.ts
      logic.ts
      patterns.ts
      maths.ts
      riddles.ts
      connections.ts
      word-ladders.ts
      odd-one-outs.ts
      trivia.ts
      code-breakers.ts
      sudoku.ts
      quickfire.ts
    generators/
      code-breaker.ts
      maths.ts
      pattern.ts
      sequence.ts
      sudoku.ts
      word-ladder.ts
    catalogue.ts
    queries.ts
    validation.ts
    index.ts
```

The `data` directory contains authored source material. The `generators` directory contains deterministic logic for puzzle types that can be calculated from smaller inputs. `index.ts` preserves the existing public imports so callers do not need to know how the catalogue is assembled.

## Replace the positional `base()` helper

The current `base()` helper saves a few lines, but its positional arguments are difficult to scan. Several adjacent arguments are strings or numbers, so mistakes are easy to introduce and hard to notice during review.

Each data file should use named object fields and `satisfies` instead:

```ts
import type { SequencePuzzle } from "@/lib/types";

export const sequencePuzzles = [
  {
    id: "sequence-1",
    type: "sequence",
    title: "Double down",
    description: "What number comes next?",
    difficulty: "Easy",
    points: 100,
    estimatedTime: "2 min",
    hints: [
      "Each number is multiplied by the same amount.",
      "The multiplier is 2.",
    ],
    sequence: [3, 6, 12, 24, "?"],
    answer: "48",
    explanation: "Every number is doubled.",
  },
] satisfies SequencePuzzle[];
```

This keeps every field visible and gives each file subtype-specific compile-time validation.

## Assemble the catalogue

`catalogue.ts` should only combine the puzzle groups:

```ts
import type { Puzzle } from "@/lib/types";
import { sequencePuzzles } from "./data/sequences";
import { wordScramblePuzzles } from "./data/word-scrambles";
// Import the remaining groups.

export const puzzles = [
  ...sequencePuzzles,
  ...wordScramblePuzzles,
  // Add the remaining groups.
] satisfies Puzzle[];
```

The exported array can remain ordered if catalogue order is part of the browsing and “next puzzle” behaviour.

## Isolate catalogue queries

`queries.ts` should hold lookup and selection behaviour. An ID index avoids repeatedly scanning the catalogue, while a generic type query retains the discriminated puzzle subtype:

```ts
import type { Puzzle, PuzzleType } from "@/lib/types";
import { puzzles } from "./catalogue";

const puzzleById = new Map(puzzles.map((puzzle) => [puzzle.id, puzzle]));

export function getPuzzleById(id: string): Puzzle | undefined {
  return puzzleById.get(id);
}

export function getPuzzlesByType<T extends PuzzleType>(
  type: T,
): Extract<Puzzle, { type: T }>[] {
  return puzzles.filter(
    (puzzle): puzzle is Extract<Puzzle, { type: T }> => puzzle.type === type,
  );
}
```

`index.ts` can then preserve the current public API:

```ts
export { puzzles } from "./catalogue";
export {
  getDailyPuzzle,
  getPuzzleById,
  getPuzzlesByType,
} from "./queries";
```

## Improve daily puzzle selection

The current daily selection adds the character codes in a formatted date. Many dates produce the same sum, which causes avoidable collisions. A UTC day number gives a simple, predictable rotation:

```ts
const millisecondsPerDay = 86_400_000;
const dailyPuzzles = puzzles.filter(
  (puzzle) => puzzle.type !== "quickfire",
);

export function getDailyPuzzle(date = new Date()): Puzzle {
  const dayNumber = Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) /
      millisecondsPerDay,
  );

  return dailyPuzzles[dayNumber % dailyPuzzles.length];
}
```

If the daily puzzle must be identical worldwide, the caller should also agree on which calendar date is authoritative. If it should follow the player’s local day, the local date key should be passed explicitly so server and browser time zones cannot disagree.

## Puzzles that do not need to be fully hardcoded

Generation should be deterministic. Avoid calling `Math.random()` while rendering: puzzle URLs, daily selection and saved progress rely on stable identities. Prefer one of these approaches:

1. Generate a static catalogue at build time and commit or package the result.
2. Recreate a puzzle from a stable, versioned seed such as `sequence:v1:42`.

A generator version must be part of the identity if changing its rules could produce a different puzzle from an existing seed.

### Strong candidates for generation

#### Maths

Store a rule or template rather than every question, answer and explanation.

```ts
{
  id: "maths-percentage-1",
  kind: "percentage",
  percentage: 15,
  value: 80,
  difficulty: "Easy",
}
```

The question, answer and step-by-step explanation can be derived. Suitable templates include arithmetic, percentages, linear equations, averages, missing angles and unit conversions.

#### Number sequences

Store the starting values and rule, then derive the visible sequence, missing term, answer and mechanical explanation. Useful rule families include:

- fixed addition or subtraction;
- multiplication or division;
- increasing gaps;
- alternating operations;
- square, cube and triangular numbers; and
- Fibonacci-style recurrence.

Generated sequences should be range-limited so answers remain appropriate for the selected difficulty.

#### Sudoku

The complete solution should be produced by a Sudoku generator. A clue-removal pass can then create the playable grid, while a solver confirms that it has exactly one solution.

Neither `grid` nor `solution` needs to be authored manually. Difficulty should be based on the solving techniques or search required, not only the number of blank cells. This would also prevent complete or nearly complete grids from being labelled as medium or hard.

#### Code breakers

Generate a code and candidate guesses, then calculate exact-match and misplaced-digit feedback. Structured feedback is safer than manually authored prose:

```ts
type CodeBreakerClue = {
  guess: string;
  exact: number;
  misplaced: number;
};
```

The interface can turn those counts into consistent wording. A solver should verify that the final clue set has one valid answer.

#### Simple visual patterns

Rotation, alternation, repetition, shape progression and colour-cycle patterns can be generated from explicit rules. The displayed items, choices and answer can all be derived.

The visual symbols themselves should come from a curated, accessible set. Generated distractors must remain visually distinct and should have readable text labels for assistive technology.

### Partially generated candidates

#### Word scrambles

Keep a curated word bank with category, difficulty and hints. Generate the scrambled letter order and derive the canonical answer. The generator should reject arrangements that leave the original word unchanged and should use a seeded shuffle.

#### Word ladders

Keep a curated dictionary, then use a graph search to calculate valid one-letter paths. Endpoints may be selected automatically, but generated paths should be reviewed for obscure words and unintended alternatives. The solution path and its validity do not need to be maintained manually.

#### Odd one out

Generate sets from curated taxonomies such as fruits, primes, shapes or animals. The underlying categories must remain authored because semantic ambiguity is part of the puzzle quality. Generated sets should be checked to ensure there is only one defensible answer.

#### Quickfire

Treat Quickfire as a session assembled from reusable question providers rather than one hardcoded question array. Arithmetic, number sequences and scrambles can be generated; trivia and language questions can be sampled from curated banks. A seed can reproduce the same session if required.

### Better kept as authored content

These types rely more on language, cultural knowledge, ambiguity or deliberate misdirection:

- riddles;
- prose logic puzzles;
- trivia facts and explanations; and
- Connections categories and word groupings.

They can still use reusable metadata defaults and automated validation, but fully generating their substance is likely to reduce quality. Trivia also needs a review date or source because some facts can change over time.

## Derived metadata

Some repeated metadata can be calculated centrally rather than stored on every puzzle. For example, if points always follow difficulty:

```ts
const pointsByDifficulty = {
  Easy: 100,
  Medium: 150,
  Hard: 200,
} as const;
```

Defaults for estimated time and hint penalties can be defined by puzzle type and difficulty, with an explicit override for unusual puzzles. Stable puzzle IDs should not be generated from array positions because reordering the catalogue would break saved history.

## Catalogue validation

Add automated tests or a development-time validator for invariants that TypeScript cannot express:

- puzzle IDs and quickfire-question IDs are unique;
- required text and hints are not empty;
- a multiple-choice answer appears in its options;
- a scramble contains exactly the letters in its answer;
- every word-ladder step changes one letter and uses an allowed word;
- Connections words appear in exactly one group;
- generated code-breaker clues have exactly one solution;
- Sudoku grids are valid and have exactly one solution;
- pattern hints, answers and explanations agree; and
- at least one non-Quickfire puzzle is available for daily selection.

These checks are particularly valuable for the current catalogue because content can be structurally valid TypeScript while still being unsolvable, contradictory or incorrectly graded.

## Migration order

1. Create the `lib/puzzles` module and preserve the existing exports.
2. Move each puzzle type into its own data file without changing content.
3. Add catalogue validation and fix any invalid existing puzzles.
4. Replace the daily selection algorithm and add date-based tests.
5. Introduce generators for maths, sequences, Sudoku and code breakers.
6. Move scrambles, ladders, patterns and Quickfire to hybrid generation where useful.
7. Keep authored language-heavy puzzles as curated data files.

This order keeps the refactor separate from content changes and makes regressions easier to identify.
