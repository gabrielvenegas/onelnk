import { Input } from "../../components/ui/input";
import Link from "next/link";
import PageCard from "./components/page-card";
import { PlusIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Pages() {
  return (
    <div className="flex flex-col p-4 space-y-4">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">Minhas páginas</h1>
        <Link href="/pages/create">
          <PlusIcon className="w-8 h-8 text-black dark:text-black" />
        </Link>
      </div>
      <Separator />

      <Input placeholder="Pesquisar" />

      <PageCard />
    </div>
  );
}
