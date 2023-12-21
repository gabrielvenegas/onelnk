import { NextResponse } from "next/server";
import { createKysely } from "@vercel/postgres-kysely";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const db = createKysely();

    const { links, ...page } = body.page;

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
      .where("id", "=", params.id)
      .execute();
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
