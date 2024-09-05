import { useState } from "react";
import { useParams } from "react-router-dom";

import { useVideos } from "@/hooks/use-videos";
import VideoPlayer from "@/components/video-player";
import { useSeasonDetails } from "@/hooks/tv/use-season-details";
import SeasonDetails from "@/pages/tv/components/season-details";

const SeasonDetailsPage = () => {
  const { id, seasonNumber,episodeNumber } = useParams<{
    id: string;
    seasonNumber: string;
    episodeNumber: string;
  }>();
  const { data, loading, error } = useSeasonDetails(
    parseInt(id!),
    parseInt(seasonNumber!)
  );

  const { data: seriesVideos } = useVideos(`tv/${id}/season`, seasonNumber!);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  const handleVideoError = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (seriesVideos?.results[newIndex]) {
        return newIndex;
      }
      return prevIndex;
    });
  };

  const handleAutoPlay = () => {
    setAutoPlay(!autoPlay);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data</div>;

  return (
    <div className="text-white">
      <div className="container flex flex-col gap-10">
        {seriesVideos && seriesVideos.results.length > 0 ? (
          <VideoPlayer
            videoKey={seriesVideos?.results[currentIndex]?.key!}
            site={seriesVideos?.results[currentIndex]?.site!}
            autoPlay={autoPlay}
            onError={handleVideoError}
            handleAutoPlay={handleAutoPlay}
          />
        ) : (
          <p>No valid videos available</p>
        )}
        <SeasonDetails season={data} />
      </div>
    </div>
  );
};

export default SeasonDetailsPage;
