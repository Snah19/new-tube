import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YouTube",
  description: "YouTube clone by Snah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en">
        <body
          className={`${inter.className} antialiased`}
        >
          <TRPCProvider>
            <Toaster />
            <header>
              <Link prefetch className="inline-flex items-center gap-x-2" href="/">
                <Image src="/icon.svg" alt="YouTube" width={50} height={50} />
                <span className="text-xl font-semibold tracking-tight">YouTube</span>
              </Link>
            </header>
            {children}
          </TRPCProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
