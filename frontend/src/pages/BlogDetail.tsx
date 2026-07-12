import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function BlogDetail() {
  const { id } = useParams();
  const { t } = useTranslation();
  
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`http://localhost:5000/api/blog/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.id) setMeta(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch blog post:', err);
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

  if (!meta) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Article not found</h1>
      </div>
    );
  }

  return (
    <article className="pb-24">
      {/* Blog Hero */}
      <header className="relative pt-32 pb-20 px-6 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={meta.image} 
            alt="Blog Cover" 
            className="w-full h-full object-cover opacity-20 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
        </div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={20} /> {t('blog.detail.back')}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap gap-2 mb-6">
              {meta.tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1 bg-white/10 text-white text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              {t(`blog.items.${id}.title`)}
            </h1>
            
            <p className="text-xl text-secondary leading-relaxed mb-8">
              {t(`blog.items.${id}.excerpt`)}
            </p>

            <div className="flex items-center gap-6 text-sm text-secondary">
              <span className="flex items-center gap-2"><Calendar size={16} /> {meta.date}</span>
              <span className="flex items-center gap-2"><Clock size={16} /> {t(`blog.items.${id}.readTime`)}</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 max-w-4xl mt-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
            <h2 className="text-2xl font-bold mb-4">{t('blog.detail.contentSoon')}</h2>
            <p className="text-secondary">
              {t('blog.detail.contentPlaceholder')}
            </p>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
