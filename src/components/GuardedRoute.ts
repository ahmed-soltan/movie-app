import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "@/hooks/use-user";

type GuardedRouteProps = PropsWithChildren;

export const GuardedRoute = ({ children }: GuardedRouteProps) => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/profile/login", { replace: true });
    }
  }, [user, navigate]);

  return children;
};
