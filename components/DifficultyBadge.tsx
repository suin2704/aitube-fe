import { Badge } from "@/components/ui/badge";
import { DIFFICULTY_MAP } from "@/lib/constants";
import type { Difficulty } from "@/types";

const colorMap: Record<Difficulty, string> = {
  beginner: "bg-emerald-500",
  intermediate: "bg-blue-500",
  advanced: "bg-violet-500",
};

export default function DifficultyBadge({
  difficulty,
}: {
  difficulty: Difficulty;
}) {
  return (
    <Badge className={`${colorMap[difficulty]} text-white border-0`}>
      {DIFFICULTY_MAP[difficulty]}
    </Badge>
  );
}
