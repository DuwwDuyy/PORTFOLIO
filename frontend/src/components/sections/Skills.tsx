import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Layers, Server, Database, Bot, Wrench, Cloud } from "lucide-react";
import { useTranslation } from "react-i18next";

const SKILL_CATEGORIES = [
  {
    titleKey: "frontend",
    icon: <Layers className="text-primary w-6 h-6" />,
    primary: [
      { name: "React.js / Vite", level: 90 },
      { name: "HTML / CSS", level: 85 },
      { name: "Windows Forms", level: 80 },
    ],
    secondary: ["Chart.js", "Responsive Design", "UI/UX"],
  },
  {
    titleKey: "backend",
    icon: <Server className="text-primary w-6 h-6" />,
    primary: [
      { name: "C# / .NET Framework", level: 90 },
      { name: "Node.js / Express.js", level: 85 },
      { name: "PHP", level: 80 },
    ],
    secondary: ["RESTful APIs", "MVC Architecture", "Entity Framework"],
  },
  {
    titleKey: "database",
    icon: <Database className="text-primary w-6 h-6" />,
    primary: [
      { name: "SQL Server", level: 90 },
      { name: "MySQL", level: 85 },
      { name: "PDO", level: 85 },
    ],
    secondary: ["Database Design", "Stored Procedures", "Optimization"],
  },
  {
    titleKey: "ai",
    icon: <Bot className="text-primary w-6 h-6" />,
    primary: [
      { name: "Ollama (Local LLM)", level: 85 },
      { name: "Qwen2.5", level: 85 },
      { name: "Prompt Engineering", level: 80 },
    ],
    secondary: ["AI Integration", "Offline Processing", "Data Extraction"],
  },
  {
    titleKey: "tools",
    icon: <Wrench className="text-primary w-6 h-6" />,
    primary: [
      { name: "Git / GitHub", level: 90 },
      { name: "Visual Studio", level: 85 },
      { name: "VS Code", level: 90 },
    ],
    secondary: ["Postman", "XAMPP", ".htaccess"],
  },
  {
    titleKey: "architecture",
    icon: <Cloud className="text-primary w-6 h-6" />,
    primary: [
      { name: "MVC Architecture", level: 90 },
      { name: "Clean Architecture", level: 85 },
      { name: "Client-Server", level: 90 },
    ],
    secondary: ["SEO Optimization", "Security (SQLi)", "Performance"],
  },
];

const ProgressBar = ({ name, level }: { name: string; level: number }) => (
  <div className="mb-4">
    <div className="flex justify-between text-sm mb-1">
      <span className="font-medium text-white">{name}</span>
      <span className="text-secondary">{level}%</span>
    </div>
    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="h-full bg-accent-gradient rounded-full"
      />
    </div>
  </div>
);

export default function Skills() {
  const { t } = useTranslation();
  return (
    <section id="skills" className="py-24 relative bg-black/20">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            {t('skills.title')} <span className="text-gradient">{t('skills.subtitle')}</span>
          </h2>
          <p className="text-secondary max-w-2xl mx-auto text-lg">
            {t('skills.desc')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{t(`skills.categories.${category.titleKey}`)}</h3>
                </div>

                {/* Primary Skills Progress */}
                <div className="mb-6 flex-grow">
                  {category.primary.map((skill) => (
                    <ProgressBar key={skill.name} name={skill.name} level={skill.level} />
                  ))}
                </div>

                {/* Secondary Skills Badges */}
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/10">
                  {category.secondary.map((skill) => (
                    <Badge key={skill} variant="outline" className="bg-background">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
