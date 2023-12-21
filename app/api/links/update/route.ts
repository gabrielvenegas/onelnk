import { NextResponse } from "next/server";
import { createKysely } from "@vercel/postgres-kysely";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const db = createKysely();

    const { links } = body;

    links.forEach(async (link: any) => {
      const { id, ...l } = link;

      if (!id) {
        await db
          // @ts-ignore
          .insertInto("links")
          .values({
            url: l.url,
            name: l.name,
            page_id: l.page_id,
          })
          .execute();
      } else {
        await db
          // @ts-ignore
          .updateTable("links")
          .set({
            url: l.url,
            name: l.name,
          })
          // @ts-ignore
          .where("id", "=", id)
          .execute();
      }
    });

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
