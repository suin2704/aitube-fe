export interface Video {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  channelName: string;
  publishedAt: string;
  viewCount: number;
  duration: string;
  category: Category;
  difficulty: Difficulty;
  language: Language;
  tags: string[];
  aiSummary?: string;
}

export type Category =
  | "ai-tools"
  | "prompt-engineering"
  | "model-dev"
  | "ai-news"
  | "use-cases";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type Language = "ko" | "en" | "both";
