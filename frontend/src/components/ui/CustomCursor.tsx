import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring config for the trailing ring
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check parent elements for 'a' or 'button' tags accurately
      const isClickable = !!target.closest('a') || !!target.closest('button') || window.getComputedStyle(target).cursor === "pointer";
      
      if (isClickable) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  // Don't show custom cursor on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* 1. Core Dot (Exact tracking, glowing blue) */}
      <motion.div
        className="fixed top-0 left-0 z-[100] w-2.5 h-2.5 rounded-full pointer-events-none hidden md:block bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* 2. Trailing Tech Ring (Spring physics, tech aura) */}
      <motion.div
        className="fixed top-0 left-0 z-[99] rounded-full pointer-events-none hidden md:flex items-center justify-center border border-blue-400/40 shadow-[0_0_20px_rgba(59,130,246,0.2)] backdrop-blur-[2px]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: isHovering ? 64 : 40,
          height: isHovering ? 64 : 40,
          backgroundColor: isHovering ? "rgba(59, 130, 246, 0.15)" : "rgba(0, 0, 0, 0)",
          borderColor: isHovering ? "rgba(59, 130, 246, 0.8)" : "rgba(59, 130, 246, 0.4)",
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Inner crosshair / focus dot that appears on hover */}
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: isHovering ? 1 : 0,
            scale: isHovering ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="w-1.5 h-1.5 bg-blue-300 rounded-full shadow-[0_0_8px_#93c5fd]"
        />
      </motion.div>
    </>
  );
}
