import { NextResponse } from "next/server";
import { createKysely } from "@vercel/postgres-kysely";
import { sql } from "@vercel/postgres";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const db = createKysely();

    const { links, id, ...page } = body.page;

    await db
      // @ts-ignore
      .updateTable("pages")
      .set({
        title: page.title,
        description: page.description,
        background: page.background,
        text: page.text,
      })
      // @ts-ignore
      .where("id", "=", id)
      .execute();
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
