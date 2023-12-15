import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { type Page } from "../../../models/page";

export default function PageCard({ title, description, slug }: Page) {
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
        <Button size="sm">Editar</Button>
        <Button
          variant="outline"
          className="text-red-500 hover:bg-red-100 hover:border-red-100 hover:text-red-700 dark:hover:bg-red-700 dark:hover:text-red-300"
          size="sm"
        >
          Deletar
        </Button>
      </CardContent>
    </Card>
  );
}
