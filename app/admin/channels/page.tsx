"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Loader2 } from "lucide-react";
import {
  fetchAdminChannels,
  createAdminChannel,
  deleteAdminChannel,
} from "@/lib/admin-api";

interface AdminChannel {
  id: number;
  youtubeId: string;
  name: string;
  language: string;
  isActive: boolean;
  subscriberCount: number;
  lastFetchedAt: string | null;
  defaultCategory: { id: number; name: string; slug: string } | null;
  _count: { videos: number };
}

export default function AdminChannelsPage() {
  const [channels, setChannels] = useState<AdminChannel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newChannel, setNewChannel] = useState({ youtubeId: "", name: "", defaultCategoryId: "" });
  const [adding, setAdding] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminChannels();
      setChannels(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChannel.youtubeId || !newChannel.name) return;
    setAdding(true);
    try {
      await createAdminChannel({
        youtubeId: newChannel.youtubeId,
        name: newChannel.name,
        defaultCategoryId: newChannel.defaultCategoryId ? parseInt(newChannel.defaultCategoryId) : undefined,
      });
      setNewChannel({ youtubeId: "", name: "", defaultCategoryId: "" });
      setShowAdd(false);
      await load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "채널 추가 실패");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`"${name}" 채널을 비활성화하시겠습니까?`)) return;
    try {
      await deleteAdminChannel(id);
      setChannels((prev) =>
        prev.map((ch) => (ch.id === id ? { ...ch, isActive: false } : ch))
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "실패");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">채널 관리</h1>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          채널 추가
        </button>
      </div>

      {/* 채널 추가 폼 */}
      {showAdd && (
        <form onSubmit={handleAdd} className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
          <h3 className="font-semibold text-slate-900">새 채널 추가</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">YouTube 채널 ID *</label>
              <input
                type="text"
                value={newChannel.youtubeId}
                onChange={(e) => setNewChannel({ ...newChannel, youtubeId: e.target.value })}
                placeholder="UCxxxxxx"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">채널명 *</label>
              <input
                type="text"
                value={newChannel.name}
                onChange={(e) => setNewChannel({ ...newChannel, name: e.target.value })}
                placeholder="채널 이름"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">기본 카테고리 ID</label>
              <select
                value={newChannel.defaultCategoryId}
                onChange={(e) => setNewChannel({ ...newChannel, defaultCategoryId: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">선택</option>
                <option value="1">🔥 AI 트렌드</option>
                <option value="2">🔧 AI 활용</option>
                <option value="3">📚 AI 학습</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={adding}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {adding ? "추가 중..." : "추가"}
            </button>
            <button
              type="button"
              onClick={() => setShowAdd(false)}
              className="px-4 py-2 bg-slate-100 text-slate-700 text-sm rounded-lg hover:bg-slate-200"
            >
              취소
            </button>
          </div>
        </form>
      )}

      {/* 채널 목록 */}
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
                  <th className="px-4 py-3 font-medium text-slate-500">채널명</th>
                  <th className="px-4 py-3 font-medium text-slate-500">YouTube ID</th>
                  <th className="px-4 py-3 font-medium text-slate-500">카테고리</th>
                  <th className="px-4 py-3 font-medium text-slate-500">영상 수</th>
                  <th className="px-4 py-3 font-medium text-slate-500">마지막 수집</th>
                  <th className="px-4 py-3 font-medium text-slate-500">상태</th>
                  <th className="px-4 py-3 font-medium text-slate-500">액션</th>
                </tr>
              </thead>
              <tbody>
                {channels.map((ch) => (
                  <tr key={ch.id} className={`border-b border-slate-100 ${!ch.isActive ? "opacity-50" : ""}`}>
                    <td className="px-4 py-3 text-slate-500">{ch.id}</td>
                    <td className="px-4 py-3 font-medium text-slate-700">{ch.name}</td>
                    <td className="px-4 py-3 text-slate-500 font-mono text-xs">{ch.youtubeId}</td>
                    <td className="px-4 py-3 text-slate-600">{ch.defaultCategory?.name || "—"}</td>
                    <td className="px-4 py-3 text-slate-700">{ch._count.videos}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">
                      {ch.lastFetchedAt
                        ? new Date(ch.lastFetchedAt).toLocaleString("ko-KR")
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          ch.isActive
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {ch.isActive ? "활성" : "비활성"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(ch.id, ch.name)}
                        className="p-1.5 rounded-lg bg-slate-100 text-slate-400 hover:text-red-600 transition-colors"
                        title="비활성화"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
