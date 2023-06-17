import { useEffect, useState } from "react";
import { AnimeTitle } from "../components/AnimeTitle";
import useAuthContext from "../context/AuthenticationContext";
import axiosUtil from "../utils/axiosUtil";

export const HomeRoute = () => {
  const [page, setPage] = useState(1);
  const [topAnime, setTopAnime] = useState([]);
  const [pageError, setPageError] = useState("");

  const { user } = useAuthContext();

  const fetchTopAnime = async () => {
    try {
      const response = await axiosUtil.get(`/api/v1/anime/top/${page}`);

      // KINDA CRINGE
      setTopAnime(response.data.data);
    } catch (err: any) {
      setPageError(
        "There was a problem fetching anime... Please check the websites status in the discord or try again later."
      );
    }
  };

  useEffect(() => {
    fetchTopAnime();
  }, []);

  return (
    <div className="mt-32 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-zinc-200">
        👋 Welcome to Anisense{user && `, ${user.name.split(" ")[0]}`}!
      </h1>
      <p className="text-xl text-zinc-400 mt-2">
        Feel free to browse some Anime, or start building your top 5!
      </p>
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-200">Top TV</h2>
        <div className="mt-4 grid grid-cols-5">
          {topAnime.length > 0 &&
            topAnime
              .slice(0, 5)
              .map(
                ({
                  mal_id,
                  title,
                  images,
                  episodes,
                  popularity,
                  synopsis,
                  genres,
                  aired,
                }) => (
                  <AnimeTitle
                    key={mal_id}
                    title={title}
                    aired={aired}
                    episodes={episodes}
                    genres={genres}
                    images={images}
                    popularity={popularity}
                    synopsis={synopsis}
                  />
                )
              )}
        </div>
      </div>
    </div>
  );
};
