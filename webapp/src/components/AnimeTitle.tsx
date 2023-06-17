import { useEffect } from "react";

interface AnimeTitleProps {
  title: String;
  images: AnimeImage[];
  episodes: number;
  popularity: number;
  synopsis: String;
  genres: AnimeGenre[];
  aired: AnimeAiredRange;
}

interface AnimeImage {
  jpg: AnimeImageJPG;
}

interface AnimeImageJPG {
  image_url: string;
  large_image_url: string;
  small_image_url: string;
}

interface AnimeGenre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface AnimeAiredRange {
  string: String;
}

export const AnimeTitle = ({
  title,
  images,
  episodes,
  popularity,
  synopsis,
  genres,
  aired,
}: AnimeTitleProps) => {
  return (
    <div className="inline-block">
      <img
        className="max-h-64 rounded-lg shadow-lg shadow-zinc-800"
        src={images && images.jpg.large_image_url}
        alt={`${title} poster image.`}
      />
      <p className="text-zinc-300">{title}</p>

      {/* MORE CRINGE PRACTICES I'M SORRY */}
      {/* {genres.map(({ name, url }, i) => (
        <a
          key={i}
          className="px-2 py-1 rounded-full bg-emerald-700 text-white"
          href="url"
        >
          {name}
        </a>
      ))} */}
    </div>
  );
};
