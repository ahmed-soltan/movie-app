import React from "react";
import { FaPlay } from "react-icons/fa";
import { GrAnnounce } from "react-icons/gr";
import { IoStar } from "react-icons/io5";

import { baseImageUrl } from "@/shared/flags";
import { MediaItemType } from "@/types";

interface RecommendationCardProps {
  recommendation: MediaItemType;
  mediaType: "movie" | "series";
}

const RecommendationCard = React.memo(
  ({ recommendation, mediaType }: RecommendationCardProps) => {
    return (
      <a
        href={`/${mediaType === "movie" ? "movies" : "tv/series"}/${
          recommendation.id
        }`}
        className="flex items-start justify-start gap-1 bg-[#1c1c1c] h-full w-full lg:w-[350px] p-1"
      >
        <div>
          <img
            src={`${baseImageUrl}${recommendation.poster_path}`}
            alt={recommendation.original_title || recommendation.original_name}
            className="h-20 w-16"
          />
        </div>
        <div className="flex flex-col items-start gap-1 p-1">
          <h1 className="text-slate-300 line-clamp-2">
            {recommendation.original_title || recommendation.original_name}
          </h1>
          <div className="flex items-center gap-3 text-sm text-[#777]">
            <div className="flex items-center">
              <IoStar className="w-4 h-4 mr-1 mb-[3px] text-yellow-600" />
              {recommendation.vote_average.toFixed(1)}
            </div>
            <div className="flex items-center">
              <FaPlay className="w-3 h-3 mr-1" />
              {recommendation.popularity}
            </div>
            <div className="flex items-center">
              <GrAnnounce className="w-4 h-4 mr-1" />
              {recommendation.vote_average}
            </div>
          </div>
        </div>
      </a>
    );
  }
);

export default RecommendationCard;
