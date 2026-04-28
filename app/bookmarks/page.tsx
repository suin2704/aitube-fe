"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";
import { fetchVideos } from "@/lib/api";
import VideoGrid from "@/components/VideoGrid";
import type { Video } from "@/types";

export default function BookmarksPage() {
  const { bookmarkedIds } = useBookmarks();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!bookmarkedIds.length) {
        setVideos([]);
        setLoading(false);
        return;
      }
      try {
        const { videos: all } = await fetchVideos();
        const filtered = all.filter((v: Video) => bookmarkedIds.includes(v.id));
        setVideos(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [bookmarkedIds]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Bookmark className="w-7 h-7 text-blue-600" />
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          북마크
        </h1>
        <span className="text-sm text-slate-500">{videos.length}개 영상</span>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400">로딩 중...</div>
      ) : videos.length === 0 ? (
        <div className="text-center py-20">
          <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">북마크한 영상이 없습니다</p>
          <p className="text-sm text-slate-400 mt-1">
            영상 카드에서 북마크 아이콘을 클릭해보세요
          </p>
        </div>
      ) : (
        <VideoGrid videos={videos} />
      )}
    </div>
  );
}