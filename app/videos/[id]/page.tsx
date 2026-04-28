import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Clock, Eye, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DifficultyBadge from "@/components/DifficultyBadge";
import CategoryBadge from "@/components/CategoryBadge";
import VideoCard from "@/components/VideoCard";
import VideoPlayer from "@/components/VideoPlayer";
import { fetchVideoById, fetchRelatedVideos } from "@/lib/api";
import { LANGUAGE_MAP } from "@/lib/constants";
import { formatViewCount, formatRelativeDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface VideoDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function VideoDetailPage({
  params,
}: VideoDetailPageProps) {
  const { id } = await params;
  const video = await fetchVideoById(id);

  if (!video) {
    const { notFound } = await import("next/navigation");
    notFound();
    return null;
  }

  const relatedVideos = await fetchRelatedVideos(id, 4);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/videos"
        className="inline-flex items-center text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        영상 목록으로
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <VideoPlayer youtubeId={video.youtubeId || ""} thumbnailUrl={video.thumbnailUrl} title={video.title} />

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <CategoryBadge category={video.category} />
            <DifficultyBadge difficulty={video.difficulty} />
            <span className="inline-flex items-center text-xs text-slate-500 gap-1">
              <Globe className="w-3 h-3" />
              {LANGUAGE_MAP[video.language]}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
            {video.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-6">
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {video.channelName}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {formatViewCount(video.viewCount)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {video.duration}
            </span>
            <span>{formatRelativeDate(video.publishedAt)}</span>
          </div>

          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            {video.description}
          </p>

          <a
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <ExternalLink className="w-4 h-4 mr-2" />
              YouTube에서 보기
            </Button>
          </a>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🤖 AI 요약</CardTitle>
            </CardHeader>
            <CardContent>
              {video.aiSummary ? (
                <div className="space-y-4">
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {video.aiSummary}
                  </p>

                  {video.aiKeyPoints && video.aiKeyPoints.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                        📌 핵심 포인트
                      </h4>
                      <ul className="space-y-1">
                        {video.aiKeyPoints.map((point, i) => (
                          <li
                            key={i}
                            className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2"
                          >
                            <span className="text-blue-500 mt-0.5">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {video.aiKeywords && video.aiKeywords.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {video.aiKeywords.map((kw) => (
                        <span
                          key={kw}
                          className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-full"
                        >
                          #{kw}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-3 text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-700">
                    {video.aiDifficulty && (
                      <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">
                        난이도: {video.aiDifficulty}
                      </span>
                    )}
                    {video.aiEstimatedTime && (
                      <span>⏱ 예상 {video.aiEstimatedTime}분</span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-sm text-slate-400">
                    AI 요약이 준비 중입니다.
                  </p>
                  <p className="text-xs text-slate-300 mt-1">
                    곧 자동으로 생성됩니다
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🏷️ 태그</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {video.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {relatedVideos.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">📺 관련 영상</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedVideos.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
