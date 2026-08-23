import { createPatternPuzzle } from "@/lib/puzzles/generators/pattern";

export const patternPuzzles = [
  createPatternPuzzle({
    id: "pattern-1",
    title: "Dot dash",
    description: "Which tile completes the rhythm?",
    difficulty: "Easy",
    estimatedTime: "2 min",
    cycle: ["●", "○"],
    visibleItems: 4,
    options: ["●", "○", "◆", "□"],
    hints: ["The filled and empty dots alternate.", "The next tile is filled."],
    explanation: "The pattern alternates between a filled and an empty circle.",
  }),
  createPatternPuzzle({
    id: "pattern-2",
    title: "Turn the corner",
    description: "Find the shape that keeps rotating.",
    difficulty: "Easy",
    estimatedTime: "2 min",
    cycle: ["↑", "→", "↓", "←"],
    visibleItems: 3,
    options: ["↑", "→", "←", "↖"],
    hints: [
      "The arrow turns clockwise each time.",
      "The next direction points left.",
    ],
    explanation:
      "The sequence rotates 90 degrees each step: up, right, down, left.",
  }),
  createPatternPuzzle({
    id: "pattern-3",
    title: "Shape stack",
    description: "Which symbol follows the shape sequence?",
    difficulty: "Medium",
    estimatedTime: "3 min",
    cycle: ["△", "□", "⬟", "⬢"],
    visibleItems: 3,
    options: ["○", "⬢", "☆", "◇"],
    hints: [
      "The number of sides increases.",
      "A triangle becomes a square, then a pentagon.",
    ],
    explanation:
      "The sequence moves from 3 sides to 4, then 5, then 6: a hexagon.",
  }),
  createPatternPuzzle({
    id: "pattern-4",
    title: "Colour rhythm",
    description: "Choose the missing colour chip.",
    difficulty: "Medium",
    estimatedTime: "3 min",
    cycle: ["MINT", "MINT", "CORAL", "CORAL"],
    visibleItems: 4,
    options: ["MINT", "CORAL", "SUN", "INK"],
    hints: ["The colours repeat in pairs.", "The next colour is mint."],
    explanation:
      "The pattern repeats two mint chips, then two coral chips. The next pair starts with mint.",
  }),
  createPatternPuzzle({
    id: "pattern-5",
    title: "Count the corners",
    description: "Look closely at how the shapes grow.",
    difficulty: "Hard",
    estimatedTime: "4 min",
    cycle: ["□", "⬡", "★", "✦"],
    visibleItems: 3,
    options: ["△", "✦", "○", "▱"],
    hints: ["The number of corners increases by two.", "Start at 4 corners."],
    explanation:
      "The shapes move from 4 to 6 to 8 corners; the eight-point star is next.",
  }),
];
