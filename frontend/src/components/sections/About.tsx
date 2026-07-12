import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Code2, BookOpen, Brain, Terminal, ChevronLeft, ChevronRight, ArrowRight, Download } from "lucide-react";
import avatar2 from "@/assets/images/avatar2.jpg";
import avatar3 from "@/assets/images/avatar3.jpg";

const ROLES = [
  "Full-Stack Development.",
  "AI & Machine Learning.",
  "Modern Web Applications.",
  "Scalable Systems.",
];

export default function About() {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);

  // Typing effect rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const AVATAR_IMAGES = [
    "https://github.com/DuwwDuyy.png",
    avatar2,
    avatar3
  ];

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % AVATAR_IMAGES.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + AVATAR_IMAGES.length) % AVATAR_IMAGES.length);
  };

  const STATS = [
    { label: t('about.stats.projects'), value: "3+", icon: <Terminal className="w-5 h-5 text-primary" /> },
    { label: t('about.stats.experience'), value: "1+", icon: <Code2 className="w-5 h-5 text-primary" /> },
    { label: t('about.stats.technologies'), value: "8+", icon: <Brain className="w-5 h-5 text-primary" /> },
    { label: t('about.stats.commits'), value: "500+", icon: <BookOpen className="w-5 h-5 text-primary" /> },
  ];

  const TIMELINE = [
    { year: "2021", title: t('about.timeline.started'), desc: t('about.timeline.startedDesc') },
    { year: "2022", title: t('about.timeline.learning'), desc: t('about.timeline.learningDesc') },
    { year: "2023", title: t('about.timeline.building'), desc: t('about.timeline.buildingDesc') },
    { year: "2024", title: t('about.timeline.graduating'), desc: t('about.timeline.graduatingDesc') },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          {/* Premium Glassmorphism Greeting Card */}
          <div className="relative p-8 md:p-16 rounded-[3rem] bg-gradient-to-b from-white/[0.08] to-transparent border border-white/10 overflow-hidden mb-24 shadow-[0_0_100px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            {/* Background Glows inside card */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Availability Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-10 shadow-lg backdrop-blur-md"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="text-sm font-semibold text-white/90 tracking-wide uppercase">{t('hero.available')}</span>
              </motion.div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-8 leading-[1.1] text-white">
                {t('hero.greeting')}{" "}
                <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-400 to-rose-500 drop-shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                  Đức Duy
                </span>
              </h1>

              {/* Sub headline with Typing Effect */}
              <div className="min-h-[80px] mb-12 max-w-3xl mx-auto">
                <p className="text-lg md:text-2xl font-medium text-white/70 leading-relaxed">
                  {t('hero.subtitle')}{" "}
                  <motion.span
                    key={roleIndex}
                    initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-white font-bold inline-block md:ml-2 drop-shadow-md"
                  >
                    {ROLES[roleIndex]}
                  </motion.span>
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <Link to="/projects">
                  <Button variant="primary" size="lg" magnetic className="group rounded-full px-8 h-14 text-lg border-none bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.4)] text-white">
                    <span className="flex items-center gap-2 font-semibold">
                      {t('hero.viewProjects')}
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>

                <a href="/resume.pdf" target="_blank" rel="noreferrer">
                  <Button variant="secondary" size="lg" magnetic className="group rounded-full px-8 h-14 text-lg bg-white/5 hover:bg-white/10 border-white/10">
                    <span className="flex items-center gap-2 font-semibold text-white">
                      {t('hero.downloadCV')}
                      <Download className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
                    </span>
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Original About Heading */}
          <div className="pt-10">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              {t('about.title')} <span className="text-secondary">{t('about.subtitle')}</span>
            </h2>
            <p className="text-secondary max-w-2xl text-lg">
              {t('about.description')}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Avatar & Stats */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-white/5 group"
              style={{ perspective: 1000 }}
            >
              {/* Gradient background behind the image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-600/20 z-0" />
              
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={AVATAR_IMAGES[currentImageIndex]}
                  alt="Avatar"
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: -90, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover z-10"
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button 
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 hover:bg-black/80 hover:scale-110"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 hover:bg-black/80 hover:scale-110"
              >
                <ChevronRight size={24} />
              </button>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <Card key={i} className="p-4 md:p-6" glow={false}>
                  <div className="flex items-center gap-3 mb-2">
                    {stat.icon}
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                  </div>
                  <p className="text-sm text-secondary font-medium">{stat.label}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Right: Timeline */}
          <div className="lg:col-span-7 relative">
            <div className="absolute left-[27px] top-4 bottom-4 w-[2px] bg-white/10 rounded-full" />
            
            <div className="space-y-12">
              {TIMELINE.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-20"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 w-4 h-4 rounded-full bg-background border-2 border-primary top-1.5 z-10 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
                    <span className="text-sm font-bold text-primary tracking-widest uppercase">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="text-secondary leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
