import Link from "next/link";
import { CATEGORY_SLUGS } from "@/lib/constants";
import type { Category } from "@/types";

const colorMap: Record<Category, string> = {
  "ai-trend": "bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:hover:bg-rose-900/50",
  "ai-usage": "bg-sky-100 text-sky-700 hover:bg-sky-200 dark:bg-sky-900/30 dark:text-sky-400 dark:hover:bg-sky-900/50",
  "ai-learning": "bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/50",
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
