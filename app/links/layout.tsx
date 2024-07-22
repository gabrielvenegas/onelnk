import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { UserButton } from "@clerk/nextjs";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="m-auto h-screen space-y-4 pt-4 md:max-w-screen-xl">
      <div className="flex w-full justify-between px-2 md:px-0">
        <Link href="/" className="text-xl font-semibold">
          OneLnk
        </Link>

        <UserButton afterSignOutUrl="/" />
      </div>

      <Separator />

      <div className="p-2 md:p-0">{children}</div>
    </main>
  );
}
