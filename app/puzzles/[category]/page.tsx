import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { PuzzleCollection } from "@/components/puzzles/PuzzleCollection";
import { Button } from "@/components/ui/button";
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
      <Button asChild variant="ghost" className="px-0">
        <Link href="/puzzles">
          <Icon name="arrow-left" size={17} />
          All categories
        </Link>
      </Button>
      <header className="mt-8 max-w-3xl">
        <p className="eyebrow">Puzzle category</p>
        <h1 className="mt-2 text-5xl font-semibold leading-[0.95] sm:text-6xl">
          {category.label} puzzles.
        </h1>
        <p className="mt-4 text-lg leading-8 text-(--ink-muted)">
          {category.description}
        </p>
      </header>

      <nav
        className="mt-8 flex gap-2 overflow-x-auto pb-2"
        aria-label="Puzzle categories"
      >
        {puzzleCategories.map((item) => (
          <Button
            key={item.slug}
            asChild
            variant={item.slug === category.slug ? "inverse" : "ghost"}
            className={
              item.slug === category.slug
                ? undefined
                : "bg-(--surface) text-(--ink-muted)"
            }
          >
            <Link
              href={`/puzzles/${item.slug}`}
              aria-current={item.slug === category.slug ? "page" : undefined}
            >
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>

      <PuzzleCollection puzzles={getCategoryPuzzles(category)} />
    </div>
  );
}
