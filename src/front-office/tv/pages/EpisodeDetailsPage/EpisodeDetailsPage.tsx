import { useState } from "react";
import { useParams } from "react-router-dom";

import { useVideos } from "@/hooks/use-videos";
import VideoPlayer from "@/components/video-player";
import { useEpisodeDetails } from "@/hooks/tv/use-episode-details";
import unknownImage from "../../../../assets/unknownImage.png";
import { baseImageUrl } from "@/shared/flags";
import EpisodesList from "../../components/EpisodesList";
import { useSeasonDetails } from "@/hooks/tv/use-season-details";
import SeasonDetails from "@/front-office/tv/components/season-details";
import EpisodeDetails from "@/front-office/tv/components/episode-details";
import { Separator } from "@/components/ui/separator";

const EpisodeDetailsPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const { id, seasonNumber, episodeNumber } = useParams<{
    id: string;
    seasonNumber: string;
    episodeNumber: string;
  }>();
  const {
    data: episodeDetails,
    loading,
    error,
  } = useEpisodeDetails(
    parseInt(id!),
    parseInt(seasonNumber!),
    parseInt(episodeNumber!)
  );

  const { data: seasonDetails } = useSeasonDetails(
    parseInt(id!),
    parseInt(seasonNumber!)
  );

  const { data: seriesVideos } = useVideos(
    `tv/${id}/season/${seasonNumber}/episode`,
    episodeNumber!
  );

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
  if (!episodeDetails || !seasonDetails) return <div>No data</div>;

  return (
    <div className="text-white">
      <div className="p-5 flex flex-col gap-10">
        <div className="flex items-start gap-2 flex-wrap-reverse lg:flex-nowrap w-full">
          <EpisodesList
            seriesId={id!}
            season_number={seasonNumber!}
            episodesNumber={seasonDetails.episodes.length}
            currentEpisode={episodeDetails.episode_number}
          />
          {seriesVideos && seriesVideos.results.length > 0 ? (
            <VideoPlayer
              videoKey={seriesVideos?.results[currentIndex]?.key!}
              site={seriesVideos?.results[currentIndex]?.site!}
              autoPlay={autoPlay}
              onError={handleVideoError}
              handleAutoPlay={handleAutoPlay}
            />
          ) : (
            <img
              src={
                `${baseImageUrl}${episodeDetails.still_path}` || unknownImage
              }
              alt=""
              className="w-full h-full"
              loading="lazy"
            />
          )}
        </div>
        <SeasonDetails season={seasonDetails} />
        <Separator className="bg-[#555]" />
        <EpisodeDetails episode={episodeDetails} />
      </div>
    </div>
  );
};

export default EpisodeDetailsPage;
