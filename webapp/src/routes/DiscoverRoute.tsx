import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Hero } from "../components/Hero";
import { InView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, Info, PlusCircle } from "lucide-react";

import Modal from "react-modal";
import Select from "react-select";
import axiosUtil from "../utils/axiosUtil";
import useAuthContext from "../context/AuthenticationContext";

import _ from "lodash";

Modal.setAppElement("#root");

export const DiscoverRoute = () => {
  const [selectedAnime, setSelectedAnime] = useState<any>(null);
  const [genres, setGenres] = useState<any>(null);
  const [genreFilter, setGenreFilter] = useState<any>(null);
  const [titleFilter, setTitleFilter] = useState<string>("");

  const [infoModalOpen, setInfoModalOpen] = useState<boolean>(false);

  const [rating, setRating] = useState<number | null>(null);
  const [addToProfileModalOpen, setAddToProfileModalOpen] =
    useState<boolean>(false);

  const [animeExpanded, setAnimeExpanded] = useState<boolean>(false);

  const [hoveredAnime, setHoveredAnime] = useState<any>(null);

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
        genres: genreFilter ? genreFilter.map((g: any) => g.value) : undefined,
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

  const addToProfile = async (animeId: number) => {
    try {
      const response = await axiosUtil.post(
        `/api/anime/addToProfile/${animeId}`,
        {
          rating,
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
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
          <div>
            Seems like you're not logged in.. In order to get the most out of
            Anisense you can{" "}
            <Link className="underline" to="/auth/register">
              log in now
            </Link>{" "}
            or{" "}
            <Link className="underline" to="/auth/register">
              create an account
            </Link>
          </div>
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
          className="shadow placeholder-zinc-500 appearance-none bg-zinc-600/50 backdrop-blur-sm rounded-md w-full py-3 px-3 text-zinc-50 leading-tight focus:outline-none focus:shadow-outline"
        />
        {/* <Select
          isClearable
          isMulti
          id="genreFilter"
          options={genres}
          placeholder={"Filter Genres"}
          onChange={setGenreFilter}
          className="flex-1"
        /> */}
      </div>
      <div className="mx-auto mt-10 max-w-6xl grid grid-cols-6 gap-4">
        {data?.pages.flatMap((pageData, i) =>
          pageData.data.map((anime: any) => (
            <div
              key={anime.mal_id}
              className="flex flex-col items-center cursor-pointer relative"
              onMouseEnter={() => setHoveredAnime(anime)}
              onMouseLeave={() => setHoveredAnime(null)}
            >
              <div className="w-full h-72 relative">
                {" "}
                {/* Wrap the image and the buttons in a separate div */}
                <img
                  src={anime.image_url}
                  alt={`${anime.title_en || anime.title_jp} poster image.`}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
                {hoveredAnime === anime && (
                  <div className="absolute inset-0 flex flex-col justify-center items-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setInfoModalOpen(true);
                        setSelectedAnime(anime);
                      }}
                      className="flex-1 flex gap-2 items-center justify-center text-white font-bold rounded-t-lg bg-gradient-to-b from-black/80 to-black/40 hover:from-black hover:to-black/40 hover:text-emerald-400 w-full transition-all"
                    >
                      <Info /> Info
                    </button>
                    {user && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAnime(anime);

                          setAddToProfileModalOpen(true);
                        }}
                        className="flex-1 flex gap-2 items-center justify-center text-white font-bold rounded-b-lg bg-gradient-to-t from-black/80 to-black/40 hover:from-black hover:to-black/40 hover:text-emerald-400 w-full transition-all"
                      >
                        <PlusCircle />
                        Add To Profile
                      </button>
                    )}
                  </div>
                )}
              </div>
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
          isOpen={infoModalOpen}
          onRequestClose={() => {
            setSelectedAnime(null);
            setInfoModalOpen(false);
          }}
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
                      <div
                        key={name}
                        className="px-2 rounded-full bg-emerald-600 text-white font-bold"
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                  <div
                    className={`${
                      animeExpanded ? "max-h-auto" : "overflow-scroll max-h-32"
                    } text-zinc-300`}
                  >
                    <p>{selectedAnime?.synopsis}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => setAnimeExpanded(!animeExpanded)}
                      className="flex gap-2 px-4 py-2 mt-2 rounded-md bg-emerald-600 text-white font-bold hover:bg-emerald-800 transition-all"
                    >
                      {animeExpanded ? (
                        <>
                          Collapse <ChevronUp />
                        </>
                      ) : (
                        <>
                          Expand <ChevronDown />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </Modal>

        <Modal
          isOpen={addToProfileModalOpen}
          onRequestClose={() => {
            setSelectedAnime(null);
            setAddToProfileModalOpen(false);
            setRating(null);
          }}
          contentLabel="Add Anime To Profile"
          className="bg-zinc-900 mx-auto mt-32 max-w-2xl p-8 rounded-lg"
          overlayClassName="fixed inset-0 bg-black/70"
        >
          {selectedAnime && (
            <>
              <div className="flex flex-col justify-between gap-4">
                <h3 className="text-xl text-zinc-100 font-bold mb-4">
                  Before Adding "
                  <span className="text-emerald-500">
                    {selectedAnime.title_en || selectedAnime.title_jp}
                  </span>
                  " to your profile, please give it a rating!
                </h3>
                <div className="flex justify-between gap-2">
                  {[...Array(10).keys()].map((v) => (
                    <button
                      className={`flex-1 p-4 text-zinc-100 grid place-items-center rounded-md font-bold hover:bg-zinc-600 ${
                        rating === v + 1 ? "border border-emerald-600" : ""
                      }`}
                      onClick={() => setRating(v + 1)}
                    >
                      {v + 1}
                    </button>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      addToProfile(selectedAnime?.id);
                      setSelectedAnime(null);
                      setAddToProfileModalOpen(false);
                      setRating(null);
                    }}
                    disabled={rating === null}
                    className={`flex gap-2 px-4 py-2 mt-2 rounded-md bg-emerald-600 text-white font-bold disabled:bg-zinc-800 hover:bg-emerald-800 transition-all`}
                  >
                    Add to profile
                  </button>
                  <button
                    onClick={() => {
                      setSelectedAnime(null);
                      setAddToProfileModalOpen(false);
                      setRating(null);
                    }}
                    className="flex gap-2 px-4 py-2 mt-2 rounded-md bg-red-500 text-white font-bold hover:bg-red-800 transition-all"
                  >
                    I've Changed My Mind
                  </button>
                </div>
              </div>
            </>
          )}
        </Modal>
      </div>
    </>
  );
};
