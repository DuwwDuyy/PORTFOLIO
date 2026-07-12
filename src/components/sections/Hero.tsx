import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/Button";
import avatar1 from "../../assets/images/avatar2.jpg";
import avatar2 from "../../assets/images/avatar3.jpg";

const AVATARS = [avatar1, avatar2];

const ROLES = [
  "Full-Stack Development.",
  "AI & Machine Learning.",
  "Modern Web Applications.",
  "Scalable Systems.",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [avatarIndex, setAvatarIndex] = useState(0);
  const { t } = useTranslation();

  // Typing effect rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Avatar rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setAvatarIndex((prev) => (prev + 1) % AVATARS.length);
    }, 2000); // Change avatar every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-24 pt-24">
      {/* Background Animated Gradient / Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] -z-10 animate-pulse-slow" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] -z-10" />

      {/* Grid Pattern (Vercel style) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-secondary">{t('hero.available')}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-7xl font-extrabold tracking-tighter mb-6 leading-tight"
            >
              {t('hero.greeting')}{" "}
              <span className="text-gradient block mt-2">Đức Duy</span>
            </motion.h1>

            {/* Sub headline with Typing Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="h-28 md:h-24 mb-6"
            >
              <p className="text-xl md:text-2xl font-medium text-secondary leading-relaxed">
                {t('hero.subtitle')}{" "}
                <br className="hidden lg:block" />
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 inline-block font-bold"
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6"
            >
              <Link to="/projects">
                <Button variant="primary" size="lg" magnetic className="group">
                  <span className="flex items-center gap-2">
                    {t('hero.viewProjects')}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
              
              <a href="/resume.pdf" target="_blank" rel="noreferrer">
                <Button variant="secondary" size="lg" magnetic className="group">
                  <span className="flex items-center gap-2">
                    {t('hero.downloadCV')}
                    <Download className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
                  </span>
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Avatar (iPhone Mockup) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden lg:flex w-full items-center justify-center relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 rounded-[3rem] blur-[100px] -z-10" />
            
            {/* iPhone Frame */}
            <div className="relative w-[340px] h-[680px] xl:w-[380px] xl:h-[760px] rounded-[3.5rem] bg-gray-950 border-[10px] border-gray-950 shadow-2xl shadow-purple-500/30 ring-1 ring-white/10 mx-auto">
              {/* Dynamic Island */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[110px] h-[30px] bg-gray-950 rounded-full z-20 flex justify-end items-center px-3 shadow-inner ring-1 ring-white/5">
                <div className="w-3 h-3 rounded-full bg-blue-900/30 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50"></div>
                </div>
              </div>
              
              {/* Screen */}
              <div className="relative w-full h-full rounded-[2.8rem] overflow-hidden bg-gray-900 flex items-center justify-center">
                <AnimatePresence>
                  {/* Blurred Background Layer to fill empty space */}
                  <motion.img 
                    key={`bg-${avatarIndex}`}
                    src={AVATARS[avatarIndex]} 
                    alt="" 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110" 
                    aria-hidden="true"
                  />
                  {/* Foreground Image - Scaled to fit perfectly */}
                  <motion.img 
                    key={avatarIndex}
                    src={AVATARS[avatarIndex]} 
                    alt="Avatar" 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl" 
                  />
                </AnimatePresence>
              </div>

              {/* Side Buttons */}
              {/* Mute switch */}
              <div className="absolute -left-[13px] top-[120px] w-[3px] h-[28px] bg-gray-800 rounded-l-md"></div>
              {/* Volume up */}
              <div className="absolute -left-[13px] top-[170px] w-[3px] h-[55px] bg-gray-800 rounded-l-md"></div>
              {/* Volume down */}
              <div className="absolute -left-[13px] top-[235px] w-[3px] h-[55px] bg-gray-800 rounded-l-md"></div>
              {/* Power button */}
              <div className="absolute -right-[13px] top-[190px] w-[3px] h-[85px] bg-gray-800 rounded-r-md"></div>
            </div>
          </motion.div>
          
          {/* Scroll Down Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-secondary/50"
          >
            <span className="text-xs font-medium uppercase tracking-widest">{t('hero.scroll')}</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-[1px] h-12 bg-gradient-to-b from-secondary/50 to-transparent"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
