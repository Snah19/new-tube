"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { APP_URL } from "@/constants";
import { SearchIcon, XIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";

export const SearchInput = () => {
  return (
    <Suspense fallback={<Skeleton className="w-full h-10" />}>
      <SearchInputSuspense  />
    </Suspense>
  );
};

const SearchInputSuspense = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const categoryId = searchParams.get("categoryId") || "";
  const [value, setValue] = useState(query);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = new URL("/search", APP_URL);
    const newQuery = value.trim();

    url.searchParams.set("query", encodeURIComponent(newQuery));

    if (categoryId) {
      url.searchParams.set("categoryId", categoryId);
    }

    if (newQuery === "") {
      url.searchParams.delete("query");
    }

    setValue(newQuery);
    router.push(url.toString());
  };
  
  return (
    <form className="flex w-full max-w-[600px]" onSubmit={handleSearch}>
      <div className="relative w-full">
        <input className="w-full py-2 pl-4 pr-12 rounded-l-full border focus:outline-none focus:border-blue-500" type="text" placeholder="Search" value={value} onChange={e => setValue(e.target.value)} />
        {value && (
          <Button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full" type="button" variant="ghost" size="icon" onClick={() => setValue("")}>
            <XIcon className="text-gray-500" />
          </Button>
        )}
      </div>
      <button className="py-2.5 px-5 rounded-r-full border border-l-0 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed" type="submit" disabled={!value.trim()}>
        <SearchIcon className="size-5" />
      </button>
    </form>
  );
};