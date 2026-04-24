import VideoCard from "@/components/VideoCard";
import type { Video } from "@/types";

export default function FeaturedVideos({ videos }: { videos: Video[] }) {
  const featured = videos.slice(0, 4);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              🔥 인기 영상
            </h2>
            <p className="text-slate-500 mt-1">
              가장 많이 시청된 AI 영상을 확인하세요
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
