import { PuzzleCard, TypeGlyph } from "@/components/Ui";
import { puzzleTypeOrder } from "@/lib/puzzle-categories";
import {
  puzzleTypeDescriptions,
  puzzleTypeLabels,
  type Difficulty,
  type Puzzle,
} from "@/lib/types";

const difficultyNote: Record<Difficulty, string> = {
  Easy: "A gentle warm-up",
  Medium: "A satisfying stretch",
  Hard: "For sharp minds",
};

export type PuzzleCollectionProps = {
  puzzles: Puzzle[];
};

export function PuzzleCollection({ puzzles }: PuzzleCollectionProps) {
  const groups = puzzleTypeOrder.flatMap((type) => {
    const items = puzzles.filter((puzzle) => puzzle.type === type);
    return items.length > 0 ? [{ type, items }] : [];
  });

  return (
    <div className="mt-10 space-y-14">
      {groups.map((group) => {
        const representative = group.items[0];

        return (
          <section key={group.type} aria-labelledby={`${group.type}-heading`}>
            <div className="mb-5 flex items-center justify-between gap-3 border-b border-[var(--line)] pb-4">
              <div className="flex items-center gap-3">
                <TypeGlyph type={group.type} size="sm" />
                <div>
                  <p className="eyebrow">{puzzleTypeLabels[group.type]}</p>
                  <h2
                    id={`${group.type}-heading`}
                    className="text-2xl font-semibold"
                  >
                    {puzzleTypeDescriptions[group.type]}
                  </h2>
                </div>
              </div>
              <span className="hidden text-sm font-extrabold text-[var(--ink-muted)] sm:block">
                {group.items.length}{" "}
                {group.items.length === 1 ? "puzzle" : "puzzles"}
              </span>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {group.items.map((puzzle) => (
                <PuzzleCard key={puzzle.id} puzzle={puzzle} compact />
              ))}
            </div>
            <p className="mt-3 text-xs font-bold text-[var(--ink-muted)]">
              {difficultyNote[representative.difficulty]} · From{" "}
              {representative.estimatedTime}
            </p>
          </section>
        );
      })}
    </div>
  );
}
