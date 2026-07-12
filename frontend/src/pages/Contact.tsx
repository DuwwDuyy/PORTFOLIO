import ContactSection from "@/components/sections/Contact";
import { useEffect } from "react";

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-8 min-h-screen flex flex-col">
      <div className="flex-1">
        <ContactSection />
      </div>
    </div>
  );
}
