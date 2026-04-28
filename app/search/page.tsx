"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Search, Loader2 } from "lucide-react";
import VideoCard from "@/components/VideoCard";
import type { Video, ApiPagination } from "@/types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://aitube-be-production.up.railway.app/api/v1";

function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [videos, setVideos] = useState<Video[]>([]);
  const [pagination, setPagination] = useState<ApiPagination | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [q]);

  useEffect(() => {
    if (!q.trim()) {
      setVideos([]);
      setPagination(null);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${API_URL}/search?q=${encodeURIComponent(q)}&page=${page}&limit=12`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("검색에 실패했습니다");
        const json = await res.json();
        const transformed = json.data.videos.map((v: Record<string, unknown>) => ({
          id: String(v.id),
          youtubeId: v.youtubeId,
          title: v.title,
          description: (v.description as string) || "",
          youtubeUrl: `https://youtube.com/watch?v=${v.youtubeId}`,
          thumbnailUrl: v.thumbnailUrl,
          channelName: (v.channel as { name: string })?.name || "",
          publishedAt: v.publishedAt,
          viewCount: v.viewCount,
          duration: formatDuration(v.duration as number),
          category: (v.category as { slug: string })?.slug || "ai-trend",
          difficulty: v.difficulty || "beginner",
          language: v.language || "ko",
          tags: v.tags || [],
          isFeatured: v.isFeatured,
        }));
        setVideos(transformed);
        setPagination(json.data.pagination);
      } catch (err) {
        setError(err instanceof Error ? err.message : "오류가 발생했습니다");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [q, page]);

  if (!q.trim()) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">영상 검색</h1>
        <p className="text-slate-500 dark:text-slate-400">
          상단 검색 아이콘을 클릭하여 AI 관련 영상을 검색해보세요.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          &ldquo;{q}&rdquo; 검색 결과
        </h1>
        {pagination && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            총 {pagination.total}개의 영상
          </p>
        )}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <span className="ml-2 text-slate-500">검색 중...</span>
        </div>
      )}

      {error && (
        <div className="text-center py-16">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {!loading && !error && videos.length === 0 && (
        <div className="text-center py-16">
          <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 text-lg">
            &ldquo;{q}&rdquo;에 대한 검색 결과가 없습니다.
          </p>
          <p className="text-slate-400 text-sm mt-1">
            다른 검색어로 시도해보세요.
          </p>
        </div>
      )}

      {!loading && videos.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>

          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                이전
              </button>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {page} / {pagination.totalPages}
              </span>
              <button
                onClick={() =>
                  setPage((p) => Math.min(pagination.totalPages, p + 1))
                }
                disabled={page >= pagination.totalPages}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                다음
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function formatDuration(seconds: number): string {
  if (!seconds) return "0:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-16 text-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
