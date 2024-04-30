import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import Providers from "./providers";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "../lib/utils";
import { ptBR } from "@clerk/localizations";

export const metadata: Metadata = {
  title: "OneLnk",
  description:
    "OneLnk é uma plataforma de links personalizados, open-source e uma alternativa ao Linktree.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      localization={{
        ...ptBR,
        formFieldLabel__emailAddress: "E-mail",
        formFieldLabel__password: "Senha",
        formButtonPrimary: "Entrar",
        signIn: {
          start: {
            title: "Entre na sua conta",
            subtitle: "para continuar usando o OneLnk",
            actionText: "Não tem uma conta? ",
            actionLink: "Crie uma",
          },
        },
        signUp: {
          start: {
            title: "Crie sua conta",
            subtitle: "para começar a usar o OneLnk",
            actionText: "Já tem uma conta? ",
            actionLink: "Entre",
          },
        },
      }}
      afterSignInUrl="/links"
      afterSignUpUrl="/links"
    >
      <html lang="en">
        <body className={cn(GeistSans.className, "h-screen")}>
          <Providers>{children}</Providers>
          <Toaster />
        </body>
      </html>
      <Analytics />
    </ClerkProvider>
  );
}
