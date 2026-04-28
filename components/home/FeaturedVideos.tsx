import VideoCard from "@/components/VideoCard";
import type { Video, Category } from "@/types";
import { CATEGORY_SLUGS } from "@/lib/constants";

const CATEGORY_ORDER: { slug: Category; count: number }[] = [
  { slug: "ai-trend", count: 2 },
  { slug: "ai-usage", count: 1 },
  { slug: "ai-learning", count: 1 },
];

export default function FeaturedVideos({ videos }: { videos: Video[] }) {
  const grouped = CATEGORY_ORDER.map(({ slug, count }) => ({
    slug,
    label: CATEGORY_SLUGS[slug],
    videos: videos.filter((v) => v.category === slug).slice(0, count),
  })).filter((g) => g.videos.length > 0);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              🔥 인기 영상
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              가장 많이 시청된 AI 영상을 확인하세요
            </p>
          </div>
        </div>
        <div className="space-y-10">
          {grouped.map((group) => (
            <div key={group.slug}>
              <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4">
                {group.label}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {group.videos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
