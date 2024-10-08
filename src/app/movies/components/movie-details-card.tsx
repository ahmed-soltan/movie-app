import { FiExternalLink } from "react-icons/fi";
import { MdOutlineDateRange } from "react-icons/md";
import { IoStar } from "react-icons/io5";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { MdOutlineLiveTv } from "react-icons/md";

import { baseImageUrl } from "@/shared/flags";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { MovieDetails } from "@/types";

interface MovieDetailsCardProps {
  movie: MovieDetails;
}

const MovieDetailsCard = ({ movie }: MovieDetailsCardProps) => {
  const { addMediaToFavorites, addMediaToWatchList } = useLocalStorage();

  const handleAddFavorite = () => addMediaToFavorites(movie);
  const handleAddWatchList = () => addMediaToWatchList(movie);

  return (
    <div className="flex items-start w-full gap-5 flex-wrap md:flex-nowrap">
      <div className="min-w-[200px] h-full flex flex-col items-start gap-5">
        <div>
          <img
            src={`${baseImageUrl}${movie.poster_path}`}
            alt={movie.original_title}
            className="h-[300px] w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-3xl font-bold">{movie.original_name || movie.original_title}</h2>
          <div className="hidden lg:flex items-center gap-2">
            <Button
              variant={"default"}
              className="flex items-center"
              onClick={handleAddWatchList}
            >
              <MdOutlineLiveTv className="w-5 h-5 text-white mr-2" />
              Add to Watch List
            </Button>
            <Button
              variant={"primary"}
              className="flex items-center"
              onClick={handleAddFavorite}
            >
              <FaHeartCirclePlus className="w-4 h-4 text-white mr-2" />
              Add to Favorite List
            </Button>
          </div>
        </div>
        <p className="text-sm text-[#777]">{movie.tagline}</p>
        <p className="text-base text-[#999]">{movie.overview}</p>
        <div className="text-sm text-[#777] flex gap-2">
          <span className="flex gap-1">
            Rating:{"   "}
            <span className="flex items-center">
              <IoStar className="w-4 h-4 mr-[2px] text-yellow-600" />
              {movie.vote_average.toFixed(1)}
            </span>
          </span>
          |<span> Votes: {movie.vote_count}</span>
        </div>
        <div className="text-[#777] text-sm">
          genres :{" "}
          {movie.genres.map((genre:any) => (
            <span
              key={genre.id}
              className="text-[#9d6ae4] mx-1 hover:underline"
            >
              {genre.name},
            </span>
          ))}
        </div>
        <div className="text-[#777] text-sm">
          Spoken Languages :{" "}
          {movie.spoken_languages.map((language:any) => (
            <span key={language.iso_639_1} className="text-[#9d6ae4]">
              {language.name}
            </span>
          ))}
        </div>
        <div className="text-[#777] text-sm">
          Status : <span className="text-[#9d6ae4]">{movie.status}</span>
        </div>
        <div className="text-[#777] text-sm flex gap-1">
          Released Date :{" "}
          <span className="text-[#9d6ae4] flex gap-1">
            <MdOutlineDateRange className="w-4 h-4 mt-[2px]" />
            {movie.release_date}
          </span>
        </div>
        <div className="text-[#777] text-sm">
          Production Companies:{" "}
          {movie.production_companies.map((company:any) => (
            <span className="text-[#9d6ae4]" key={company.id}>{company.name} , </span>
          ))}
        </div>
        <a
          href={movie.homepage}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#8656c9] hover:underline flex items-center gap-1 w-[100px]"
        >
          <FiExternalLink className="w-4 h-4" />
          More Info
        </a>
        <div className="flex lg:hidden items-center gap-2 flex-wrap sm:flex-nowrap">
            <Button
              variant={"default"}
              className="flex items-center w-full"
              onClick={handleAddWatchList}
            >
              <MdOutlineLiveTv className="w-5 h-5 text-white mr-2" />
              Add to Watch List
            </Button>
            <Button
              variant={"primary"}
              className="flex items-center w-full"
              onClick={handleAddFavorite}
            >
              <FaHeartCirclePlus className="w-4 h-4 text-white mr-2" />
              Add to Favorite List
            </Button>
          </div>
      </div>
    </div>
  );
};

export default MovieDetailsCard;
