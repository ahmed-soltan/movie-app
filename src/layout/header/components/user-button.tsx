import { FaRegUser } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { IoEnterOutline } from "react-icons/io5";
import { IoPersonAddOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";

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
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {user && user.photoUrl ? (
          <Avatar>
            <AvatarImage src={user.photoUrl} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ) : (
          <FaRegUserCircle className="w-8 h-8 text-white" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-0 w-[170px] bg-[#1c1c1c] text-white border-slate-700">
        {user && (
          <>
        <DropdownMenuLabel>Signed in as</DropdownMenuLabel>
        <DropdownMenuLabel className="py-0 font-normal">{user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                className="flex items-center text-md cursor-pointer"
                to="/profile"
              >
                <FaRegUser className="w-4 h-4 mr-2" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                className="flex items-center text-md cursor-pointer"
                to="/profile/favorite-list"
              >
                <FaRegHeart className="w-4 h-4 mr-2" />
                Favorite List
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                className="flex items-center text-md cursor-pointer"
                to="/profile/watch-list"
              >
                <FaRegEye className="w-4 h-4 mr-2" />
                Watch List
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                className="flex items-center text-md cursor-pointer"
                to="/profile/history-list"
              >
                <FaHistory className="w-4 h-4 mr-2" />
                History List
              </Link>
            </DropdownMenuItem>
        <DropdownMenuSeparator />
            
            <DropdownMenuItem asChild>
              <Link
                className="flex items-center text-md cursor-pointer"
                to="#"
              >
                <RiLogoutBoxLine className="w-4 h-4 mr-2" />
                Logout
              </Link>
            </DropdownMenuItem>
          </>
        )}
        {!user && (
          <>
            <DropdownMenuItem asChild>
              <Link
                className="flex items-center text-md cursor-pointer"
                to="/profile/login"
              >
                <IoEnterOutline className="w-4 h-4 mr-2" />
                Login
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                className="flex items-center text-md cursor-pointer"
                to="/profile/register"
              >
                <IoPersonAddOutline className="w-4 h-4 mr-2" />
                Create Account
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
