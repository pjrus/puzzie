import { PuzzlePlayer, InvalidPuzzle } from "@/components/PuzzlePlayer";
import { getPuzzleById } from "@/lib/puzzles";

export default async function PlayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const puzzle = getPuzzleById(id);
  if (!puzzle) return <InvalidPuzzle />;
  return <PuzzlePlayer puzzle={puzzle} />;
}
