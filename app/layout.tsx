import "./globals.css";

import { ClerkProvider, UserButton } from "@clerk/nextjs";

import { GeistSans } from "geist/font/sans";
import Link from "next/link";
import type { Metadata } from "next";
import { Separator } from "../components/ui/separator";
import { cn } from "../lib/utils";

export const metadata: Metadata = {
  title: "OneLnk",
  description: "OneLnk is a free and open source linktree alternative.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(GeistSans.className, "h-screen")}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
