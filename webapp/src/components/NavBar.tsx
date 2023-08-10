import { ReactElement, useState } from "react";
import { LogIn, LogOut, User, UserPlus2, Menu, Compass } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../context/AuthenticationContext";

import Logo from "../assets/anisense-logo.svg";

interface NavLinkProps {
  route: string;
  text: string;
  icon: ReactElement;
  onClick?: any;
}

const NavLink = ({ route, text, icon, onClick }: NavLinkProps) => (
  <li className="py-2 px-4 text-center border border-zinc-400 rounded-md mb-2 sm:mb-0 sm:mx-2 last:sm:mr-0 transition-all">
    <Link
      to={route}
      onClick={onClick}
      className="flex gap-2 items-center text-zinc-400 hover:text-white"
    >
      <span>{icon}</span>
      <span>{text}</span>
    </Link>
  </li>
);

export const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuthContext();

  const navigate = useNavigate();

  const handleLogout = async (e: any) => {
    e.preventDefault();
    try {
      await logout();

      navigate("/");
    } catch (err) {
      console.log(err);
    }

    setMenuOpen(false);
  };

  const navLinks = [
    { route: "/discover", text: "Discover", icon: <Compass size={20} /> },
    ...(user
      ? [
          { route: "/profile", text: "Profile", icon: <User size={20} /> },
          {
            route: "/logout",
            text: "Logout",
            icon: <LogOut size={20} />,
            onClick: handleLogout,
          },
        ]
      : [
          { route: "/auth/login", text: "Login", icon: <LogIn size={20} /> },
          {
            route: "/auth/register",
            text: "Register",
            icon: <UserPlus2 size={20} />,
          },
        ]),
  ];

  return (
    <nav className="fixed w-screen bg-black/50 top-0 z-50 shadow-lg backdrop-blur-sm rounded-b-lg py-5 px-5 sm:px-0 border border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="flex gap-2 items-center font-bold text-xl text-white"
        >
          🍙 Anisense
          {/* <img
            className="w-8 h-8"
            src={Logo}
            alt="Onigiri with face, blushing"
          />
          Anisense */}
        </Link>

        <div className="sm:hidden grid place-items-center text-white">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <Menu size={24} />
          </button>
        </div>

        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } sm:hidden absolute top-full shadow-lg backdrop-blur-sm right-0 mt-2 mr-5 bg-black/50 border border-white/10 p-4 rounded-lg`}
        >
          <ul>
            {navLinks.map((props) => (
              <NavLink key={props.route} {...props} />
            ))}
          </ul>
        </div>

        <ul className="hidden sm:flex">
          {navLinks.map((props) => (
            <NavLink key={props.route} {...props} />
          ))}
        </ul>
      </div>
    </nav>
  );
};
