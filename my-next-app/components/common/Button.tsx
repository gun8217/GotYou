interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  loading,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-black transition-all active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none rounded-2xl";

  const variants = {
    primary:
      "bg-blue-600 text-white shadow-lg shadow-blue-100 hover:bg-blue-700",
    secondary:
      "bg-slate-900 text-white shadow-lg shadow-slate-200 hover:bg-slate-800",
    outline:
      "border-2 border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
    danger: "bg-red-500 text-white shadow-lg shadow-red-100 hover:bg-red-600",
    ghost: "text-slate-500 hover:bg-slate-100 hover:text-slate-900",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs rounded-xl",
    md: "px-5 py-3 text-sm",
    lg: "px-8 py-4 text-base",
    xl: "px-10 py-5 text-lg rounded-[24px]",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
}
