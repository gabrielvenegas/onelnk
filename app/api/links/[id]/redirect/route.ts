import { createKysely } from "@vercel/postgres-kysely";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const { searchParams } = new URL(request.url);
  const redirectUrl = searchParams.get("redirectUrl");

  if (!redirectUrl) {
    return new Response("Missing redirectUrl", { status: 400 });
  }

  const db = createKysely();
  await db
    // @ts-ignore
    .insertInto("analytics")
    .values({
      link_id: params.id,
      user_agent: request.headers.get("user-agent"),
      referrer: request.headers.get("referrer"),
      ip: request.headers.get("cf-connecting-ip"),
    })
    .execute();

  return redirect(redirectUrl);
}
