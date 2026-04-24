import VideoCard from "@/components/VideoCard";
import type { Video } from "@/types";

export default function VideoGrid({ videos }: { videos: Video[] }) {
  if (videos.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500 text-lg">
          해당 조건에 맞는 영상이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
