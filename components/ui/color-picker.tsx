export default function ColorPicker({
  color,
  onChange,
}: {
  color: string;
  onChange: (color: string) => void;
}) {
  const COLORS = [
    "#0D1B2A",
    "#1B263B",
    "#415A77",
    "#778DA9",
    "#E0E1DD",
    "#FFF",
  ];
  return (
    <div className="space-x-4">
      {COLORS.map((c) => (
        <button
          key={c}
          type="button"
          style={{ backgroundColor: c }}
          className={`w-8 h-8 rounded-full focus:outline-none transform transition-transform duration-200 hover:scale-125 ${
            c === "#FFF" ? "border border-gray-300 dark:border-gray-700" : ""
          } ${color === c ? "scale-125" : ""}`}
          onClick={() => onChange(c)}
        />
      ))}
    </div>
  );
}
