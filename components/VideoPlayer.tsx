"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface VideoPlayerProps {
  youtubeId: string;
  thumbnailUrl: string;
  title: string;
}

export default function VideoPlayer({ youtubeId, thumbnailUrl, title }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="relative aspect-video rounded-xl overflow-hidden bg-black mb-6">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 mb-6 w-full group cursor-pointer"
    >
      <Image
        src={thumbnailUrl}
        alt={title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
        <div className="w-20 h-20 bg-red-600 group-hover:bg-red-700 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg">
          <Play className="w-10 h-10 text-white ml-1" fill="white" />
        </div>
      </div>
    </button>
  );
}
