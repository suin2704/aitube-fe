const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://aitube-be-production.up.railway.app/api/v1";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_token");
}

export function setToken(token: string) {
  localStorage.setItem("admin_token", token);
}

export function clearToken() {
  localStorage.removeItem("admin_token");
}

async function adminFetch(path: string, options: RequestInit = {}) {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    cache: "no-store",
  });
  return res;
}

// Auth
export async function adminLogin(password: string) {
  const res = await adminFetch("/admin/login", {
    method: "POST",
    body: JSON.stringify({ password }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.message || "로그인 실패");
  return json.data as { token: string; expiresIn: string };
}

export async function adminVerify() {
  const res = await adminFetch("/admin/me");
  return res.ok;
}

// Dashboard
export async function fetchDashboard() {
  const res = await adminFetch("/admin/dashboard");
  if (!res.ok) throw new Error("대시보드 데이터 조회 실패");
  const json = await res.json();
  return json.data;
}

// Videos
export async function fetchAdminVideos(page = 1, limit = 20, search = "") {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (search) params.set("search", search);
  const res = await adminFetch(`/admin/videos?${params}`);
  if (!res.ok) throw new Error("영상 목록 조회 실패");
  const json = await res.json();
  return json.data;
}

export async function updateAdminVideo(id: number, data: Record<string, unknown>) {
  const res = await adminFetch(`/admin/videos/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("영상 수정 실패");
  const json = await res.json();
  return json.data;
}

export async function toggleFeatured(id: number) {
  const res = await adminFetch(`/admin/videos/${id}/featured`, { method: "PATCH" });
  if (!res.ok) throw new Error("추천 토글 실패");
  const json = await res.json();
  return json.data;
}

export async function deleteAdminVideo(id: number) {
  const res = await adminFetch(`/admin/videos/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("영상 삭제 실패");
  const json = await res.json();
  return json.data;
}

// Channels
export async function fetchAdminChannels() {
  const res = await adminFetch("/admin/channels");
  if (!res.ok) throw new Error("채널 목록 조회 실패");
  const json = await res.json();
  return json.data;
}

export async function createAdminChannel(data: Record<string, unknown>) {
  const res = await adminFetch("/admin/channels", {
    method: "POST",
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error?.message || "채널 추가 실패");
  }
  return json.data;
}

export async function updateAdminChannel(id: number, data: Record<string, unknown>) {
  const res = await adminFetch(`/admin/channels/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("채널 수정 실패");
  const json = await res.json();
  return json.data;
}

export async function deleteAdminChannel(id: number) {
  const res = await adminFetch(`/admin/channels/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("채널 삭제 실패");
  const json = await res.json();
  return json.data;
}

// Crawl
export async function triggerCrawl() {
  const res = await adminFetch("/crawl/run", {
    method: "POST",
    headers: { "x-cron-secret": "aitube-crawl-secret-2026" },
  });
  if (!res.ok) throw new Error("크롤링 실행 실패");
  const json = await res.json();
  return json.data;
}

export async function fetchCrawlStatus() {
  const res = await fetch(`${API_URL}/crawl/status`, { cache: "no-store" });
  if (!res.ok) throw new Error("크롤링 상태 조회 실패");
  const json = await res.json();
  return json.data;
}

// Analytics
export async function fetchAdminAnalytics() {
  const res = await adminFetch("/admin/analytics");
  if (!res.ok) throw new Error("방문자 통계 조회 실패");
  const json = await res.json();
  return json.data;
}
