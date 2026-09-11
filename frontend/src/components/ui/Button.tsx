import type { ButtonHTMLAttributes } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger"
  | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-200",
    secondary:
      "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-200",
    outline:
      "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-200",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-200",
    ghost:
      "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-200",
  };

  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${
        variants[variant]
      } ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;