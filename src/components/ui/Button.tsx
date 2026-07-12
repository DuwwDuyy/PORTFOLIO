import React, { forwardRef, useRef, useState } from "react";
import type { ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { cn } from "@/utils/cn";

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      magnetic = false,
      children,
      ...props
    },
    ref
  ) => {
    const defaultRef = useRef<HTMLButtonElement>(null);
    const buttonRef = (ref as any) || defaultRef;
    
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!magnetic || !buttonRef.current) return;
      const { clientX, clientY } = e;
      const { height, width, left, top } = buttonRef.current.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      setPosition({ x: middleX * 0.1, y: middleY * 0.1 }); // 10% pull
      if (props.onMouseMove) props.onMouseMove(e);
    };

    const reset = (e: React.MouseEvent<HTMLButtonElement>) => {
      setPosition({ x: 0, y: 0 });
      if (props.onMouseLeave) props.onMouseLeave(e);
    };

    const variants = {
      primary: "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]",
      secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/5",
      outline: "border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary",
      ghost: "text-secondary hover:text-white hover:bg-white/5",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-8 text-base",
      lg: "h-14 px-10 text-lg",
    };

    return (
      <motion.button
        ref={buttonRef}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        className={cn(
          "relative inline-flex items-center justify-center rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
      >
        {children as React.ReactNode}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };
