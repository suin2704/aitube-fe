import Link from "next/link";
import { CATEGORY_SLUGS } from "@/lib/constants";
import type { Category } from "@/types";

const colorMap: Record<Category, string> = {
  "ai-tools": "bg-sky-100 text-sky-700 hover:bg-sky-200",
  "prompt-engineering": "bg-amber-100 text-amber-700 hover:bg-amber-200",
  "model-dev": "bg-purple-100 text-purple-700 hover:bg-purple-200",
  "ai-news": "bg-rose-100 text-rose-700 hover:bg-rose-200",
  "use-cases": "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
};

export default function CategoryBadge({ category }: { category: Category }) {
  return (
    <Link
      href={`/category/${category}`}
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${colorMap[category]}`}
    >
      {CATEGORY_SLUGS[category]}
    </Link>
  );
}
