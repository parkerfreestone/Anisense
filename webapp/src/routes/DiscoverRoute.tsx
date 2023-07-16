import { useCallback, useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Hero } from "../components/Hero";
import { InView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { Info } from "lucide-react";

import Modal from "react-modal";
import Select from "react-select";
import axiosUtil from "../utils/axiosUtil";
import useAuthContext from "../context/AuthenticationContext";

import _ from "lodash";

export const DiscoverRoute = () => {
  const [selectedAnime, setSelectedAnime] = useState<any>(null);
  const [genres, setGenres] = useState<any>(null);
  const [genreFilter, setGenreFilter] = useState<any>(null);
  const [titleFilter, setTitleFilter] = useState<string>("");

  const [debouncedTitleFilter, setDebouncedTitleFilter] = useState<string>("");
  const [debouncedGenreFilter, setDebouncedGenreFilter] = useState<any>(null);

  const debouncedFetchAnime = useRef(
    _.debounce((title, genre) => {
      setDebouncedTitleFilter(title);
      setDebouncedGenreFilter(genre);
    }, 500)
  );

  const { user } = useAuthContext();

  const fetchAnime = async ({ pageParam = 1 }) => {
    const response = await axiosUtil.get(`/api/v1/anime?page=${pageParam}`, {
      params: {
        title: titleFilter,
        genre: genreFilter ? genreFilter.map((g: any) => g.value) : undefined,
      },
    });
    return response.data;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["animeList", debouncedTitleFilter, debouncedGenreFilter],
      fetchAnime,
      {
        getNextPageParam: (lastPage) => {
          return lastPage.current_page < lastPage.last_page
            ? lastPage.current_page + 1
            : false;
        },
      }
    );

  const getAllGenres = async () => {
    const genres = await axiosUtil.get("/api/v1/genres");

    if (!genres) {
      return "No genre data.";
    }

    setGenres(
      genres.data.map((genre: any) => ({
        value: genre.name.toLowerCase(),
        label: genre.name,
      }))
    );
  };

  useEffect(() => {
    getAllGenres();
  }, []);

  useEffect(() => {
    debouncedFetchAnime.current(titleFilter, genreFilter);
  }, [titleFilter, genreFilter]);

  return (
    <>
      {!user && (
        <div className="flex gap-4 mx-auto max-w-6xl mt-32 p-4 rounded text-white border border-emerald-700 bg-emerald-950/50 shadow-lg shadow-emerald-950">
          <Info />
          <p className="flex">
            Seems like you're not logged in.. In order to get the most out of
            Anisense you can
            <Link className="underline" to="/auth/register">
              log in now
            </Link>
            or
            <Link className="underline" to="/auth/register">
              create an account
            </Link>
          </p>
        </div>
      )}
      <Hero
        title={
          !user
            ? "🧭 Discover"
            : `🧭 Welcome back, ${user?.name.split(" ")[0]}!`
        }
        desc="Discover new anime to starting building your profile!"
      />
      <div className="flex gap-4 justify-between mx-auto max-w-6xl mt-6">
        <input
          type="text"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
          placeholder="Search anime title"
          className="flex-1 p-2 mb-2"
        />
        <Select
          isClearable
          isMulti
          id="genreFilter"
          options={genres}
          placeholder={"Filter Genres"}
          onChange={setGenreFilter}
          className="flex-1"
        />
      </div>
      <div className="mx-auto mt-10 max-w-6xl grid grid-cols-6 gap-4">
        {data?.pages.flatMap((pageData, i) =>
          pageData.data.map((anime: any) => (
            <div
              key={anime.mal_id}
              className="flex flex-col items-center hover:scale-95 cursor-pointer"
              onClick={() => setSelectedAnime(anime)}
            >
              <img
                src={anime.image_url}
                alt={`${anime.title_en || anime.title_jp} poster image.`}
                className="w-full h-72 object-cover rounded-lg shadow-md"
              />
              <p className="mt-2 text-zinc-200 font-bold text-center">
                {anime.title_en || anime.title_jp}
              </p>
            </div>
          ))
        )}
        {hasNextPage && (
          <InView as="div" onChange={fetchNextPage} className="text-center">
            {isFetchingNextPage
              ? "Loading more..."
              : "Scroll down to load more"}
          </InView>
        )}
        <Modal
          isOpen={!!selectedAnime}
          onRequestClose={() => setSelectedAnime(null)}
          contentLabel="Anime Details"
          className="bg-zinc-900 mx-auto mt-32 max-w-2xl p-8 rounded-lg"
          overlayClassName="fixed inset-0 bg-black/70"
        >
          {selectedAnime && (
            <>
              <div className="flex justify-between gap-4">
                <img
                  src={selectedAnime.image_url}
                  alt={`${
                    selectedAnime.title_en || selectedAnime.title_jp
                  } poster image.`}
                  className="h-64 object-cover rounded-lg"
                />
                <div className="flex flex-col flex-1">
                  <h4 className="text-zinc-100 font-bold text-3xl">
                    {selectedAnime.title_en || selectedAnime.title_jp}
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-4 mt-2">
                    {selectedAnime?.genres.map(({ name }: { name: string }) => (
                      <div className="px-2 rounded-full bg-emerald-600 text-white font-bold">
                        {name}
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 max-h-32 overflow-scroll mt-4 text-zinc-300">
                    <p>{selectedAnime?.synopsis}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </Modal>
      </div>
    </>
  );
};
