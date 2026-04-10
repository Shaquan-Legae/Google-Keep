import { NOTE_COLORS } from "../../utils/constants";

export default function ColorPicker({ selectedColor, onChange }) {
  return (
    <div
      className="color-picker"
      role="listbox"
      aria-label="Select note color"
      onClick={(event) => event.stopPropagation()}
    >
      {NOTE_COLORS.map((color) => (
        <button
          key={color}
          type="button"
          className={`color-dot ${selectedColor === color ? "selected" : ""}`}
          style={{ backgroundColor: color }}
          onClick={() => onChange(color)}
          aria-label={`Set note color to ${color}`}
          title={`Set note color to ${color}`}
        />
      ))}
    </div>
  );
}
