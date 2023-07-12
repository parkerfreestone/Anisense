import Select from "react-select";

export const AnimeQueryFilters = ({
  handleFiltersChange,
  handleSelectChange,
  animeGenres,
  filters,
}) => (
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
);
