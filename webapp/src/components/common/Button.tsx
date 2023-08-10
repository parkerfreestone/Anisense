import { ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
  isLink?: boolean;
  to?: string;
  children?: ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
};

export const Button = ({
  isLink,
  to,
  children,
  variant = "primary",
  size = "md",
  onClick,
}: ButtonProps) => {
  const baseStyle =
    "flex items-center gap-2 float-right rounded font-bold mt-4";
  const variantStyle =
    variant === "primary"
      ? "bg-emerald-700 hover:bg-emerald-900"
      : "bg-blue-600 hover:bg-blue-800";
  const sizeStyle =
    size === "sm" ? "py-1 px-4" : size === "lg" ? "py-3 px-8" : "py-2 px-6";

  return isLink ? (
    <Link to={to!} className={`${baseStyle} ${variantStyle} ${sizeStyle}`}>
      {children}
    </Link>
  ) : (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variantStyle} ${sizeStyle}`}
    >
      {children}
    </button>
  );
};
