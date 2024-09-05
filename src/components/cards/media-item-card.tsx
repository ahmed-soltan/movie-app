import { baseImageUrl } from "@/shared/flags";
import { MediaItemType } from "@/types";
import { Link } from "react-router-dom";

type MediaItemCardProps = {
  media: MediaItemType;
  path: string;
};

export const MediaItemCard = ({ media, path }: MediaItemCardProps) => {
  return (
    <Link
      to={`${path}/${media.id}`}
      className="min-w-[280px] max-w-[280px] md:min-w-[300px]
      flex flex-col items-start justify-between gap-3 overflow-y-hidden p-2"
    >
      <img
        src={`${baseImageUrl}/${media.poster_path}`}
        alt={media.original_title}
        className="w-full max-h-[300px]"
      />
      <h1 className="text-slate-300 text-lg line-clamp-1">
        {media.original_title || media.original_name}
      </h1>
      <div
        className="flex items-center justify-start gap-3 bg-[#1F1F1F] w-full
       p-[5px] rounded-sm"
      >
        <p
          className="text-xs p-[3px] bg-purple-600/60 text-white
         font-medium flex items-center"
        >
          {media.original_language}
        </p>
        <p
          className="text-xs p-[3px] bg-yellow-500/60 text-white
         font-medium flex items-center"
        >
          {media.popularity}
        </p>
        <p
          className="text-xs p-[3px] bg-slate-700/60 text-white
         font-medium flex items-center"
        >
          {media.vote_count}
        </p>
      </div>
    </Link>
  );
};
