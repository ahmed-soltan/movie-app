import { FaRegUser } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { IoPersonAddOutline } from "react-icons/io5";
import { IoEnterOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import { useUser } from "@/hooks/use-user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserButton = () => {
  const { user, logoutUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {user && user.photoUrl ? (
          <Avatar>
            <AvatarImage src={user.photoUrl} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ) : (
          <FaRegUserCircle className="w-6 md:w-8 h-6 md:h-8 text-white" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-0 w-[170px] bg-[#1c1c1c] text-[#b9b9b9] border-slate-700">
        {user && (
          <>
            <DropdownMenuLabel>Signed in as</DropdownMenuLabel>
            <DropdownMenuLabel className="py-0 font-normal">
              {user.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="focus:bg-slate-500/20 focus:text-white"
              asChild
            >
              <a
                className="flex items-center text-md cursor-pointer"
                href="/profile"
              >
                <FaRegUser className="w-4 h-4 mr-2" />
                Profile
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="focus:bg-slate-500/20 focus:text-white"
              asChild
            >
              <a
                className="flex items-center text-md cursor-pointer"
                href="/profile/favorite-list"
              >
                <FaRegHeart className="w-4 h-4 mr-2" />
                Favorite List
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="focus:bg-slate-500/20 focus:text-white"
              asChild
            >
              <a
                className="flex items-center text-md cursor-pointer"
                href="/profile/watch-list"
              >
                <FaRegEye className="w-4 h-4 mr-2" />
                Watch List
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="focus:bg-slate-500/20 focus:text-white"
              asChild
            >
              <a
                className="flex items-center text-md cursor-pointer"
                href="/profile/history-list"
              >
                <FaHistory className="w-4 h-4 mr-2" />
                History List
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="focus:bg-slate-500/20 focus:text-white flex items-center text-md cursor-pointer"
              onClick={handleLogout}
            >
              <RiLogoutBoxLine className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </>
        )}
        {!user && (
          <>
            <DropdownMenuItem
              className="focus:bg-slate-500/20 focus:text-white"
              asChild
            >
              <a
                className="flex items-center text-md cursor-pointer"
                href="/profile/login"
              >
                <IoEnterOutline className="w-4 h-4 mr-2" />
                Login
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="focus:bg-slate-500/20 focus:text-white"
              asChild
            >
              <a
                className="flex items-center text-md cursor-pointer"
                href="/profile/register"
              >
                <IoPersonAddOutline className="w-4 h-4 mr-2" />
                Create Account
              </a>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
