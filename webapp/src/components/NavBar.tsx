import { LogIn, LogOut, User, UserPlus2 } from "lucide-react";
import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";

interface NavLinkProps {
  brand?: boolean;
  route: string;
  text?: string;
  icon?: ReactNode;
}

const NavLink = ({ brand, route, text, icon }: NavLinkProps) => {
  return (
    <li
      className={`inline text-zinc-400 ${
        brand && "font-bold text-xl text-white"
      }`}
    >
      <Link to={route}>{text ? text : icon}</Link>
    </li>
  );
};

export const NavBar = () => {
  const [user, setUser] = useState(true);

  return (
    <nav className="fixed w-screen bg-black/50 top-0 z-50 shadow-lg backdrop-blur-sm rounded-b-lg py-5 border border-white/10">
      <ul className="max-w-6xl mx-auto">
        <NavLink brand route="/" text="🍙 Anisense" />
        <div className="float-right flex gap-3">
          {user
            ? [
                {
                  route: "/profile",
                  icon: <User />,
                },
                {
                  route: "/logout",
                  icon: <LogOut />,
                },
              ].map(({ route, icon }) => (
                <NavLink brand key={route} route={route} icon={icon} />
              ))
            : [
                {
                  route: "/login",
                  icon: <LogIn />,
                },
                {
                  route: "/register",
                  icon: <UserPlus2 />,
                },
              ].map(({ route, icon }) => (
                <NavLink brand key={route} route={route} icon={icon} />
              ))}
        </div>
      </ul>
    </nav>
  );
};
