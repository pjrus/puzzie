import type { Puzzle, PuzzleType, QuickfireQuestion } from "@/lib/types";

const base = <T extends PuzzleType>(
  id: string,
  type: T,
  title: string,
  description: string,
  difficulty: Puzzle["difficulty"],
  points: number,
  estimatedTime: string,
  hints: string[]
) => ({ id, type, title, description, difficulty, points, estimatedTime, hints });

const quickfireQuestions: QuickfireQuestion[] = [
  { id: "qf-1", prompt: "What is 9 × 6?", kind: "number", answer: "54" },
  { id: "qf-2", prompt: "Which planet is known as the Red Planet?", kind: "choice", answer: "Mars", options: ["Venus", "Mars", "Jupiter", "Mercury"] },
  { id: "qf-3", prompt: "What comes next: 5, 10, 15, ?", kind: "number", answer: "20" },
  { id: "qf-4", prompt: "Which word is the odd one out?", kind: "choice", answer: "Violin", options: ["Piano", "Violin", "Flute", "Trumpet"] },
  { id: "qf-5", prompt: "How many sides does a hexagon have?", kind: "number", answer: "6" },
  { id: "qf-6", prompt: "Unscramble: R A E B", kind: "word", answer: "Bear" },
  { id: "qf-7", prompt: "Which ocean is the largest?", kind: "choice", answer: "Pacific", options: ["Atlantic", "Indian", "Pacific", "Arctic"] },
  { id: "qf-8", prompt: "What is 100 ÷ 4?", kind: "number", answer: "25" },
  { id: "qf-9", prompt: "What is the opposite of ancient?", kind: "choice", answer: "Modern", options: ["Tiny", "Modern", "Quiet", "Round"] },
  { id: "qf-10", prompt: "What comes next: A, C, E, ?", kind: "word", answer: "G" },
  { id: "qf-11", prompt: "Which animal is a mammal?", kind: "choice", answer: "Dolphin", options: ["Shark", "Dolphin", "Trout", "Lizard"] },
  { id: "qf-12", prompt: "What is 17 + 8?", kind: "number", answer: "25" },
  { id: "qf-13", prompt: "Unscramble: O R C A N G E", kind: "word", answer: "Orange" },
  { id: "qf-14", prompt: "How many minutes are in one hour?", kind: "number", answer: "60" }
];

export const puzzles: Puzzle[] = [
  {
    ...base("sequence-1", "sequence", "Double down", "What number comes next?", "Easy", 100, "2 min", ["Each number is multiplied by the same amount.", "The multiplier is 2."]),
    sequence: [3, 6, 12, 24, "?"], answer: "48", explanation: "Every number is doubled: 3 × 2 = 6, 6 × 2 = 12, and so on."
  },
  {
    ...base("sequence-2", "sequence", "Growing gaps", "Find the next number in the sequence.", "Medium", 150, "3 min", ["Look at the gaps between the numbers.", "The gaps grow by 3."]),
    sequence: [2, 5, 11, 20, 32, "?"], answer: "47", explanation: "The gaps are +3, +6, +9, +12, so the next gap is +15."
  },
  {
    ...base("sequence-3", "sequence", "Three steps ahead", "Can you spot the rule?", "Medium", 150, "3 min", ["Try adding and multiplying in alternating turns.", "Multiply by 2, then add 1."]),
    sequence: [2, 4, 5, 10, 11, "?"], answer: "22", explanation: "The sequence alternates ×2 and +1: 2 × 2 = 4, +1 = 5, ×2 = 10, +1 = 11, ×2 = 22."
  },
  {
    ...base("sequence-4", "sequence", "Square feeling", "One number is missing. What belongs here?", "Hard", 200, "4 min", ["Compare each number to its position.", "These are square numbers."]),
    sequence: [1, 4, 9, 16, "?", 36], answer: "25", explanation: "These are the squares of 1, 2, 3, 4, 5, and 6."
  },
  {
    ...base("sequence-5", "sequence", "A little Fibonacci", "What number would Fibonacci choose?", "Hard", 200, "4 min", ["Each number is made from the two before it.", "Add the previous two numbers."]),
    sequence: [1, 1, 2, 3, 5, 8, "?"], answer: "13", explanation: "Each term is the sum of the two previous terms: 5 + 8 = 13."
  },

  {
    ...base("scramble-1", "word-scramble", "Fruit salad", "Untangle the letters into something delicious.", "Easy", 100, "2 min", ["It is a fruit.", "It is often red or green."]),
    letters: ["L", "P", "P", "A", "E"], answers: ["apple"], category: "fruit", explanation: "APPLE is a fruit with five letters."
  },
  {
    ...base("scramble-2", "word-scramble", "A bright idea", "Unjumble the letters.", "Easy", 100, "2 min", ["You might see it in the sky.", "It shines during the day."]),
    letters: ["S", "U", "N"], answers: ["sun"], category: "thing in the sky", explanation: "The SUN is our closest star."
  },
  {
    ...base("scramble-3", "word-scramble", "Take a seat", "What word is hiding in these letters?", "Medium", 150, "2 min", ["It is furniture.", "You can sit on it."]),
    letters: ["H", "C", "A", "I", "R"], answers: ["chair"], category: "furniture", explanation: "A CHAIR is made for sitting."
  },
  {
    ...base("scramble-4", "word-scramble", "Weather report", "Put the weather word back together.", "Medium", 150, "3 min", ["It falls from clouds.", "You might need an umbrella."]),
    letters: ["I", "A", "N", "R"], answers: ["rain"], category: "weather", explanation: "RAIN falls from clouds and makes umbrellas useful."
  },
  {
    ...base("scramble-5", "word-scramble", "The long way home", "This word helps you find your way.", "Hard", 200, "3 min", ["It can be printed or digital.", "It shows places and roads."]),
    letters: ["M", "A", "P"], answers: ["map"], category: "wayfinding", explanation: "A MAP helps you understand where places and roads are."
  },

  {
    ...base("logic-1", "logic", "Tall order", "Read the clues, then choose the shortest person.", "Easy", 100, "2 min", ["Sam is between Alex and Jamie.", "Alex is taller than Sam."]),
    prompt: "Alex is taller than Sam. Sam is taller than Jamie. Who is the shortest?", options: ["Alex", "Sam", "Jamie", "They are the same height"], answer: "Jamie", explanation: "The order from tallest to shortest is Alex, Sam, Jamie."
  },
  {
    ...base("logic-2", "logic", "Lunch line", "Who can go first?", "Easy", 100, "2 min", ["Mia is not first.", "Leo is before Mia but after Noah."]),
    prompt: "Noah, Leo, and Mia are queuing for lunch. Leo is before Mia but after Noah. Who is first?", options: ["Noah", "Leo", "Mia", "There is not enough information"], answer: "Noah", explanation: "The only order that fits is Noah, Leo, then Mia."
  },
  {
    ...base("logic-3", "logic", "The borrowed book", "One statement must be true.", "Medium", 150, "3 min", ["Only one person borrowed the book.", "Look for the statement that makes the others false."]),
    prompt: "A book was borrowed by either Ava, Ben, or Cleo. Ava says, ‘Ben borrowed it.’ Ben says, ‘I didn't borrow it.’ Cleo says, ‘Ava didn't borrow it.’ If only one statement is true, who borrowed the book?", options: ["Ava", "Ben", "Cleo", "It cannot be solved"], answer: "Ava", explanation: "If Ava borrowed it, Ava's statement is false, Ben's is true, and Cleo's is false: exactly one statement is true."
  },
  {
    ...base("logic-4", "logic", "Pet detective", "Use the clues to match the pet.", "Medium", 150, "3 min", ["The fish cannot bark.", "The pet with fur is not Bella's."]),
    prompt: "Ari, Bella, and Chen each have one pet: a cat, a dog, or a fish. Ari has the fish. Bella does not have the dog. What pet does Chen have?", options: ["Cat", "Dog", "Fish", "Not enough information"], answer: "Dog", explanation: "Ari has the fish. Bella cannot have the dog, so Bella has the cat and Chen has the dog."
  },
  {
    ...base("logic-5", "logic", "Three switches", "A small logic puzzle with a bright answer.", "Hard", 200, "4 min", ["Only one switch powers the lamp.", "You can only enter the room once."]),
    prompt: "There are three switches outside a room and one lamp inside. You may enter the room only once. How can you identify the correct switch?", options: ["Turn all on", "Turn one on, wait, turn it off; turn another on; check the lamp and bulb heat", "Guess", "It is impossible"], answer: "Turn one on, wait, turn it off; turn another on; check the lamp and bulb heat", explanation: "The lit switch is on, the warm-but-off bulb belongs to the first switch, and the cool dark bulb belongs to the third."
  },

  {
    ...base("pattern-1", "pattern", "Dot dash", "Which tile completes the rhythm?", "Easy", 100, "2 min", ["The filled and empty dots alternate.", "The next tile is empty."]),
    pattern: ["●", "○", "●", "○", "?"], options: ["●", "○", "◆", "□"], answer: "●", explanation: "The pattern alternates between a filled and an empty circle."
  },
  {
    ...base("pattern-2", "pattern", "Turn the corner", "Find the shape that keeps rotating.", "Easy", 100, "2 min", ["The arrow turns clockwise each time.", "The next direction points left."]),
    pattern: ["↑", "→", "↓", "?"], options: ["↑", "→", "←", "↖"], answer: "←", explanation: "The sequence rotates 90 degrees each step: up, right, down, left."
  },
  {
    ...base("pattern-3", "pattern", "Shape stack", "Which symbol follows the shape sequence?", "Medium", 150, "3 min", ["The number of sides increases.", "A triangle becomes a square, then a pentagon."]),
    pattern: ["△", "□", "⬟", "?"], options: ["○", "⬢", "☆", "◇"], answer: "⬢", explanation: "The sequence moves from 3 sides to 4, then 5, then 6: a hexagon."
  },
  {
    ...base("pattern-4", "pattern", "Colour rhythm", "Choose the missing colour chip.", "Medium", 150, "3 min", ["The colours repeat in pairs.", "The next colour is mint."]),
    pattern: ["MINT", "MINT", "CORAL", "CORAL", "?"], options: ["MINT", "CORAL", "SUN", "INK"], answer: "MINT", explanation: "The pattern repeats two mint chips, then two coral chips. The next pair starts with mint."
  },
  {
    ...base("pattern-5", "pattern", "Count the corners", "Look closely at how the shapes grow.", "Hard", 200, "4 min", ["The number of corners increases by two.", "Start at 4 corners."]),
    pattern: ["□", "⬡", "★", "?"], options: ["△", "✦", "○", "▱"], answer: "✦", explanation: "The shapes move from 4 to 6 to 8 corners; the eight-point star is next."
  },

  {
    ...base("maths-1", "maths", "Market maths", "A quick percentage challenge.", "Easy", 100, "2 min", ["Find 10% first.", "10% of 80 is 8."]),
    question: "What is 15% of 80?", answer: "12", explanation: "10% of 80 is 8 and 5% is 4, so 15% is 12."
  },
  {
    ...base("maths-2", "maths", "Make it even", "Solve the short equation.", "Easy", 100, "2 min", ["Subtract 7 from both sides.", "Then divide by 3."]),
    question: "Solve for x: 3x + 7 = 25", answer: "6", explanation: "Subtract 7 to get 3x = 18, then divide by 3: x = 6."
  },
  {
    ...base("maths-3", "maths", "Baker's dozen", "A multiplication warm-up.", "Medium", 150, "2 min", ["Multiply the tens first.", "12 × 14 = 12 × (10 + 4)."]),
    question: "What is 12 × 14?", answer: "168", explanation: "12 × 10 is 120 and 12 × 4 is 48. Together that makes 168."
  },
  {
    ...base("maths-4", "maths", "The missing angle", "Use what you know about triangles.", "Medium", 150, "3 min", ["Angles in a triangle total 180°.", "Add the known angles first."]),
    question: "A triangle has angles of 65° and 55°. What is the third angle?", answer: "60", explanation: "65° + 55° = 120°, and 180° − 120° = 60°."
  },
  {
    ...base("maths-5", "maths", "Average Joe", "Find the missing number from the average.", "Hard", 200, "3 min", ["Multiply the average by the number of values.", "The total of five values is 95."]),
    question: "The average of five numbers is 19. Four numbers are 12, 16, 21, and 25. What is the fifth?", answer: "21", explanation: "The total must be 95. The four known numbers total 74, so the missing number is 21."
  },

  {
    ...base("riddle-1", "riddle", "Keys and rooms", "A classic riddle for a classic object.", "Easy", 100, "2 min", ["You use it every day.", "It is not a door key."]),
    riddle: "I have keys but no locks. I have space but no room. You can enter, but you can't go inside. What am I?", answers: ["keyboard", "a keyboard"], explanation: "A keyboard has keys, a space bar, and an Enter key."
  },
  {
    ...base("riddle-2", "riddle", "The more you take", "What gets bigger as you take from it?", "Easy", 100, "2 min", ["Think about walking.", "You leave them behind."]),
    riddle: "The more you take, the more you leave behind. What am I?", answers: ["footsteps", "footstep", "steps"], explanation: "The more steps you take, the more footsteps you leave behind."
  },
  {
    ...base("riddle-3", "riddle", "No voice, but it answers", "A riddle about sound.", "Medium", 150, "3 min", ["It repeats what it hears.", "You might find it in a canyon."]),
    riddle: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?", answers: ["echo", "an echo"], explanation: "An echo repeats a sound and is often heard bouncing around open spaces."
  },
  {
    ...base("riddle-4", "riddle", "The more it dries", "This object can make something else less wet.", "Medium", 150, "3 min", ["You find it in a bathroom.", "It becomes wetter while doing its job."]),
    riddle: "What gets wetter the more it dries?", answers: ["towel", "a towel"], explanation: "A towel dries you by absorbing water, so the towel gets wetter."
  },
  {
    ...base("riddle-5", "riddle", "A face and two hands", "It never gets tired of telling the time.", "Hard", 200, "3 min", ["It hangs on a wall or sits on a desk.", "Its hands do not clap."]),
    riddle: "I have a face and two hands, but no arms or legs. What am I?", answers: ["clock", "a clock", "watch", "a watch"], explanation: "A clock or watch has a face and hands for showing the time."
  },

  {
    ...base("connections-1", "connections", "Kitchen cupboard", "Find four groups of four words.", "Medium", 150, "5 min", ["One group helps you cook.", "One group can be found on a breakfast table."]),
    words: ["BASIL", "FORK", "MUG", "POT", "SPOON", "THYME", "PLATE", "PAN", "JAM", "KNIFE", "PEPPER", "BOWL", "HONEY", "SAUCER", "OREGANO", "SKILLET"],
    groups: [
      { name: "Herbs", words: ["BASIL", "THYME", "PEPPER", "OREGANO"] },
      { name: "Tableware", words: ["FORK", "SPOON", "KNIFE", "SAUCER"] },
      { name: "Cookware", words: ["POT", "PAN", "BOWL", "SKILLET"] },
      { name: "Breakfast spreads", words: ["MUG", "PLATE", "JAM", "HONEY"] }
    ], explanation: "The words split into herbs, tableware, cookware, and breakfast spreads."
  },
  {
    ...base("connections-2", "connections", "On the move", "Four categories are hiding in these 16 words.", "Hard", 200, "6 min", ["One group can fly.", "One group is used in a relay."]),
    words: ["EAGLE", "BAT", "BIRDIE", "SWALLOW", "RACKET", "HOOP", "WICKET", "BALL", "TRAIN", "BUS", "TRAM", "FERRY", "PASS", "DRIVE", "SERVE", "DUNK"],
    groups: [
      { name: "Flying animals", words: ["EAGLE", "BAT", "BIRDIE", "SWALLOW"] },
      { name: "Sports equipment", words: ["RACKET", "HOOP", "WICKET", "BALL"] },
      { name: "Public transport", words: ["TRAIN", "BUS", "TRAM", "FERRY"] },
      { name: "Sports actions", words: ["PASS", "DRIVE", "SERVE", "DUNK"] }
    ], explanation: "The groups are flying animals, sports equipment, public transport, and sports actions."
  },
  {
    ...base("connections-3", "connections", "Screen time", "Sort the words into four neat groups.", "Hard", 200, "6 min", ["One group belongs in a cinema.", "One group describes a computer interface."]),
    words: ["POPCORN", "TICKET", "SCREEN", "AISLE", "TAB", "WINDOW", "CURSOR", "CLICK", "DRAMA", "COMEDY", "HORROR", "WESTERN", "PENCIL", "ERASER", "RULER", "GLUE"],
    groups: [
      { name: "Cinema words", words: ["POPCORN", "TICKET", "SCREEN", "AISLE"] },
      { name: "Computer interface", words: ["TAB", "WINDOW", "CURSOR", "CLICK"] },
      { name: "Film genres", words: ["DRAMA", "COMEDY", "HORROR", "WESTERN"] },
      { name: "Stationery", words: ["PENCIL", "ERASER", "RULER", "GLUE"] }
    ], explanation: "The words sort into cinema terms, computer interface terms, film genres, and stationery."
  },

  {
    ...base("ladder-1", "word-ladder", "Cold to warm", "Change one letter at a time.", "Easy", 100, "3 min", ["The first step changes cold into a body part.", "COLD → CORD → CARD → WARD → WARM."]),
    start: "COLD", target: "WARM", solution: ["COLD", "CORD", "CARD", "WARD", "WARM"], hint: "Think of a body part after COLD.", explanation: "Each step changes exactly one letter: COLD, CORD, CARD, WARD, WARM."
  },
  {
    ...base("ladder-2", "word-ladder", "Cat to dog", "Build a four-letter path between two animals.", "Medium", 150, "3 min", ["The middle words are common household things.", "CAT → COT → DOT → DOG."]),
    start: "CAT", target: "DOG", solution: ["CAT", "COT", "DOT", "DOG"], hint: "The first change makes a piece of furniture.", explanation: "CAT becomes COT, then DOT, then DOG, changing one letter per step."
  },
  {
    ...base("ladder-3", "word-ladder", "Head to tail", "Reach the other end of the animal.", "Medium", 150, "4 min", ["Try a body part in the middle.", "HEAD → HEAL → TEAL → TELL → TAIL."]),
    start: "HEAD", target: "TAIL", solution: ["HEAD", "HEAL", "TEAL", "TELL", "TAIL"], hint: "The first step changes the last letter.", explanation: "HEAD, HEAL, TEAL, TELL, TAIL changes one letter at each rung."
  },
  {
    ...base("ladder-4", "word-ladder", "Dark to dawn", "Turn a dark word into a brighter one.", "Hard", 200, "4 min", ["Start with a word that means hidden.", "DARK → DARN → DAWN."]),
    start: "DARK", target: "DAWN", solution: ["DARK", "DARN", "DAWN"], hint: "The first step changes the final consonant.", explanation: "DARK becomes DARN, then DAWN. Each step changes exactly one letter."
  },
  {
    ...base("ladder-5", "word-ladder", "Sour to tart", "A tasty transformation.", "Hard", 200, "4 min", ["Start by changing one vowel.", "SOUR → TOUR → TOUT → TAUT → TART."]),
    start: "SOUR", target: "TART", solution: ["SOUR", "TOUR", "TOUT", "TAUT", "TART"], hint: "The ladder can take a scenic route through a few small words.", explanation: "SOUR becomes TOUR, then TOUT, TAUT, and finally TART, changing one letter at each step."
  },

  {
    ...base("odd-1", "odd-one-out", "Fruit bowl", "One of these does not belong.", "Easy", 100, "2 min", ["Three are fruits.", "The odd one grows underground."]),
    items: ["Apple", "Banana", "Orange", "Carrot"], answer: "Carrot", explanation: "Apple, banana, and orange are fruits; carrot is a vegetable."
  },
  {
    ...base("odd-2", "odd-one-out", "Number line", "Which number breaks the pattern?", "Easy", 100, "2 min", ["Three numbers are prime.", "A prime number has exactly two factors."]),
    items: ["11", "13", "15", "17"], answer: "15", explanation: "15 is not prime because it can be divided by 3 and 5."
  },
  {
    ...base("odd-3", "odd-one-out", "Shape spotter", "Find the shape with a different number of sides.", "Medium", 150, "2 min", ["Count the sides.", "Three shapes have four sides."]),
    items: ["Square", "Rectangle", "Triangle", "Rhombus"], answer: "Triangle", explanation: "A triangle has three sides; the other shapes all have four."
  },
  {
    ...base("odd-4", "odd-one-out", "Big ideas", "One concept is not in the same family.", "Medium", 150, "3 min", ["Three are emotions.", "The odd one is a colour."]),
    items: ["Joy", "Anger", "Blue", "Fear"], answer: "Blue", explanation: "Joy, anger, and fear are emotions; blue is a colour."
  },
  {
    ...base("odd-5", "odd-one-out", "Aussie animals", "Which animal is the odd one out?", "Hard", 200, "3 min", ["Three lay eggs.", "The odd one is a mammal that gives birth to live young."]),
    items: ["Platypus", "Echidna", "Kangaroo", "Emu"], answer: "Kangaroo", explanation: "Platypus, echidna, and emu lay eggs; kangaroos give birth to live young."
  },

  {
    ...base("trivia-1", "trivia", "Red planet", "A quick science check.", "Easy", 100, "2 min", ["It is the fourth planet from the Sun."]),
    category: "Science", question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], answer: "Mars", explanation: "Iron minerals in its soil give Mars its rusty red appearance."
  },
  {
    ...base("trivia-2", "trivia", "Ancient wonder", "A history question.", "Easy", 100, "2 min", ["It is in Egypt."]),
    category: "History", question: "Which ancient wonder is still largely intact?", options: ["Colossus of Rhodes", "Great Pyramid of Giza", "Hanging Gardens", "Temple of Artemis"], answer: "Great Pyramid of Giza", explanation: "The Great Pyramid of Giza is the only ancient wonder that still substantially remains."
  },
  {
    ...base("trivia-3", "trivia", "World capitals", "Point your mental compass north.", "Easy", 100, "2 min", ["It is the capital of Japan."]),
    category: "Geography", question: "What is the capital of Japan?", options: ["Kyoto", "Osaka", "Tokyo", "Hiroshima"], answer: "Tokyo", explanation: "Tokyo is Japan's capital and one of the world's largest metropolitan areas."
  },
  {
    ...base("trivia-4", "trivia", "The oval ball", "A sports warm-up.", "Medium", 150, "2 min", ["It is played with 18 players per side on the field."]),
    category: "Sport", question: "In Australian rules football, how many points is a goal worth?", options: ["3", "6", "7", "9"], answer: "6", explanation: "A goal between the two taller central posts is worth six points."
  },
  {
    ...base("trivia-5", "trivia", "The web's first home", "A technology fact.", "Medium", 150, "2 min", ["It was created by Tim Berners-Lee."]),
    category: "Technology", question: "What does HTML stand for?", options: ["HyperText Markup Language", "High Transfer Machine Link", "Home Tool Markup Language", "Hyperlink Text Management Layer"], answer: "HyperText Markup Language", explanation: "HTML is the standard markup language used to structure web pages."
  },
  {
    ...base("trivia-6", "trivia", "Silver screen", "A cinema question.", "Medium", 150, "2 min", ["It follows Dorothy on a yellow brick road."]),
    category: "Entertainment", question: "Which film features the song ‘Over the Rainbow’?", options: ["Mary Poppins", "The Wizard of Oz", "Singin' in the Rain", "Matilda"], answer: "The Wizard of Oz", explanation: "Judy Garland sings ‘Over the Rainbow’ as Dorothy in The Wizard of Oz."
  },
  {
    ...base("trivia-7", "trivia", "Deep blue", "A general knowledge swim.", "Hard", 200, "3 min", ["It is the deepest known point in the ocean."]),
    category: "Geography", question: "What is the Mariana Trench's deepest point called?", options: ["Challenger Deep", "Blue Hole", "Midnight Zone", "Hadal Ridge"], answer: "Challenger Deep", explanation: "Challenger Deep is the deepest known point in Earth's oceans."
  },
  {
    ...base("trivia-8", "trivia", "Tiny building blocks", "A science question at a very small scale.", "Hard", 200, "3 min", ["It has a nucleus in its common form."]),
    category: "Science", question: "What is the basic unit of matter?", options: ["Cell", "Atom", "Molecule", "Crystal"], answer: "Atom", explanation: "An atom is the smallest unit of an element that retains that element's properties."
  },
  {
    ...base("trivia-9", "trivia", "Aussie milestones", "A little local history.", "Medium", 150, "2 min", ["It happened in 1901."]),
    category: "History", question: "In what year did the Commonwealth of Australia begin?", options: ["1788", "1851", "1901", "1945"], answer: "1901", explanation: "The six colonies federated on 1 January 1901."
  },
  {
    ...base("trivia-10", "trivia", "The beautiful game", "A sport question to finish.", "Easy", 100, "2 min", ["It is played at Wimbledon."]),
    category: "Sport", question: "In tennis, what is a score of zero called?", options: ["Nil", "Love", "Duck", "Blank"], answer: "Love", explanation: "In tennis scoring, zero is traditionally called love."
  },

  {
    ...base("code-1", "code-breaker", "Coral code", "Crack the four-digit code from the clues.", "Medium", 150, "5 min", ["Start with digits that appear in the clues.", "The code uses four different digits."]),
    code: "4827", maxAttempts: 7, clues: [
      { guess: "4561", clue: "One number is correct and in the correct position." },
      { guess: "5678", clue: "Two numbers are correct but in the wrong positions." },
      { guess: "9012", clue: "No numbers are correct." },
      { guess: "4786", clue: "Three numbers are correct; two are in the wrong positions." }
    ], explanation: "The code is 4827. The clues narrow down the digits and their positions."
  },
  {
    ...base("code-2", "code-breaker", "Mint machine", "Use the clues to unlock the machine.", "Hard", 200, "6 min", ["No number repeats.", "The last clue gives you three useful digits."]),
    code: "7319", maxAttempts: 8, clues: [
      { guess: "1234", clue: "Two numbers are correct but in the wrong positions." },
      { guess: "5678", clue: "One number is correct but in the wrong position." },
      { guess: "9012", clue: "Two numbers are correct; one is in the correct position." },
      { guess: "7390", clue: "Three numbers are correct; two are in the right positions." }
    ], explanation: "The code is 7319. Every clue is a small piece of the lock."
  },
  {
    ...base("code-3", "code-breaker", "Night shift", "A compact code for a sharp eye.", "Hard", 200, "6 min", ["The code contains 0, 4, 6, and 8.", "The first digit is even."]),
    code: "6048", maxAttempts: 8, clues: [
      { guess: "6042", clue: "Three numbers are correct and in the correct positions." },
      { guess: "8610", clue: "Three numbers are correct but in the wrong positions." },
      { guess: "1235", clue: "No numbers are correct." },
      { guess: "6804", clue: "All four numbers are correct; one is in the correct position." }
    ], explanation: "The code is 6048. The final clue confirms the four digits; the others settle their order."
  },

  {
    ...base("sudoku-1", "sudoku", "First grid", "Fill every row, column, and 2×2 square.", "Easy", 100, "4 min", ["Each row needs 1, 2, 3, and 4.", "Start with the top-left square."]),
    grid: [[1, 0, 0, 4], [0, 4, 1, 0], [2, 0, 4, 0], [0, 3, 0, 1]], solution: [[1, 2, 3, 4], [3, 4, 1, 2], [2, 1, 4, 3], [4, 3, 2, 1]], explanation: "Each number appears once in every row, column, and 2×2 box."
  },
  {
    ...base("sudoku-2", "sudoku", "Mint grid", "A fresh 4×4 Sudoku.", "Easy", 100, "4 min", ["Look for the missing 3 in row 1.", "Use the 2×2 boxes to narrow choices."]),
    grid: [[3, 0, 4, 1], [0, 4, 0, 3], [4, 1, 0, 2], [2, 3, 1, 0]], solution: [[3, 2, 4, 1], [1, 4, 2, 3], [4, 1, 3, 2], [2, 3, 1, 4]], explanation: "Each row, column, and 2×2 box must contain the numbers 1–4 exactly once."
  },
  {
    ...base("sudoku-3", "sudoku", "Coral grid", "A medium 4×4 Sudoku challenge.", "Medium", 150, "5 min", ["Check the bottom-right box.", "A row cannot repeat a number."]),
    grid: [[4, 1, 2, 3], [2, 3, 1, 4], [3, 0, 4, 1], [1, 4, 3, 2]], solution: [[4, 1, 2, 3], [2, 3, 1, 4], [3, 2, 4, 1], [1, 4, 3, 2]], explanation: "Use the candidates left in each row and box to finish the grid."
  },
  {
    ...base("sudoku-4", "sudoku", "Sun grid", "A 4×4 grid that rewards patience.", "Medium", 150, "5 min", ["Start with the top-right box.", "There is only one place for 3 in column 4."]),
    grid: [[4, 2, 1, 3], [1, 3, 4, 2], [2, 1, 3, 4], [3, 4, 2, 1]], solution: [[4, 2, 1, 3], [1, 3, 4, 2], [2, 1, 3, 4], [3, 4, 2, 1]], explanation: "The givens form a diagonal trail; fill the remaining 1–4 pattern without repeats."
  },
  {
    ...base("sudoku-5", "sudoku", "Night grid", "The trickiest little grid in the set.", "Hard", 200, "6 min", ["A blank cell can only take one candidate.", "Use rows and columns together."]),
    grid: [[1, 2, 4, 3], [4, 1, 3, 2], [2, 3, 0, 1], [3, 4, 2, 0]], solution: [[1, 2, 4, 3], [4, 1, 3, 2], [2, 3, 4, 1], [3, 4, 2, 1]], explanation: "Work through the candidates carefully and complete each 2×2 box."
  },

  {
    ...base("quickfire-1", "quickfire", "One-minute brain sprint", "How many tiny puzzles can you clear before the buzzer?", "Medium", 150, "60 sec", ["Read the whole question before tapping.", "Quick, accurate answers beat rushed guesses."]),
    duration: 60, questions: quickfireQuestions
  }
];

export function getPuzzleById(id: string) {
  return puzzles.find((puzzle) => puzzle.id === id);
}

export function getPuzzlesByType(type: PuzzleType) {
  return puzzles.filter((puzzle) => puzzle.type === type);
}

export function getDailyPuzzle(date = new Date()) {
  const playable = puzzles.filter((puzzle) => puzzle.type !== "quickfire");
  const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const index = [...key].reduce((sum, character) => sum + character.charCodeAt(0), 0) % playable.length;
  return playable[index];
}
