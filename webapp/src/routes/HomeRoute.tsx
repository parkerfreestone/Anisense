import { CircuitBoard, MessageSquare, Trophy, UserPlus2 } from "lucide-react";

export const HomeRoute = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="hero-grid h-screen flex flex-col items-center justify-center text-center mb-12">
        <div className="flex sm:gap-6 justify-center text-4xl sm:text-6xl">
          <h1 className=" text-zinc-50 font-bold">
            <span style={{ textShadow: "0px 0px 10px #ffac33" }}>✨</span>{" "}
            Welcome To Anisense!
          </h1>
        </div>
        <p className="mx-auto max-w-4xl text-md mt-5 text-zinc-400">
          Dive into the anime world with a unique perspective. Rank your
          favorites, discover new titles with AI-powered recommendations, and
          share your experiences with the community.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 items-center mt-6">
          <a
            className="py-2 px-8 flex items-center gap-2 float-right rounded font-bold text-white mt-4 bg-emerald-700 hover:bg-emerald-500"
            href="#"
          >
            <UserPlus2 />
            Create An Account
          </a>
          <a
            className="py-2 px-8 flex items-center gap-2 float-right rounded font-bold text-white mt-4 border border-emerald-700"
            href="#"
          >
            Discover Anime
          </a>
        </div>
      </div>

      <div className="h-screen flex flex-col items-center justify-center py-12">
        <h2 className="text-zinc-500 font-bold text-xl">FEATURES</h2>

        <h3 className="text-zinc-100 font-bold text-5xl mt-4 mb-12 sm:mb-56 text-center">
          What Is Anisense?
        </h3>
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="flex-1 p-8 text-center">
            <div className="text-zinc-500 mb-10 flex justify-center">
              <Trophy size={56} />
            </div>
            <h3 className="text-2xl text-zinc-100 font-bold">Rank Anime</h3>
            <p className="text-zinc-300 mt-4">
              Showcase your top anime choices for other users to see
            </p>
          </div>
          <div className="flex-1 p-8 text-center">
            <div className="text-zinc-500 mb-10 flex justify-center">
              <CircuitBoard size={56} />
            </div>
            <h3 className="text-2xl text-zinc-100 font-bold">
              AI Recommendations
            </h3>
            <p className="text-zinc-300 mt-4">
              Discover uncharted titles tailored directly for you.
            </p>
          </div>
          <div className="flex-1 p-8 text-center">
            <div className="text-zinc-500 mb-10 flex justify-center">
              <MessageSquare size={56} />
            </div>
            <h3 className="text-2xl text-zinc-100 font-bold">Community</h3>
            <p className="text-zinc-300 mt-4">
              Connect and share experiences with fellow fans.
            </p>
          </div>
        </div>
      </div>
      <div className="h-screen flex flex-col items-center justify-center py-12">
        <h3 className="text-zinc-100 text-center font-bold text-5xl mt-4 mb-8">
          What are you waiting for?
        </h3>
        <p className="text-zinc-300 text-xl text-center">
          Become a part of a global community of anime fans who love what you
          love. Discuss your favorite shows, share your fan theories, or just
          chat it up. The Anisense community is welcoming, vibrant, and ready
          for you to join the conversation.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 items-center mt-6">
          <a
            className="py-2 px-8 flex items-center gap-2 float-right rounded font-bold text-white mt-4 bg-emerald-700 hover:bg-emerald-500"
            href="#"
          >
            <MessageSquare />
            Join Our Discord
          </a>
          <a
            className="py-2 px-8 flex items-center gap-2 float-right rounded font-bold text-white mt-4 border border-emerald-700"
            href="#"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
};
