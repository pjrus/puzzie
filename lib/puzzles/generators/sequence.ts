import type { SequencePuzzle } from "@/lib/types";
import {
  createPuzzleBase,
  type PuzzleMetadata,
} from "@/lib/puzzles/generators/shared";

type AdditiveRule = {
  kind: "add";
  start: number;
  step: number;
};

type GeometricRule = {
  kind: "multiply";
  start: number;
  factor: number;
};

type IncreasingGapRule = {
  kind: "increasing-gap";
  start: number;
  firstGap: number;
  gapIncrease: number;
};

type AlternatingRule = {
  kind: "alternating";
  start: number;
  multiplyBy: number;
  add: number;
};

type PowerRule = {
  kind: "power";
  exponent: number;
};

type FibonacciRule = {
  kind: "fibonacci";
  first: number;
  second: number;
};

export type SequenceRule =
  | AdditiveRule
  | GeometricRule
  | IncreasingGapRule
  | AlternatingRule
  | PowerRule
  | FibonacciRule;

export type SequencePuzzleSpec = Omit<PuzzleMetadata, "hints"> & {
  rule: SequenceRule;
  length: number;
  missingIndex?: number;
};

function buildValues(rule: SequenceRule, length: number): number[] {
  switch (rule.kind) {
    case "add":
      return Array.from(
        { length },
        (_, index) => rule.start + rule.step * index,
      );
    case "multiply":
      return Array.from(
        { length },
        (_, index) => rule.start * rule.factor ** index,
      );
    case "increasing-gap": {
      const values = [rule.start];
      let gap = rule.firstGap;
      while (values.length < length) {
        values.push(values.at(-1)! + gap);
        gap += rule.gapIncrease;
      }
      return values;
    }
    case "alternating": {
      const values = [rule.start];
      while (values.length < length) {
        const previous = values.at(-1)!;
        const operationIndex = values.length - 1;
        values.push(
          operationIndex % 2 === 0
            ? previous * rule.multiplyBy
            : previous + rule.add,
        );
      }
      return values;
    }
    case "power":
      return Array.from({ length }, (_, index) => (index + 1) ** rule.exponent);
    case "fibonacci": {
      const values = [rule.first, rule.second];
      while (values.length < length) {
        values.push(values.at(-1)! + values.at(-2)!);
      }
      return values.slice(0, length);
    }
  }
}

function describeRule(rule: SequenceRule): {
  hints: string[];
  explanation: string;
} {
  switch (rule.kind) {
    case "add":
      return {
        hints: ["Compare neighbouring terms.", `Add ${rule.step} each time.`],
        explanation: `Each term increases by ${rule.step}.`,
      };
    case "multiply":
      return {
        hints: [
          "Each number is multiplied by the same amount.",
          `The multiplier is ${rule.factor}.`,
        ],
        explanation: `Each term is multiplied by ${rule.factor}.`,
      };
    case "increasing-gap":
      return {
        hints: [
          "Look at the gaps between the numbers.",
          `The gaps grow by ${rule.gapIncrease}.`,
        ],
        explanation: `The gaps begin at ${rule.firstGap} and increase by ${rule.gapIncrease} each time.`,
      };
    case "alternating":
      return {
        hints: [
          "Try alternating two operations.",
          `Multiply by ${rule.multiplyBy}, then add ${rule.add}.`,
        ],
        explanation: `The sequence alternates ×${rule.multiplyBy} and +${rule.add}.`,
      };
    case "power":
      return {
        hints: [
          "Compare each number with its position.",
          `Each term is raised to the power of ${rule.exponent}.`,
        ],
        explanation: `The terms are consecutive numbers raised to the power of ${rule.exponent}.`,
      };
    case "fibonacci":
      return {
        hints: [
          "Each number is made from the two before it.",
          "Add the previous two numbers.",
        ],
        explanation: "Each term is the sum of the previous two terms.",
      };
  }
}

export function createSequencePuzzle(spec: SequencePuzzleSpec): SequencePuzzle {
  const { rule, length, missingIndex = length - 1, ...metadata } = spec;
  const values = buildValues(rule, length);
  const ruleDescription = describeRule(rule);

  return {
    ...createPuzzleBase("sequence", {
      ...metadata,
      hints: ruleDescription.hints,
    }),
    sequence: values.map((value, index) =>
      index === missingIndex ? "?" : value,
    ),
    answer: String(values[missingIndex]),
    explanation: ruleDescription.explanation,
  };
}
