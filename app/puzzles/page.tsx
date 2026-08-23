"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/Icon";
import { PuzzleCard, TypeGlyph } from "@/components/Ui";
import { puzzles } from "@/lib/puzzles";
import { puzzleTypeDescriptions, puzzleTypeLabels, type CategoryFilter, type Difficulty, type PuzzleType } from "@/lib/types";

const filters: CategoryFilter[] = ["All", "Word", "Numbers", "Logic", "Visual", "Trivia"];

const typeOrder = ["sequence", "word-scramble", "logic", "pattern", "maths", "riddle", "connections", "word-ladder", "odd-one-out", "trivia", "code-breaker", "sudoku", "quickfire"] as const;

const difficultyNote: Record<Difficulty, string> = { Easy: "A gentle warm-up", Medium: "A satisfying stretch", Hard: "For sharp minds" };

function matchesFilter(type: PuzzleType, filter: CategoryFilter) {
  if (filter === "All") return true;
  const groups: Record<Exclude<CategoryFilter, "All">, PuzzleType[]> = {
    Word: ["word-scramble", "riddle", "connections", "word-ladder"],
    Numbers: ["sequence", "maths"],
    Logic: ["logic", "odd-one-out", "code-breaker", "sudoku"],
    Visual: ["pattern"],
    Trivia: ["trivia"]
  };
  return groups[filter].includes(type);
}

export default function PuzzlesPage() {
  const [filter, setFilter] = useState<CategoryFilter>("All");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("category");
    if (filters.includes(query as CategoryFilter)) setFilter(query as CategoryFilter);
  }, []);

  const grouped = useMemo(() => typeOrder.map((type) => ({ type, items: puzzles.filter((puzzle) => puzzle.type === type && matchesFilter(puzzle.type, filter)) })).filter((group) => group.items.length > 0), [filter]);

  return (
    <div className="page-width pb-20 pt-10 lg:pt-16">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div><p className="eyebrow">The puzzle shelf</p><h1 className="mt-2 max-w-xl text-5xl font-semibold leading-[0.95] sm:text-6xl">Something for every kind of curious.</h1></div>
        <p className="max-w-xl text-lg leading-8 text-[var(--ink-muted)]">Pick a lane or wander around. Every puzzle is short enough to start now, with just enough bite to make the answer feel earned.</p>
      </div>

      <div className="mt-10 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Filter puzzles by category">
        {filters.map((item) => <button key={item} type="button" role="tab" aria-selected={filter === item} onClick={() => setFilter(item)} className={`min-h-11 shrink-0 rounded-full border px-5 text-sm font-black transition-colors ${filter === item ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--surface)]" : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink-muted)] hover:border-[var(--ink)] hover:text-[var(--ink)]"}`}>{item}</button>)}
      </div>

      <div className="mt-10 space-y-14">
        {grouped.map((group) => {
          const representative = group.items[0];
          return (
            <section key={group.type} aria-labelledby={`${group.type}-heading`}>
              <div className="mb-5 flex items-center justify-between gap-3 border-b border-[var(--line)] pb-4">
                <div className="flex items-center gap-3"><TypeGlyph type={group.type} size="sm" /><div><p className="eyebrow">{puzzleTypeLabels[group.type]}</p><h2 id={`${group.type}-heading`} className="text-2xl font-semibold">{puzzleTypeDescriptions[group.type]}</h2></div></div>
                <span className="hidden text-sm font-extrabold text-[var(--ink-muted)] sm:block">{group.items.length} {group.items.length === 1 ? "puzzle" : "puzzles"}</span>
              </div>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {group.items.map((puzzle) => <PuzzleCard key={puzzle.id} puzzle={puzzle} compact />)}
              </div>
              {representative && <p className="mt-3 text-xs font-bold text-[var(--ink-muted)]">{difficultyNote[representative.difficulty]} · From {representative.estimatedTime}</p>}
            </section>
          );
        })}
      </div>

      {grouped.length === 0 && <div className="surface-card mt-10 p-10 text-center"><Icon name="spark" size={28} className="mx-auto text-[var(--coral)]" /><h2 className="mt-4 text-2xl font-semibold">No puzzles in that corner yet.</h2><p className="mt-2 text-[var(--ink-muted)]">Try another category and your next little challenge is waiting.</p></div>}
    </div>
  );
}
