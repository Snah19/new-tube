"use client";

import { MouseEvent } from "react";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useAuth } from "@clerk/clerk-react";
import { useClerk } from "@clerk/nextjs";
import { HistoryIcon, ListVideoIcon, ThumbsUpIcon } from "lucide-react";
import Link from "next/link";

type NavItem = {
  title: string;
  url: string;
  icon: React.ComponentType;
  auth?: boolean;
};

const navItems: NavItem[] = [
  {
    title: "History",
    url: "/playlists/history",
    icon: HistoryIcon,
    auth: true,
  },
  {
    title: "Liked videos",
    url: "/playlists/liked",
    icon: ThumbsUpIcon,
    auth: true,
  },
  {
    title: "All playlists",
    url: "/playlists",
    icon: ListVideoIcon,
    auth: true,
  },
];


export const PersonalSection = () => {
  const clerk = useClerk();
  const { isSignedIn } = useAuth();

  const handleSignIn = (e: MouseEvent<HTMLButtonElement>, navItem: NavItem) => {
    e.preventDefault();

    if (!isSignedIn && navItem.auth) return clerk.openSignIn();
  };
  return (
    <SidebarGroup>
      <SidebarGroupLabel>You</SidebarGroupLabel>
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