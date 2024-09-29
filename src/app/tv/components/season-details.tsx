import SeasonDetailsCard from "@/app/tv/components/SeasonDetailsCard";
import { Season } from "@/types";


interface SeasonDetailsProps {
  season: Season;
}

const SeasonDetails = ({ season }: SeasonDetailsProps) => {

  return (
    <div className="flex flex-col items-start gap-8">
      <SeasonDetailsCard season={season}/>
    </div>
  );
};

export default SeasonDetails;
