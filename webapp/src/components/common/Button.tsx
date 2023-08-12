import { ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
  fluid?: boolean;
  isLink?: boolean;
  to?: string;
  children?: ReactNode;
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  icon?: ReactNode;
  onClick?: () => void;
};

export const Button = ({
  fluid,
  isLink,
  to,
  children,
  variant = "primary",
  size = "md",
  type = "button",
  icon,
  onClick,
}: ButtonProps) => {
  const baseStyle = `flex items-center gap-2 float-right rounded font-bold text-bold ${
    fluid ? "flex-1 justify-center" : ""
  }`;
  const variantStyle =
    variant === "primary"
      ? "bg-emerald-700 text-zinc-100 hover:bg-emerald-900"
      : "border border-zinc-400 text-zinc-400 rounded-md ";
  const sizeStyle =
    size === "sm" ? "py-1 px-4" : size === "lg" ? "py-3 px-8" : "py-2 px-6";

  return isLink ? (
    <Link to={to!} className={`${baseStyle} ${variantStyle} ${sizeStyle}`}>
      {children}
    </Link>
  ) : (
    <button
      onClick={onClick}
      type={type}
      className={`${baseStyle} ${variantStyle} ${sizeStyle}`}
    >
      {icon}
      {children}
    </button>
  );
};
