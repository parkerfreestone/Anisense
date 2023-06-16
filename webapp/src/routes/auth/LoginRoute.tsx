import { FormEvent, useState } from "react";
import useAuthContext from "../../context/AuthenticationContext";
import { LogIn, User } from "lucide-react";
import { Link } from "react-router-dom";

export const LoginRoute = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, errors } = useAuthContext();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    login({ email: formData.email, password: formData.password });
  };

  return (
    <div>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 max-w-xl bg-black/50 shadow-lg backdrop-blur-sm border border-white/10 rounded-md mx-auto mt-64"
      >
        <div className="pt-6 pb-3 border-b border-white/10 mx-6">
          <h1 className="text-3xl font-bold text-white">Login To Anisense</h1>
        </div>
        <div className="px-6 pb-6 flex flex-col gap-4">
          <div>
            <label
              className="block text-zinc-200 text-lg font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="shadow placeholder-zinc-500 appearance-none bg-zinc-900/50 backdrop-blur-sm rounded-md w-full py-3 px-3 text-zinc-50 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors?.email && <p className="text-red-200">{errors.email[0]}</p>}
          </div>
          <div>
            <label
              className="block text-zinc-200 text-lg font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="shadow placeholder-zinc-500 appearance-none bg-zinc-900/50 backdrop-blur-sm rounded-md w-full py-3 px-3 text-zinc-50 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {errors?.password && (
              <p className="text-red-200">{errors.password[0]}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="py-2 px-8 flex items-center gap-2 float-right rounded font-bold text-white mt-4 bg-emerald-700"
            >
              Login
              <LogIn />
            </button>
          </div>
        </div>
      </form>
      <div className="mx-auto max-w-xl mt-3 text-center">
        <Link to="/auth/register" className="text-zinc-500">
          Create an Account
        </Link>
      </div>
    </div>
  );
};
