import type { Category, Difficulty, Language } from "@/types";

export const DIFFICULTY_MAP: Record<Difficulty, string> = {
  beginner: "입문",
  intermediate: "중급",
  advanced: "고급",
};

export const LANGUAGE_MAP: Record<Language, string> = {
  ko: "한국어",
  en: "영어",
};

export const CATEGORY_SLUGS: Record<Category, string> = {
  "ai-trend": "🔥 AI 트렌드",
  "ai-usage": "🔧 AI 활용",
  "ai-learning": "📚 AI 학습",
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
};
