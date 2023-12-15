import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { UserButton } from "@clerk/nextjs";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen">
      <div className="flex w-full p-4 justify-between">
        <Link href="/" className="font-semibold text-xl">
          OneLnk
        </Link>
        <UserButton afterSignOutUrl="/" />
      </div>
      <Separator />

      {children}
    </main>
  );
}
