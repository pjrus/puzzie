import type { LogicPuzzle } from "@/lib/types";
import { base } from "@/lib/puzzles/base";

export const logicPuzzles = [
  {
    ...base({
      id: "logic-1",
      type: "logic",
      title: "Tall order",
      description: "Read the clues, then choose the shortest person.",
      difficulty: "Easy",
      points: 100,
      estimatedTime: "2 min",
      hints: ["Sam is between Alex and Jamie.", "Alex is taller than Sam."],
    }),
    prompt:
      "Alex is taller than Sam. Sam is taller than Jamie. Who is the shortest?",
    options: ["Alex", "Sam", "Jamie", "They are the same height"],
    answer: "Jamie",
    explanation: "The order from tallest to shortest is Alex, Sam, Jamie.",
  },
  {
    ...base({
      id: "logic-2",
      type: "logic",
      title: "Lunch line",
      description: "Who can go first?",
      difficulty: "Easy",
      points: 100,
      estimatedTime: "2 min",
      hints: ["Mia is not first.", "Leo is before Mia but after Noah."],
    }),
    prompt:
      "Noah, Leo, and Mia are queuing for lunch. Leo is before Mia but after Noah. Who is first?",
    options: ["Noah", "Leo", "Mia", "There is not enough information"],
    answer: "Noah",
    explanation: "The only order that fits is Noah, Leo, then Mia.",
  },
  {
    ...base({
      id: "logic-3",
      type: "logic",
      title: "The borrowed book",
      description: "One statement must be true.",
      difficulty: "Medium",
      points: 150,
      estimatedTime: "3 min",
      hints: [
        "Only one person borrowed the book.",
        "Look for the statement that makes the others false.",
      ],
    }),
    prompt:
      "A book was borrowed by either Ava, Ben, or Cleo. Ava says, ‘Ben borrowed it.’ Ben says, ‘I didn't borrow it.’ Cleo says, ‘Ava didn't borrow it.’ If only one statement is true, who borrowed the book?",
    options: ["Ava", "Ben", "Cleo", "It cannot be solved"],
    answer: "Ava",
    explanation:
      "If Ava borrowed it, Ava's statement is false, Ben's is true, and Cleo's is false: exactly one statement is true.",
  },
  {
    ...base({
      id: "logic-4",
      type: "logic",
      title: "Pet detective",
      description: "Use the clues to match the pet.",
      difficulty: "Medium",
      points: 150,
      estimatedTime: "3 min",
      hints: ["The fish cannot bark.", "The pet with fur is not Bella's."],
    }),
    prompt:
      "Ari, Bella, and Chen each have one pet: a cat, a dog, or a fish. Ari has the fish. Bella does not have the dog. What pet does Chen have?",
    options: ["Cat", "Dog", "Fish", "Not enough information"],
    answer: "Dog",
    explanation:
      "Ari has the fish. Bella cannot have the dog, so Bella has the cat and Chen has the dog.",
  },
  {
    ...base({
      id: "logic-5",
      type: "logic",
      title: "Three switches",
      description: "A small logic puzzle with a bright answer.",
      difficulty: "Hard",
      points: 200,
      estimatedTime: "4 min",
      hints: [
        "Only one switch powers the lamp.",
        "You can only enter the room once.",
      ],
    }),
    prompt:
      "There are three switches outside a room and one lamp inside. You may enter the room only once. How can you identify the correct switch?",
    options: [
      "Turn all on",
      "Turn one on, wait, turn it off; turn another on; check the lamp and bulb heat",
      "Guess",
      "It is impossible",
    ],
    answer:
      "Turn one on, wait, turn it off; turn another on; check the lamp and bulb heat",
    explanation:
      "The lit switch is on, the warm-but-off bulb belongs to the first switch, and the cool dark bulb belongs to the third.",
  },
] satisfies LogicPuzzle[];
