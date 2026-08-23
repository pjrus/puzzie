import { base } from "@/lib/puzzles/base";
import { createQuickfireSession } from "@/lib/puzzles/generators/quickfire";
import type { QuickfirePuzzle, QuickfireQuestion } from "@/lib/types";

function multiplicationQuestion(
  id: string,
  left: number,
  right: number,
): QuickfireQuestion {
  return {
    id,
    prompt: `What is ${left} × ${right}?`,
    kind: "number",
    answer: String(left * right),
  };
}

function additionQuestion(
  id: string,
  left: number,
  right: number,
): QuickfireQuestion {
  return {
    id,
    prompt: `What is ${left} + ${right}?`,
    kind: "number",
    answer: String(left + right),
  };
}

function scrambleQuestion(id: string, word: string): QuickfireQuestion {
  return {
    id,
    prompt: `Unscramble: ${[...word.toUpperCase()].reverse().join(" ")}`,
    kind: "word",
    answer: word,
  };
}

const questionBank: QuickfireQuestion[] = [
  multiplicationQuestion("qf-1", 9, 6),
  {
    id: "qf-2",
    prompt: "Which planet is known as the Red Planet?",
    kind: "choice",
    answer: "Mars",
    options: ["Venus", "Mars", "Jupiter", "Mercury"],
  },
  {
    id: "qf-3",
    prompt: "What comes next: 5, 10, 15, ?",
    kind: "number",
    answer: "20",
  },
  {
    id: "qf-4",
    prompt: "Which word is the odd one out?",
    kind: "choice",
    answer: "Violin",
    options: ["Piano", "Violin", "Flute", "Trumpet"],
  },
  {
    id: "qf-5",
    prompt: "How many sides does a hexagon have?",
    kind: "number",
    answer: "6",
  },
  scrambleQuestion("qf-6", "Bear"),
  {
    id: "qf-7",
    prompt: "Which ocean is the largest?",
    kind: "choice",
    answer: "Pacific",
    options: ["Atlantic", "Indian", "Pacific", "Arctic"],
  },
  {
    id: "qf-8",
    prompt: "What is 100 ÷ 4?",
    kind: "number",
    answer: "25",
  },
  {
    id: "qf-9",
    prompt: "What is the opposite of ancient?",
    kind: "choice",
    answer: "Modern",
    options: ["Tiny", "Modern", "Quiet", "Round"],
  },
  {
    id: "qf-10",
    prompt: "What comes next: A, C, E, ?",
    kind: "word",
    answer: "G",
  },
  {
    id: "qf-11",
    prompt: "Which animal is a mammal?",
    kind: "choice",
    answer: "Dolphin",
    options: ["Shark", "Dolphin", "Trout", "Lizard"],
  },
  additionQuestion("qf-12", 17, 8),
  scrambleQuestion("qf-13", "Orange"),
  {
    id: "qf-14",
    prompt: "How many minutes are in one hour?",
    kind: "number",
    answer: "60",
  },
];

export const quickfirePuzzles = [
  {
    ...base({
      id: "quickfire-1",
      type: "quickfire",
      title: "One-minute brain sprint",
      description: "How many tiny puzzles can you clear before the buzzer?",
      difficulty: "Medium",
      points: 150,
      estimatedTime: "60 sec",
      hints: [
        "Read the whole question before tapping.",
        "Quick, accurate answers beat rushed guesses.",
      ],
    }),
    duration: 60,
    questions: createQuickfireSession(questionBank, "quickfire-1"),
  },
] satisfies QuickfirePuzzle[];
