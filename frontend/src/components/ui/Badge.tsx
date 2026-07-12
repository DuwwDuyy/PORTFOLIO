import React from "react";
import { cn } from "@/utils/cn";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "glow";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-white/10 text-white border border-transparent",
    outline: "bg-transparent text-secondary border border-white/20",
    glow: "bg-primary/20 text-primary border border-primary/30 shadow-[0_0_10px_rgba(59,130,246,0.3)]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
