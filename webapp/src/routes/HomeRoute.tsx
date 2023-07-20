import { CircuitBoard, MessageSquare, Trophy, UserPlus2 } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollIndicator } from "../components/ScrollIndicator";

export const HomeRoute = () => {
  return (
    <>
      <ScrollIndicator />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hero-grid h-screen flex flex-col items-center justify-center text-center mb-12">
          <div className="flex sm:gap-6 justify-center text-4xl sm:text-6xl">
            {/* <img src={Logo} className="h-12" /> */}
            <h1 data-aos="fade-up" className=" text-zinc-50 font-bold">
              ✨ Welcome To Anisense!
            </h1>
          </div>
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="mx-auto max-w-4xl text-md mt-5 text-zinc-400"
          >
            Dive into the anime world with a unique perspective. Rank your
            favorites, discover new titles with AI-powered recommendations, and
            share your experiences with the community.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 items-center mt-6">
            <Link
              data-aos="fade-down"
              data-aos-delay="400"
              className="py-2 px-8 flex items-center gap-2 float-right rounded font-bold text-white mt-4 bg-emerald-700 hover:bg-emerald-900"
              to="/auth/register"
            >
              <UserPlus2 />
              Create An Account
            </Link>
            <Link
              data-aos="fade-down"
              data-aos-delay="400"
              className="py-2 px-8 flex items-center gap-2 float-right rounded font-bold text-white mt-4 border border-emerald-700 hover:bg-emerald-900 transition-all"
              to="/discover"
            >
              Discover Anime
            </Link>
          </div>
        </div>

        <div className="h-screen flex flex-col items-center justify-center py-12">
          <h2 data-aos="zoom-in" className="text-zinc-500 font-bold text-xl">
            FEATURES
          </h2>

          <h3
            data-aos="zoom-in"
            className="text-zinc-100 font-bold text-5xl mt-4 mb-12 sm:mb-56 text-center"
          >
            What Is Anisense?
          </h3>
          <div className="flex flex-col sm:flex-row justify-between">
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="flex-1 p-8 text-center"
            >
              <div className="text-zinc-500 mb-10 flex justify-center">
                <Trophy size={56} />
              </div>
              <h3 className="text-2xl text-zinc-100 font-bold">Rank Anime</h3>
              <p className="text-zinc-300 mt-4">
                Showcase your top anime choices for other users to see.
              </p>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="400"
              className="flex-1 p-8 text-center"
            >
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
            <div
              data-aos="fade-up"
              data-aos-delay="600"
              className="flex-1 p-8 text-center"
            >
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
          <h3
            data-aos="zoom-in"
            className="text-zinc-100 text-center font-bold text-5xl mt-4 mb-8"
          >
            What are you waiting for?
          </h3>
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-zinc-300 text-xl text-center"
          >
            Become a part of a global community of anime fans who love what you
            love. Discuss your favorite shows, share your fan theories, or just
            chat it up. The Anisense community is welcoming, vibrant, and ready
            for you to join the conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 items-center mt-6">
            <a
              data-aos="fade-down"
              data-aos-delay="400"
              className="py-2 px-8 flex items-center gap-2 float-right rounded font-bold text-white mt-4 bg-emerald-700 hover:bg-emerald-900"
              href="https://discord.gg/v46nCB2vcA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageSquare />
              Join Our Discord
            </a>
            <Link
              data-aos="fade-down"
              data-aos-delay="400"
              className="py-2 px-8 flex items-center gap-2 float-right rounded font-bold text-white mt-4 border border-emerald-700 hover:bg-emerald-900"
              to="/auth/register"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
