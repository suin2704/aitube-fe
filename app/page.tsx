import HeroBanner from "@/components/home/HeroBanner";
import StatsCounter from "@/components/home/StatsCounter";
import FeaturedVideos from "@/components/home/FeaturedVideos";
import LatestVideos from "@/components/home/LatestVideos";
import { mockVideos } from "@/lib/mock-data";

export default function Home() {
  const featuredVideos = [...mockVideos].sort(
    (a, b) => b.viewCount - a.viewCount
  );

  return (
    <>
      <HeroBanner />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <StatsCounter />
      </div>
      <FeaturedVideos videos={featuredVideos} />
      <LatestVideos videos={mockVideos} />
    </>
  );
}
