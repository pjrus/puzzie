import type { Metadata } from "next";
import { StatsOverview } from "@/components/stats/StatsOverview";

export const metadata: Metadata = {
  title: "Your stats",
  description: "Review your puzzle scores, streaks and strongest categories.",
};

export default function StatsPage() {
  return <StatsOverview />;
}
