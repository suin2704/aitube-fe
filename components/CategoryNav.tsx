"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORY_SLUGS } from "@/lib/constants";

export default function CategoryNav() {
  const pathname = usePathname();

  const categories = [
    { slug: "all", name: "전체", href: "/videos" },
    ...Object.entries(CATEGORY_SLUGS).map(([slug, name]) => ({
      slug,
      name,
      href: `/category/${slug}`,
    })),
  ];

  return (
    <nav className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat) => {
        const isActive =
          pathname === cat.href ||
          (cat.slug === "all" && pathname === "/videos");
        return (
          <Link
            key={cat.slug}
            href={cat.href}
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              isActive
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            }`}
          >
            {cat.name}
          </Link>
        );
      })}
    </nav>
  );
}
