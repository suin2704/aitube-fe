export interface Video {
  id: string;
  youtubeId: string;
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
  isFeatured?: boolean;
}

export type Category =
  | "ai-trend"
  | "ai-usage"
  | "ai-learning";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type Language = "ko" | "en";

// BE API 응답 타입
export interface ApiVideo {
  id: number;
  youtubeId: string;
  title: string;
  description: string | null;
  thumbnailUrl: string;
  duration: number;
  viewCount: number;
  likeCount: number;
  publishedAt: string;
  language: string;
  difficulty: string;
  tags: string[];
  isFeatured: boolean;
  channel: {
    id: number;
    name: string;
    thumbnailUrl: string | null;
  };
  category: {
    id: number;
    name: string;
    slug: string;
    icon: string;
    color: string;
  };
  summary?: {
    summary: string;
    keyPoints: string[];
  } | null;
}

export interface ApiCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string;
  color: string;
  videoCount: number;
}

export interface ApiPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
