import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { FolderOpenDot, RssIcon, ShieldIcon, StarIcon } from "lucide-react";

import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import Image from "next/image";
import { Input } from "../components/ui/input";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import githubImage from "../public/github-horizontal.webp";
import notionImage from "../public/notion-horizontal.webp";

export default async function Home() {
  const user = await currentUser();

  return (
    <>
      <header className="w-full  py-6">
        <div className="container px-4 md:px-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">OneLnk</h1>
          {!user ? (
            <Link href="/links">Fazer login</Link>
          ) : (
            <Link href="/links">Dashboard</Link>
          )}
        </div>
      </header>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container space-y-4 px-4 md:px-6">
          <div className="md:text-center space-y-8">
            <h2 className="text-6xl xl:text-7xl">
              Concentre Seu Portfólio em Um Único Link Dinâmico
            </h2>

            <p className="md:m-auto w-5/6 lg:text-lg">
              Especializado para desenvolvedores, centralize projetos do GitHub,
              blogs e redes em um só lugar. Destaque-se e conecte-se na
              comunidade tech
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-2">
              <div className="flex flex-row items-center space-x-2">
                <span className="md:text-lg font-semibold">
                  https://onelnk.pro/to/
                </span>
                <Input className="text-base" placeholder="john-doe" />
              </div>
              <Button className="transition-colors duration-500">
                Criar seu link grátis
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Destaque-se, Compartilhe e Conecte-se
              </h2>
              <p className="max-w-[700px] mx-auto text-gray-500 md:text-xl dark:text-gray-400">
                Expanda sua rede de desenvolvedores. Apresente projetos,
                compartilhe insights e conecte-se com profissionais de
                tecnologia sem esforço
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm">
              <div className="flex space-x-2 items-center mb-4">
                <FolderOpenDot className="h-8 w-8 text-primary" />
                <h3 className="ml-4 text-lg font-semibold">
                  Vitrine de Projetos
                </h3>
                <Badge>em breve</Badge>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Mostre seus repositórios GitHub em tempo real, exiba
                estatísticas atualizadas e evidencie sua expertise com insígnias
                de status de CI/CD.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm">
              <div className="flex space-x-2 items-center mb-4">
                <RssIcon className="h-8 w-8 text-primary" />
                <h3 className="ml-4 text-lg font-semibold">
                  Blogging Integrado
                </h3>
                <Badge>em breve</Badge>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Seu perfil se atualiza automaticamente com as últimas postagens
                do seu blog, mantendo seu público sempre informado e engajado.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm">
              <div className="flex space-x-2 items-center mb-4">
                <ShieldIcon className="h-8 w-8 text-primary" />
                <h3 className="ml-4 text-lg font-semibold">
                  Networking Focado em Desenvolvedores
                  <Badge className="ml-2 mb-2">em breve</Badge>
                </h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Acesso direto aos seus perfis profissionais no Stack Overflow,
                LinkedIn e outros, simplificando sua conexão com a comunidade de
                tecnologia.
              </p>
            </div>
            {/* <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm">
              <div className="flex space-x-2 items-center mb-4">
                <LayersIcon className="h-8 w-8 text-primary" />
                <h3 className="ml-4 text-lg font-semibold">
                  Visibilidade Aprimorada
                </h3>
                <Badge>em breve</Badge>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Com otimização SEO, amplie suas chances de ser encontrado por
                empregadores, colaboradores e seguidores na web.
              </p>
            </div> */}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Integrações
              </h2>
              <p className="max-w-[700px] mx-auto text-gray-500 md:text-xl dark:text-gray-400">
                Aproveite nossas integrações para criar um perfil ainda mais
                completo
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 justify-items-center lg:grid-cols-2 mt-12">
            <Image
              src={githubImage}
              className="h-[160px] w-[434px]"
              alt="Github logo"
            />
            <Image
              src={notionImage}
              className="h-[160px] w-[300px]"
              alt="Notion logo"
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                O Que Nossos Usuários Dizem
              </h2>
              <p className="max-w-[700px] mx-auto text-gray-500 md:text-xl dark:text-gray-400">
                Veja o que nossos usuários têm a dizer sobre suas experiências
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="flex items-start mb-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>GE</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <h3 className="font-semibold">Gabriel Enrique</h3>
                  <div className="flex items-center gap-0.5 mt-1">
                    <StarIcon className="w-5 h-5" fill="black" />
                    <StarIcon className="w-5 h-5" fill="black" />
                    <StarIcon className="w-5 h-5" fill="black" />
                    <StarIcon className="w-5 h-5" fill="black" />
                    <StarIcon className="w-5 h-5" fill="black" />
                  </div>
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Desde que comecei a utilizar o OneLnk, compartilhar meus perfis
                profissionais e mostrar meu trabalhou ficou bem mais fácil!
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer className="w-full bg-gray-100 dark:bg-gray-800 py-6">
        <div className="container px-4 md:px-6 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 OneLink. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              className="text-sm hover:underline underline-offset-4 text-gray-500 dark:text-gray-400"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-sm hover:underline underline-offset-4 text-gray-500 dark:text-gray-400"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
