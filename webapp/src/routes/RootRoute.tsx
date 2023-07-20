import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { useEffect } from "react";
import { RequireEmailVerificationLayout } from "../layouts/RequireEmailVerification";
import useAuthContext from "../context/AuthenticationContext";
import AOS from "aos";
import "aos/dist/aos.css";

export const RootRoute = () => {
  const { isAuthenticated, user, getUser } = useAuthContext();

  const getUserIfAuthenticated = async () => {
    if (isAuthenticated && !user) {
      try {
        await getUser();
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getUserIfAuthenticated();

    AOS.init({
      duration: 500,
    });
  }, []);

  return (
    <RequireEmailVerificationLayout>
      <NavBar />
      <Outlet />
    </RequireEmailVerificationLayout>
  );
};
