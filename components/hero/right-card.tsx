"use client";

import { Tilt } from "react-tilt";
import useColorSwitcher from "@/app/_hooks/useColorSwitcher";
import { Button } from "../ui/button";

export default function RightCard() {
  const fakeLinks = [1, 2, 3, 4];
  const {
    colorPair: { primary, secondary },
  } = useColorSwitcher();

  return (
    <Tilt style={{ height: 650, width: 380 }}>
      <div
        className="flex h-full flex-1 flex-col justify-center rounded bg-white p-4 shadow-lg transition-colors duration-500"
        style={{
          backgroundColor: primary,
          color: secondary,
        }}
      >
        <h1 className="mb-2  text-center text-xl font-semibold">OneLnk Pro</h1>
        <p className="mb-8 text-center">Saiba mais nos links abaixo:</p>

        <div className="flex flex-col justify-center space-y-4">
          {fakeLinks.map((l) => (
            <Button
              className="transition-colors duration-500"
              style={{
                backgroundColor: secondary,
                color: primary,
              }}
              key={l}
            >
              X (@gabrielvenegaas)
            </Button>
          ))}
        </div>
      </div>
    </Tilt>
  );
}
