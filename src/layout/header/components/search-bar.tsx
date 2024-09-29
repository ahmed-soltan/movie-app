import { ChangeEvent, useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import SearchResult from "./search-result";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null); 

  const storeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const OnClose = () => {
    setValue("");
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "s") {
        setIsModalOpen(true);
        inputRef.current?.focus(); 
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="relative flex items-center w-full">
      <Input
        ref={inputRef}
        className="w-full relative rounded-r-none bg-[#0e0e0e] border-0 text-[#777]
         placeholder:text-[#777] pl-12 text-md"
        placeholder="Search For Movie..."
        onChange={storeInputValue}
        value={value}
        onFocus={() => setIsModalOpen(true)}
      />
      <Button
        className="absolute left-0 hover:bg-transparent hover:text-[#888] p-2"
        variant={"ghost"}
      >
        <FaSearch className="w-5 h-5 text-[#777]" />
      </Button>
      <div className="absolute right-0 hidden lg:flex items-center text-[#999] p-2 ">
        <span className="text-[#777] border-[1px] border-[#777] px-2 rounded-md text-sm">
          S
        </span>

        <Button
          disabled
          className="hover:bg-transparent hover:text-[#888] p-3"
          variant={"ghost"}
        >
          Quick Access
        </Button>
      </div>
      <div
        className={cn(
          "absolute top-full left-0 w-full z-30 rounded-md mt-2 border border-[#666]",
          !isModalOpen && "hidden"
        )}
      >
        <SearchResult value={value} OnClose={OnClose} />
      </div>
    </div>
  );
};

export default SearchBar;
