import { Link } from "react-router-dom";
import { FaGithub, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-white/10 py-12 relative overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-2 tracking-tighter">
          Đức Duy<span className="text-primary">.</span>
        </h2>
        
        <div className="flex gap-6 mb-10 mt-6">
          <a
            href="https://github.com/DuwwDuyy"
            target="_blank"
            rel="noreferrer"
            className="text-secondary hover:text-white transition-colors"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.instagram.com/_duwwduyy/"
            target="_blank"
            rel="noreferrer"
            className="text-secondary hover:text-white transition-colors"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://www.facebook.com/duwwduyydz?locale=vi_VN"
            target="_blank"
            rel="noreferrer"
            className="text-secondary hover:text-white transition-colors"
          >
            <FaFacebook size={20} />
          </a>
          <a
            href="mailto:contact@duy.dev"
            className="text-secondary hover:text-white transition-colors"
          >
            <HiMail size={20} />
          </a>
        </div>

        <div className="flex gap-8 text-sm font-medium text-secondary/80 mb-10">
          <Link to="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
          <Link to="/experience" className="hover:text-white transition-colors">{t('nav.experience')}</Link>
          <Link to="/blog" className="hover:text-white transition-colors">{t('nav.blog')}</Link>
        </div>

        <p className="text-secondary text-sm text-center">
          &copy; {new Date().getFullYear()} Đức Duy. {t('footer.rights')}.
        </p>
      </div>
    </footer>
  );
}
