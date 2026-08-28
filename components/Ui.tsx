import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Difficulty, Puzzle, PuzzleType } from "@/lib/types";
import { puzzleTypeLabels } from "@/lib/types";

export const typeAccent: Record<
  PuzzleType,
  { bg: string; icon: IconName; mark: string }
> = {
  sequence: { bg: "var(--blue)", icon: "bar-chart", mark: "123" },
  "word-scramble": { bg: "var(--sun)", icon: "spark", mark: "ABC" },
  logic: { bg: "var(--lavender)", icon: "lightbulb", mark: "?" },
  pattern: { bg: "var(--mint)", icon: "grid", mark: "◌" },
  maths: { bg: "#f5dce1", icon: "bar-chart", mark: "×" },
  riddle: { bg: "#f2e3ce", icon: "lightbulb", mark: "!" },
  connections: { bg: "#d9e8ee", icon: "grid", mark: "16" },
  "word-ladder": { bg: "#e6e0f4", icon: "arrow-right", mark: "↗" },
  "odd-one-out": { bg: "#f5e2a8", icon: "spark", mark: "1" },
  trivia: { bg: "#dce9e6", icon: "trophy", mark: "Q" },
  "code-breaker": { bg: "#e9ded4", icon: "grid", mark: "#" },
  sudoku: { bg: "#e0e6f2", icon: "grid", mark: "4" },
  zip: { bg: "#f5dce1", icon: "arrow-right", mark: "↗" },
  quickfire: { bg: "#f4d6d3", icon: "flame", mark: "60" },
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const className =
    difficulty === "Easy"
      ? "bg-(--mint) text-(--mint-dark)"
      : difficulty === "Medium"
        ? "bg-[#f8e8bb] text-[#785b1e]"
        : "bg-[#f4d9d6] text-[#95403d]";
  return (
    <Badge variant="ghost" className={className}>
      {difficulty}
    </Badge>
  );
}

export function TypeGlyph({
  type,
  size = "md",
}: {
  type: PuzzleType;
  size?: "sm" | "md" | "lg";
}) {
  const accent = typeAccent[type];
  const sizes = {
    sm: "h-10 w-10 text-sm",
    md: "h-14 w-14 text-lg",
    lg: "h-20 w-20 text-2xl",
  };
  return (
    <span
      className={`relative grid shrink-0 place-items-center border border-(--line) ${sizes[size]}`}
      style={{ backgroundColor: accent.bg }}
      aria-hidden="true"
    >
      <span className="display-font font-semibold">{accent.mark}</span>
      <span className="absolute bottom-1 right-1 opacity-45">
        <Icon
          name={accent.icon}
          size={size === "lg" ? 14 : 11}
          strokeWidth={2.4}
        />
      </span>
    </span>
  );
}

export function StatCard({
  label,
  value,
  icon,
  accent = "var(--surface)",
  detail,
}: {
  label: string;
  value: string | number;
  icon: IconName;
  accent?: string;
  detail?: string;
}) {
  return (
    <Card
      className="min-h-[132px] justify-between p-5"
      style={{ backgroundColor: accent }}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-extrabold text-(--ink-muted)">
          {label}
        </span>
        <span className="text-(--coral-dark)">
          <Icon name={icon} size={18} />
        </span>
      </div>
      <div>
        <div className="display-font text-3xl font-semibold tracking-[-0.03em]">
          {value}
        </div>
        {detail && (
          <div className="mt-1 text-xs font-bold text-(--ink-muted)">
            {detail}
          </div>
        )}
      </div>
    </Card>
  );
}

export function PuzzleCard({
  puzzle,
  compact = false,
}: {
  puzzle: Puzzle;
  compact?: boolean;
}) {
  return (
    <article className="list-settle">
      <Card className={`puzzle-card-motion h-full ${compact ? "p-4" : "p-5"}`}>
        <div className="flex items-start justify-between gap-3">
          <TypeGlyph type={puzzle.type} size={compact ? "sm" : "md"} />
          <DifficultyBadge difficulty={puzzle.difficulty} />
        </div>
        <div className="mt-5 flex-1">
          <p className="eyebrow">{puzzleTypeLabels[puzzle.type]}</p>
          <h3
            className={`${compact ? "text-lg" : "text-xl"} mt-1 font-semibold`}
          >
            {puzzle.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-(--ink-muted)">
            {puzzle.description}
          </p>
        </div>
        <div className="mt-5">
          <Separator />
          <div className="flex items-center justify-between gap-3 pt-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-(--ink-muted)">
              <Icon name="clock" size={14} />
              {puzzle.estimatedTime}
            </span>
            <Button asChild variant="outline" size="sm">
              <Link href={`/play/${puzzle.id}`}>
                Play <Icon name="arrow-right" size={15} />
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </article>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="mt-1 text-3xl font-semibold sm:text-4xl">{title}</h2>
        {description && (
          <p className="mt-2 max-w-2xl text-(--ink-muted)">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
