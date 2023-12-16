import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
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
        <Suspense fallback={<Loader2 className="mr-2 h-4 w-4 animate-spin" />}>
          <UserButton afterSignOutUrl="/" />
        </Suspense>
      </div>
      <Separator />

      {children}
    </main>
  );
}
