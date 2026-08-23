"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import type {
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
} from "@/lib/types";

type AnswerProps = {
  onCorrect: (message?: string) => void;
  onIncorrect: (message: string) => void;
  disabled?: boolean;
};

function AnswerForm({
  children,
  onSubmit,
  label = "Check answer",
  disabled = false,
}: {
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent) => void;
  label?: string;
  disabled?: boolean;
}) {
  return (
    <form onSubmit={onSubmit} className="mt-7 space-y-4">
      <div>{children}</div>
      <Button type="submit" className="w-full sm:w-auto" disabled={disabled}>
        {label}
      </Button>
    </form>
  );
}

function ChoiceList({
  options,
  selected,
  onSelect,
  disabled = false,
}: {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="grid gap-3">
      {options.map((option, index) => (
        <Button
          key={option}
          type="button"
          variant="choice"
          data-selected={selected === option}
          onClick={() => onSelect(option)}
          disabled={disabled}
        >
          <span
            className={`grid size-[30px] shrink-0 place-items-center border text-xs font-extrabold ${selected === option ? "border-[var(--coral)] bg-[var(--coral)] text-white" : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink-muted)]"}`}
          >
            {String.fromCharCode(65 + index)}
          </span>
          <span>{option}</span>
        </Button>
      ))}
    </div>
  );
}

export function SequencePuzzle({
  puzzle,
  onCorrect,
  onIncorrect,
  disabled,
}: { puzzle: SequencePuzzle } & AnswerProps) {
  const [value, setValue] = useState("");
  return (
    <AnswerForm
      onSubmit={(event) => {
        event.preventDefault();
        if (!value.trim()) return;
        puzzle.answer === value.trim()
          ? onCorrect(puzzle.explanation)
          : onIncorrect("Not quite. Look for the way each number changes.");
      }}
      disabled={disabled}
    >
      <label
        htmlFor="sequence-answer"
        className="mb-3 block text-sm font-black"
      >
        What comes next?
      </label>
      <div className="flex flex-wrap items-center gap-2 bg-[var(--mint)] p-4 sm:gap-3">
        {puzzle.sequence.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className={`grid h-12 min-w-12 place-items-center border border-[var(--line)] bg-[var(--surface)] px-3 display-font text-xl font-semibold ${item === "?" ? "border-[var(--coral)] bg-[var(--coral-soft)] text-[var(--coral-dark)]" : ""}`}
          >
            {item}
          </span>
        ))}
      </div>
      <Input
        id="sequence-answer"
        className="mt-4 max-w-[220px]"
        type="number"
        inputMode="numeric"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Your number"
        aria-label="Your number"
      />
    </AnswerForm>
  );
}

export function WordScramblePuzzle({
  puzzle,
  onCorrect,
  onIncorrect,
  disabled,
}: { puzzle: WordScramblePuzzle } & AnswerProps) {
  const [value, setValue] = useState("");
  return (
    <AnswerForm
      onSubmit={(event) => {
        event.preventDefault();
        if (!value.trim()) return;
        puzzle.answers.includes(value.trim().toLowerCase())
          ? onCorrect(puzzle.explanation)
          : onIncorrect(
              "That word does not quite fit. Try rearranging the letters again.",
            );
      }}
      disabled={disabled}
    >
      <p className="text-sm font-black">Unscramble the letters</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {puzzle.letters.map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            className="grid h-14 w-12 place-items-center border border-[var(--line)] bg-[var(--sun)] display-font text-2xl font-semibold"
          >
            {letter}
          </span>
        ))}
      </div>
      <label htmlFor="scramble-answer" className="sr-only">
        Your answer
      </label>
      <Input
        id="scramble-answer"
        className="mt-5 max-w-sm uppercase"
        autoCapitalize="characters"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Type the word"
      />
    </AnswerForm>
  );
}

export function LogicPuzzle({
  puzzle,
  onCorrect,
  onIncorrect,
  disabled,
}: { puzzle: LogicPuzzle } & AnswerProps) {
  const [selected, setSelected] = useState("");
  return (
    <AnswerForm
      onSubmit={(event) => {
        event.preventDefault();
        if (!selected) return;
        selected === puzzle.answer
          ? onCorrect(puzzle.explanation)
          : onIncorrect(
              "That option does not follow all the clues. Read the order once more.",
            );
      }}
      label="Lock in answer"
      disabled={disabled}
    >
      <p className="max-w-2xl text-lg font-extrabold leading-8">
        {puzzle.prompt}
      </p>
      <div className="mt-5">
        <ChoiceList
          options={puzzle.options}
          selected={selected}
          onSelect={setSelected}
          disabled={disabled}
        />
      </div>
    </AnswerForm>
  );
}

export function PatternPuzzle({
  puzzle,
  onCorrect,
  onIncorrect,
  disabled,
}: { puzzle: PatternPuzzle } & AnswerProps) {
  const [selected, setSelected] = useState("");
  return (
    <AnswerForm
      onSubmit={(event) => {
        event.preventDefault();
        if (!selected) return;
        selected === puzzle.answer
          ? onCorrect(puzzle.explanation)
          : onIncorrect(
              "Close, but the rhythm is slightly different. Look at the full row.",
            );
      }}
      label="Choose missing tile"
      disabled={disabled}
    >
      <p className="text-sm font-black">Which tile completes the pattern?</p>
      <div className="mt-4 flex flex-wrap gap-2 bg-[var(--blue)] p-4">
        {puzzle.pattern.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className={`grid h-16 min-w-16 place-items-center border border-[var(--line)] bg-[var(--surface)] px-4 display-font text-3xl font-semibold ${item === "?" ? "border-[var(--coral)] bg-[var(--coral-soft)] text-[var(--coral-dark)]" : ""}`}
          >
            {item}
          </span>
        ))}
      </div>
      <div className="mt-5">
        <ChoiceList
          options={puzzle.options}
          selected={selected}
          onSelect={setSelected}
          disabled={disabled}
        />
      </div>
    </AnswerForm>
  );
}

export function MathsPuzzle({
  puzzle,
  onCorrect,
  onIncorrect,
  disabled,
}: { puzzle: MathsPuzzle } & AnswerProps) {
  const [value, setValue] = useState("");
  return (
    <AnswerForm
      onSubmit={(event) => {
        event.preventDefault();
        if (!value.trim()) return;
        puzzle.answer === value.trim()
          ? onCorrect(puzzle.explanation)
          : onIncorrect("Not yet. Check your working and give it another go.");
      }}
      disabled={disabled}
    >
      <p className="text-2xl font-semibold leading-9">{puzzle.question}</p>
      <label htmlFor="maths-answer" className="sr-only">
        Your answer
      </label>
      <Input
        id="maths-answer"
        className="mt-5 max-w-sm"
        type="number"
        inputMode="decimal"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Your answer"
      />
    </AnswerForm>
  );
}

export function RiddlePuzzle({
  puzzle,
  onCorrect,
  onIncorrect,
  disabled,
}: { puzzle: RiddlePuzzle } & AnswerProps) {
  const [value, setValue] = useState("");
  return (
    <AnswerForm
      onSubmit={(event) => {
        event.preventDefault();
        if (!value.trim()) return;
        puzzle.answers.includes(value.trim().toLowerCase())
          ? onCorrect(puzzle.explanation)
          : onIncorrect(
              "That is a thoughtful guess. Look for the object described by every line.",
            );
      }}
      disabled={disabled}
    >
      <div className="border border-[var(--line)] bg-[#f7f1e8] p-5 text-lg font-extrabold leading-8">
        {puzzle.riddle}
      </div>
      <label htmlFor="riddle-answer" className="sr-only">
        Your answer
      </label>
      <Input
        id="riddle-answer"
        className="mt-5 max-w-sm"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="I think it is…"
      />
    </AnswerForm>
  );
}

export function ConnectionsPuzzle({
  puzzle,
  onCorrect,
  onIncorrect,
  onFailed,
  disabled,
}: { puzzle: ConnectionsPuzzle; onFailed: () => void } & AnswerProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [found, setFound] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [message, setMessage] = useState("");
  const remaining = puzzle.groups.filter(
    (group) => !found.includes(group.name),
  );
  const toggleWord = (word: string) =>
    setSelected((current) =>
      current.includes(word)
        ? current.filter((item) => item !== word)
        : current.length < 4
          ? [...current, word]
          : current,
    );
  const submitGroup = () => {
    if (selected.length !== 4 || disabled) return;
    const match = remaining.find((group) =>
      group.words.every((word) => selected.includes(word)),
    );
    if (match) {
      const nextFound = [...found, match.name];
      setFound(nextFound);
      setSelected([]);
      setMessage(`${match.name} found. Nice grouping.`);
      if (nextFound.length === puzzle.groups.length)
        onCorrect(puzzle.explanation);
      return;
    }
    const nextMistakes = mistakes + 1;
    setMistakes(nextMistakes);
    setSelected([]);
    onIncorrect(
      "That group does not quite fit together. Try a different connection.",
    );
    if (nextMistakes >= 4) onFailed();
  };
  return (
    <div className="mt-7">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-black">Select four related words</p>
        <span className="text-xs font-black text-[var(--ink-muted)]">
          {mistakes}/4 wrong guesses
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {puzzle.words.map((word) => (
          <Button
            key={word}
            type="button"
            variant="choice"
            onClick={() => toggleWord(word)}
            disabled={
              disabled ||
              found.some((group) =>
                puzzle.groups
                  .find((item) => item.name === group)
                  ?.words.includes(word),
              )
            }
            className={`min-h-16 justify-center px-2 text-center text-xs ${found.some((group) => puzzle.groups.find((item) => item.name === group)?.words.includes(word)) ? "border-[var(--mint-dark)] bg-[var(--mint)] text-[var(--mint-dark)]" : selected.includes(word) ? "border-[var(--coral)] bg-[var(--coral-soft)] text-[var(--coral-dark)]" : ""}`}
          >
            {word}
          </Button>
        ))}
      </div>
      {message && (
        <p
          className="mt-4 text-sm font-extrabold text-[var(--mint-dark)]"
          aria-live="polite"
        >
          {message}
        </p>
      )}
      <Button
        type="button"
        className="mt-5"
        onClick={submitGroup}
        disabled={selected.length !== 4 || disabled}
      >
        Submit group{" "}
        <span className="border border-white/40 px-2 py-0.5 text-xs">
          {selected.length}/4
        </span>
      </Button>
    </div>
  );
}

export function WordLadderPuzzle({
  puzzle,
  onCorrect,
  onIncorrect,
  disabled,
}: { puzzle: WordLadderPuzzle } & AnswerProps) {
  const [path, setPath] = useState([puzzle.start]);
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const next = value.trim().toUpperCase();
    const current = path[path.length - 1];
    const differsByOne =
      next.length === current.length &&
      next.split("").filter((letter, index) => letter !== current[index])
        .length === 1;
    if (!differsByOne) {
      onIncorrect(
        "A rung can only change one letter. Keep the word length the same.",
      );
      return;
    }
    if (path.includes(next)) {
      onIncorrect("You have already used that rung. Try a new word.");
      return;
    }
    const nextPath = [...path, next];
    setPath(nextPath);
    setValue("");
    if (next === puzzle.target) onCorrect(puzzle.explanation);
    else setMessage("Good step. Keep climbing.");
  };
  return (
    <div className="mt-7">
      <div className="flex flex-wrap items-center gap-2">
        {path.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className={`border px-3 py-2 display-font font-semibold ${word === puzzle.target ? "border-[var(--mint-dark)] bg-[var(--mint)]" : "border-[var(--line)] bg-[var(--surface)]"}`}
          >
            {word}
          </span>
        ))}
        <span className="text-sm font-black text-[var(--ink-muted)]">
          → {puzzle.target}
        </span>
      </div>
      {message && (
        <p
          className="mt-4 text-sm font-extrabold text-[var(--mint-dark)]"
          aria-live="polite"
        >
          {message}
        </p>
      )}
      <form onSubmit={submit} className="mt-5 flex max-w-md gap-2">
        <label htmlFor="ladder-answer" className="sr-only">
          Next word
        </label>
        <Input
          id="ladder-answer"
          className="uppercase"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Next word"
          disabled={disabled}
        />
        <Button className="shrink-0 px-4" type="submit" disabled={disabled}>
          Add rung
        </Button>
      </form>
      <p className="mt-3 text-xs font-bold text-[var(--ink-muted)]">
        {path.length - 1} steps · change exactly one letter each time
      </p>
    </div>
  );
}

export function OddOneOutPuzzle({
  puzzle,
  onCorrect,
  onIncorrect,
  disabled,
}: { puzzle: OddOneOutPuzzle } & AnswerProps) {
  const [selected, setSelected] = useState("");
  return (
    <AnswerForm
      onSubmit={(event) => {
        event.preventDefault();
        if (!selected) return;
        selected === puzzle.answer
          ? onCorrect(puzzle.explanation)
          : onIncorrect("That one still belongs. Look for the shared rule.");
      }}
      label="Choose the odd one"
      disabled={disabled}
    >
      <ChoiceList
        options={puzzle.items}
        selected={selected}
        onSelect={setSelected}
        disabled={disabled}
      />
    </AnswerForm>
  );
}

export function TriviaPuzzle({
  puzzle,
  onCorrect,
  onIncorrect,
  disabled,
}: { puzzle: TriviaPuzzle } & AnswerProps) {
  const [selected, setSelected] = useState("");
  return (
    <AnswerForm
      onSubmit={(event) => {
        event.preventDefault();
        if (!selected) return;
        selected === puzzle.answer
          ? onCorrect(puzzle.explanation)
          : onIncorrect("Not this time. Use the clue and have another think.");
      }}
      label="Lock in answer"
      disabled={disabled}
    >
      <p className="eyebrow">{puzzle.category}</p>
      <p className="mt-2 text-2xl font-semibold leading-9">{puzzle.question}</p>
      <div className="mt-5">
        <ChoiceList
          options={puzzle.options}
          selected={selected}
          onSelect={setSelected}
          disabled={disabled}
        />
      </div>
    </AnswerForm>
  );
}

export function CodeBreakerPuzzle({
  puzzle,
  onCorrect,
  onIncorrect,
  onFailed,
  disabled,
}: { puzzle: CodeBreakerPuzzle; onFailed: () => void } & AnswerProps) {
  const [value, setValue] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (value.length !== 4 || guesses.includes(value)) return;
    const nextGuesses = [...guesses, value];
    setGuesses(nextGuesses);
    if (value === puzzle.code) onCorrect(puzzle.explanation);
    else {
      setValue("");
      onIncorrect(
        "The lock stays shut. Use the clue grid and try another code.",
      );
      if (nextGuesses.length >= puzzle.maxAttempts) onFailed();
    }
  };
  return (
    <div className="mt-7">
      <Card className="border-[var(--line)] bg-[var(--ink)] p-5 text-[var(--surface)]">
        <p className="text-xs font-black uppercase tracking-[0.12em] text-[#b6c7bc]">
          Clue grid
        </p>
        <div className="mt-4 space-y-3">
          {puzzle.clues.map((clue) => (
            <div key={clue.guess} className="flex items-center gap-3 text-sm">
              <span className="bg-[#31413d] px-3 py-2 font-mono font-black tracking-[0.2em]">
                {clue.guess}
              </span>
              <span className="text-[#d8e0da]">{clue.clue}</span>
            </div>
          ))}
        </div>
      </Card>
      <form onSubmit={submit} className="mt-5 flex max-w-md gap-2">
        <label htmlFor="code-answer" className="sr-only">
          Four digit code
        </label>
        <Input
          id="code-answer"
          className="font-mono tracking-[0.35em]"
          type="text"
          inputMode="numeric"
          pattern="[0-9]{4}"
          maxLength={4}
          value={value}
          onChange={(event) => setValue(event.target.value.replace(/\D/g, ""))}
          placeholder="0000"
          disabled={disabled}
        />
        <Button
          className="shrink-0 px-4"
          type="submit"
          disabled={disabled || value.length !== 4}
        >
          Try code
        </Button>
      </form>
      <p className="mt-3 text-xs font-bold text-[var(--ink-muted)]">
        {guesses.length} of {puzzle.maxAttempts} attempts used
      </p>
    </div>
  );
}

export function SudokuPuzzle({
  puzzle,
  onCorrect,
  onIncorrect,
  disabled,
}: { puzzle: SudokuPuzzle } & AnswerProps) {
  const [grid, setGrid] = useState(() => puzzle.grid.map((row) => [...row]));
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [number, setNumber] = useState(1);
  const given = (row: number, column: number) => puzzle.grid[row][column] !== 0;
  const updateCell = (value: number) => {
    if (!selected || given(selected[0], selected[1]) || disabled) return;
    setGrid((current) =>
      current.map((row, rowIndex) =>
        row.map((cell, columnIndex) =>
          rowIndex === selected[0] && columnIndex === selected[1]
            ? value
            : cell,
        ),
      ),
    );
  };
  const check = () => {
    if (grid.some((row) => row.some((cell) => cell === 0))) {
      onIncorrect(
        "A few squares are still blank. Fill the whole grid before checking.",
      );
      return;
    }
    const correct = grid.every((row, rowIndex) =>
      row.every(
        (cell, columnIndex) => cell === puzzle.solution[rowIndex][columnIndex],
      ),
    );
    correct
      ? onCorrect(puzzle.explanation)
      : onIncorrect(
          "A number is out of place. Check the row, column, and square around it.",
        );
  };
  return (
    <div className="mt-7 grid gap-6 sm:grid-cols-[auto_1fr] sm:items-start">
      <div className="w-fit overflow-hidden border-2 border-[var(--ink)] bg-[var(--ink)] p-1">
        <div className="grid grid-cols-4 gap-1">
          {grid.flatMap((row, rowIndex) =>
            row.map((cell, columnIndex) => (
              <Button
                key={`${rowIndex}-${columnIndex}`}
                type="button"
                variant="choice"
                onClick={() => setSelected([rowIndex, columnIndex])}
                className={`grid h-16 min-h-0 w-16 place-items-center justify-center border border-[var(--line)] p-0 display-font text-2xl font-semibold sm:h-18 sm:w-18 ${given(rowIndex, columnIndex) ? "bg-[var(--mint)]" : selected?.[0] === rowIndex && selected?.[1] === columnIndex ? "bg-[var(--coral-soft)] text-[var(--coral-dark)]" : "bg-[var(--surface)]"}`}
                aria-label={`Row ${rowIndex + 1}, column ${columnIndex + 1}, ${given(rowIndex, columnIndex) ? `given ${cell}` : cell ? `entered ${cell}` : "blank"}`}
              >
                {cell || ""}
              </Button>
            )),
          )}
        </div>
      </div>
      <div>
        <p className="text-sm font-black">
          Select a square, then choose a number.
        </p>
        <div className="mt-4 grid max-w-xs grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((value) => (
            <Button
              key={value}
              type="button"
              variant="choice"
              data-selected={number === value}
              className="justify-center"
              onClick={() => {
                setNumber(value);
                updateCell(value);
              }}
              disabled={!selected || disabled}
            >
              {value}
            </Button>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => updateCell(0)}
            disabled={!selected || disabled}
          >
            Clear square
          </Button>
          <Button type="button" size="sm" onClick={check} disabled={disabled}>
            Check grid
          </Button>
        </div>
      </div>
    </div>
  );
}

export function QuickfirePuzzle({
  puzzle,
  onFinished,
  disabled,
}: {
  puzzle: QuickfirePuzzle;
  onFinished: (result: {
    score: number;
    attempted: number;
    correct: number;
    timeSeconds: number;
  }) => void;
  disabled?: boolean;
}) {
  const [seconds, setSeconds] = useState(puzzle.duration);
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const [finished, setFinished] = useState(false);
  const finishedRef = useRef(false);
  const question = puzzle.questions[index];
  const finish = (
    finalScore = score,
    finalAttempted = attempted,
    finalCorrect = correct,
    finalTime = puzzle.duration - seconds,
  ) => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setFinished(true);
    onFinished({
      score: finalScore,
      attempted: finalAttempted,
      correct: finalCorrect,
      timeSeconds: finalTime,
    });
  };

  useEffect(() => {
    if (finished || disabled) return;
    const timer = window.setInterval(() => {
      setSeconds((current) => {
        if (current <= 1) {
          finish(score, attempted, correct, puzzle.duration);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [attempted, correct, disabled, finished, puzzle.duration, score]);
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!question || finished) return;
    const answer = question.kind === "choice" ? selected : value.trim();
    if (!answer) return;
    const nextAttempted = attempted + 1;
    const isCorrect = answer.toLowerCase() === question.answer.toLowerCase();
    const nextCorrect = correct + (isCorrect ? 1 : 0);
    const nextScore = score + (isCorrect ? 25 : 0);
    if (index >= puzzle.questions.length - 1)
      finish(nextScore, nextAttempted, nextCorrect);
    else {
      setScore(nextScore);
      setAttempted(nextAttempted);
      setCorrect(nextCorrect);
      setIndex(index + 1);
      setValue("");
      setSelected("");
    }
  };
  if (!question || finished)
    return (
      <Card className="mt-7 p-6">
        <p className="eyebrow">Sprint complete</p>
        <h3 className="mt-2 text-3xl font-semibold">Nice pace.</h3>
        <p className="mt-2 text-[var(--ink-muted)]">
          Your results are being counted.
        </p>
      </Card>
    );
  return (
    <div className="mt-7">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-black">
          Question {index + 1} of {puzzle.questions.length}
        </span>
        <span
          className={`display-font text-3xl font-semibold ${seconds <= 10 ? "text-[var(--coral-dark)]" : ""}`}
          aria-live="polite"
        >
          {seconds}s
        </span>
      </div>
      <Progress
        className="mt-3"
        value={(seconds / puzzle.duration) * 100}
        aria-label="Time remaining"
      />
      <form onSubmit={submit} className="mt-8">
        <p className="text-2xl font-semibold leading-9">{question.prompt}</p>
        {question.kind === "choice" ? (
          <div className="mt-5">
            <ChoiceList
              options={question.options ?? []}
              selected={selected}
              onSelect={setSelected}
              disabled={disabled}
            />
          </div>
        ) : (
          <Input
            autoFocus
            id="quickfire-answer"
            className="mt-5 max-w-sm"
            type={question.kind === "number" ? "number" : "text"}
            inputMode={question.kind === "number" ? "numeric" : "text"}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Quick, type it here"
            disabled={disabled}
            aria-label="Quickfire answer"
          />
        )}
        {question.kind === "word" && (
          <p className="mt-2 text-xs font-bold text-[var(--ink-muted)]">
            Words are not case-sensitive.
          </p>
        )}
        <Button
          type="submit"
          className="mt-6"
          disabled={
            disabled || (question.kind === "choice" ? !selected : !value.trim())
          }
        >
          Next answer <span aria-hidden="true">↗</span>
        </Button>
      </form>
      <p className="mt-5 text-sm font-extrabold text-[var(--ink-muted)]">
        {correct} correct · {score} points
      </p>
    </div>
  );
}
