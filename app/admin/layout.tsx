"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Bot, LayoutDashboard, Film, Radio, LogOut } from "lucide-react";
import { adminVerify, clearToken } from "@/lib/admin-api";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    // 로그인 페이지는 인증 불필요
    if (pathname === "/admin/login") {
      setVerified(true);
      return;
    }
    adminVerify().then((ok) => {
      if (!ok) {
        router.replace("/admin/login");
      } else {
        setVerified(true);
      }
    });
  }, [pathname, router]);

  if (!verified) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-slate-400">로딩 중...</div>
      </div>
    );
  }

  // 로그인 페이지는 사이드바 없이
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { href: "/admin", label: "대시보드", icon: LayoutDashboard },
    { href: "/admin/videos", label: "영상 관리", icon: Film },
    { href: "/admin/channels", label: "채널 관리", icon: Radio },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="w-60 bg-slate-900 text-white flex flex-col">
        <div className="p-4 border-b border-slate-700">
          <Link href="/admin" className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-blue-400" />
            <span className="font-bold text-lg">AI Tube Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-slate-700">
          <Link href="/" className="block text-xs text-slate-400 hover:text-white mb-2 px-3">
            ← 사이트로 돌아가기
          </Link>
          <button
            onClick={() => { clearToken(); router.replace("/admin/login"); }}
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-white w-full rounded-lg hover:bg-slate-800 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            로그아웃
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
