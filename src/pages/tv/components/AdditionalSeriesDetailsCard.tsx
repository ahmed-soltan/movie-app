import { TvSeriesDetails } from "@/types";
import unknown from "../../../assets/unknown.jpeg";
import { baseImageUrl } from "@/shared/flags";
import { Separator } from "@/components/ui/separator";
import unknownImage from "../../../assets/unknownImage.png";
import { Link } from "react-router-dom";

interface AdditionalSeriesDetailsCardProps {
  series: TvSeriesDetails;
}

const AdditionalSeriesDetailsCard = ({
  series,
}: AdditionalSeriesDetailsCardProps) => {
  return (
    <div className="flex flex-col items-start w-full gap-8">
      <h1 className="text-3xl w-full p-5 bg-[#1c1c1c]">Additional Details</h1>
      {series.created_by.length > 0 && (
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-2xl font-semibold">Creators: </h1>
          <div className="flex items-center gap-3">
            {series.created_by.map((creator) => (
              <div
                className="flex flex-col gap-2 items-center"
                key={creator.id}
              >
                <img
                  src={
                    creator.profile_path
                      ? `${baseImageUrl}${creator.profile_path}`
                      : unknown
                  }
                  alt=""
                  className="w-32 h-32"
                  loading="lazy"
                />
                <span className="text-base">{creator.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <Separator className="bg-[#555]" />

      <div className="flex flex-col items-start gap-4">
        <h1 className="text-2xl font-semibold">Seasons: </h1>
        <div
          className="flex items-center justify-center md:justify-start gap-x-3 gap-y-5 flex-wrap"
          style={{ scrollbarWidth: "none" }}
        >
          {series.seasons.map((season) => (
            <Link
              key={season.id}
              to={`/tv/series/${series.id}/season/${season.season_number}/episode/1`}
              className="flex flex-col gap-2 items-center min-w-[250px]"
            >
              <img
                src={
                  season.poster_path
                    ? `${baseImageUrl}${season.poster_path}`
                    : unknownImage
                }
                alt=""
                className="w-60 h-60"
                loading="lazy"
              />

              <span className="text-base hover:text-[#9667d8]">
                Season {season.season_number + 1}
              </span>
              <span className="text-sm text-[#888]">
                Number of Episodes: {season.episode_count}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <Separator className="bg-[#555]" />
      <div className="flex items-center gap-4 my-5 justify-center md:justify-start flex-wrap">
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-xl font-semibold text-center md:text-left w-full">
            Last Episode To Air{" "}
          </h1>
          <Link
            to={`/tv/series/${series.id}/season/${series.last_episode_to_air.season_number}/episode/${series.last_episode_to_air.episode_number}`}
            className="flex flex-col gap-2 items-center"
          >
            <img
              src={
                series.last_episode_to_air.still_path
                  ? `${baseImageUrl}${series.last_episode_to_air.still_path}`
                  : unknownImage
              }
              alt=""
              className="w-60 h-60"
              loading="lazy"
            />
            <span className="text-base hover:text-[#9667d8]">
              {series.last_episode_to_air.name}
            </span>
            <span className="text-sm text-[#888]">
              {series.last_episode_to_air.air_date}
            </span>
          </Link>
        </div>
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-xl font-semibold text-center md:text-left w-full">
            Next Episode To Air{" "}
          </h1>
          <Link
            to={`/tv/series/${series.id}/season/${series.next_episode_to_air.season_number}/episode/${series.last_episode_to_air.episode_number}`}
            className="flex flex-col gap-2 items-center"
          >
            <img
              src={
                series.next_episode_to_air.still_path
                  ? `${baseImageUrl}${series.next_episode_to_air.still_path}`
                  : unknownImage
              }
              alt=""
              className="w-60 h-60"
              loading="lazy"
            />
            <span className="text-base hover:text-[#9667d8]">
              {series.next_episode_to_air.name}
            </span>
            <span className="text-sm text-[#888]">
              {series.next_episode_to_air.air_date}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdditionalSeriesDetailsCard;
