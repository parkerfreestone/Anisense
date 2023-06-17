import { ReactNode, useEffect } from "react";
import useAuthContext from "../context/AuthenticationContext";

interface RequireAuthLayoutProps {
  children: ReactNode;
}

export const RequireAuthLayout = ({ children }: RequireAuthLayoutProps) => {
  const { user, isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (!isAuthenticated && !user) {
      return children;
    }
  }, []);

  return children;
};
