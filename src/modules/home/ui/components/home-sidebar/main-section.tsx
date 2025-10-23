"use client";

import { MouseEvent } from "react";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { FlameIcon, HomeIcon, PlaySquareIcon } from "lucide-react";
import Link from "next/link";
import { useAuth, useClerk } from "@clerk/nextjs";

type NavItem = {
  title: string;
  url: string;
  icon: React.ComponentType;
  auth?: boolean;
};

const navItems: NavItem[] = [
  {
    title: "Home",
    url: "/",
    icon: HomeIcon
  },
  {
    title: "Subscriptions",
    url: "/feed/subscriptions",
    icon: PlaySquareIcon,
    auth: true,
  },
  {
    title: "Trending",
    url: "/feed/trending",
    icon: FlameIcon
  },
];

export const MainSection = () => {
  const clerk = useClerk();
  const { isSignedIn } = useAuth();

  const handleSignIn = (e: MouseEvent<HTMLButtonElement>, navItem: NavItem) => {
    e.preventDefault();

    if (!isSignedIn && navItem.auth) return clerk.openSignIn();
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {navItems.map(navItem => (
            <SidebarMenuItem key={navItem.title}>
              {/* TODO: Change to look at current pathname */}
              {/* TODO: Do something on click */}
              <SidebarMenuButton tooltip={navItem.title} asChild isActive={false} onClick={(e) => handleSignIn(e, navItem)}>
                <Link className="flex items-center gap-4" href={navItem.url}>
                  <navItem.icon />
                  <span className="text-sm">{navItem.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};