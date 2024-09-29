import { MediaItemCard } from "@/components/cards/media-item-card";
import { MediaItemType } from "@/types";
import { GoArrowRight } from "react-icons/go";

interface MediaSectionProps {
  data: MediaItemType[];
  title: string;
  path: string;
  basePath: string;
}

export const MediaSection = ({ data, title, path , basePath}: MediaSectionProps) => {
  if (!data) {
    return null;
  }

  return (
    <div className="flex items-start flex-col gap-5 w-full">
      <div className="flex items-center justify-between w-full my-2">
        <h1 className="text-2xl md:text-4xl text-white font-bold">{title}</h1>
        <a
          className="text-[#a075dd] flex items-center text-base md:text-xl mt-1"
          href={path}
        >
          <span className="hidden md:block mr-1">View </span> All
          <GoArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-1" />
        </a>
      </div>
      <div
        className="flex items-center justify-between w-full overflow-x-auto gap-5"
        style={{ scrollbarWidth: "none" }}
      >
        {data.map((movie) => (
          <MediaItemCard key={movie.id} media={movie} path={basePath}/>
        ))}
      </div>
    </div>
  );
};
