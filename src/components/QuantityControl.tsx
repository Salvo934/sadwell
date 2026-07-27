type QuantityControlProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  variant?: "dark" | "light";
  compact?: boolean;
};

export function QuantityControl({
  value,
  onChange,
  min = 1,
  max = 10,
  variant = "light",
  compact = false,
}: QuantityControlProps) {
  const isDark = variant === "dark";

  function decrement() {
    if (value > min) onChange(value - 1);
  }

  function increment() {
    if (value < max) onChange(value + 1);
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border ${
        compact ? "h-8" : "h-9"
      } ${
        isDark
          ? "border-white/20 bg-white/5"
          : "border-border bg-background"
      }`}
      role="group"
      aria-label="Quantità"
    >
      <button
        type="button"
        onClick={decrement}
        disabled={value <= min}
        aria-label="Diminuisci quantità"
        className={`flex items-center justify-center rounded-full font-sans font-medium transition-colors disabled:opacity-30 ${
          compact ? "h-8 w-8 text-sm" : "h-9 w-9 text-base"
        } ${
          isDark
            ? "text-white hover:bg-white/10"
            : "text-foreground hover:bg-foreground/5"
        }`}
      >
        −
      </button>
      <span
        className={`min-w-8 text-center font-sans font-medium tabular-nums ${
          compact ? "text-xs" : "text-sm"
        } ${isDark ? "text-white" : "text-foreground"}`}
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={increment}
        disabled={value >= max}
        aria-label="Aumenta quantità"
        className={`flex items-center justify-center rounded-full font-sans font-medium transition-colors disabled:opacity-30 ${
          compact ? "h-8 w-8 text-sm" : "h-9 w-9 text-base"
        } ${
          isDark
            ? "text-white hover:bg-white/10"
            : "text-foreground hover:bg-foreground/5"
        }`}
      >
        +
      </button>
    </div>
  );
}
