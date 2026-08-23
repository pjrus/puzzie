import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { PuzzleCollection } from "@/components/puzzles/PuzzleCollection";
import {
  getCategoryPuzzles,
  getPuzzleCategory,
  puzzleCategories,
} from "@/lib/puzzle-categories";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return puzzleCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getPuzzleCategory(slug);

  if (!category) return {};

  return {
    title: `${category.label} puzzles`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = getPuzzleCategory(slug);

  if (!category) notFound();

  return (
    <div className="page-width pb-20 pt-10 lg:pt-16">
      <Link href="/puzzles" className="button-quiet px-0">
        <Icon name="arrow-left" size={17} />
        All categories
      </Link>
      <header className="mt-8 max-w-3xl">
        <p className="eyebrow">Puzzle category</p>
        <h1 className="mt-2 text-5xl font-semibold leading-[0.95] sm:text-6xl">
          {category.label} puzzles.
        </h1>
        <p className="mt-4 text-lg leading-8 text-[var(--ink-muted)]">
          {category.description}
        </p>
      </header>

      <nav
        className="mt-8 flex gap-2 overflow-x-auto pb-2"
        aria-label="Puzzle categories"
      >
        {puzzleCategories.map((item) => (
          <Link
            key={item.slug}
            href={`/puzzles/${item.slug}`}
            aria-current={item.slug === category.slug ? "page" : undefined}
            className={`min-h-11 shrink-0 rounded-full border px-5 py-3 text-sm font-black ${
              item.slug === category.slug
                ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--surface)]"
                : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink-muted)]"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <PuzzleCollection puzzles={getCategoryPuzzles(category)} />
    </div>
  );
}
