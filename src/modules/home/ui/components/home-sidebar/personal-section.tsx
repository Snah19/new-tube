"use client";

import { MouseEvent } from "react";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useAuth } from "@clerk/clerk-react";
import { useClerk } from "@clerk/nextjs";
import { HistoryIcon, ListVideoIcon, ThumbsUpIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  const handleSignIn = (e: MouseEvent<HTMLButtonElement>, navItem: NavItem) => {
    if (!isSignedIn && navItem.auth) {
      e.preventDefault();
      return clerk.openSignIn();
    }
  };
  return (
    <SidebarGroup>
      <SidebarGroupLabel>You</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {navItems.map(navItem => (
            <SidebarMenuItem key={navItem.title}>
              <SidebarMenuButton tooltip={navItem.title} asChild isActive={pathname === navItem.url} onClick={(e) => handleSignIn(e, navItem)}>
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