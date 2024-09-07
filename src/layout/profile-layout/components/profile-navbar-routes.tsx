import { FaRegUser } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";

import ProfileNavbarRoute from "./profile-navbar-route";

const routes = [
  {
    title: "Profile",
    path: "/profile",
    icon: <FaRegUser className="w-5 h-5 mr-2" />,
  },
  {
    title: "Favorite List",
    path: "/profile/favorite-list",
    icon: <FaRegHeart className="w-5 h-5 mr-2" />,
  },
  {
    title: "Watch List",
    path: "/profile/watch-list",
    icon: <FaRegEye className="w-5 h-5 mr-2" />,
  },
  {
    title: "History List",
    path: "/profile/history-list",
    icon: <FaHistory className="w-5 h-5 mr-2" />,
  },
  {
    title: "Logout",
    path: "#",
    icon: <RiLogoutBoxLine className="w-5 h-5 mr-2" />,
  },
];

const ProfileNavbarRoutes = () => {
  return (
    <div className="flex md:flex-col items-start justify-between gap-4 bg-[#141414]
     p-4 rounded-md max-h-[300px] w-full md:max-w-[235px] overflow-x-auto">
      {routes.map((route, index) => (
        <ProfileNavbarRoute key={index} route={route} />
      ))}
    </div>
  );
};

export default ProfileNavbarRoutes;
