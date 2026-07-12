import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/Button";
import Spline from '@splinetool/react-spline';

const ROLES = [
  "Full-Stack Development.",
  "AI & Machine Learning.",
  "Modern Web Applications.",
  "Scalable Systems.",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const { t } = useTranslation();

  // Typing effect rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-24 pt-24 bg-[#070039]">
      
      {/* Absolute Fullscreen 3D Spline Background */}
      <div className="absolute inset-0 w-full h-full z-0 cursor-grab active:cursor-grabbing">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <Spline 
            scene="https://prod.spline.design/So3e5VJQpkDgwl9n/scene.splinecode" 
            style={{ width: '100%', height: '100%' }}
          />
        </Suspense>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 pointer-events-auto z-10"
      >
        <span className="text-xs font-medium uppercase tracking-widest">{t('hero.scroll')}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
