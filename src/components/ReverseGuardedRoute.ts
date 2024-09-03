import { useUser } from "@/hooks/use-user";
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ReverseGuardedRouteProps = PropsWithChildren;

export const ReverseGuardedRoute = ({ children }: ReverseGuardedRouteProps) => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(-1);
    }
  }, [user, navigate]);

  return children;
};
