import HeroBanner from "@/components/home/HeroBanner";
import StatsCounter from "@/components/home/StatsCounter";
import FeaturedVideos from "@/components/home/FeaturedVideos";
import LatestVideos from "@/components/home/LatestVideos";
import { fetchVideos } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [featuredResult, latestResult] = await Promise.all([
    fetchVideos({ sort: "popular", limit: 12 }),
    fetchVideos({ sort: "latest", limit: 8 }),
  ]);

  return (
    <>
      <HeroBanner />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <StatsCounter />
      </div>
      <FeaturedVideos videos={featuredResult.videos} />
      <LatestVideos videos={latestResult.videos} />
    </>
  );
}
