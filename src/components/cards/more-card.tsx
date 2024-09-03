import { GoArrowRight } from "react-icons/go";

import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type MoreCardProps = {
  path: string;
};

export const MoreCard = ({ path }: MoreCardProps) => {
  return (
    <div
      className="min-w-[170px] md:min-w-[250px] h-[330px] md:min-h-[400px] flex items-center
     justify-center gap-3 border border-slate-300 rounded-md"
    >
      <Button
        variant={"ghost"}
        asChild
        className="hover:bg-slate-800 border h-10 md:h-16 w-10 md:w-16 rounded-full"
      >
        <Link to={path}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <GoArrowRight className="w-7 h-7 text-white" />
              </TooltipTrigger>
              <TooltipContent className="bg-black">
                <p className="text-white">View More</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>
      </Button>
    </div>
  );
};
