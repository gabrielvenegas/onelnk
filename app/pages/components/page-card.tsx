"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { type Page } from "../../../models/page";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function PageCard({ id, title, description, slug }: Page) {
  const { refresh } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const removePage = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/delete-page/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
        </div>
        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </CardDescription>

        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
          URL:{" "}
          <Link
            href={`https://onelnk.pro/to/${slug}`}
            className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500"
            target="_blank"
          >
            onelnk.pro/to/{slug}
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row space-x-2">
        <Button size="sm" asChild>
          <Link href={`/pages/${id}/edit`}> Editar</Link>
        </Button>
        <Button
          variant="outline"
          className="text-red-500 hover:bg-red-100 hover:border-red-100 hover:text-red-700 dark:hover:bg-red-700 dark:hover:text-red-300"
          size="sm"
          onClick={removePage}
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Deletar
        </Button>
      </CardContent>
    </Card>
  );
}
