import { useCallback } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

export default function ParticlesBackground() {
  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <ParticlesProvider init={init}>
      <Particles
        id="tsparticles"
        className="fixed inset-0 -z-20"
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            detectsOn: "window",
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "grab", // techy "connecting" feel
              },
            },
            modes: {
              push: {
                quantity: 3,
              },
              grab: {
                distance: 140,
                links: {
                  opacity: 0.8,
                  color: "#8b5cf6", // Purple grab lines
                },
              },
            },
          },
          particles: {
            color: {
              value: ["#3b82f6", "#8b5cf6", "#06b6d4"], // Tech colors: Blue, Purple, Cyan
            },
            links: {
              color: "#4f46e5", // Indigo links
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: true,
              speed: 0.8, // Slightly slower for elegance
              straight: false,
            },
            number: {
              density: {
                enable: true,
              },
              value: 80, // Increased density for a "neural network" look
            },
            opacity: {
              value: { min: 0.1, max: 0.5 },
              animation: {
                enable: true,
                speed: 1,
                sync: false,
              },
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 2.5 },
              animation: {
                enable: true,
                speed: 2,
                sync: false,
              },
            },
          },
          detectRetina: true,
        }}
      />
    </ParticlesProvider>
  );
}
