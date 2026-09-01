import { PuzzlePlayer } from "@/components/PuzzlePlayer";
import { InvalidPuzzle } from "@/components/player/PlayerStates";
import { puzzles } from "@/lib/puzzles/catalogue";
import { getPuzzleById } from "@/lib/puzzles/queries";

export function generateStaticParams() {
  return puzzles.map((puzzle) => ({ id: puzzle.id }));
}

export default async function PlayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const puzzle = getPuzzleById(id);
  if (!puzzle) return <InvalidPuzzle />;
  return <PuzzlePlayer puzzle={puzzle} />;
}
