import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  return (
    <div className="relative flex items-center">
      <Input className="w-full relative rounded-r-none" placeholder="Search For Movie..."/>
      <Button className="rounded-l-none" variant={"primary"}>Discover</Button>
    </div>
  );
};

export default SearchBar;
