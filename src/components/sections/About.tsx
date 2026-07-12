import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Card } from "../ui/Card";
import { Code2, BookOpen, Brain, Terminal, ChevronLeft, ChevronRight } from "lucide-react";
import avatar2 from "@/assets/images/avatar2.jpg";
import avatar3 from "@/assets/images/avatar3.jpg";

export default function About() {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            {t('about.title')} <span className="text-secondary">{t('about.subtitle')}</span>
          </h2>
          <p className="text-secondary max-w-2xl text-lg">
            {t('about.description')}
          </p>
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
