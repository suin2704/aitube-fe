"use client";

import { useState, useMemo } from "react";
import VideoGrid from "@/components/VideoGrid";
import CategoryNav from "@/components/CategoryNav";
import Pagination from "@/components/Pagination";
import { mockVideos } from "@/lib/mock-data";
import { DIFFICULTY_MAP, LANGUAGE_MAP, PAGINATION } from "@/lib/constants";
import type { Difficulty, Language } from "@/types";

type SortOption = "latest" | "popular" | "oldest";

export default function VideosPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    Difficulty | "all"
  >("all");
  const [selectedLanguage, setSelectedLanguage] = useState<Language | "all">(
    "all"
  );
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredVideos = useMemo(() => {
    let result = [...mockVideos];

    if (selectedDifficulty !== "all") {
      result = result.filter((v) => v.difficulty === selectedDifficulty);
    }
    if (selectedLanguage !== "all") {
      result = result.filter((v) => v.language === selectedLanguage);
    }

    switch (sortBy) {
      case "latest":
        result.sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        );
        break;
      case "popular":
        result.sort((a, b) => b.viewCount - a.viewCount);
        break;
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.publishedAt).getTime() -
            new Date(b.publishedAt).getTime()
        );
        break;
    }

    return result;
  }, [selectedDifficulty, selectedLanguage, sortBy]);

  const totalPages = Math.ceil(
    filteredVideos.length / PAGINATION.DEFAULT_PAGE_SIZE
  );
  const paginatedVideos = filteredVideos.slice(
    (currentPage - 1) * PAGINATION.DEFAULT_PAGE_SIZE,
    currentPage * PAGINATION.DEFAULT_PAGE_SIZE
  );

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
          <option value="oldest">오래된순</option>
        </select>

        <span className="ml-auto text-sm text-slate-500 self-center">
          총 {filteredVideos.length}개 영상
        </span>
      </div>

      <VideoGrid videos={paginatedVideos} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
