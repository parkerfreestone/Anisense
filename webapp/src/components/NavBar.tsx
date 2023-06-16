import { LogIn, LogOut, User, UserPlus2 } from "lucide-react";
import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../context/AuthenticationContext";

interface NavLinkProps {
  route: string;
  text?: string;
  icon?: ReactNode;
  button?: boolean;
  onClick?: (event: React.MouseEvent) => void;
}

const NavLink = ({ route, text, icon, button, onClick }: NavLinkProps) => {
  return (
    <li
      className={`inline-block ml-4 text-zinc-400 transition-all hover:text-white
    ${button && "font-bold border border-zinc-400 px-3 py-1 rounded"}
    `}
    >
      <Link to={route} className="flex gap-2" onClick={onClick}>
        {icon}
        {text}
      </Link>
    </li>
  );
};

export const NavBar = () => {
  const { user, logout } = useAuthContext();

  // CRY ME A RIVER
  const handleLogout = (e: any) => {
    e.preventDefault();
    logout();
    console.log("Logged out.");
  };

  return (
    <nav className="fixed w-screen bg-black/50 top-0 z-50 shadow-lg backdrop-blur-sm rounded-b-lg py-5 border border-white/10">
      <div className="max-w-6xl mx-auto flex">
        <Link to="/" className="flex-1 font-bold text-xl text-white">
          🍙 Anisense
        </Link>
        <ul>
          {user
            ? [
                {
                  route: "/profile",
                  icon: <User />,
                  text: "Profile",
                },
                {
                  route: "/logout",
                  icon: <LogOut />,
                  text: "Logout",
                  onClick: handleLogout,
                },
              ].map(({ route, icon, text, onClick }) => (
                <NavLink
                  button
                  key={route}
                  route={route}
                  icon={icon}
                  text={text}
                  onClick={onClick}
                />
              ))
            : [
                {
                  route: "/auth/login",
                  icon: <LogIn />,
                  text: "Login",
                },
                {
                  route: "/auth/register",
                  icon: <UserPlus2 />,
                  text: "Register",
                },
              ].map(({ route, icon, text }) => (
                <NavLink
                  button
                  key={route}
                  route={route}
                  text={text}
                  icon={icon}
                />
              ))}
        </ul>
      </div>
    </nav>
  );
};
