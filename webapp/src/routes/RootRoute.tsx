import { Link, Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { useEffect } from "react";
import useAuthContext, { AuthProvider } from "../context/AuthenticationContext";

export const RootRoute = () => {
  const { isAuthenticated, user, getUser } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated && !user) {
      getUser();
    }
  }, []);

  return (
    <AuthProvider>
      <NavBar />
      <Outlet />
    </AuthProvider>
  );
};
