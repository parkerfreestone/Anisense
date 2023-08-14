import { useQuery } from "@tanstack/react-query";
import { RequireAuthenticationLayout } from "../../layouts/RequireAuthentication";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ReactNode, useEffect, useState } from "react";
import { Library, Settings, User, Verified } from "lucide-react";
import { Button } from "../../components/common/Button";
import useAuthContext from "../../context/AuthenticationContext";
import axiosUtil from "../../utils/axiosUtil";

type ProfileNavItem = {
  name: string;
  icon: ReactNode;
};

const profileNavItems: ProfileNavItem[] = [
  {
    name: "Profile Appearance",
    icon: <User />,
  },
  {
    name: "Anime Library",
    icon: <Library />,
  },
  {
    name: "Profile Settings",
    icon: <Settings />,
  },
];

export const ProfileRoute = () => {
  const [episodesWatched, setEpisodesWatched] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [hoursWatched, setHoursWatched] = useState(0);
  const [animeList, setAnimeList] = useState([]);

  const [tabIndex, setTabIndex] = useState(1);

  const [topAnimeList, setTopAnimeList] = useState<any[]>([]);
  const [bankAnimeList, setBankAnimeList] = useState<any[]>([]);

  const { user } = useAuthContext();

  const { isLoading, error, data } = useQuery(["userAnime"], async () => {
    const res = await axiosUtil.get("/api/v1/user/anime");
    return res.data;
  });

  // I should prob do this in the backend... #shitecode
  useEffect(() => {
    if (!data) return;

    const topList = data
      .filter((anime: any) => anime.pivot.rank !== null)
      .slice(0, 5);
    const bankList = data.filter((anime: any) => anime.pivot.rank === null);

    setTopAnimeList(topList);
    setBankAnimeList(bankList);

    const episodesWatched = data.reduce(
      (acc: number, anime: any) => acc + (anime?.episodes ?? 0),
      0
    );
    setEpisodesWatched(episodesWatched);

    const averageRating = (
      data.reduce(
        (acc: number, anime: any) => acc + parseFloat(anime?.pivot.rating),
        0
      ) / data.length
    ).toPrecision(2);
    setAverageRating(parseFloat(averageRating));

    const totalMinutesWatched = data.reduce((acc: number, anime: any) => {
      const { duration, episodes } = anime;

      if (!duration || !episodes) {
        return acc;
      }

      if (duration.includes("min")) {
        // If it's a movie or a TV show with minutes duration
        const durationInMinutes = parseInt(duration);
        return acc + durationInMinutes * episodes;
      } else if (duration.includes("hr")) {
        // If it's a TV show with hours duration
        const durationParts = duration.split(" ");
        const hours = parseInt(durationParts[0].replace("hr", ""));
        const minutes = parseInt(durationParts[2].replace("min", ""));
        const durationInMinutes = hours * 60 + minutes;
        return acc + durationInMinutes * episodes;
      }

      return acc;
    }, 0);

    const totalHoursWatched = parseFloat((totalMinutesWatched / 60).toFixed(2));
    setHoursWatched(totalHoursWatched);
  }, [data]);

  const handleOnDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination || destination.droppableId === source.droppableId) return;

    if (
      destination.droppableId === "top-anime-list" &&
      source.droppableId === "anime-bank"
    ) {
      const draggedAnime = bankAnimeList.find(
        (anime) => anime.id.toString() === draggableId
      );

      const updatedBankAnimeList = bankAnimeList.filter(
        (anime) => anime.id.toString() !== draggableId
      );

      const updatedTopAnimeList = [
        ...topAnimeList.slice(0, destination.index),
        draggedAnime,
        ...topAnimeList.slice(destination.index),
      ];

      // Update the state variables
      setTopAnimeList(updatedTopAnimeList);
      setBankAnimeList(updatedBankAnimeList);
    }
  };

  return (
    <RequireAuthenticationLayout>
      <div className="flex flex-col mt-32 mx-auto max-w-6xl gap-4">
        <div className="flex justify-between gap-4">
          {profileNavItems.map(({ name, icon }, i) => (
            <Button
              key={name}
              fluid
              size="lg"
              variant={tabIndex === i + 1 ? "primary" : "outline"}
              icon={icon}
              onClick={() => setTabIndex(i + 1)}
            >
              {name}
            </Button>
          ))}
        </div>
        <div className="flex justify-between gap-4">
          <div className="flex-1 bg-black/50 shadow-lg backdrop-blur-sm rounded-lg p-6 border border-white/10 mb-12 text-center">
            <div className="h-24 w-24 grid place-items-center rounded-full bg-emerald-600/80 backdrop-blur-sm mx-auto border border-emerald-100/30 mb-4 text-5xl text-zinc-100 font-bold">
              {user?.username[0].toUpperCase()}
            </div>
            <h1 className="text-zinc-100 text-3xl font-bold flex items-center gap-2">
              @{user?.username}
              {user?.is_admin && (
                <Verified className="text-zinc-500" size={32} />
              )}
            </h1>
            <h3 className="text-zinc-600 text-lg">
              Joined{" "}
              {user?.created_at
                ? new Date(user?.created_at).toLocaleDateString()
                : "... uh... we're not sure..."}
            </h3>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 bg-black/50 shadow-lg backdrop-blur-sm rounded-lg p-6 border border-white/10 mb-12 text-center">
            <h2 className="text-xl font-bold text-zinc-300">
              Total Episodes Watched
            </h2>
            <p className="text-6xl font-bold text-zinc-100">
              {episodesWatched}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 bg-black/50 shadow-lg backdrop-blur-sm rounded-lg p-6 border border-white/10 mb-12 text-center">
            <h2 className="text-xl font-bold text-zinc-300">Average Rating</h2>
            <p className="text-6xl font-bold text-zinc-100">{averageRating}</p>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 bg-black/50 shadow-lg backdrop-blur-sm rounded-lg p-6 border border-white/10 mb-12 text-center">
            <h2 className="text-xl font-bold text-zinc-300">
              Total Hours Watched
            </h2>
            <p className="text-6xl font-bold text-zinc-100">{hoursWatched}</p>
          </div>
        </div>
        <div className="">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="flex flex-col">
              {/* Top 5 Anime List */}
              <Droppable droppableId="top-anime-list" direction="horizontal">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="mr-4 flex items-start justify-center flex-1 bg-black/50 shadow-lg backdrop-blur-sm rounded-lg p-6 border border-white/10 mb-12 text-center"
                  >
                    {topAnimeList.map((anime) => (
                      <Draggable
                        key={anime.id}
                        draggableId={anime.id.toString()}
                        index={anime?.pivot?.rank}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className="flex flex-col !top-auto !left-auto w-32 "
                          >
                            <img
                              src={anime.image_url}
                              alt={`${
                                anime.title_en || anime.title_default
                              } poster image.`}
                              className="h-full object-cover rounded-lg shadow-md mb-4"
                              style={{
                                boxShadow: `0 0 10px 0 ${anime?.average_color}`,
                              }}
                            />
                            <div className="text-zinc-200 font-bold text-xl">
                              {anime.title_en || anime.title_default}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              {/* Anime Bank */}
              <Droppable droppableId="anime-bank" direction="horizontal">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="grid grid-cols-6 bg-black/50 shadow-lg backdrop-blur-sm rounded-lg p-6 border border-white/10 mb-12 text-center"
                  >
                    {bankAnimeList.map((anime, i) => (
                      <Draggable
                        key={anime.id}
                        draggableId={anime.id.toString()}
                        index={i}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className="flex flex-col items-center justify-center mb-4 !top-auto !left-auto w-32"
                          >
                            <img
                              src={anime.image_url}
                              alt={`${
                                anime.title_en || anime.title_default
                              } poster image.`}
                              className="h-full object-cover rounded-lg shadow-md "
                              style={{
                                boxShadow: `0 0 10px 0 ${anime?.average_color}`,
                              }}
                            />
                            <div className="text-zinc-200 font-bold text-xl">
                              {anime.title_en || anime.title_default}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        </div>
      </div>
    </RequireAuthenticationLayout>
  );
};
