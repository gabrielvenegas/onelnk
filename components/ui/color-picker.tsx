import { Check } from "lucide-react";
import { isColorDark } from "../../lib/utils";

export default function ColorPicker({
  selectedColor,
  onChange,
  disabled = false,
}: {
  selectedColor: string;
  onChange: (selectedColor: string) => void;
  disabled?: boolean;
}) {
  const COLORS = [
    // black slight variation
    "#212529",
    "#0D1B2A",
    "#1B263B",
    "#415A77",
    "#778DA9",
    "#E0E1DD",
    "#FFF",
    "#D8E2DC",
    "#FFE5D9",
    "#FFCAD4",
    "#F4ACB7",
    "#9D8189",
    "#EF476F",
    "#FFD166",
    "#06D6A0",
    "#118AB2",
    "#073B4C",
    "#233D4D",
    "#FE938C",
    "#E6B89C",
    "#EAD2AC",
    "#9CAFB7",
    "#FE7F2D",
    "#FCCA46",
    "#A1C181",
    "#619B8A",
    "#A3A380",
    "#D6CE93",
    "#EFEBCE",
    "#D8A48F",
    "#BB8588",
  ];

  if (disabled) {
    return (
      <div className="space-x-4 space-y-4 pl-2 overflow-x-auto whitespace-nowrap">
        {COLORS.map((_, i) => (
          <div key={i} className="relative inline-block">
            <button className="w-8 h-8 animate-pulse bg-gray-200 rounded-full mb-4 focus:outline-none border" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-x-4 space-y-4 pl-2 overflow-x-auto whitespace-nowrap">
      {COLORS.map((c) => (
        <div key={c} className="relative inline-block">
          <button
            type="button"
            style={{ backgroundColor: c }}
            className={`w-8 h-8 rounded-full mb-4 focus:outline-none transform transition-transform duration-200 hover:scale-125 ${
              c === "#FFF" ? "border border-gray-300 dark:border-gray-700" : ""
            } ${selectedColor === c ? "scale-125" : ""}`}
            onClick={() => onChange(c)}
          />
          {selectedColor === c && (
            <Check
              className={`absolute w-5 h-5 top-1.5 left-1.5 ${
                isColorDark(selectedColor) ? "text-white" : "text-black"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
