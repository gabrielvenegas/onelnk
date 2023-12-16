import { NextResponse } from "next/server";
import { createKysely } from "@vercel/postgres-kysely";

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/")[3];
    const db = createKysely();

    // @ts-ignore
    await db.deleteFrom("links").where("id", "=", id).execute();
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
