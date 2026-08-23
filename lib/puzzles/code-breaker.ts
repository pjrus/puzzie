import type { CodeBreakerClue } from "@/lib/types";

export function formatCodeBreakerClue(clue: CodeBreakerClue): string {
  if (clue.exact === 0 && clue.misplaced === 0) {
    return "No digits are correct.";
  }

  const parts: string[] = [];
  if (clue.exact > 0) {
    parts.push(
      `${clue.exact} ${clue.exact === 1 ? "digit is" : "digits are"} correct and in the correct position`,
    );
  }
  if (clue.misplaced > 0) {
    parts.push(
      `${clue.misplaced} ${clue.misplaced === 1 ? "digit is" : "digits are"} correct but in the wrong position`,
    );
  }
  return `${parts.join("; ")}.`;
}
