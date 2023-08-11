import { Outlet, useNavigate } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { useEffect, useState } from "react";
import { RequireEmailVerificationLayout } from "../layouts/RequireEmailVerification";
import useAuthContext from "../context/AuthenticationContext";
import AOS from "aos";
import "aos/dist/aos.css";
import { MaintenanceRoute } from "./wildcard/MaintenanceRoute";

export const RootRoute = () => {
  const [isApiDown, setIsApiDown] = useState(false);

  const { isAuthenticated, user, getUser } = useAuthContext();

  const navigate = useNavigate();

  const getUserIfAuthenticated = async () => {
    if (isAuthenticated && !user) {
      try {
        await getUser();
      } catch (err: any) {
        if (err.response.status === 503) {
          setIsApiDown(true);
        }
        console.log(err.response.status);
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
      {isApiDown ? (
        <MaintenanceRoute />
      ) : (
        <>
          <NavBar />
          <Outlet />
        </>
      )}
    </RequireEmailVerificationLayout>
  );
};
