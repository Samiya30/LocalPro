interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "green" | "yellow" | "red" | "gray";
}

function Badge({
  children,
  variant = "blue",
}: BadgeProps) {
  const variants = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-emerald-50 text-emerald-700",
    yellow: "bg-amber-50 text-amber-700",
    red: "bg-red-50 text-red-700",
    gray: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${variants[variant]}`}
    >
      {children}
    </span>
  );
}

export default Badge;