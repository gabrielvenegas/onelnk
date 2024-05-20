import { Page } from "@/models/page";
import { sql } from "@vercel/postgres";
import Link from "next/link";
import { Button } from "../ui/button";
import { FaFacebook, FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6";

export async function Social({ id, text, background }: Page) {
  const { rows } =
    await sql`SELECT * FROM public."links" WHERE page_id = ${id} and type = 'social'`;

  function getIcon(url: string) {
    if (url.includes("x.com")) return <FaXTwitter size={24} color={text} />;
    if (url.includes("instagram.com")) return <FaInstagram size={24} color={text} />;
    if (url.includes("facebook.com")) return <FaFacebook size={24} color={text} />;
    if (url.includes("tiktok.com")) return <FaTiktok size={24} color={text} />;
  }

  return (
    <div className="flex flex-row items-center justify-center space-x-4 w-full">
      {rows.map((link) => (
        <Button
          key={id}
          variant="outline"
          size="icon"
          className="w-12 h-12"
          style={{
            backgroundColor: background
          }}
          type="button"
          asChild
        >
          <Link
            style={{ color: text }}
            target="_blank"
            href={`/api/links/${link.id}/redirect?redirectUrl=${link.url}`}
          >

            {getIcon(link.url)}
          </Link>
        </Button>

      ))}
    </div>
  );
}