import Link from "next/link";
import { Icon } from "@/components/Icon";
import { SectionHeading, TypeGlyph } from "@/components/Ui";
import { Card } from "@/components/ui/card";
import { puzzleCategories } from "@/lib/puzzle-categories";

const homeCategories = puzzleCategories.slice(0, 4);

export function HomeCategories() {
  return (
    <section className="page-width pb-14 pt-4">
      <SectionHeading
        eyebrow="Find your flavour"
        title="Explore by category"
        description="Choose the kind of thinking your brain is asking for."
      />
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {homeCategories.map((category) => (
          <Card key={category.slug} className="min-h-[172px]">
            <Link
              href={`/puzzles/${category.slug}`}
              className="flex h-full flex-col justify-between p-5"
            >
              <div className="flex items-start justify-between">
                <TypeGlyph type={category.type} size="sm" />
                <Icon
                  name="arrow-right"
                  size={18}
                  className="text-(--ink-muted)"
                />
              </div>
              <div>
                <h3 className="mt-7 text-xl font-semibold">{category.label}</h3>
                <p className="mt-1 text-sm leading-6 text-(--ink-muted)">
                  {category.description}
                </p>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
