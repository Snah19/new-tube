import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { AuthButton } from "@/modules/auth/ui/components/auth-button";
import { StudioUploadModal } from "../studio-upload-modal";

export const StudioNavbar = () => {
  return (
    <nav className="z-50 fixed top-0 left-0 right-0 flex items-center h-16 pl-2 pr-5 border-b shadow-md bg-white">
      <div className="flex justify-between items-center gap-4 w-full">
        {/* Menu and Logo */}
        <div className="flex-shrink-0 flex items-center gap-x-2">
          <SidebarTrigger />
          <Link className="inline-flex items-center" href="/studio">
            <Image src="./icon.svg" alt="Logo" width={32} height={32} />
            <span className="text-xl font-semibold tracking-tight">Studio</span>
          </Link>
        </div>

        <div className="flex-shrink-0 flex items-center gap-4">
          <StudioUploadModal />
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};