import { useQuery } from "@tanstack/react-query";
import useAuthContext from "../context/AuthenticationContext";
import { RequireAuthenticationLayout } from "../layouts/RequireAuthentication";
import axiosUtil from "../utils/axiosUtil";

export const ProfileRoute = () => {
  const { user } = useAuthContext();

  const { isLoading, error, data } = useQuery(["userAnime"], async () => {
    const res = await axiosUtil.get("/api/v1/user/anime");
    return res.data;
  });

  if (isLoading) return "Loading...";

  if (error) return `An Error has occurred: ${error}`;

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
        <div className="mx-auto mt-10 max-w-6xl grid grid-cols-6 gap-4">
          {data.map((anime: any) => (
            <div key={anime.mal_id}>
              <div
                key={anime.mal_id}
                className="flex flex-col items-center cursor-pointer relative"
              >
                <div className="w-full h-72 relative">
                  <img
                    src={anime.image_url}
                    alt={`${anime.title_en || anime.title_jp} poster image.`}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>
              <p className="mt-2 text-zinc-200 font-bold text-center">
                {anime.title_en || anime.title_jp}
              </p>
            </div>
          ))}
        </div>
      </div>
    </RequireAuthenticationLayout>
  );
};
