import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { useEffect } from "react";
import useAuthContext from "../context/AuthenticationContext";
import { RequireEmailVerificationLayout } from "../layouts/RequireEmailVerification";

export const RootRoute = () => {
  const { isAuthenticated, user, getUser } = useAuthContext();

  const getUserIfAuthenticated = async () => {
    if (isAuthenticated && !user) {
      await getUser();

      setInterval(() => {
        console.log(user);
      }, 5000);
    }
  };

  useEffect(() => {
    getUserIfAuthenticated();
  }, []);

  return (
    <RequireEmailVerificationLayout>
      <NavBar />
      <Outlet />
    </RequireEmailVerificationLayout>
  );
};
