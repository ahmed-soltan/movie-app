import { baseImageUrl } from "@/shared/flags";
import { Episode } from "@/types";
import unknown from "../../../assets/unknown.jpeg";
import { IoStar } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { Separator } from "../../../components/ui/separator";

interface EpisodeDetailsProps {
  episode: Episode;
}

const EpisodeDetails = ({ episode }: EpisodeDetailsProps) => {
  return (
    <div className="flex flex-col items-start gap-5">
      <div className="flex items-start w-full gap-5 flex-wrap md:flex-nowrap">
        <div className="min-w-[200px] h-full flex flex-col items-start gap-5">
          <div>
            <img
              src={
                episode.still_path
                  ? `${baseImageUrl}${episode.still_path}`
                  : unknown
              }
              alt={episode.name}
              className="h-[300px] w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-3xl font-bold h-full">
              {episode.name} - Episode {episode.episode_number}
            </h2>
          </div>
          <p className="text-base text-[#999]">{episode.overview}</p>
          <div className="text-sm text-[#777] flex gap-2">
            <span className="flex gap-1">
              Rating:{"   "}
              <span className="flex items-center">
                <IoStar className="w-4 h-4 mr-[2px] text-yellow-600" />
                {episode.vote_average.toFixed(1)}
              </span>
            </span>
          </div>
          <div className="text-[#777] text-sm flex gap-1">
            Air Date :{" "}
            <span className="text-[#9d6ae4] flex gap-1">
              <MdOutlineDateRange className="w-4 h-4 mt-[2px]" />
              {episode.air_date}
            </span>
          </div>
          <div className="text-[#777] text-sm flex gap-1">
            episode Number :{" "}
            <span className="text-[#9d6ae4] flex gap-1">
              {episode.episode_number}
            </span>
          </div>
          <div className="text-[#777] text-sm flex gap-1">
            Run Time :{" "}
            <span className="text-[#9d6ae4] flex gap-1">
              {episode.runtime}m
            </span>
          </div>
        </div>
      </div>
      <Separator className="bg-[#555]" />

      {episode.crew.length > 0 && (
        <div className="flex flex-col items-start gap-4 w-full">
          <h1 className="text-2xl font-semibold">Crew: </h1>
          <div className="flex items-center gap-3">
            {episode.crew.map((person) => (
              <div className="flex flex-col gap-2 items-center" key={person.id}>
                <img
                  src={
                    person.profile_path
                      ? `${baseImageUrl}${person.profile_path}`
                      : unknown
                  }
                  alt=""
                  className="w-32 h-32"
                  loading="lazy"
                />
                <span className="text-base">{person.name}</span>
              </div>
            ))}
          </div>
          <Separator className="bg-[#555]" />
        </div>
      )}

      {episode.guest_stars.length > 0 && (
        <div className="flex flex-col items-start gap-4 w-full">
          <h1 className="text-2xl font-semibold">Guest Star: </h1>
          <div className="flex items-center gap-3">
            {episode.guest_stars.map((star) => (
              <div className="flex flex-col gap-2 items-center" key={star.id}>
                <img
                  src={
                    star.profile_path
                      ? `${baseImageUrl}${star.profile_path}`
                      : unknown
                  }
                  alt=""
                  className="w-32 h-32"
                  loading="lazy"
                />
                <span className="text-base">{star.name}</span>
              </div>
            ))}
          </div>
          <Separator className="bg-[#555]" />
        </div>
      )}
    </div>
  );
};

export default EpisodeDetails;
