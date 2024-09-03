import { Link } from "react-router-dom";

import { Separator } from "@/components/ui/separator";

type RouteType = {
  title: string;
  path: string;
};

interface SidebarRouteProps {
  sidebarRoute: {
    title: string;
    routes: RouteType[];
  };
}

const SidebarRoute = ({ sidebarRoute }: SidebarRouteProps) => {
  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-xl font-semibold mb-3">{sidebarRoute.title}</h1>
        <ul className="flex items-start gap-4 flex-col">
          {sidebarRoute.routes.map((route) => (
            <li key={route.title}>
              <Link to={route.path} className="text-base text-slate-300 hover:text-slate-100 transition">
                {route.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Separator className="my-3" />
    </div>
  );
};

export default SidebarRoute;
