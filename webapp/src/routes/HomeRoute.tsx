import { useEffect, useRef, useState } from "react";
import { AnimeTitle } from "../components/AnimeTitle";
import Select from "react-select";
import useAuthContext from "../context/AuthenticationContext";
import axiosUtil from "../utils/axiosUtil";
import _, { initial } from "lodash";
import { Info, Triangle, XCircle } from "lucide-react";

export type TopAnimeTypes = "tv" | "movie" | "ova" | "special" | "ona";

type FilterState = {
  q: string;
  genres: ReadonlyArray<ReactSelectOptionType>;
  season: string;
  year: string;
  score: number | null;
  status: string;
  type: string;
};

const ANIME_TYPES: TopAnimeTypes[] = ["tv", "movie", "ova", "special", "ona"];

interface ReactSelectOptionType {
  value: string;
  label: string;
}

const reactSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    color: "rgb(250 250 250 / var(--tw-text-opacity))",
    borderRadius: "0.375rem",
    paddingTop: "0.25rem",
    paddingBottom: "0.25rem",
    backgroundColor: "rgb(63 63 70 / 0.5)",
    border: "none",
    boxShadow:
      "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
    backdropFilter:
      "var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)",
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "rgb(63 63 70 / 0.9)",
    backdropFilter: "blur(4px)",
    border: "none",
    boxShadow:
      "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
  }),
  multiValue: (provided: any) => ({
    ...provided,
    background: "#737373",
    color: "white",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "white",
  }),
  option: (provided: any, { isFocused }: { isFocused: any }) => ({
    ...provided,
    backgroundColor: isFocused ? "#047857aa" : "transparent",
    color: "rgb(250 250 250)",
  }),
};

export const HomeRoute = () => {
  // q is badly named (sorry jikan)... It's the anime title.
  const [filters, setFilters] = useState<FilterState>({
    q: "",
    genres: [],
    season: "",
    year: "",
    score: null,
    status: "",
    type: "",
  });
  const [searchResult, setSearchResult] = useState([]);

  const [topAnimeByType, setTopAnimeByType] = useState<
    Record<TopAnimeTypes, any[]>
  >({
    tv: [],
    movie: [],
    ova: [],
    special: [],
    ona: [],
  });
  const [animeGenres, setAnimeGenres] = useState<ReactSelectOptionType[]>([]);
  const [pageStatus, setPageStatus] = useState({
    error: "",
    info: "Hello! Please keep in mind this website is in early beta... That being said please report all bugs to the discord server please!",
  });

  // THIS FEELS DIRTY, I'LL REFACTOR THIS COMPONENT SOON
  const [initialLoaded, setInitialLoaded] = useState(false);

  const { user } = useAuthContext();

  const debouncedSearchAnime = useRef(
    _.debounce(
      async (filters: FilterState) => {
        try {
          // Remove null or empty filters
          const validFilters = Object.entries(filters).reduce(
            (validFilters, [key, value]) => {
              if (value !== null && value !== "") {
                // For 'genres', you want to map it to just the values
                if (key === "genres") {
                  value = (value as any).map((option: any) => option.value);
                }
                return { ...validFilters, [key]: value };
              } else {
                return validFilters;
              }
            },
            {}
          );

          const res = await axiosUtil.get("/api/v1/anime/search", {
            params: validFilters,
          });
          setSearchResult(res.data.data);
        } catch (err) {
          setPageStatus({
            ...pageStatus,
            error:
              "There was a problem searching for anime... Please reload the page and try again.",
          });
        }
      },
      1000,
      { leading: false, trailing: true }
    )
  ).current;

  const handleFiltersChange = (
    filter: keyof Omit<FilterState, "genres">,
    value: string
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: value,
    }));
  };

  const handleSelectChange = (
    selectedOptions: ReadonlyArray<ReactSelectOptionType>
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      genres: selectedOptions,
    }));
  };

  const fetchInitialData = async () => {
    try {
      const animePromises = ANIME_TYPES.map((type) =>
        axiosUtil.get(`/api/v1/anime/top/1/${type}/6`)
      );

      const animeGenresReponse = axiosUtil.get(`/api/v1/genres/anime/genres`);

      const responses = await Promise.all([
        animeGenresReponse,
        ...animePromises,
      ]);

      const animeGenres = responses[0]?.data?.data.map(
        ({ name }: { name: string }) => ({
          value: name,
          label: name,
        })
      );
      setAnimeGenres(animeGenres);

      const animeByType: Record<TopAnimeTypes, any[]> = {
        tv: [],
        movie: [],
        ova: [],
        special: [],
        ona: [],
      };

      responses.slice(1).forEach((response, index) => {
        animeByType[ANIME_TYPES[index]] = response.data.data;
      });

      setTopAnimeByType(animeByType);
    } catch (err: any) {
      setPageStatus({
        ...pageStatus,
        error:
          "There was a problem fetching anime... Please check the websites status in the discord or try again later.",
      });
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (initialLoaded) {
      debouncedSearchAnime(filters);
    } else {
      setInitialLoaded(true);
    }
  }, [filters]);

  return (
    <div className="mt-32 max-w-6xl mx-auto">
      {pageStatus.info ||
        (pageStatus.error && (
          <div
            className={`flex gap-4 p-4 mb-6 rounded text-white border shadow-lg ${
              pageStatus.info
                ? "border-emerald-700 bg-emerald-950/50 shadow-emerald-950"
                : "border-red-700 bg-red-950/50 shadow-red-950"
            }`}
          >
            {pageStatus.info ? (
              <>
                <Info />
                <span>{pageStatus.info}</span>
              </>
            ) : (
              <>
                <XCircle />
                <span>{pageStatus.error}</span>
              </>
            )}
          </div>
        ))}
      <h1 className="text-3xl font-bold text-zinc-200">
        👋 Welcome to Anisense{user && `, ${user.name.split(" ")[0]}`}!
      </h1>
      <p className="text-xl text-zinc-400 mt-2">
        Feel free to browse Anime, or start building your top 5!
      </p>
      <div className="mt-12">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-200 mb-3">Filters</h2>
          <div className="flex justify-evenly space-x-4">
            <div className="flex-1">
              <label
                className="block text-zinc-400 text-lg font-bold mb-2"
                htmlFor="search"
              >
                Search Titles
              </label>
              <input
                className="shadow placeholder-zinc-500 appearance-none bg-zinc-700/50 backdrop-blur-sm rounded-md w-full py-3 px-3 text-zinc-50 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="search"
                placeholder="Search..."
                onChange={(e) => handleFiltersChange("q", e.target.value)}
              />
            </div>

            <div className="flex-1">
              <label
                className="block text-zinc-400 text-lg font-bold mb-2"
                htmlFor="password"
              >
                Search Genres
              </label>
              <Select
                isMulti
                options={animeGenres}
                className="basic-multi-select"
                classNamePrefix="select"
                styles={reactSelectStyles}
                onChange={handleSelectChange}
                value={filters.genres}
              />
            </div>
          </div>
        </div>
        {searchResult.length > 0
          ? searchResult.map((result) => <p>{result}</p>)
          : ANIME_TYPES.map((type) => (
              <div className="mt-12" key={type}>
                <h2 className="text-2xl font-bold text-zinc-200">{`Top ${type}`}</h2>
                <div className="mt-4 flex space-x-4">
                  {topAnimeByType[type] &&
                    topAnimeByType[type].map(
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
            ))}
      </div>
    </div>
  );
};
