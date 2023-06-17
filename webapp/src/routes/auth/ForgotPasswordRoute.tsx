import { useState } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../../context/AuthenticationContext";
import axiosUtil from "../../utils/axiosUtil";
import { Info } from "lucide-react";

export const ForgotPasswordRoute = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({ email: [] });
  const [status, setStatus] = useState(null);

  const { csrf } = useAuthContext();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await csrf();

    setErrors({ email: [] });
    setStatus(null);

    try {
      const res = await axiosUtil.post("/forgot-password", {
        email: formData.email,
      });
      setStatus(res.data.status);
    } catch (err: any) {
      if (err.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-xl bg-black/50 shadow-lg backdrop-blur-sm border border-white/10 rounded-md mx-auto mt-64"
      >
        {status && (
          <div className="flex gap-4 mx-6 mt-6 p-4 rounded text-white border border-emerald-700 bg-emerald-950/50 shadow-lg shadow-emerald-950">
            <Info />
            {status}
          </div>
        )}
        <div className="pt-6 pb-3 border-b border-white/10 mx-6">
          <h1 className="text-3xl font-bold text-white">
            Forgot Your Password?
          </h1>
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
            <button
              type="submit"
              className="py-2 px-8 flex items-center gap-2 float-right rounded font-bold text-white mt-4 bg-emerald-700"
            >
              Request Reset
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
