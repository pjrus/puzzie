import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { PuzzleCard, TypeGlyph } from "@/components/Ui";
import { getDailyPuzzle, puzzles } from "@/lib/puzzles";
import { puzzleCategories } from "@/lib/puzzle-categories";

export const metadata: Metadata = {
  title: "Puzzles",
  description: "Browse short word, number, logic, visual and trivia puzzles.",
};

export default function PuzzlesPage() {
  const daily = getDailyPuzzle();
  const featured = puzzles
    .filter((puzzle) => puzzle.id !== daily.id)
    .slice(0, 6);

  return (
    <div className="page-width pb-20 pt-10 lg:pt-16">
      <header className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="eyebrow">The puzzle shelf</p>
          <h1 className="mt-2 max-w-xl text-5xl font-semibold leading-[0.95] sm:text-6xl">
            Something for every kind of curious.
          </h1>
        </div>
        <p className="max-w-xl text-lg leading-8 text-[var(--ink-muted)]">
          Pick a lane or wander around. Every puzzle is short enough to start
          now, with just enough bite to make the answer feel earned.
        </p>
      </header>

      <section className="mt-12" aria-labelledby="categories-heading">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Choose a lane</p>
            <h2 id="categories-heading" className="mt-1 text-3xl font-semibold">
              Browse by category
            </h2>
          </div>
          <span className="hidden text-sm font-extrabold text-[var(--ink-muted)] sm:block">
            {puzzles.length} puzzles
          </span>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {puzzleCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/puzzles/${category.slug}`}
              className="surface-card group flex min-h-44 flex-col justify-between p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <TypeGlyph type={category.type} size="sm" />
                <Icon
                  name="arrow-right"
                  size={18}
                  className="text-[var(--ink-muted)]"
                />
              </div>
              <div>
                <h3 className="mt-7 text-xl font-semibold">{category.label}</h3>
                <p className="mt-1 text-sm leading-6 text-[var(--ink-muted)]">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14" aria-labelledby="featured-heading">
        <div>
          <p className="eyebrow">Good places to start</p>
          <h2 id="featured-heading" className="mt-1 text-3xl font-semibold">
            Featured puzzles
          </h2>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((puzzle) => (
            <PuzzleCard key={puzzle.id} puzzle={puzzle} compact />
          ))}
        </div>
      </section>
    </div>
  );
}
