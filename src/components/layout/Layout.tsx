import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Lenis from "lenis";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CustomCursor from "../ui/CustomCursor";
import AIChatbot from "../chatbot/AIChatbot";
import ParticlesBackground from "../ui/ParticlesBackground";

export default function Layout() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-like ease
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col selection:bg-primary/30 selection:text-white">
      <ParticlesBackground />
      <CustomCursor />
      <Navbar />
      <main className="flex-grow pt-24 z-10">
        <Outlet />
      </main>
      <Footer />
      <AIChatbot />
    </div>
  );
}
