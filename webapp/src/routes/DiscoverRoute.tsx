import { useState } from "react";
import { Hero } from "../components/Hero";
import { Search } from "lucide-react";

export const DiscoverRoute = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <Hero
        title="Discover Anime"
        desc="Add watched anime to your profile, or just explore titles."
      />
      <div className="max-w-6xl mx-auto mt-5">
        <div className="w-full flex justify-between p-4 rounded-md bg-zinc-800 border border-zinc-700 ">
          <input
            className="text-zinc-100 bg-transparent w-11/12 text-xl outline-none"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="text-zinc-400" />
        </div>
        <div className="h-screen"></div>
      </div>
    </div>
  );
};
