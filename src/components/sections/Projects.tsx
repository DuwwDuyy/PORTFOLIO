import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { PROJECTS_DATA } from "@/data/projects";
import type { Project } from "@/data/projects";
import { useTranslation } from "react-i18next";

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const isEven = index % 2 === 0;
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className="mb-24 last:mb-0"
    >
      <div className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${isEven ? "" : "lg:flex-row-reverse"}`}>
        
        {/* Left: Image/Preview */}
        <div className="w-full lg:w-1/2">
          <Link to={`/projects/${project.id}`}>
            <Card glow className="group relative w-full overflow-hidden p-0 cursor-pointer border-white/10 hover:border-primary/50 transition-colors bg-white/5">
              <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay with View Details */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 bg-black/40 backdrop-blur-sm">
                <span className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  {t('projects.viewCase')} <ArrowRight size={16} />
                </span>
              </div>
            </Card>
          </Link>
        </div>

        {/* Right: Content */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="space-y-2">
            <span className="text-primary font-bold tracking-widest uppercase text-sm">
              {t(`projects.items.${project.id}.role`)}
            </span>
            <h3 className="text-3xl md:text-4xl font-bold">{t(`projects.items.${project.id}.title`)}</h3>
            <p className="text-secondary text-lg leading-relaxed">
              {t(`projects.items.${project.id}.shortDesc`)}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="glow">{tech}</Badge>
            ))}
          </div>

          {/* Highlights */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div>
              <span className="text-white font-semibold">{t('projects.labels.challenge')}:</span>
              <p className="text-secondary text-sm mt-1">{t(`projects.items.${project.id}.challenge`)}</p>
            </div>
            <div>
              <span className="text-white font-semibold">{t('projects.labels.solution')}:</span>
              <p className="text-secondary text-sm mt-1">{t(`projects.items.${project.id}.solution`)}</p>
            </div>
            <div>
              <span className="text-white font-semibold flex items-center gap-2">
                {t('projects.labels.result')} <span className="text-green-400">↑</span>
              </span>
              <p className="text-secondary text-sm mt-1">{t(`projects.items.${project.id}.result`)}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4">
            <Link 
              to={`/projects/${project.id}`}
              className="px-6 py-3 bg-white text-black text-sm font-semibold rounded-full hover:scale-105 active:scale-95 transition-transform"
            >
              {t('projects.detail')}
            </Link>
            
            {project.links.live && (
              <a 
                href={project.links.live} 
                target="_blank" 
                rel="noreferrer"
                className="p-3 bg-white/5 border border-white/10 text-white rounded-full hover:bg-white/10 transition-colors"
                title="Live Demo"
              >
                <ExternalLink size={20} />
              </a>
            )}
            
            {project.links.github && (
              <a 
                href={project.links.github} 
                target="_blank" 
                rel="noreferrer"
                className="p-3 bg-white/5 border border-white/10 text-white rounded-full hover:bg-white/10 transition-colors"
                title="Github Source"
              >
                <FaGithub size={20} />
              </a>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default function Projects() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="projects" className="py-24 relative overflow-hidden" ref={containerRef}>
      {/* Parallax Background Text */}
      <motion.div 
        style={{ y }}
        className="absolute top-1/4 left-0 text-[15vw] font-bold text-white/5 whitespace-nowrap pointer-events-none -z-10 tracking-tighter"
      >
        FEATURED WORK
      </motion.div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            {t('projects.headerTitle')} <span className="text-secondary">{t('projects.headerSubtitle')}</span>
          </h2>
          <p className="text-secondary max-w-2xl text-lg">
            {t('projects.headerDesc')}
          </p>
        </motion.div>

        <div className="flex flex-col">
          {PROJECTS_DATA.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
