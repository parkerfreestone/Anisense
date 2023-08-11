import { useNavigate } from "react-router-dom";
import useAuthContext from "../../context/AuthenticationContext";
import { Verified } from "lucide-react";

export const VerifyEmail = () => {
  const { logout, verifyEmail } = useAuthContext();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleVerification = async () => {
    try {
      await verifyEmail();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 max-w-xl bg-black/50 shadow-lg backdrop-blur-sm border p-8 border-white/10 rounded-md mx-auto mt-64">
        <h1 className="text-3xl text-zinc-100 font-bold">
          Please Verify Your Email!
        </h1>
        <p className="text-zinc-300">
          We're sorry! To ensure the security and integrity of our platform, we
          have implemented an email verification process. This step is necessary
          to validate the authenticity of user accounts and prevent spam or
          fraudulent activities.
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleVerification}
            className="py-2 px-8 flex items-center gap-2 rounded font-bold text-white mt-4 bg-emerald-700 hover:bg-emerald-500"
          >
            Verify Email <Verified />
          </button>
          <button
            onClick={handleLogout}
            className="py-2 px-8 flex items-center gap-2 rounded font-bold text-white mt-4 border border-emerald-700 hover:bg-emerald-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
