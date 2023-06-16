import { Link, Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { useEffect } from "react";
import useAuthContext, { AuthProvider } from "../context/AuthenticationContext";

export const RootRoute = () => {
  return (
    <AuthProvider>
      <RootRouteContent />
    </AuthProvider>
  );
};

const RootRouteContent = () => {
  const { isAuthenticated, user, getUser } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated && !user) {
      getUser();
    }
  }, []);

  return (
    <>
      <NavBar />
      <div className="mt-32 mx-auto max-w-6xl">
        {/* <h1 className="text-zinc-100 font-bold text-3xl">
          Welcome back, {user?.name.split(" ")[0]}!
        </h1> */}
        <Outlet />
      </div>
    </>
  );
};
