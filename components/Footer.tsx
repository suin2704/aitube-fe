import Link from "next/link";
import { Bot } from "lucide-react";
import { CATEGORY_SLUGS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Bot className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-bold text-white">AI Tube</span>
            </Link>
            <p className="text-sm">
              AI 관련 유튜브 영상을 큐레이션하고,
              <br />
              AI가 핵심만 요약해주는 플랫폼입니다.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              카테고리
            </h3>
            <ul className="space-y-2">
              {Object.entries(CATEGORY_SLUGS).map(([slug, name]) => (
                <li key={slug}>
                  <Link
                    href={`/category/${slug}`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">링크</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm hover:text-white transition-colors"
                >
                  서비스 소개
                </Link>
              </li>
              <li>
                <Link
                  href="/videos"
                  className="text-sm hover:text-white transition-colors"
                >
                  전체 영상
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
          © 2026 AI Tube. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
