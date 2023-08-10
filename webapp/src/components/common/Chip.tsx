type ChipProps = {
  name: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "dark";
};

export const Chip = ({ name, size = "md", variant = "primary" }: ChipProps) => {
  const baseStyle = "rounded-full text-white font-bold";
  const sizeStyle = size === "sm" ? "px-1" : size === "lg" ? "px-3" : "px-2";
  const variantStyle = variant === "primary" ? "bg-emerald-600" : "bg-gray-800";

  return (
    <div className={`${baseStyle} ${sizeStyle} ${variantStyle}`}>{name}</div>
  );
};
