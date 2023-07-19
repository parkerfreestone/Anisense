import { FormEvent, useState } from "react";
import axiosUtil from "../../utils/axiosUtil";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../../context/AuthenticationContext";
import { Eye, EyeOff, UserPlus2 } from "lucide-react";

export const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [passwordState, setPasswordState] = useState({
    showPass: false,
    showConfirmPass: false,
  });

  const navigate = useNavigate();

  const { register, errors } = useAuthContext();

  const csrf = () => axiosUtil.get("/sanctum/csrf-cookie");

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.passwordConfirmation,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4 max-w-xl bg-black/50 shadow-lg backdrop-blur-sm border border-white/10 rounded-md mx-auto mt-64"
      >
        <div className="pt-6 pb-3 border-b border-white/10 mx-6">
          <h1 className="text-3xl font-bold text-white">
            Create an Anisense Account
          </h1>
        </div>
        <div className="px-6 pb-6 flex flex-col gap-4">
          <div>
            <label
              className="block text-zinc-200 text-lg font-bold mb-2"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              type="text"
              className="shadow placeholder-zinc-500 appearance-none bg-zinc-900/50 backdrop-blur-sm rounded-md w-full py-3 px-3 text-zinc-50 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            {errors?.name && <p className="text-red-200">{errors.name[0]}</p>}
          </div>
          <div className="flex-1">
            <label
              className="block text-zinc-200 text-lg font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              className="shadow placeholder-zinc-500 appearance-none bg-zinc-900/50 backdrop-blur-sm rounded-md w-full py-3 px-3 text-zinc-50 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
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
            <div className="flex gap-4">
              <input
                type={passwordState.showPass ? "text" : "password"}
                className="shadow placeholder-zinc-500 appearance-none bg-zinc-900/50 backdrop-blur-sm rounded-md w-full py-3 px-3 text-zinc-50 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                className="bg-emerald-700 text-slate-50 font-bold py-2 px-4 rounded-md"
                type="button"
                onClick={() =>
                  setPasswordState({
                    ...passwordState,
                    showPass: !passwordState.showPass,
                  })
                }
              >
                {passwordState.showPass ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors?.password && (
              <p className="text-red-200">{errors.password[0]}</p>
            )}
          </div>
          <div>
            <label
              className="block text-zinc-200 text-lg font-bold mb-2"
              htmlFor="password"
            >
              Confirm Password
            </label>
            <div className="flex gap-4">
              <input
                type={passwordState.showConfirmPass ? "text" : "password"}
                className="shadow placeholder-zinc-500 appearance-none bg-zinc-900/50 backdrop-blur-sm rounded-md w-full py-3 px-3 text-zinc-50 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                value={formData.passwordConfirmation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    passwordConfirmation: e.target.value,
                  })
                }
              />
              <button
                className="bg-emerald-700 text-slate-50 font-bold py-2 px-4 rounded-md"
                type="button"
                onClick={() =>
                  setPasswordState({
                    ...passwordState,
                    showConfirmPass: !passwordState.showConfirmPass,
                  })
                }
              >
                {passwordState.showConfirmPass ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors?.password_confirmation && (
              <p className="text-red-200">{errors.password_confirmation[0]}</p>
            )}
          </div>

          <div>
            <button
              className="py-2 px-8 flex items-center gap-2 float-right rounded font-bold text-white mt-4 bg-emerald-700"
              type="submit"
            >
              Register
              <UserPlus2 />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
