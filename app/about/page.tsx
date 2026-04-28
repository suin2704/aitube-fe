import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bot, CirclePlay, Layers, Users, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
      <div className="text-center mb-16">
        <Bot className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          AI Tube란?
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          넘쳐나는 AI 관련 유튜브 영상들 속에서 진짜 필요한 정보만 찾기
          힘드셨나요?
          <br />
          AI Tube는 양질의 영상을 큐레이션하고, AI가 핵심만 요약해주는
          플랫폼입니다.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <Card>
          <CardHeader>
            <CirclePlay className="w-8 h-8 text-red-500 mb-2" />
            <CardTitle>엄선된 큐레이션</CardTitle>
            <CardDescription>
              신뢰할 수 있는 채널의 영상만 모았습니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-slate-600 dark:text-slate-300">
            매일 쏟아지는 수많은 영상 중, 실제 학습과 업무에 도움이 되는 트렌드
            및 튜토리얼 영상만을 카테고리별로 분류하여 제공합니다.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Zap className="w-8 h-8 text-violet-500 mb-2" />
            <CardTitle>AI 핵심 요약</CardTitle>
            <CardDescription>
              긴 영상을 다 볼 필요가 없습니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-slate-600 dark:text-slate-300">
            Gemini API를 활용하여 1시간짜리 영상도 3분 만에 파악할 수 있도록
            핵심 내용만 깔끔하게 요약해 드립니다. (Phase 1-2 예정)
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Layers className="w-8 h-8 text-emerald-500 mb-2" />
            <CardTitle>난이도별 맞춤 분류</CardTitle>
            <CardDescription>
              내 수준에 맞는 영상을 찾으세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-slate-600 dark:text-slate-300">
            초보자를 위한 &apos;입문&apos; 영상부터 현업 개발자를 위한
            &apos;고급&apos; 세션까지, 직관적인 난이도 뱃지를 통해 나에게 맞는
            난이도를 선택할 수 있습니다.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Users className="w-8 h-8 text-blue-500 mb-2" />
            <CardTitle>대상 사용자</CardTitle>
            <CardDescription>AI에 관심 있는 누구나</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-slate-600 dark:text-slate-300">
            최신 AI 툴을 업무에 적용하고 싶은 기획자/마케터부터, 새로운 모델
            아키텍처를 학습하려는 개발자까지 폭넓은 사용자를 위한
            플랫폼입니다.
          </CardContent>
        </Card>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 text-center">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          기술 스택 (Tech Stack)
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            "Next.js 16 (App Router)",
            "TypeScript",
            "Tailwind CSS v4",
            "shadcn/ui",
            "Gemini API",
            "YouTube Data API",
          ].map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-full text-sm font-medium text-slate-700 dark:text-slate-200 shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
