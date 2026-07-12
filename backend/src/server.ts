import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PROJECTS_DATA } from './data/projects';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/projects', (req: Request, res: Response) => {
  res.json(PROJECTS_DATA);
});

app.get('/api/projects/:id', (req: Request, res: Response) => {
  const project = PROJECTS_DATA.find(p => p.id === req.params.id);
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
});

// Mock Data for Blogs
const BLOG_POSTS_META = {
  "integrate-ai-winforms": {
    id: "integrate-ai-winforms",
    date: "Oct 12, 2025",
    tags: ["AI", "WinForms", "C#"],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200"
  },
  "sql-server-dashboard": {
    id: "sql-server-dashboard",
    date: "Sep 28, 2025",
    tags: ["SQL Server", "Performance", ".NET"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200"
  },
  "using-ollama-locally": {
    id: "using-ollama-locally",
    date: "Aug 15, 2025",
    tags: ["LLM", "Ollama", "DevOps"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200"
  },
  "clean-architecture": {
    id: "clean-architecture",
    date: "Jul 02, 2025",
    tags: ["Architecture", "C#", "Best Practices"],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200"
  }
};

app.get('/api/blog', (req: Request, res: Response) => {
  res.json(Object.values(BLOG_POSTS_META));
});

app.get('/api/blog/:id', (req: Request, res: Response) => {
  const post = BLOG_POSTS_META[req.params.id as keyof typeof BLOG_POSTS_META];
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: 'Blog post not found' });
  }
});

// Health check
app.get('/', (req: Request, res: Response) => {
  res.send('Portfolio API is running...');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
