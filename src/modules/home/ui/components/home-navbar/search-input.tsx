import { SearchIcon } from "lucide-react";

export const SearchInput = () => {
  // TODO: Add search functionality
  
  return (
    <form className="flex w-full max-w-[600px]">
      <div className="relative w-full">
        <input className="w-full py-2 pl-4 pr-12 rounded-l-full border focus:outline-none focus:border-blue-500" type="text" placeholder="Search" />
        {/* TODO: add remove search button */}
      </div>
      <button className="py-2.5 px-5 rounded-r-full border border-l-0 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed" type="submit">
        <SearchIcon className="size-5" />
      </button>
    </form>
  );
};