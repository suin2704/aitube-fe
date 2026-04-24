import Link from "next/link";
import { CATEGORY_SLUGS } from "@/lib/constants";
import type { Category } from "@/types";

const colorMap: Record<Category, string> = {
  "ai-trend": "bg-rose-100 text-rose-700 hover:bg-rose-200",
  "ai-usage": "bg-sky-100 text-sky-700 hover:bg-sky-200",
  "ai-learning": "bg-purple-100 text-purple-700 hover:bg-purple-200",
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
