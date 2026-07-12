import ProjectsSection from "@/components/sections/Projects";
import { useEffect } from "react";

export default function Projects() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-8 min-h-screen">
      <ProjectsSection />
    </div>
  );
}
