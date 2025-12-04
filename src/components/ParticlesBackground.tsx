import { useEffect } from "react";
import "./particles.css"; // <-- we will create this

export const ParticlesBackground = () => {
  useEffect(() => {
    const container = document.getElementById("particles-container");
    if (!container) return;

    const particleCount = 80;

    function createParticle() {
      const particle = document.createElement("div");
      particle.className = "particle";

      const size = Math.random() * 3 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      resetParticle(particle);
      container.appendChild(particle);
      animateParticle(particle);
    }

    function resetParticle(p) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      p.style.left = `${x}%`;
      p.style.top = `${y}%`;
      p.style.opacity = "0";
      return { x, y };
    }

    function animateParticle(p) {
      const pos = resetParticle(p);
      const duration = Math.random() * 10 + 10;

      setTimeout(() => {
        p.style.transition = `all ${duration}s linear`;
        p.style.opacity = `${Math.random() * 0.3 + 0.1}`;

        const moveX = pos.x + (Math.random() * 20 - 10);
        const moveY = pos.y - Math.random() * 30;

        p.style.left = `${moveX}%`;
        p.style.top = `${moveY}%`;

        setTimeout(() => animateParticle(p), duration * 1000);
      }, 100);
    }

    for (let i = 0; i < particleCount; i++) createParticle();

    // MOUSE TRAIL
    const mouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;

      const p = document.createElement("div");
      p.className = "particle";

      const size = Math.random() * 4 + 2;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${x}%`;
      p.style.top = `${y}%`;
      p.style.opacity = "0.7";

      container.appendChild(p);

      setTimeout(() => {
        p.style.transition = "all 2s ease-out";
        p.style.left = `${x + (Math.random() * 10 - 5)}%`;
        p.style.top = `${y + (Math.random() * 10 - 5)}%`;
        p.style.opacity = "0";
        setTimeout(() => p.remove(), 2000);
      }, 10);
    };

    document.addEventListener("mousemove", mouseMove);

    return () => {
      document.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <>
      <div className="grid-overlay" />
      <div id="particles-container" className="particles-container" />
    </>
  );
};
