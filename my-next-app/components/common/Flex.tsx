interface FlexProps {
  children: React.ReactNode;
  direction?: "row" | "col";
  justify?: "start" | "center" | "between" | "end";
  align?: "start" | "center" | "end" | "stretch";
  gap?: number;
  className?: string;
}

export function Flex({
  children,
  direction = "row",
  justify = "start",
  align = "center",
  gap = 4,
  className = "",
}: FlexProps) {
  const justifyStyles = {
    start: "justify-start",
    center: "justify-center",
    between: "justify-between",
    end: "justify-end",
  };

  const alignStyles = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  };

  return (
    <div
      className={`flex ${direction === "col" ? "flex-col" : "flex-row"} ${justifyStyles[justify]} ${alignStyles[align]} gap-${gap} ${className}`}
    >
      {children}
    </div>
  );
}
