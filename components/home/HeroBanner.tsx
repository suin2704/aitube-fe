import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bot, ArrowRight } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-violet-700 text-white">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
            <Bot className="w-5 h-5" />
            <span className="text-sm font-medium">
              AI 큐레이션 플랫폼
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            AI 영상,
            <br />
            <span className="text-blue-200">핵심만 빠르게</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            넘쳐나는 AI 유튜브 영상 속에서 진짜 필요한 정보만.
            <br />
            큐레이션된 영상과 AI 요약으로 학습 시간을 절약하세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/videos">
              <Button className="bg-white text-blue-700 hover:bg-blue-50 h-12 px-8 text-base font-semibold">
                영상 둘러보기
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-700 h-12 px-8 text-base font-semibold"
              >
                서비스 소개
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
