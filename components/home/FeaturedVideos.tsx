import VideoCard from "@/components/VideoCard";
import type { Video, Category } from "@/types";

const CATEGORY_ORDER: { slug: Category; count: number }[] = [
  { slug: "ai-trend", count: 2 },
  { slug: "ai-usage", count: 1 },
  { slug: "ai-learning", count: 1 },
];

export default function FeaturedVideos({ videos }: { videos: Video[] }) {
  // 최근 1개월 이내 영상만 필터
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const recentVideos = videos.filter(
    (v) => new Date(v.publishedAt) >= oneMonthAgo
  );

  // 카테고리별 조회수 높은 순으로 선별 (2 트렌드 + 1 활용 + 1 학습)
  const featured = CATEGORY_ORDER.flatMap(({ slug, count }) =>
    recentVideos
      .filter((v) => v.category === slug)
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, count)
  );

  // 최근 1개월 내 영상이 부족하면 전체에서 보충
  if (featured.length < 4) {
    const existingIds = new Set(featured.map((v) => v.id));
    const fallback = CATEGORY_ORDER.flatMap(({ slug, count }) => {
      const current = featured.filter((v) => v.category === slug).length;
      if (current >= count) return [];
      return videos
        .filter((v) => v.category === slug && !existingIds.has(v.id))
        .sort((a, b) => b.viewCount - a.viewCount)
        .slice(0, count - current);
    });
    featured.push(...fallback);
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              🔥 인기 영상
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              최근 한 달간 가장 많이 시청된 AI 영상을 확인하세요
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}
