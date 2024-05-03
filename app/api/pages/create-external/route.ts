import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createKysely } from "@vercel/postgres-kysely";
import { redirectToSignIn } from "@clerk/nextjs/server";
import { sql } from "@vercel/postgres";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { userId } = auth();

    const { searchParams } = new URL(request.url);

    const slug = searchParams.get("slug");

    if (!userId)
      return redirectToSignIn({
        returnBackUrl: `${process.env.NEXT_PUBLIC_VERCEL_URL}/?slug=${slug}`,
      });

    const db = createKysely();

    const slugExists = await db
      // @ts-ignore
      .selectFrom("pages")
      // @ts-ignore
      .select("id")
      // @ts-ignore
      .where("slug", "=", slug)
      .execute();

    if (slugExists.length > 0)
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_VERCEL_URL}/?slugExists=true`
      );

    const payload = {
      text: "#000",
      slug,
      userId,
      title: "Minha página",
      description: "Minha página default",
      background: "#FFF",
    };

    await sql`INSERT INTO public."pages" (
      "text", "slug", "user", "title", "description", "background"
    ) VALUES (
      ${payload.text}, ${payload.slug}, ${payload.userId}, ${payload.title}, ${payload.description}, ${payload.background}
    )  RETURNING *`;

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_VERCEL_URL}/links`);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
