"use client";

import { useState, useEffect, useCallback } from "react";
import { MessageCircle, Send, Loader2 } from "lucide-react";
import { formatRelativeDate } from "@/lib/utils";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://aitube-be-production.up.railway.app/api/v1";

interface Comment {
  id: number;
  nickname: string;
  content: string;
  createdAt: string;
}

export default function CommentSection({ videoId }: { videoId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadComments = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/videos/${videoId}/comments`, {
        cache: "no-store",
      });
      if (res.ok) {
        const json = await res.json();
        setComments(json.data);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [videoId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim() || !content.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/videos/${videoId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname: nickname.trim(),
          content: content.trim(),
        }),
      });
      if (res.ok) {
        setContent("");
        await loadComments();
      } else {
        const json = await res.json();
        alert(json.error?.message || "댓글 작성 실패");
      }
    } catch {
      alert("댓글 작성 중 오류가 발생했습니다");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        <MessageCircle className="w-5 h-5" />
        댓글 {comments.length > 0 && `(${comments.length})`}
      </h2>

      {/* 댓글 작성 폼 */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-3">
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임"
          maxLength={50}
          className="w-full sm:w-48 px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <div className="flex gap-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="댓글을 작성하세요..."
            maxLength={1000}
            rows={3}
            className="flex-1 px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            required
          />
          <button
            type="submit"
            disabled={submitting || !nickname.trim() || !content.trim()}
            className="self-end px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </form>

      {/* 댓글 목록 */}
      {loading ? (
        <div className="text-center py-8 text-slate-400">
          <Loader2 className="w-5 h-5 animate-spin mx-auto" />
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-slate-400 text-sm">
          아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium text-sm text-slate-700 dark:text-slate-300">
                  {comment.nickname}
                </span>
                <span className="text-xs text-slate-400">
                  {formatRelativeDate(comment.createdAt)}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
