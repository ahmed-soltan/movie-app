import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMoviesGenres } from "@/hooks/movies/use-movies-genres";

interface GenresProps {
  selectGenre: (genre: string) => void;
}

const Genres = ({ selectGenre }: GenresProps) => {
  const { data: genres } = useMoviesGenres();

  return (
    <div className="flex flex-col items-start w-full md:w-[200px]">
      <Select onValueChange={selectGenre}>
        <SelectTrigger className="w-full md:w-[180px] bg-black border-[#555] text-white focus:ring-0 focus-visible:ring-0 ring-offset-0 inset-y-0">
          <SelectValue placeholder="Genre" />
        </SelectTrigger>
        <div className="z-50">
          <SelectContent className="bg-[#1c1c1c] text-white border-[#777] z-50">
            {genres &&
              genres.genres.map((genre) => (
                <SelectItem key={genre.id} value={genre.id.toString()}>
                  {genre.name}
                </SelectItem>
              ))}
          </SelectContent>
        </div>
      </Select>
    </div>
  );
};

export default Genres;
