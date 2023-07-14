import { useQuery } from "@tanstack/react-query";
import Modal from "react-modal";
import axiosUtil from "../utils/axiosUtil";
import { useState } from "react";
import { Compass, X } from "lucide-react";
import { Hero } from "../components/Hero";

const fetchAnime = async () => {
  const response = await axiosUtil.get("/api/v1/anime");
  return response.data.data;
};

export const DiscoverRoute = () => {
  const [selectedAnime, setSelectedAnime] = useState<any>(null);
  const { data: animeList, isLoading } = useQuery(["animeList"], fetchAnime);

  return (
    <>
      <Hero
        title="🧭 Discover"
        desc="Discover New Anime to Add to Build up your Profile!"
      />
      <div className="mx-auto mt-10 max-w-6xl grid grid-cols-6 gap-4">
        {isLoading
          ? Array.from({ length: 15 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="w-full h-64 bg-zinc-600 rounded-lg"></div>
                <div className="h-4 mt-2 bg-zinc-600 rounded-lg"></div>
              </div>
            ))
          : animeList.map((anime, index) => (
              <div
                key={index}
                className="flex flex-col items-center hover:scale-95 cursor-pointer"
                onClick={() => setSelectedAnime(anime)}
              >
                <img
                  src={anime.image_url}
                  alt={anime.title}
                  className="w-full h-72 object-cover rounded-lg shadow-md"
                />
                <p className="mt-2 text-zinc-200 font-bold text-center">
                  {anime.title}
                </p>
              </div>
            ))}
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
                  alt={selectedAnime.title}
                  className="h-64 object-cover rounded-lg"
                />
                <div className="flex flex-col flex-1">
                  <h4 className="text-zinc-100 font-bold text-3xl">
                    {selectedAnime.title}
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
