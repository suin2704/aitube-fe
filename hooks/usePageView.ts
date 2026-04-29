"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://aitube-be-production.up.railway.app/api/v1";

export function usePageView(videoId?: string) {
  const pathname = usePathname();

  useEffect(() => {
    fetch(`${API_URL}/analytics/pageview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: pathname, videoId: videoId || null }),
    }).catch(() => {});
  }, [pathname, videoId]);
}
