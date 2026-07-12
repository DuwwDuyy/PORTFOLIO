import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { FaGithub, FaInstagram, FaFacebook } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

const CONTACT_INFO = [
  {
    icon: <Mail className="text-primary w-5 h-5" />,
    label: "Email",
    value: "duynguyen31052004@gmail.com",
    href: "mailto:[duynguyen31052004@gmail.com]"
  },
  {
    icon: <MapPin className="text-primary w-5 h-5" />,
    label: "Location",
    value: "Ho Chi Minh City, Vietnam",
    href: "#"
  }
];

const SOCIAL_LINKS = [
  { icon: <FaGithub size={24} />, href: "https://github.com/DuwwDuyy", label: "Github" },
  { icon: <FaInstagram size={24} />, href: "https://www.instagram.com/_duwwduyy/", label: "Instagram" },
  { icon: <FaFacebook size={24} />, href: "https://www.facebook.com/duwwduyydz?locale=vi_VN", label: "Facebook" }
];

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-black/20">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] rounded-t-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            {t('contact.headerTitle')} <span className="text-gradient">{t('contact.headerHighlight')}</span>
          </h2>
          <p className="text-secondary max-w-2xl mx-auto text-lg">
            {t('contact.headerDesc')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">{t('contact.infoTitle')}</h3>

            <div className="space-y-6">
              {CONTACT_INFO.map((info, i) => (
                <a key={i} href={info.href} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-colors">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm text-secondary font-medium">{t(`contact.info.${info.label.toLowerCase()}`)}</p>
                    <p className="text-lg text-white font-semibold group-hover:text-primary transition-colors">
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div className="pt-8 border-t border-white/10">
              <h4 className="text-sm font-semibold text-secondary mb-4 uppercase tracking-wider">
                {t('contact.socialTitle')}
              </h4>
              <div className="flex gap-4">
                {SOCIAL_LINKS.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all hover:-translate-y-1"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card glow className="p-8">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-secondary">{t('contact.form.name')}</label>
                    <input
                      type="text"
                      id="name"
                      placeholder={t('contact.form.namePlaceholder')}
                      className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-secondary">{t('contact.form.email')}</label>
                    <input
                      type="email"
                      id="email"
                      placeholder={t('contact.form.emailPlaceholder')}
                      className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-secondary">{t('contact.form.subject')}</label>
                  <input
                    type="text"
                    id="subject"
                    placeholder={t('contact.form.subjectPlaceholder')}
                    className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-secondary">{t('contact.form.message')}</label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder={t('contact.form.messagePlaceholder')}
                    className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  ></textarea>
                </div>

                <Button variant="primary" className="w-full group">
                  <span className="flex items-center gap-2">
                    {t('contact.form.send')}
                    <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                </Button>
              </form>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
