import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";

export const RootRoute = () => {
  return (
    <>
      <NavBar />
      <div>
        <Outlet />
      </div>
    </>
  );
};
