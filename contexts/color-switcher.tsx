import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type ColorPair = {
  primary: string;
  secondary: string;
};

const colorPairs: ColorPair[] = [
  { primary: "#000", secondary: "#FFF" },
  { primary: "#FFF", secondary: "#ef466f" },
  { primary: "#ef466f", secondary: "#FFF" },
  { primary: "#FFF", secondary: "#fcd166" },
  { primary: "#fcd166", secondary: "#FFF" },
  { primary: "#FFF", secondary: "#f97f2e" },
  { primary: "#f97f2e", secondary: "#FFF" },
];

type ColorSwitcherContextType = {
  colorPair: ColorPair;
};

const ColorSwitcherContext = createContext<
  ColorSwitcherContextType | undefined
>(undefined);

export const ColorSwitcherProvider: React.FC<{
  children: ReactNode;
  intervalMs?: number;
}> = ({ children, intervalMs = 5000 }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % colorPairs.length);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs]);

  const colorPair = colorPairs[index];

  return (
    <ColorSwitcherContext.Provider value={{ colorPair }}>
      {children}
    </ColorSwitcherContext.Provider>
  );
};

export default ColorSwitcherContext;
