import type { RiddlePuzzle } from "@/lib/types";
import { base } from "@/lib/puzzles/base";

export const riddlePuzzles = [
  {
    ...base({
      id: "riddle-1",
      type: "riddle",
      title: "Keys and rooms",
      description: "A classic riddle for a classic object.",
      difficulty: "Easy",
      points: 100,
      estimatedTime: "2 min",
      hints: ["You use it every day.", "It is not a door key."],
    }),
    riddle:
      "I have keys but no locks. I have space but no room. You can enter, but you can't go inside. What am I?",
    answers: ["keyboard", "a keyboard"],
    explanation: "A keyboard has keys, a space bar, and an Enter key.",
  },
  {
    ...base({
      id: "riddle-2",
      type: "riddle",
      title: "The more you take",
      description: "What gets bigger as you take from it?",
      difficulty: "Easy",
      points: 100,
      estimatedTime: "2 min",
      hints: ["Think about walking.", "You leave them behind."],
    }),
    riddle: "The more you take, the more you leave behind. What am I?",
    answers: ["footsteps", "footstep", "steps"],
    explanation:
      "The more steps you take, the more footsteps you leave behind.",
  },
  {
    ...base({
      id: "riddle-3",
      type: "riddle",
      title: "No voice, but it answers",
      description: "A riddle about sound.",
      difficulty: "Medium",
      points: 150,
      estimatedTime: "3 min",
      hints: ["It repeats what it hears.", "You might find it in a canyon."],
    }),
    riddle:
      "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
    answers: ["echo", "an echo"],
    explanation:
      "An echo repeats a sound and is often heard bouncing around open spaces.",
  },
  {
    ...base({
      id: "riddle-4",
      type: "riddle",
      title: "The more it dries",
      description: "This object can make something else less wet.",
      difficulty: "Medium",
      points: 150,
      estimatedTime: "3 min",
      hints: [
        "You find it in a bathroom.",
        "It becomes wetter while doing its job.",
      ],
    }),
    riddle: "What gets wetter the more it dries?",
    answers: ["towel", "a towel"],
    explanation:
      "A towel dries you by absorbing water, so the towel gets wetter.",
  },
  {
    ...base({
      id: "riddle-5",
      type: "riddle",
      title: "A face and two hands",
      description: "It never gets tired of telling the time.",
      difficulty: "Hard",
      points: 200,
      estimatedTime: "3 min",
      hints: [
        "It hangs on a wall or sits on a desk.",
        "Its hands do not clap.",
      ],
    }),
    riddle: "I have a face and two hands, but no arms or legs. What am I?",
    answers: ["clock", "a clock", "watch", "a watch"],
    explanation: "A clock or watch has a face and hands for showing the time.",
  },
] satisfies RiddlePuzzle[];
