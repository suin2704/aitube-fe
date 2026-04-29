"use client";

import { useEffect, useState } from "react";
import { BarChart3, Eye, TrendingUp, Calendar, Loader2 } from "lucide-react";
import { fetchAdminAnalytics } from "@/lib/admin-api";

interface AnalyticsData {
  todayViews: number;
  weekViews: number;
  monthViews: number;
  totalViews: number;
  topPages: { page: string; count: number }[];
  dailyStats: { date: string; count: number }[];
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminAnalytics()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!data) {
    return <p className="text-slate-500">데이터를 불러올 수 없습니다.</p>;
  }

  const maxDaily = Math.max(...data.dailyStats.map((d) => d.count), 1);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">방문자 통계</h1>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Eye className="w-5 h-5 text-blue-600" />} label="오늘" value={data.todayViews} />
        <StatCard icon={<TrendingUp className="w-5 h-5 text-emerald-600" />} label="이번 주" value={data.weekViews} />
        <StatCard icon={<Calendar className="w-5 h-5 text-violet-600" />} label="이번 달" value={data.monthViews} />
        <StatCard icon={<BarChart3 className="w-5 h-5 text-amber-600" />} label="전체" value={data.totalViews} />
      </div>

      {/* 일별 추이 (간단한 바 차트) */}
      {data.dailyStats.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-900 mb-4">최근 7일 방문 추이</h3>
          <div className="flex items-end gap-2 h-40">
            {data.dailyStats.map((day) => (
              <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-slate-500">{day.count}</span>
                <div
                  className="w-full bg-blue-500 rounded-t-sm min-h-[4px]"
                  style={{ height: `${(day.count / maxDaily) * 100}%` }}
                />
                <span className="text-xs text-slate-400">
                  {new Date(day.date).toLocaleDateString("ko-KR", { month: "numeric", day: "numeric" })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 인기 페이지 */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="font-semibold text-slate-900 mb-4">인기 페이지 TOP 10 (최근 1개월)</h3>
        {data.topPages.length === 0 ? (
          <p className="text-sm text-slate-400">데이터가 없습니다</p>
        ) : (
          <div className="space-y-2">
            {data.topPages.map((page, i) => (
              <div key={page.page} className="flex items-center gap-3 text-sm">
                <span className="w-6 text-center font-medium text-slate-400">{i + 1}</span>
                <span className="flex-1 text-slate-700 truncate">{page.page}</span>
                <span className="text-slate-500 font-medium">{page.count.toLocaleString()}회</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-sm text-slate-500">{label}</span>
      </div>
      <p className="text-2xl font-bold text-slate-900">{value.toLocaleString()}</p>
    </div>
  );
}
