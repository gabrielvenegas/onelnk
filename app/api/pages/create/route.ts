import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = await sql`INSERT INTO public."pages" (
        "text", "slug", "user", "title", "description", "background"
      ) VALUES (
        ${body.text}, ${body.slug}, ${body.userId}, ${body.title}, ${body.description}, ${body.background}
      )  RETURNING *`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
