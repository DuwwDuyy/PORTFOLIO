import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Link } from "react-router-dom";

const BLOG_POSTS = [
  {
    id: "integrate-ai-winforms",
    title: "How I integrated AI into a legacy WinForms App",
    excerpt: "Modernizing a legacy desktop application by embedding a local LLM using Ollama, reducing server costs and ensuring data privacy.",
    date: "Oct 12, 2025",
    readTime: "8 min read",
    tags: ["AI", "WinForms", "C#"],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "sql-server-dashboard",
    title: "Building Real-time Dashboards with SQL Server",
    excerpt: "Exploring advanced SQL Server optimization techniques, materialized views, and SignalR for real-time data streaming.",
    date: "Sep 28, 2025",
    readTime: "6 min read",
    tags: ["SQL Server", "Performance", ".NET"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "using-ollama-locally",
    title: "A Complete Guide to Using Ollama Locally",
    excerpt: "Step-by-step guide on how to run Llama 3 and Mistral locally on your machine for personal projects without paying API fees.",
    date: "Aug 15, 2025",
    readTime: "10 min read",
    tags: ["LLM", "Ollama", "DevOps"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "clean-architecture",
    title: "Why Clean Architecture Still Matters in 2025",
    excerpt: "A deep dive into separating concerns, dependency injection, and why putting everything in one massive controller is a bad idea.",
    date: "Jul 02, 2025",
    readTime: "12 min read",
    tags: ["Architecture", "C#", "Best Practices"],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800"
  }
];

export default function Blog() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Thoughts & <span className="text-gradient">Writings</span>
          </h1>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            I write about software engineering, artificial intelligence, and my journey of building products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post, index) => (
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
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow relative z-10 -mt-12 bg-card">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <Badge key={tag} variant="default">{tag}</Badge>
                      ))}
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-secondary mb-6 flex-grow">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-secondary/70 pt-4 border-t border-white/10 mt-auto">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
                        <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime}</span>
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

      </div>
    </div>
  );
}
