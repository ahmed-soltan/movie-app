import { FaSearch } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  return (
    <div className="relative flex items-center w-full">
      <Input
        className="w-full relative rounded-r-none bg-[#0e0e0e] border-0 text-[#777] placeholder:text-[#777] pl-12 text-md"
        placeholder="Search For Movie..."
      />
      <Button
        className="absolute left-0 hover:bg-transparent hover:text-[#888] p-2"
        variant={"ghost"}
      >
        <FaSearch className="w-5 h-5 text-[#777]" />
      </Button>
      <div className="absolute right-0 flex items-center text-[#999] p-2">
        
        <span className="text-[#777] border-[1px] border-[#777] px-2 rounded-md text-sm">S</span>

        <Button
        disabled
          className="hover:bg-transparent hover:text-[#888] p-3"
          variant={"ghost"}
        >
          Quick Access
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
