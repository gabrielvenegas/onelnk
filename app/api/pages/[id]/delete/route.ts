import { NextResponse } from "next/server";
import { createKysely } from "@vercel/postgres-kysely";

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const db = createKysely();

    // @ts-ignore
    await db.deleteFrom("pages").where("id", "=", id).execute();
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
