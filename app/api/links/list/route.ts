import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get("pageId");

    const result = await sql`SELECT * FROM links WHERE page_id = ${pageId}`;

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
