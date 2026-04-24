import type { Category, Difficulty, Language } from "@/types";

export const DIFFICULTY_MAP: Record<Difficulty, string> = {
  beginner: "입문",
  intermediate: "중급",
  advanced: "고급",
};

export const LANGUAGE_MAP: Record<Language, string> = {
  ko: "한국어",
  en: "영어",
  both: "한/영",
};

export const CATEGORY_SLUGS: Record<Category, string> = {
  "ai-tools": "AI 도구 활용",
  "prompt-engineering": "프롬프트 엔지니어링",
  "model-dev": "모델 개발/연구",
  "ai-news": "AI 뉴스/트렌드",
  "use-cases": "활용 사례",
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
};
