import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { cn } from "../lib/utils";
import { ptBR } from "@clerk/localizations";

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
    <ClerkProvider localization={ptBR}>
      <html lang="en">
        <body className={cn(GeistSans.className, "h-screen")}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
