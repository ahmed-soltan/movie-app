import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";
import { useNavigate } from "react-router-dom";

interface ProfileNavbarRouteProps {
  route: {
    title: string;
    path: string;
    icon: React.ReactNode;
  };
}

const ProfileNavbarRoute = ({ route }: ProfileNavbarRouteProps) => {
  const { logoutUser } = useUser();
  const navigate = useNavigate();

  const isCurrentPath = window.location.pathname === route.path;
  const canLogout = route.title === "Logout";

  const handleLogout = () => {
    if (canLogout) {
      logoutUser();
      return navigate("/");
    }
    return false;
  };
  return (
    <Button
      asChild
      variant={isCurrentPath ? "primary" : "default"}
      className="w-[200px] justify-start h-[35px] md:h-[47px]"
      onClick={handleLogout}
    >
      <a
        href={route.path}
        className={`text-white hover:text-gray-300 transition duration-200`}
      >
        {route.icon}
        <span>{route.title}</span>
      </a>
    </Button>
  );
};

export default ProfileNavbarRoute;
