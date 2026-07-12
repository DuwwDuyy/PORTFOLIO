import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Trophy, Award } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { useTranslation } from "react-i18next";

// Keep data arrays only for indices, dates, and non-translatable fields
const EXPERIENCE_DATA = [
  { type: "intern", date: "2024", key: "intern", skills: ["React", "Node.js", "SQL Server"] },
  { type: "project", date: "2023 - 2024", key: "project", skills: ["C#", ".NET", "React", "AI Integration"] }
];

const EDUCATION_DATA = [
  { date: "2021 - Present", key: "uni" }
];

const CERTIFICATES = [
  { key: "se", issuer: "University", year: "2023" },
  { key: "web", issuer: "freeCodeCamp", year: "2023" },
  { key: "react", issuer: "Udemy", year: "2024" },
];

const TimelineItem = ({ data, translationKey, icon: Icon }: any) => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative pl-12 md:pl-16 mb-12 last:mb-0"
    >
      {/* Icon inside Timeline */}
      <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center -translate-x-1/2 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
        <Icon size={18} className="text-primary" />
      </div>

      <Card glow={false} className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
          <div>
            <h3 className="text-2xl font-bold text-white">{t(`journey.${translationKey}.title`)}</h3>
            <p className="text-lg text-primary font-medium">{t(`journey.${translationKey}.org`)}</p>
          </div>
          <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-secondary font-medium whitespace-nowrap">
            {data.date}
          </div>
        </div>
        <p className="text-secondary leading-relaxed mb-4">{t(`journey.${translationKey}.desc`)}</p>
      
      {data.skills && (
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill: string) => (
            <span key={skill} className="text-xs font-medium px-2 py-1 bg-white/5 text-white/70 rounded-md">
              {skill}
            </span>
          ))}
        </div>
      )}
    </Card>
  </motion.div>
  );
};

export default function Experience() {
  const { t } = useTranslation();
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            {t('journey.headerTitle')} <span className="text-gradient">{t('journey.headerSubtitle')}</span>
          </h1>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            {t('journey.headerDesc')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Experience Timeline */}
          <div className="lg:col-span-8 relative">
            {/* Vertical Line */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/10" />

            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-10 flex items-center gap-3 pl-10">
                <Briefcase className="text-primary" /> {t('journey.headers.experience')}
              </h2>
              {EXPERIENCE_DATA.map((exp, i) => (
                <TimelineItem key={i} data={exp} translationKey={`experience.${exp.key}`} icon={Briefcase} />
              ))}
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-10 flex items-center gap-3 pl-10">
                <GraduationCap className="text-primary" /> {t('journey.headers.education')}
              </h2>
              {EDUCATION_DATA.map((edu, i) => (
                <TimelineItem key={i} data={edu} translationKey={`education.${edu.key}`} icon={GraduationCap} />
              ))}
            </div>
          </div>

          {/* Sidebar: Certificates & Achievements */}
          <div className="lg:col-span-4 space-y-10">
            
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Award className="text-primary" /> {t('journey.headers.certificates')}
              </h2>
              <div className="space-y-4">
                {CERTIFICATES.map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors"
                  >
                    <h4 className="font-bold text-white text-lg">{t(`journey.certificates.${cert.key}`)}</h4>
                    <div className="flex justify-between items-center mt-2 text-sm">
                      <span className="text-primary">{cert.issuer}</span>
                      <span className="text-secondary">{cert.year}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Trophy className="text-primary" /> {t('journey.headers.achievements')}
              </h2>
              <Card glow={false} className="p-6">
                <ul className="space-y-4 text-secondary">
                  <li className="flex items-start gap-3">
                    <span className="text-primary">✦</span>
                    <span>{t('journey.achievements.gradProjects')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary">✦</span>
                    <span>{t('journey.achievements.academicStanding')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary">✦</span>
                    <span>{t('journey.achievements.aiLearning')}</span>
                  </li>
                </ul>
              </Card>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
}
