import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { useEffect } from "react";
import useAuthContext from "../context/AuthenticationContext";

export const RootRoute = () => {
  const { isAuthenticated, user, getUser } = useAuthContext();

  const getUserIfNotLoggedIn = async () => {
    if (isAuthenticated && !user) {
      await getUser();
    }
  };

  useEffect(() => {
    getUserIfNotLoggedIn();
  }, []);

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
