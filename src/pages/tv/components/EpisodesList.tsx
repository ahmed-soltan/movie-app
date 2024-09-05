import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

interface EpisodesListProps {
  seriesId: string;
  season_number: string;
  episodesNumber: number;
  currentEpisode: number;
}

const EpisodesList: React.FC<EpisodesListProps> = ({
  seriesId,
  season_number,
  episodesNumber,
  currentEpisode,
}) => {
  const episodes = Array.from(
    { length: episodesNumber },
    (_, index) => index + 1
  );

  return (
    <div
      className="w-full lg:max-w-[300px] flex flex-col gap-4  "
      style={{ scrollbarWidth: "none" }}
    >
      <h1 className="w-full bg-[#1c1c1c] p-3 text-xl text-white">
        Current Episode: {currentEpisode}
      </h1>
      <div className="flex items-center flex-wrap gap-2 max-h-[560px] overflow-y-auto shadow-lg">
        {episodes.map((number) => (
          <Button
            key={number}
            asChild
            variant={currentEpisode === number ? "primary" : "default"}
            className="w-[68px]"
          >
            <Link
              to={`/tv/series/${seriesId}/season/${season_number}/episode/${number}`}
            >
              {number}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default EpisodesList;
