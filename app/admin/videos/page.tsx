"use client";

import { useEffect, useState, useCallback } from "react";
import { Search, Star, Trash2, Loader2 } from "lucide-react";
import {
  fetchAdminVideos,
  toggleFeatured,
  deleteAdminVideo,
} from "@/lib/admin-api";

interface AdminVideo {
  id: number;
  youtubeId: string;
  title: string;
  isActive: boolean;
  isFeatured: boolean;
  difficulty: string;
  viewCount: number;
  publishedAt: string;
  channel: { id: number; name: string };
  category: { id: number; name: string; slug: string };
  summary: { id: number; modelUsed: string; status: string } | null;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<AdminVideo[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAdminVideos(page, 20, search);
      setVideos(data.videos);
      setPagination(data.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    load();
  }, [load]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    load();
  };

  const handleToggleFeatured = async (id: number) => {
    try {
      const result = await toggleFeatured(id);
      setVideos((prev) =>
        prev.map((v) =>
          v.id === id ? { ...v, isFeatured: result.isFeatured } : v
        )
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "실패");
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`"${title}" 영상을 비활성화하시겠습니까?`)) return;
    try {
      await deleteAdminVideo(id);
      setVideos((prev) =>
        prev.map((v) => (v.id === id ? { ...v, isActive: false } : v))
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "실패");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">영상 관리</h1>
        {pagination && (
          <span className="text-sm text-slate-500">총 {pagination.total}개</span>
        )}
      </div>

      {/* 검색 */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="영상 제목 또는 채널명 검색..."
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
        >
          검색
        </button>
      </form>

      {/* 테이블 */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-left">
                  <th className="px-4 py-3 font-medium text-slate-500">ID</th>
                  <th className="px-4 py-3 font-medium text-slate-500">제목</th>
                  <th className="px-4 py-3 font-medium text-slate-500">채널</th>
                  <th className="px-4 py-3 font-medium text-slate-500">카테고리</th>
                  <th className="px-4 py-3 font-medium text-slate-500">요약</th>
                  <th className="px-4 py-3 font-medium text-slate-500">상태</th>
                  <th className="px-4 py-3 font-medium text-slate-500">액션</th>
                </tr>
              </thead>
              <tbody>
                {videos.map((v) => (
                  <tr key={v.id} className={`border-b border-slate-100 ${!v.isActive ? "opacity-50" : ""}`}>
                    <td className="px-4 py-3 text-slate-500">{v.id}</td>
                    <td className="px-4 py-3">
                      <div className="max-w-xs">
                        <p className="text-slate-700 truncate font-medium">{v.title}</p>
                        <p className="text-xs text-slate-400">{v.youtubeId}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{v.channel.name}</td>
                    <td className="px-4 py-3 text-slate-600">{v.category.name}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          v.summary?.modelUsed === "template-v1"
                            ? "bg-amber-50 text-amber-700"
                            : v.summary
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {v.summary?.modelUsed || "없음"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          v.isActive
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {v.isActive ? "활성" : "비활성"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleToggleFeatured(v.id)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            v.isFeatured
                              ? "bg-amber-100 text-amber-600"
                              : "bg-slate-100 text-slate-400 hover:text-amber-600"
                          }`}
                          title={v.isFeatured ? "추천 해제" : "추천 설정"}
                        >
                          <Star className="w-4 h-4" fill={v.isFeatured ? "currentColor" : "none"} />
                        </button>
                        <button
                          onClick={() => handleDelete(v.id, v.title)}
                          className="p-1.5 rounded-lg bg-slate-100 text-slate-400 hover:text-red-600 transition-colors"
                          title="비활성화"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 페이지네이션 */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50"
          >
            이전
          </button>
          <span className="text-sm text-slate-600">
            {page} / {pagination.totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
            disabled={page >= pagination.totalPages}
            className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50"
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}
