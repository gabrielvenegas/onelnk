import { Avatar } from "../../../components/ui/avatar";
import { LinkList } from "../../../components/link-list";
import { sql } from "@vercel/postgres";

export default async function Links({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const { rows } = await sql`
    SELECT 
      id, 
      title, 
      text, 
      description, 
      background
    FROM public."pages"
    WHERE slug like ${params.slug}`;

  if (rows.length === 0) {
    return <div>Page not found</div>;
  }

  const page = rows[0];

  return (
    <div className="flex flex-col items-center p-4 md:p-8">
      <Avatar className="w-24 h-24 rounded-full mb-4" />
      <h1 className="text-2xl font-semibold mb-4">{page.title}</h1>
      <p className="text-center text-gray-600 mb-8">{page.description}</p>
      <LinkList pageId={page.id} />
    </div>
  );
}
