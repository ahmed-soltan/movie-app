import Logo from "./components/logo";
import SearchBar from "./components/search-bar";
import UserButton from "./components/user-button";
import Sidebar from "./components/sidebar";

const Header = () => {
  return (
    <div className="p-5 bg-[#1c1c1c] fixed top-0 w-full left-0 z-50">
      <div className="w-full max-w-[1700px] mx-auto flex items-center justify-between gap-5">
        <div className="flex items-center gap-5">
          <Sidebar />
          <Logo />
        </div>
        <div className="w-full max-w-[800px] hidden md:block">
          <SearchBar />
        </div>
        <div className="hidden lg:block">
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
