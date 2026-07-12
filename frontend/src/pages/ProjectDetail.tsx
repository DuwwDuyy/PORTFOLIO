import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, LayoutGrid, Database, Bot, BrainCircuit } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import type { Project } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export default function ProjectDetail() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`http://localhost:5000/api/projects/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.id) setProject(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch project detail:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Project not found</h1>
      </div>
    );
  }

  return (
    <article className="pb-24">
      {/* Project Hero */}
      <header className="relative pt-32 pb-20 px-6 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}${project.image.replace(/^\//, '')}`} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-20 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
        </div>
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <Link 
            to="/#projects" 
            className="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={20} /> {t('projects.labels.back')}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
              {t(`projects.items.${project.id}.role`)}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              {t(`projects.items.${project.id}.title`)}
            </h1>
            <p className="text-xl text-secondary max-w-3xl leading-relaxed mb-8">
              {t(`projects.items.${project.id}.shortDesc`)}
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              {project.techStack.map(tech => (
                <Badge key={tech} variant="glow">{tech}</Badge>
              ))}
            </div>

            <div className="flex gap-4">
              {project.links.live && (
                <a href={project.links.live} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform">
                  {t('projects.labels.liveDemo')} <ExternalLink size={18} />
                </a>
              )}
              {project.links.github && (
                <a href={project.links.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all">
                  {t('projects.labels.sourceCode')} <FaGithub size={18} />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="container mx-auto px-6 max-w-5xl mt-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* Sticky Sidebar */}
        <div className="md:col-span-4 hidden md:block">
          <div className="sticky top-32 space-y-4 text-sm font-medium text-secondary">
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">{t('projects.labels.toc')}</h4>
            <a href="#problem" className="block hover:text-primary transition-colors">{t('projects.labels.problem')}</a>
            <a href="#architecture" className="block hover:text-primary transition-colors">{t('projects.labels.architecture')}</a>
            <a href="#database" className="block hover:text-primary transition-colors">{t('projects.labels.database')}</a>
            <a href="#ai-features" className="block hover:text-primary transition-colors">{t('projects.labels.aiIntegration')}</a>
            <a href="#lessons" className="block hover:text-primary transition-colors">{t('projects.labels.lessons')}</a>
          </div>
        </div>

        {/* Content Body */}
        <div className="md:col-span-8 space-y-16">
          
          <section id="problem">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <LayoutGrid className="text-primary" /> {t('projects.labels.problem')}
            </h2>
            <Card glow={false} className="p-8 prose prose-invert max-w-none">
              <h3 className="text-xl font-semibold mb-2">{t('projects.labels.challenge')}</h3>
              <p className="text-secondary leading-relaxed mb-6">{t(`projects.items.${project.id}.challenge`)}</p>
              
              <h3 className="text-xl font-semibold mb-2">{t('projects.labels.solution')}</h3>
              <p className="text-secondary leading-relaxed">{t(`projects.items.${project.id}.solution`)}</p>
            </Card>
          </section>

          <section id="architecture">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <BrainCircuit className="text-primary" /> {t('projects.labels.architecture')}
            </h2>
            <div className="space-y-6">
              <p className="text-secondary leading-relaxed">
                {t('projects.labels.architectureDesc')}
              </p>
              <div className="aspect-video w-full rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=1200" alt="Architecture Diagram" className="w-full h-full object-cover opacity-60" />
              </div>
            </div>
          </section>

          <section id="database">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Database className="text-primary" /> {t('projects.labels.database')}
            </h2>
            <p className="text-secondary leading-relaxed mb-6">
              {t('projects.labels.databaseDesc')}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <h4 className="font-bold text-white mb-2">{t('projects.labels.coreEntities')}</h4>
                <ul className="text-secondary text-sm space-y-2 list-disc list-inside">
                  <li>{t('projects.labels.coreEntitiesList.1')}</li>
                  <li>{t('projects.labels.coreEntitiesList.2')}</li>
                  <li>{t('projects.labels.coreEntitiesList.3')}</li>
                </ul>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <h4 className="font-bold text-white mb-2">{t('projects.labels.optimization')}</h4>
                <ul className="text-secondary text-sm space-y-2 list-disc list-inside">
                  <li>{t('projects.labels.optimizationList.1')}</li>
                  <li>{t('projects.labels.optimizationList.2')}</li>
                  <li>{t('projects.labels.optimizationList.3')}</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="ai-features">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Bot className="text-primary" /> {t('projects.labels.aiIntegration')}
            </h2>
            <Card glow={false} className="p-8 border-primary/30 bg-primary/5">
              <p className="text-secondary leading-relaxed mb-4">
                {t('projects.labels.aiDesc')}
              </p>
              <div className="p-4 bg-black/50 rounded-lg border border-white/10 font-mono text-sm text-green-400">
                {t('projects.labels.aiDemo.user')}<br/>
                {t('projects.labels.aiDemo.system')}<br/>
                {t('projects.labels.aiDemo.ai')}
              </div>
            </Card>
          </section>

          <section id="lessons">
            <h2 className="text-3xl font-bold mb-6">{t('projects.labels.lessons')}</h2>
            <div className="space-y-4">
              <div className="p-6 border-l-2 border-primary bg-white/5 rounded-r-2xl">
                <p className="text-secondary">
                  <strong className="text-white block mb-1">{t('projects.labels.lessonsTitle1')}</strong>
                  {t('projects.labels.lessonsDesc1')}
                </p>
              </div>
              <div className="p-6 border-l-2 border-primary bg-white/5 rounded-r-2xl">
                <p className="text-secondary">
                  <strong className="text-white block mb-1">{t('projects.labels.lessonsTitle2')}</strong>
                  {t('projects.labels.lessonsDesc2')}
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </article>
  );
}
