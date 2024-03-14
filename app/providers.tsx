"use client";

import { ColorSwitcherProvider } from "@/contexts/color-switcher";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ColorSwitcherProvider>{children}</ColorSwitcherProvider>
    </QueryClientProvider>
  );
}
