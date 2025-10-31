"use client";

import { Button } from "@/components/ui/button";
import { ClapperboardIcon, UserCircleIcon, UserIcon } from "lucide-react";
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

export const AuthButton = () => {
  // TODO: Add different auth states
  return (
    <>
      <SignedIn>
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Link label="My profile" href="/users/current" labelIcon={<UserIcon className="size-4" />}/>
            <UserButton.Link label="Studio" href="/studio" labelIcon={<ClapperboardIcon className="size-4" />}/>
          </UserButton.MenuItems>
        </UserButton>
        {/* Add menu items for Studio and User profile */}
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button className="py-2 px-4 text-sm font-medium rounded-full text-blue-600 hover:text-blue-500 border-blue-500/20 shadow-none" variant="outline">
            <UserCircleIcon />
            Sign in
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  );
};