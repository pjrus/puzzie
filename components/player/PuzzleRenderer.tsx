import {
  CodeBreakerPuzzle,
  ConnectionsPuzzle,
  LogicPuzzle,
  MathsPuzzle,
  OddOneOutPuzzle,
  PatternPuzzle,
  QuickfirePuzzle,
  RiddlePuzzle,
  SequencePuzzle,
  SudokuPuzzle,
  TriviaPuzzle,
  WordLadderPuzzle,
  WordScramblePuzzle,
  ZipPuzzle,
} from "@/components/puzzles";
import type { Puzzle } from "@/lib/types";

type QuickfireResult = {
  score: number;
  attempted: number;
  correct: number;
  timeSeconds: number;
};

export type PuzzleRendererProps = {
  puzzle: Puzzle;
  disabled: boolean;
  onCorrect: (message?: string) => void;
  onIncorrect: (message: string) => void;
  onFailed: () => void;
  onQuickfireFinished: (result: QuickfireResult) => void;
  onStarted?: () => void;
  onHint?: () => void;
};

export function PuzzleRenderer({
  puzzle,
  disabled,
  onCorrect,
  onIncorrect,
  onFailed,
  onQuickfireFinished,
  onStarted,
  onHint,
}: PuzzleRendererProps) {
  const answerProps = { onCorrect, onIncorrect, disabled };

  switch (puzzle.type) {
    case "sequence":
      return <SequencePuzzle puzzle={puzzle} {...answerProps} />;
    case "word-scramble":
      return <WordScramblePuzzle puzzle={puzzle} {...answerProps} />;
    case "logic":
      return <LogicPuzzle puzzle={puzzle} {...answerProps} />;
    case "pattern":
      return <PatternPuzzle puzzle={puzzle} {...answerProps} />;
    case "maths":
      return <MathsPuzzle puzzle={puzzle} {...answerProps} />;
    case "riddle":
      return <RiddlePuzzle puzzle={puzzle} {...answerProps} />;
    case "connections":
      return (
        <ConnectionsPuzzle
          puzzle={puzzle}
          {...answerProps}
          onFailed={onFailed}
        />
      );
    case "word-ladder":
      return <WordLadderPuzzle puzzle={puzzle} {...answerProps} />;
    case "odd-one-out":
      return <OddOneOutPuzzle puzzle={puzzle} {...answerProps} />;
    case "trivia":
      return <TriviaPuzzle puzzle={puzzle} {...answerProps} />;
    case "code-breaker":
      return (
        <CodeBreakerPuzzle
          puzzle={puzzle}
          {...answerProps}
          onFailed={onFailed}
        />
      );
    case "sudoku":
      return <SudokuPuzzle puzzle={puzzle} {...answerProps} />;
    case "zip":
      return (
        <ZipPuzzle
          puzzle={puzzle}
          {...answerProps}
          onStarted={onStarted}
          onHint={onHint}
        />
      );
    case "quickfire":
      return (
        <QuickfirePuzzle
          puzzle={puzzle}
          disabled={disabled}
          onFinished={onQuickfireFinished}
        />
      );
  }
}
