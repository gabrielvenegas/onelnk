import { NextResponse } from "next/server";
import { createKysely } from "@vercel/postgres-kysely";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = createKysely();

    await db
      // @ts-ignore
      .insertInto("links")
      .values(body.links)
      .execute();

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
