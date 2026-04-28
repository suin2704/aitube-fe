"use client";

import { Bookmark } from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";

export default function BookmarkButton({ videoId }: { videoId: string }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const active = isBookmarked(videoId);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleBookmark(videoId);
      }}
      className={`p-1.5 rounded-lg transition-all ${
        active
          ? "bg-blue-600 text-white opacity-100"
          : "bg-black/50 text-white opacity-0 group-hover:opacity-100"
      }`}
      title={active ? "북마크 해제" : "북마크 추가"}
    >
      <Bookmark className={`w-4 h-4 ${active ? "fill-current" : ""}`} />
    </button>
  );
}
