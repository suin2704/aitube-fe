import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
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
import { mockVideos } from "@/lib/mock-data";
import { LANGUAGE_MAP } from "@/lib/constants";
import { formatViewCount, formatRelativeDate } from "@/lib/utils";

interface VideoDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function VideoDetailPage({
  params,
}: VideoDetailPageProps) {
  const { id } = await params;
  const video = mockVideos.find((v) => v.id === id);

  if (!video) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/videos"
        className="inline-flex items-center text-sm text-slate-500 hover:text-slate-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        영상 목록으로
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 mb-6">
            <Image
              src={video.thumbnailUrl}
              alt={video.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-black/60 rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1" />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <CategoryBadge category={video.category} />
            <DifficultyBadge difficulty={video.difficulty} />
            <span className="inline-flex items-center text-xs text-slate-500 gap-1">
              <Globe className="w-3 h-3" />
              {LANGUAGE_MAP[video.language]}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            {video.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
            <span className="font-medium text-slate-700">
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

          <p className="text-slate-600 leading-relaxed mb-6">
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
                <p className="text-sm text-slate-600 leading-relaxed">
                  {video.aiSummary}
                </p>
              ) : (
                <div className="text-center py-6">
                  <p className="text-sm text-slate-400">
                    AI 요약이 준비 중입니다.
                  </p>
                  <p className="text-xs text-slate-300 mt-1">
                    Phase 1-2에서 제공 예정
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
                    className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
