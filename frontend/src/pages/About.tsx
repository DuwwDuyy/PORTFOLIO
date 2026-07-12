import AboutSection from "@/components/sections/About";
import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-8 min-h-screen">
      <AboutSection />
    </div>
  );
}
