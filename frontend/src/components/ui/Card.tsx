import React, { useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
  glow?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glow = true, children, ...props }, ref) => {
    const defaultRef = useRef<HTMLDivElement>(null);
    const cardRef = (ref as any) || defaultRef;
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      // also call props.onMouseMove if provided
      if (props.onMouseMove) {
        props.onMouseMove(e);
      }
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      setIsHovering(true);
      if (props.onMouseEnter) props.onMouseEnter(e);
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      setIsHovering(false);
      if (props.onMouseLeave) props.onMouseLeave(e);
    }

    return (
      <motion.div
        ref={cardRef}
        className={cn(
          "relative rounded-3xl border border-white/10 bg-card overflow-hidden",
          className
        )}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        {...props}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Hover Glow Effect */}
        {glow && isHovering && (
          <div
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
              opacity: isHovering ? 1 : 0,
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`,
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10 p-6 md:p-8 h-full">
          {children as React.ReactNode}
        </div>
      </motion.div>
    );
  }
);
Card.displayName = "Card";
