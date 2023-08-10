type TextInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  variant?: "glassmorphic" | "default";
};

export const TextInput = ({
  value,
  onChange,
  type = "text",
  variant = "default",
  onClick,
}: TextInputProps) => {
  const baseStyle =
    "shadow appearance-none rounded-md w-full py-3 px-3 leading-tight focus:outline-none focus:shadow-outline";
  const variantStyle =
    variant === "glassmorphic"
      ? "bg-zinc-900/50 backdrop-blur-sm text-zinc-50"
      : "bg-white text-black";

  return (
    <input
      type={type}
      className={`${baseStyle} ${variantStyle}`}
      value={value}
      onChange={onChange}
      onClick={onClick}
    />
  );
};
