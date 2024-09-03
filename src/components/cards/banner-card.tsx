import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { MdOutlineLanguage } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { IoMdTrendingUp } from "react-icons/io";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { baseImageUrl } from "@/shared/flags";
import { Movie } from "@/types";

interface BannerCardProps {
  movie: Movie;
}

export const BannerCard = ({ movie }: BannerCardProps) => {
  return (
    <div className="p-1 h-full max-h-[750px] md:max-h-[630px]">
      <Card className="bg-transparent border-0 max-h-[750px] md:max-h-[630px]">
        <CardContent
          className="flex items-center justify-between flex-wrap
           md:flex-nowrap gap-6 aspect-square p-6 text-white
           max-h-[750px] md:max-h-[630px] w-full shadow-md shadow-slate-500 rounded-md"
        >
          <div
            className="flex items-start flex-col gap-4 max-h-[700px]
                     md:max-h-[600px] w-full max-w-[600px]"
          >
            <h1 className="text-3xl md:text-6xl font-bold">
              {movie.original_title}
            </h1>
            <div className="flex items-center gap-4">
              <p
                className="text-sm md:text-md p-[5px] bg-slate-900 rounded-md flex 
              items-center"
              >
                <MdOutlineLanguage className="w-3 h-3 mr-1 mt-1" />
                {movie.original_language}
              </p>

              <p
                className="text-sm md:text-md p-[5px] bg-slate-900 rounded-md flex 
              items-center"
              >
                <FaRegEye className="w-3 h-3 mr-1 mt-1" />
                {movie.popularity}
              </p>
              <p
                className="text-sm md:text-md p-[5px] bg-slate-900 rounded-md flex 
              items-center"
              >
                <IoMdTrendingUp className="w-3 h-3 mr-1 mt-1" />
                {movie.vote_count}
              </p>
              <p className="text-sm md:text-md p-[5px] bg-slate-900 rounded-md">
                {movie.release_date}
              </p>
            </div>
            <p className="text-slate-400 text-lg max-w-[500px] line-clamp-5">
              {movie.overview}
            </p>
            <Button variant={"primary"} asChild size={"lg"}>
              <Link
                to={`/movies/${movie.id}`}
                className="flex items-center text-3xl"
              >
                <FaPlay className="w-5 h-5 mr-2" />
                Play Now
              </Link>
            </Button>
          </div>
          <div className="w-full relative max-w-[1000px]">
            <img
              className="w-full h-[300px] md:h-[600px] object-top"
              src={`${baseImageUrl}/${movie.poster_path}`}
              alt={movie.original_title}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
