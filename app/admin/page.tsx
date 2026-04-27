"use client";

import { useEffect, useState } from "react";
import { Film, Radio, FileText, TrendingUp, RefreshCw, Loader2 } from "lucide-react";
import { fetchDashboard, triggerCrawl } from "@/lib/admin-api";

interface DashboardData {
  stats: {
    totalVideos: number;
    activeVideos: number;
    totalChannels: number;
    activeChannels: number;
    totalSummaries: number;
    aiSummaries: number;
    templateSummaries: number;
  };
  categories: Array<{ id: number; name: string; icon: string; videoCount: number }>;
  recentVideos: Array<{
    id: number;
    title: string;
    createdAt: string;
    channel: { name: string };
  }>;
  channelStats: Array<{
    id: number;
    name: string;
    lastFetchedAt: string | null;
    videoCount: number;
  }>;
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [crawling, setCrawling] = useState(false);
  const [crawlResult, setCrawlResult] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboard()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleCrawl = async () => {
    setCrawling(true);
    setCrawlResult(null);
    try {
      const result = await triggerCrawl();
      setCrawlResult(`✅ ${result.channelsProcessed}개 채널 처리, ${result.newVideos}개 새 영상`);
      // 대시보드 새로고침
      const newData = await fetchDashboard();
      setData(newData);
    } catch (err) {
      setCrawlResult(`❌ ${err instanceof Error ? err.message : "실패"}`);
    } finally {
      setCrawling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!data) return <p className="text-red-500">데이터 로드 실패</p>;

  const statCards = [
    { label: "전체 영상", value: data.stats.totalVideos, sub: `활성 ${data.stats.activeVideos}`, icon: Film, color: "text-blue-600 bg-blue-50" },
    { label: "전체 채널", value: data.stats.totalChannels, sub: `활성 ${data.stats.activeChannels}`, icon: Radio, color: "text-emerald-600 bg-emerald-50" },
    { label: "AI 요약", value: data.stats.aiSummaries, sub: `템플릿 ${data.stats.templateSummaries}`, icon: FileText, color: "text-violet-600 bg-violet-50" },
    { label: "전체 요약", value: data.stats.totalSummaries, sub: "완료", icon: TrendingUp, color: "text-amber-600 bg-amber-50" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">대시보드</h1>
        <button
          onClick={handleCrawl}
          disabled={crawling}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${crawling ? "animate-spin" : ""}`} />
          {crawling ? "크롤링 중..." : "크롤링 실행"}
        </button>
      </div>

      {crawlResult && (
        <div className="p-3 bg-slate-100 text-sm text-slate-700 rounded-lg">
          {crawlResult}
        </div>
      )}

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-500">{card.label}</span>
              <div className={`p-2 rounded-lg ${card.color}`}>
                <card.icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{card.value}</p>
            <p className="text-xs text-slate-400 mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* 카테고리별 영상 */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">카테고리별 영상</h2>
          <div className="space-y-3">
            {data.categories.map((cat) => (
              <div key={cat.id} className="flex items-center justify-between">
                <span className="text-sm text-slate-700">
                  {cat.icon} {cat.name}
                </span>
                <span className="text-sm font-medium text-slate-900">{cat.videoCount}개</span>
              </div>
            ))}
          </div>
        </div>

        {/* 최근 추가 영상 */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">최근 추가 영상</h2>
          <div className="space-y-3">
            {data.recentVideos.map((v) => (
              <div key={v.id} className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm text-slate-700 truncate">{v.title}</p>
                  <p className="text-xs text-slate-400">{v.channel.name}</p>
                </div>
                <span className="text-xs text-slate-400 whitespace-nowrap">
                  {new Date(v.createdAt).toLocaleDateString("ko-KR")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 채널 현황 */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">채널 크롤링 현황</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left">
                <th className="pb-2 font-medium text-slate-500">채널</th>
                <th className="pb-2 font-medium text-slate-500">영상 수</th>
                <th className="pb-2 font-medium text-slate-500">마지막 수집</th>
              </tr>
            </thead>
            <tbody>
              {data.channelStats.map((ch) => (
                <tr key={ch.id} className="border-b border-slate-100">
                  <td className="py-2 text-slate-700">{ch.name}</td>
                  <td className="py-2 text-slate-700">{ch.videoCount}</td>
                  <td className="py-2 text-slate-400">
                    {ch.lastFetchedAt
                      ? new Date(ch.lastFetchedAt).toLocaleString("ko-KR")
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
