import { notFound } from "next/navigation";
import VideoGrid from "@/components/VideoGrid";
import CategoryNav from "@/components/CategoryNav";
import { mockVideos } from "@/lib/mock-data";
import { CATEGORY_SLUGS } from "@/lib/constants";
import type { Category } from "@/types";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  if (!CATEGORY_SLUGS[slug as Category]) {
    notFound();
  }

  const category = slug as Category;
  const categoryName = CATEGORY_SLUGS[category];
  const videos = mockVideos.filter((v) => v.category === category);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">
        {categoryName}
      </h1>
      <p className="text-slate-500 mb-6">
        {categoryName} 카테고리의 큐레이션된 영상 {videos.length}개
      </p>

      <CategoryNav />

      <div className="mt-8">
        <VideoGrid videos={videos} />
      </div>
    </div>
  );
}
