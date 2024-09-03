import { baseImageUrl } from "@/shared/flags";
import { Movie } from "@/types";
import { Link } from "react-router-dom";

type MovieCardProps = {
  movie: Movie;
};

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link
      to={`/movies/${movie.id}`}
      className="min-w-[200px] md:min-w-[300px]
      flex flex-col items-start justify-between gap-3 overflow-y-hidden"
    >
      <div className="w-full h-full">
        <img
          src={`${baseImageUrl}/${movie.poster_path}`}
          alt={movie.original_title}
        />
      </div>
      <h1 className="text-slate-300 text-lg line-clamp-1">
        {movie.original_title}
      </h1>
      <div
        className="flex items-center justify-start gap-3 bg-[#1F1F1F] w-full
       p-[5px] rounded-sm"
      >
        <p
          className="text-xs p-[3px] bg-purple-600/60 text-white
         font-medium flex items-center"
        >
          {movie.original_language}
        </p>
        <p
          className="text-xs p-[3px] bg-yellow-500/60 text-white
         font-medium flex items-center"
        >
          {movie.popularity}
        </p>
        <p
          className="text-xs p-[3px] bg-slate-700/60 text-white
         font-medium flex items-center"
        >
          {movie.vote_count}
        </p>
      </div>
    </Link>
  );
};
