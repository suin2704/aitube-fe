import type { Video, ApiVideo, ApiCategory, ApiPagination, Category } from "@/types";
import { formatDuration } from "./utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://aitube-be-production.up.railway.app/api/v1";

function transformVideo(api: ApiVideo): Video {
  return {
    id: String(api.id),
    title: api.title,
    description: api.description || "",
    youtubeUrl: `https://youtube.com/watch?v=${api.youtubeId}`,
    thumbnailUrl: api.thumbnailUrl,
    channelName: api.channel.name,
    publishedAt: api.publishedAt,
    viewCount: api.viewCount,
    duration: formatDuration(api.duration),
    category: api.category.slug as Category,
    difficulty: api.difficulty as Video["difficulty"],
    language: api.language as Video["language"],
    tags: api.tags,
    aiSummary: api.summary?.summary,
    isFeatured: api.isFeatured,
  };
}

interface FetchVideosParams {
  page?: number;
  limit?: number;
  category?: string;
  difficulty?: string;
  language?: string;
  sort?: "latest" | "popular";
  featured?: boolean;
}

interface FetchVideosResult {
  videos: Video[];
  pagination: ApiPagination;
}

export async function fetchVideos(params: FetchVideosParams = {}): Promise<FetchVideosResult> {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.set("page", String(params.page));
  if (params.limit) searchParams.set("limit", String(params.limit));
  if (params.category) searchParams.set("category", params.category);
  if (params.difficulty) searchParams.set("difficulty", params.difficulty);
  if (params.language) searchParams.set("language", params.language);
  if (params.sort) searchParams.set("sort", params.sort);
  if (params.featured) searchParams.set("featured", "true");

  const qs = searchParams.toString();
  const res = await fetch(`${API_URL}/videos${qs ? `?${qs}` : ""}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch videos: ${res.status}`);
  }

  const json = await res.json();
  return {
    videos: json.data.videos.map(transformVideo),
    pagination: json.data.pagination,
  };
}

export async function fetchVideoById(id: string): Promise<Video | null> {
  const res = await fetch(`${API_URL}/videos/${id}`, {
    next: { revalidate: 60 },
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch video: ${res.status}`);

  const json = await res.json();
  return transformVideo(json.data);
}

export async function fetchRelatedVideos(id: string, limit = 4): Promise<Video[]> {
  const res = await fetch(`${API_URL}/videos/${id}/related?limit=${limit}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return [];

  const json = await res.json();
  return json.data.map(transformVideo);
}

export async function fetchCategories(): Promise<ApiCategory[]> {
  const res = await fetch(`${API_URL}/categories`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);

  const json = await res.json();
  return json.data;
}
