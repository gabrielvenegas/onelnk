import RightCard from "@/components/hero/right-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GeistSans } from "geist/font/sans";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();

  return (
    <>
      <div className="fixed inset-0 z-0 transition-colors duration-500" />
      <div
        className={cn(
          GeistSans.className,
          "relative z-10 h-screen w-full transition-colors duration-500",
        )}
      >
        <header className="m-auto max-w-screen-2xl py-4">
          <div className="flex flex-1 flex-row items-center justify-between">
            <h1 className="text-2xl font-semibold">OneLnk</h1>
            {!user ? (
              <Link href="/login">Fazer login</Link>
            ) : (
              <Link href="/links">Dashboard</Link>
            )}
          </div>
        </header>

        <main className="m-auto max-w-screen-2xl">
          <div className="flex h-[calc(100vh-112px)] flex-1 flex-row items-center space-x-16">
            <div className="space-y-8">
              <h2 className="text-7xl">
                Defina Seu Espaço Online. Conexões Infinitas, Zero Despesa.
              </h2>

              <p className="text-lg">
                Centralize sua presença online em um único link fácil de
                gerenciar. Com OneLnk, você tem o controle total para conectar
                seu público às suas redes sociais, websites, e muito mais - sem
                custos, sem complicações.
              </p>

              <div className="flex flex-row space-x-6">
                <Input
                  className="max-w-md"
                  placeholder="onelnk.pro/to/seunome"
                />

                <Button className="transition-colors duration-500">
                  Crie seu link grátis
                </Button>
              </div>

              <p className="text-sm">
                Precisa de alguma funcionalidade específica?{" "}
                <span className="text-sm font-semibold">Me manda aqui</span>
              </p>
            </div>

            <div>
              <RightCard />
            </div>
          </div>
        </main>

        <footer className="m-auto max-w-screen-2xl py-4">
          <div className="flex flex-1 flex-row items-center justify-between">
            <h1>OneLnk©️ 2024 - Todos os direitos reservados</h1>
          </div>
        </footer>
      </div>
    </>
  );
}
