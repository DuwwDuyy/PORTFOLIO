import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

export default function Blog() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/blog')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch blogs:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            {t('blog.headerTitle')} <span className="text-gradient">{t('blog.headerHighlight')}</span>
          </h1>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            {t('blog.headerDesc')}
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/blog/${post.id}`}>
                <Card glow className="h-full flex flex-col p-0 overflow-hidden group cursor-pointer border-white/10 hover:border-primary/50 transition-colors">
                  
                  {/* Thumbnail */}
                  <div className="relative h-60 w-full overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={t(`blog.items.${post.id}.title`)} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow relative z-10 -mt-12 bg-card">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag: string) => (
                        <Badge key={tag} variant="default">{tag}</Badge>
                      ))}
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                      {t(`blog.items.${post.id}.title`)}
                    </h2>
                    
                    <p className="text-secondary mb-6 flex-grow">
                      {t(`blog.items.${post.id}.excerpt`)}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-secondary/70 pt-4 border-t border-white/10 mt-auto">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
                        <span className="flex items-center gap-1.5"><Clock size={14} /> {t(`blog.items.${post.id}.readTime`)}</span>
                      </div>
                      <span className="text-primary group-hover:translate-x-1 transition-transform">
                        <ArrowRight size={18} />
                      </span>
                    </div>
                  </div>
                  
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
}
