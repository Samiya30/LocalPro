import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "small" | "medium" | "large";
}

function Card({
  children,
  padding = "medium",
  className = "",
  ...props
}: CardProps) {
  const paddingClasses = {
    none: "",
    small: "p-4",
    medium: "p-5",
    large: "p-6",
  };

  return (
    <div
      {...props}
      className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${
        paddingClasses[padding]
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;