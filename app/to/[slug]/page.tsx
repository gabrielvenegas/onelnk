import { Avatar } from "../../../components/ui/avatar";
import Link from "next/link";
import { LinkList } from "../../../components/link-list";
import { Page } from "../../../models/page";
import { sql } from "@vercel/postgres";

export default async function Links({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const { rows } = await sql<Page>`
    SELECT 
      id, 
      title, 
      text, 
      description, 
      background
    FROM public."pages"
    WHERE slug like ${params.slug}
    ORDER BY created_at DESC`;

  if (rows.length === 0) {
    return <div>Page not found</div>;
  }

  const page = rows[0];

  return (
    <div
      style={{ backgroundColor: page.background, color: page.text }}
      className="flex flex-col h-screen items-center p-4 md:p-8"
    >
      <Avatar className="w-24 h-24 rounded-full mb-4" />
      <h1 className="text-2xl text-center font-semibold mb-4">{page.title}</h1>
      <p className="text-center mb-8">{page.description}</p>
      <LinkList {...page} />

      <div className="fixed inset-x-0 bottom-4 text-center">
        <Link
          style={{
            color: page.text,
          }}
          href="/"
        >
          Crie o seu ONELNK agora mesmo
        </Link>
      </div>
    </div>
  );
}
