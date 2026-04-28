import Image from "next/image";
import Link from "next/link";
import { Clock, Eye } from "lucide-react";
import { formatViewCount, formatRelativeDate } from "@/lib/utils";
import DifficultyBadge from "@/components/DifficultyBadge";
import CategoryBadge from "@/components/CategoryBadge";
import BookmarkButton from "@/components/BookmarkButton";
import type { Video } from "@/types";

export default function VideoCard({ video }: { video: Video }) {
  return (
    <Link href={`/videos/${video.id}`} className="group block">
      <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-lg transition-all duration-200">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <BookmarkButton videoId={video.id} />
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <CategoryBadge category={video.category} />
            <DifficultyBadge difficulty={video.difficulty} />
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
            {video.title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
            {video.description}
          </p>
          <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
            <span className="font-medium text-slate-600">
              {video.channelName}
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {formatViewCount(video.viewCount)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatRelativeDate(video.publishedAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
