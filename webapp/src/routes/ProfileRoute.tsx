import useAuthContext from "../context/AuthenticationContext";
import { RequireAuthenticationLayout } from "../layouts/RequireAuthentication";

export const ProfileRoute = () => {
  const { user } = useAuthContext();

  return (
    <RequireAuthenticationLayout>
      <div className="mt-32 mx-auto max-w-6xl gap-8">
        <div className="bg-black/50 shadow-lg backdrop-blur-sm rounded-lg p-6 border border-white/10 mb-12 text-center">
          <div className="h-32 w-32 grid place-items-center rounded-full bg-emerald-600/80 backdrop-blur-sm mx-auto border border-emerald-100/30 mb-4 text-5xl text-zinc-100 font-bold">
            {user?.name[0]}
          </div>
          <h1 className="text-zinc-100 text-3xl font-bold">{user?.name}</h1>
          <h2 className="text-zinc-400 text-lg">{user?.email}</h2>
          <h3 className="text-zinc-600 text-lg">
            Joined{" "}
            {user?.created_at
              ? new Date(user?.created_at).toLocaleDateString()
              : "We're not sure..."}
          </h3>
        </div>
        <div className="flex-grow flex gap-4">
          {["stat1", "stat2"].map((stat) => (
            <div className="bg-zinc-800 p-6 rounded-lg">
              <h4 className="text-2xl text-zinc-100 font-bold mb-4">
                {stat.toUpperCase()}
              </h4>
              <p className="text-zinc-400 text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
                veniam eius porro est cumque blanditiis deserunt.
              </p>
            </div>
          ))}
        </div>
      </div>
    </RequireAuthenticationLayout>
  );
};
