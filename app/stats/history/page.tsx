import type { Metadata } from "next";
import { StatsHistory } from "@/components/stats/StatsHistory";

export const metadata: Metadata = {
  title: "Puzzle history",
  description: "Review your completed puzzles and recent results.",
};

export default function StatsHistoryPage() {
  return <StatsHistory />;
}
