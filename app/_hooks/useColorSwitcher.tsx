"use client";

import ColorSwitcherContext from "@/contexts/color-switcher";
import { useContext } from "react";

export default function useColorSwitcher() {
  const context = useContext(ColorSwitcherContext);

  if (context === undefined) {
    throw new Error(
      "useColorSwitcher must be used within a ColorSwitcherProvider",
    );
  }

  return context;
}
