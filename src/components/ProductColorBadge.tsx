type ProductColorBadgeProps = {
  name: string;
  swatch: string;
  variant?: "dark" | "light";
  size?: "sm" | "md";
};

export function ProductColorBadge({
  name,
  swatch,
  variant = "light",
  size = "md",
}: ProductColorBadgeProps) {
  const isDark = variant === "dark";
  const isLightSwatch = swatch.toLowerCase() === "#f2f0ec" || swatch.toLowerCase() === "#f4f2ee" || swatch.toLowerCase() === "#ffffff";

  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={`shrink-0 rounded-full border ${
          size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"
        } ${
          isLightSwatch
            ? "border-black/15"
            : isDark
              ? "border-white/20"
              : "border-border"
        }`}
        style={{ backgroundColor: swatch }}
        aria-hidden
      />
      <span
        className={`type-label ${
          size === "sm" ? "text-[10px]" : "text-xs"
        } ${isDark ? "text-white/55" : "text-muted"}`}
      >
        {name}
      </span>
    </span>
  );
}
