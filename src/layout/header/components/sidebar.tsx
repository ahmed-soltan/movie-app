import { IoMenu } from "react-icons/io5";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUser } from "@/hooks/use-user";
import SidebarRoute from "./sidebar-route";

const initialSidebarRoutes = [
  {
    title: "Movies",
    routes: [
      { title: "Popular Movies", path: "/popular" },
      { title: "Upcoming Movies", path: "/upcoming" },
      { title: "Top Rated Movies", path: "/top-rated" },
    ],
  },
  {
    title: "TV Series",
    routes: [
      { title: "Popular Series", path: "/series/popular" },
      { title: "Top Rated Series", path: "/series/top-rated" },
      { title: "Airing Today", path: "/series/airing-today" },
      { title: "On The Air", path: "/series/on-the-air" },
    ],
  },
];

const Sidebar = () => {
  const { user } = useUser();

  const sidebarRoutes = [...initialSidebarRoutes];

  if (user) {
    sidebarRoutes.push({
      title: "Account",
      routes: [
        { title: "Profile", path: "/profile" },
        { title: "Favorite List", path: "/profile/favorite-list" },
        { title: "Watch List", path: "/profile/watch-list" },
        { title: "History List", path: "/profile/history-list" },
        { title: "Logout", path: "#" },
      ],
    });
  } else {
    sidebarRoutes.push({
      title: "Account",
      routes: [
        { title: "Login", path: "/profile/login" },
        { title: "Register", path: "/profile/register" },
      ],
    });
  }

  return (
    <Sheet>
      <SheetTrigger>
        <IoMenu className="w-10 h-10 text-white cursor-pointer" />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="bg-[#1c1c1c] text-white border-slate-600 p-0"
      >
        <SheetHeader className="bg-[#5a2e98] w-full p-3">
          <SheetTitle className="text-white">
            Hello, {user ? user.username : "Guest"}
          </SheetTitle>
        </SheetHeader>
        <div className="flex items-start flex-col gap-5 w-full p-5">
          {sidebarRoutes.map((sidebarRoute) => (
            <SidebarRoute sidebarRoute={sidebarRoute} key={sidebarRoute.title}/>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
