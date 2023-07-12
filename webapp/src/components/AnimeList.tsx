import { AnimeTitle } from "../components/AnimeTitle";

export const AnimeList = ({ topAnimeByType, searchResult, ANIME_TYPES }) => (
  <div>
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
);
