import { countCodeBreakerSolutions } from "@/lib/puzzles/generators/code-breaker";
import { countSudokuSolutions } from "@/lib/puzzles/generators/sudoku";
import type { Puzzle, SudokuPuzzle } from "@/lib/types";

function normaliseLetters(value: string): string {
  return [...value.toLowerCase()].sort().join("");
}

function differsByOneLetter(left: string, right: string): boolean {
  if (left.length !== right.length) return false;
  let differences = 0;
  for (let index = 0; index < left.length; index += 1) {
    if (left[index] !== right[index]) differences += 1;
  }
  return differences === 1;
}

function isValidSudokuSolution(puzzle: SudokuPuzzle): boolean {
  const expected = "1234";
  const rowsValid = puzzle.solution.every(
    (row) => [...row].sort().join("") === expected,
  );
  const columnsValid = [0, 1, 2, 3].every(
    (column) =>
      puzzle.solution
        .map((row) => row[column])
        .sort()
        .join("") === expected,
  );
  const boxesValid = [0, 2].every((row) =>
    [0, 2].every((column) => {
      const box = [
        puzzle.solution[row][column],
        puzzle.solution[row][column + 1],
        puzzle.solution[row + 1][column],
        puzzle.solution[row + 1][column + 1],
      ];
      return box.sort().join("") === expected;
    }),
  );
  return rowsValid && columnsValid && boxesValid;
}

export function validatePuzzleCatalogue(puzzles: readonly Puzzle[]): void {
  const errors: string[] = [];
  const puzzleIds = new Set<string>();
  const quickfireIds = new Set<string>();

  if (!puzzles.some((puzzle) => puzzle.type !== "quickfire")) {
    errors.push("The catalogue must contain at least one daily puzzle.");
  }

  for (const puzzle of puzzles) {
    if (puzzleIds.has(puzzle.id))
      errors.push(`Duplicate puzzle ID: ${puzzle.id}`);
    puzzleIds.add(puzzle.id);

    if (
      !puzzle.title.trim() ||
      !puzzle.description.trim() ||
      puzzle.hints.some((hint) => !hint.trim())
    ) {
      errors.push(`${puzzle.id} contains empty required text.`);
    }

    if (
      (puzzle.type === "logic" ||
        puzzle.type === "pattern" ||
        puzzle.type === "trivia") &&
      !puzzle.options.includes(puzzle.answer)
    ) {
      errors.push(`${puzzle.id} has an answer missing from its options.`);
    }

    if (puzzle.type === "word-scramble") {
      const letters = normaliseLetters(puzzle.letters.join(""));
      if (
        !puzzle.answers.some((answer) => normaliseLetters(answer) === letters)
      ) {
        errors.push(`${puzzle.id} letters do not match an accepted answer.`);
      }
    }

    if (puzzle.type === "word-ladder") {
      const invalidStep = puzzle.solution
        .slice(1)
        .some(
          (word, index) => !differsByOneLetter(puzzle.solution[index], word),
        );
      if (
        puzzle.solution[0] !== puzzle.start ||
        puzzle.solution.at(-1) !== puzzle.target ||
        invalidStep
      ) {
        errors.push(`${puzzle.id} has an invalid word-ladder solution.`);
      }
    }

    if (puzzle.type === "connections") {
      const words = puzzle.words.map((word) => word.toUpperCase());
      const groupedWords = puzzle.groups.flatMap((group) =>
        group.words.map((word) => word.toUpperCase()),
      );
      if (
        new Set(words).size !== words.length ||
        new Set(groupedWords).size !== groupedWords.length ||
        words.length !== groupedWords.length ||
        words.some((word) => !groupedWords.includes(word))
      ) {
        errors.push(`${puzzle.id} must group every word exactly once.`);
      }
    }

    if (
      puzzle.type === "code-breaker" &&
      countCodeBreakerSolutions(puzzle.clues) !== 1
    ) {
      errors.push(`${puzzle.id} does not have exactly one code solution.`);
    }

    if (puzzle.type === "sudoku") {
      const hasBlank = puzzle.grid.some((row) => row.includes(0));
      const givensMatch = puzzle.grid.every((row, rowIndex) =>
        row.every(
          (value, columnIndex) =>
            value === 0 || value === puzzle.solution[rowIndex][columnIndex],
        ),
      );
      if (
        !hasBlank ||
        !givensMatch ||
        !isValidSudokuSolution(puzzle) ||
        countSudokuSolutions(puzzle.grid) !== 1
      ) {
        errors.push(`${puzzle.id} is not a valid, uniquely solvable Sudoku.`);
      }
    }

    if (puzzle.type === "quickfire") {
      for (const question of puzzle.questions) {
        if (quickfireIds.has(question.id)) {
          errors.push(`Duplicate Quickfire question ID: ${question.id}`);
        }
        quickfireIds.add(question.id);
        if (
          question.kind === "choice" &&
          !question.options?.includes(question.answer)
        ) {
          errors.push(`${question.id} has an answer missing from its options.`);
        }
      }
    }
  }

  if (errors.length > 0) {
    throw new Error(`Invalid puzzle catalogue:\n- ${errors.join("\n- ")}`);
  }
}
