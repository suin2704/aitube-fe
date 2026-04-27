"use client";

import { useState, useEffect } from "react";
import VideoGrid from "@/components/VideoGrid";
import CategoryNav from "@/components/CategoryNav";
import Pagination from "@/components/Pagination";
import { DIFFICULTY_MAP, LANGUAGE_MAP } from "@/lib/constants";
import type { Video, Difficulty, Language } from "@/types";

type SortOption = "latest" | "popular";

export default function VideosPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    Difficulty | "all"
  >("all");
  const [selectedLanguage, setSelectedLanguage] = useState<Language | "all">(
    "all"
  );
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [videos, setVideos] = useState<Video[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.set("page", String(currentPage));
        params.set("limit", "12");
        params.set("sort", sortBy);
        if (selectedDifficulty !== "all") params.set("difficulty", selectedDifficulty);
        if (selectedLanguage !== "all") params.set("language", selectedLanguage);

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://aitube-be-production.up.railway.app/api/v1";
        const res = await fetch(`${apiUrl}/videos?${params.toString()}`);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const json = await res.json();

        if (json.success) {
          const { formatDuration } = await import("@/lib/utils");
          const mapped: Video[] = json.data.videos.map((v: import("@/types").ApiVideo) => ({
            id: String(v.id),
            title: v.title,
            description: v.description || "",
            youtubeUrl: `https://youtube.com/watch?v=${v.youtubeId}`,
            thumbnailUrl: v.thumbnailUrl,
            channelName: v.channel.name,
            publishedAt: v.publishedAt,
            viewCount: v.viewCount,
            duration: formatDuration(v.duration),
            category: v.category.slug as Video["category"],
            difficulty: v.difficulty as Video["difficulty"],
            language: v.language as Video["language"],
            tags: v.tags,
            isFeatured: v.isFeatured,
          }));
          setVideos(mapped);
          setTotalPages(json.data.pagination.totalPages);
          setTotalCount(json.data.pagination.total);
        }
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [currentPage, selectedDifficulty, selectedLanguage, sortBy]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">영상 목록</h1>
      <p className="text-slate-500 mb-6">
        AI 관련 큐레이션된 영상을 탐색하세요
      </p>

      <CategoryNav />

      <div className="flex flex-wrap gap-3 mt-6 mb-8">
        <select
          value={selectedDifficulty}
          onChange={(e) => {
            setSelectedDifficulty(e.target.value as Difficulty | "all");
            setCurrentPage(1);
          }}
          className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">전체 난이도</option>
          {Object.entries(DIFFICULTY_MAP).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <select
          value={selectedLanguage}
          onChange={(e) => {
            setSelectedLanguage(e.target.value as Language | "all");
            setCurrentPage(1);
          }}
          className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">전체 언어</option>
          {Object.entries(LANGUAGE_MAP).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value as SortOption);
            setCurrentPage(1);
          }}
          className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="latest">최신순</option>
          <option value="popular">인기순</option>
        </select>

        <span className="ml-auto text-sm text-slate-500 self-center">
          총 {totalCount}개 영상
        </span>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-slate-200 rounded-xl h-72" />
          ))}
        </div>
      ) : (
        <VideoGrid videos={videos} />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
