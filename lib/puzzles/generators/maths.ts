import type { MathsPuzzle } from "@/lib/types";
import {
  createPuzzleBase,
  type PuzzleMetadata,
} from "@/lib/puzzles/generators/shared";

type PercentageSpec = {
  kind: "percentage";
  percentage: number;
  value: number;
};

type LinearEquationSpec = {
  kind: "linear-equation";
  coefficient: number;
  constant: number;
  result: number;
};

type MultiplicationSpec = {
  kind: "multiplication";
  left: number;
  right: number;
};

type TriangleAngleSpec = {
  kind: "triangle-angle";
  first: number;
  second: number;
};

type MissingAverageSpec = {
  kind: "missing-average";
  average: number;
  knownValues: number[];
};

type MathsRule =
  | PercentageSpec
  | LinearEquationSpec
  | MultiplicationSpec
  | TriangleAngleSpec
  | MissingAverageSpec;

export type MathsPuzzleSpec = Omit<PuzzleMetadata, "hints"> & MathsRule;

function buildMathsContent(
  rule: MathsRule,
): Pick<MathsPuzzle, "answer" | "explanation" | "hints" | "question"> {
  switch (rule.kind) {
    case "percentage": {
      const answer = (rule.percentage / 100) * rule.value;
      return {
        question: `What is ${rule.percentage}% of ${rule.value}?`,
        answer: String(answer),
        hints: ["Find 10% first.", "Break the percentage into easy parts."],
        explanation: `${rule.percentage}% of ${rule.value} is ${answer}.`,
      };
    }
    case "linear-equation": {
      const answer = (rule.result - rule.constant) / rule.coefficient;
      return {
        question: `Solve for x: ${rule.coefficient}x + ${rule.constant} = ${rule.result}`,
        answer: String(answer),
        hints: [
          `Subtract ${rule.constant} from both sides.`,
          `Then divide by ${rule.coefficient}.`,
        ],
        explanation: `Subtract ${rule.constant} to get ${rule.coefficient}x = ${rule.result - rule.constant}, then divide by ${rule.coefficient}: x = ${answer}.`,
      };
    }
    case "multiplication": {
      const answer = rule.left * rule.right;
      const tens = Math.floor(rule.right / 10) * 10;
      const remainder = rule.right - tens;
      return {
        question: `What is ${rule.left} × ${rule.right}?`,
        answer: String(answer),
        hints: [
          "Multiply the tens first.",
          `${rule.left} × ${rule.right} = ${rule.left} × (${tens} + ${remainder}).`,
        ],
        explanation: `${rule.left} × ${tens} is ${rule.left * tens} and ${rule.left} × ${remainder} is ${rule.left * remainder}. Together that makes ${answer}.`,
      };
    }
    case "triangle-angle": {
      const answer = 180 - rule.first - rule.second;
      return {
        question: `A triangle has angles of ${rule.first}° and ${rule.second}°. What is the third angle?`,
        answer: String(answer),
        hints: [
          "Angles in a triangle total 180°.",
          "Add the known angles first.",
        ],
        explanation: `${rule.first}° + ${rule.second}° = ${rule.first + rule.second}°, and 180° − ${rule.first + rule.second}° = ${answer}°.`,
      };
    }
    case "missing-average": {
      const count = rule.knownValues.length + 1;
      const total = rule.average * count;
      const knownTotal = rule.knownValues.reduce(
        (sum, value) => sum + value,
        0,
      );
      const answer = total - knownTotal;
      const values = new Intl.ListFormat("en-AU").format(
        rule.knownValues.map(String),
      );
      return {
        question: `The average of ${count} numbers is ${rule.average}. ${rule.knownValues.length === 4 ? "Four" : rule.knownValues.length} numbers are ${values}. What is the missing number?`,
        answer: String(answer),
        hints: [
          "Multiply the average by the number of values.",
          `The total of all values is ${total}.`,
        ],
        explanation: `The total must be ${total}. The known numbers total ${knownTotal}, so the missing number is ${answer}.`,
      };
    }
  }
}

export function createMathsPuzzle(spec: MathsPuzzleSpec): MathsPuzzle {
  const { kind, ...rest } = spec;
  const rule = { kind, ...rest } as MathsRule;
  const { id, title, description, difficulty, estimatedTime, points } = spec;
  const content = buildMathsContent(rule);

  return {
    ...createPuzzleBase("maths", {
      id,
      title,
      description,
      difficulty,
      estimatedTime,
      points,
      hints: content.hints,
    }),
    question: content.question,
    answer: content.answer,
    explanation: content.explanation,
  };
}
