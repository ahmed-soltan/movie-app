import Logo from "./components/logo";
import SearchBar from "./components/search-bar";
import UserButton from "./components/user-button";
import Sidebar from "./components/sidebar";
import { Separator } from "@/components/ui/separator";

const Header = () => {
  return (
    <div className="p-5 bg-[#1c1c1c] fixed top-0 w-full left-0 z-50 flex flex-col gap-5">
      <div className="w-full max-w-[1700px] mx-auto flex items-center justify-between gap-5">
        <div className="flex items-center gap-2 md:gap-5">
          <Sidebar />
          <Logo />
        </div>
        <div className="w-full max-w-[800px] hidden md:block">
          <SearchBar />
        </div>
        <UserButton />
      </div>
      <div className="w-full max-w-[800px] block md:hidden">
        <Separator className="bg-[#666] mb-3" />
        <SearchBar />
      </div>
    </div>
  );
};

export default Header;
