import { Card, CardContent } from "@/components/ui/card";

/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/329ptpXyots
 */
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Page } from "../models/page";
import { sql } from "@vercel/postgres";

export async function LinkList({ id, text, background }: Page) {
  const { rows } =
    await sql`SELECT * FROM public."links" WHERE page_id = ${id}`;

  return (
    <div className="flex flex-col w-full">
      {rows.map((link) => (
        <Card
          key={link.id}
          style={{
            backgroundColor: background,
          }}
          className="w-full max-w-md mb-4"
        >
          <CardContent className="p-4 text-center">
            <Link
              style={{ color: text }}
              className="w-full text-center"
              target="_blank"
              href={link.url}
            >
              {link.name}
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
