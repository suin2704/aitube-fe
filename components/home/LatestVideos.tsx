import Link from "next/link";
import VideoCard from "@/components/VideoCard";
import { ArrowRight } from "lucide-react";
import type { Video } from "@/types";

export default function LatestVideos({ videos }: { videos: Video[] }) {
  const latest = [...videos]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, 8);

  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              🆕 최신 영상
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              최근 업로드된 AI 영상을 만나보세요
            </p>
          </div>
          <Link
            href="/videos"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
          >
            전체보기
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latest.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}
