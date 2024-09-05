import { MdOutlineDateRange } from "react-icons/md";
import { IoStar } from "react-icons/io5";

import { baseImageUrl } from "@/shared/flags";
import { Season } from "@/types";
import unknownSeason from "../../../assets/unknownImage.png"

interface SeasonDetailsCardProps {
  season: Season;
}

const SeasonDetailsCard = ({ season }: SeasonDetailsCardProps) => {

  return (
    <div className="flex items-start w-full gap-5 flex-wrap md:flex-nowrap">
      <div className="min-w-[200px] h-full flex flex-col items-start gap-5">
        <div>
          <img
            src={season.poster_path ? `${baseImageUrl}${season.poster_path}` : unknownSeason}
            alt={season.name}
            className="h-[300px] w-full object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-3xl font-bold h-full">{season.name} - Season {season.season_number+1}</h2>
        </div>
        <p className="text-base text-[#999]">{season.overview}</p>
        <div className="text-sm text-[#777] flex gap-2">
          <span className="flex gap-1">
            Rating:{"   "}
            <span className="flex items-center">
              <IoStar className="w-4 h-4 mr-[2px] text-yellow-600" />
              {season.vote_average.toFixed(1)}
            </span>
          </span>
        </div>
        <div className="text-[#777] text-sm flex gap-1">
          Air Date :{" "}
          <span className="text-[#9d6ae4] flex gap-1">
            <MdOutlineDateRange className="w-4 h-4 mt-[2px]" />
            {season.air_date}
          </span>
        </div>
        <div className="text-[#777] text-sm flex gap-1">
          Season Number :{" "}
          <span className="text-[#9d6ae4] flex gap-1">
            {season.season_number}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SeasonDetailsCard;
