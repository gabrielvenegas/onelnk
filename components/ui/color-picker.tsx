export default function ColorPicker({
  color,
  onChange,
}: {
  color: string;
  onChange: (color: string) => void;
}) {
  const COLORS = [
    "#000",
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
  ];
  return (
    <div className="space-x-4 space-y-4 overflow-x-auto whitespace-nowrap">
      {COLORS.map((c) => (
        <button
          key={c}
          type="button"
          style={{ backgroundColor: c }}
          className={`w-8 h-8 rounded-full mb-4 focus:outline-none transform transition-transform duration-200 hover:scale-125 ${
            c === "#FFF" ? "border border-gray-300 dark:border-gray-700" : ""
          } ${color === c ? "scale-125" : ""}`}
          onClick={() => onChange(c)}
        />
      ))}
    </div>
  );
}
