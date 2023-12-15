import { Input } from "../../components/ui/input";
import Link from "next/link";
import PageCard from "./components/page-card";
import { PlusIcon } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { sql } from "@vercel/postgres";
import { type Page } from "../../models/page";

export default async function Pages() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const { rows } =
    await sql<Page>`SELECT * FROM public."pages" as p WHERE p."user" = ${user.id}`;

  return (
    <div className="flex flex-col p-4 space-y-4">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">Minhas páginas</h1>
        <Link href="/pages/create">
          <PlusIcon className="w-8 h-8 text-black dark:text-black" />
        </Link>
      </div>

      {rows.length > 0 && <Input placeholder="Pesquisar" />}

      {rows.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">
          Nenhuma página criada
        </p>
      )}

      {rows.map((page) => (
        <PageCard key={page.id} {...page} />
      ))}
    </div>
  );
}
