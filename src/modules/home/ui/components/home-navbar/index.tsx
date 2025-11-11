import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { AuthButton } from "@/modules/auth/ui/components/auth-button";

export const HomeNavbar = () => {
  return (
    <nav className="z-50 fixed top-0 left-0 right-0 flex items-center h-16 pl-2 pr-5 bg-white">
      <div className="flex justify-between items-center gap-4 w-full">
        {/* Menu and Logo */}
        <div className="flex-shrink-0 flex items-center gap-x-2">
          <SidebarTrigger />
          <Link prefetch className="hidden md:inline-flex items-center gap-x-2" href="/">
            <Image src="./icon.svg" alt="Logo" width={32} height={32} />
            <span className="text-xl font-semibold tracking-tight">YouTube</span>
          </Link>
        </div>

        {/* Search bar */}
        <div className="flex-1 flex justify-center max-w-[720px]">
          <SearchInput />
        </div>

        <div className="flex-shrink-0 flex items-center gap-4">
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};