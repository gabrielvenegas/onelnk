import { Card, CardContent } from "@/components/ui/card";

import Link from "next/link";
import { Page } from "../../models/page";
import { sql } from "@vercel/postgres";

export async function Links({ id, text, background }: Page) {
  const { rows } =
    await sql`SELECT * FROM public."links" WHERE page_id = ${id} and type = 'link'`;

  return (
    <div className="flex flex-col items-center w-full">
      {rows.map((link) => (
        <Link
          style={{ color: text }}
          className="flex flex-col w-full items-center text-center"
          target="_blank"
          href={`/api/links/${link.id}/redirect?redirectUrl=${link.url}`}
        >
          <Card
            key={link.id}
            style={{
              backgroundColor: text,
              color: background,
              borderColor: background,
            }}
            className="w-full max-w-md mb-4"
          >
            <CardContent className="p-4 text-center">{link.name}</CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
