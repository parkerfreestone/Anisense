import { ReactNode } from "react";

type FormGroupProps = {
  label: string;
  htmlFor: string;
  error?: string | undefined;
  children: ReactNode;
  endComponent?: ReactNode;
};

export const FormGroup = ({
  label,
  htmlFor,
  error,
  children,
  endComponent,
}: FormGroupProps) => {
  return (
    <div>
      <label
        className="block text-zinc-200 text-lg font-bold mb-2"
        htmlFor={htmlFor}
      >
        {label}
      </label>
      <div className="flex gap-4">
        {children}
        {endComponent}
      </div>
      {error && <p className="text-red-200">{error}</p>}
    </div>
  );
};
