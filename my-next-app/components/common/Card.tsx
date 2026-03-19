interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
}

export function Card({ children, className = "", padding = "md" }: CardProps) {
  const paddings = {
    none: "p-0",
    sm: "p-4",
    md: "p-8",
    lg: "p-12",
  };

  return (
    <div
      className={`bg-white rounded-[32px] border border-slate-100 shadow-sm ${paddings[padding]} ${className}`}
    >
      {children}
    </div>
  );
}
