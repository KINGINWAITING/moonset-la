import { useEffect, useRef, useMemo } from "react";
import { useTheme } from "@/context/ThemeContext";
import { motion, useAnimation } from "framer-motion";

// Helper to generate a random number in a range
const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

// Define a type for our particle
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
}

export const OptimizedBackground = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const controls = useAnimation(); // Animation controls for particles

  // Memoize particles to prevent re-creation on every render unless theme changes
  const particles = useMemo(() => {
    const numParticles = isDark ? 70 : 50; // More particles in dark mode for a denser feel
    return Array.from({ length: numParticles }).map((_, i) => ({
      id: i,
      x: getRandom(0, 100), // vw
      y: getRandom(0, 100), // vh
      size: getRandom(isDark ? 0.5 : 1, isDark ? 2 : 3), // smaller and more subtle in dark mode
      opacity: getRandom(0.1, 0.5),
      color: isDark ? `hsla(${getRandom(180, 300)}, 70%, 70%, ${getRandom(0.3, 0.7)})` // Cool blues, purples, cyans
                   : `hsla(${getRandom(30, 60)}, 90%, 70%, ${getRandom(0.4, 0.8)})`, // Warmer oranges, yellows for light mode
    }));
  }, [isDark]);

  // Animate particles
  useEffect(() => {
    controls.start((i) => ({
      x: `${getRandom(-10, 10)}vw`, // Move within a viewport range
      y: `${getRandom(-10, 10)}vh`,
      opacity: [particles[i].opacity, getRandom(0.1, 0.3), particles[i].opacity], // Fade in/out
      scale: [1, getRandom(1.2, 1.8), 1],
      transition: {
        duration: getRandom(15, 30),
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay: getRandom(0, 5) // Stagger animations
      },
    }));
  }, [controls, particles]);

  // Background color effect
  useEffect(() => {
    document.documentElement.style.backgroundColor = isDark ? '#0A0A10' : '#F0F2F5'; // Dark blue-ish vs. light gray
    document.body.style.backgroundColor = isDark ? '#0A0A10' : '#F0F2F5';
  }, [isDark]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {/* Base animated gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: isDark
            ? [
                "radial-gradient(circle at 10% 20%, hsla(260, 50%, 15%, 1) 0%, hsla(230, 40%, 10%, 1) 90%)",
                "radial-gradient(circle at 90% 80%, hsla(280, 50%, 20%, 1) 0%, hsla(250, 40%, 10%, 1) 90%)",
                "radial-gradient(circle at 50% 50%, hsla(240, 50%, 18%, 1) 0%, hsla(220, 40%, 10%, 1) 90%)",
                "radial-gradient(circle at 10% 20%, hsla(260, 50%, 15%, 1) 0%, hsla(230, 40%, 10%, 1) 90%)",
              ]
            : [
                "radial-gradient(circle at 20% 30%, hsla(210, 60%, 95%, 1) 0%, hsla(200, 50%, 90%, 1) 90%)",
                "radial-gradient(circle at 80% 70%, hsla(190, 60%, 92%, 1) 0%, hsla(220, 50%, 88%, 1) 90%)",
                "radial-gradient(circle at 50% 50%, hsla(200, 60%, 94%, 1) 0%, hsla(210, 50%, 89%, 1) 90%)",
                "radial-gradient(circle at 20% 30%, hsla(210, 60%, 95%, 1) 0%, hsla(200, 50%, 90%, 1) 90%)",
              ],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "linear",
        }}
      />
      
      {/* Subtle Grid Overlay - more refined */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: isDark 
            ? `linear-gradient(rgba(100, 120, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 120, 255, 0.03) 1px, transparent 1px)`
            : `linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)`,
          backgroundSize: '30px 30px', // Smaller grid lines
          opacity: isDark ? 0.5 : 0.7,
        }}
      />

      {/* Particle System */}
      <svg width="100%" height="100%" className="absolute inset-0 z-[-1]">
        <defs>
          {
            particles.map(p => (
              <radialGradient key={`grad-${p.id}`} id={`grad-${p.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={p.color} stopOpacity="0.7" />
                <stop offset="100%" stopColor={p.color} stopOpacity="0" />
              </radialGradient>
            ))
          }
        </defs>
        {particles.map((particle, index) => (
          <motion.circle
            key={particle.id}
            custom={index} // Pass index to useAnimation
            animate={controls}
            cx={`${particle.x}%`}
            cy={`${particle.y}%`}
            r={particle.size}
            fill={`url(#grad-${particle.id})`}
            // opacity is handled by the animation for dynamic fading
          />
        ))}
      </svg>

      {/* Aurora-like soft glow elements - more abstract and blended */}
      <motion.div
        className="absolute inset-0 overflow-hidden z-[-2]"
      >
        {[...Array(isDark ? 3 : 2)].map((_, i) => (
          <motion.div
            key={`aurora-${i}`}
            initial={{ opacity: 0, scale: 1.5}}
            animate={{
              opacity: [0, getRandom(isDark ? 0.1 : 0.05, isDark ? 0.25 : 0.1), 0],
              x: `${getRandom(-30, 30)}vw`,
              y: `${getRandom(-30, 30)}vh`,
              scale: [1.5, getRandom(2, 3), 1.5],
              rotate: [0, getRandom(-20, 20), 0],
            }}
            transition={{
              duration: getRandom(20, 40),
              repeat: Infinity,
              repeatType: "mirror",
              delay: getRandom(0,10),
              ease: "easeInOut",
            }}
            style={{
              position: 'absolute',
              left: `${getRandom(0, 70)}%`, 
              top: `${getRandom(0, 70)}%`,
              width: `${getRandom(300, 700)}px`,
              height: `${getRandom(300, 700)}px`,
              borderRadius: '50%',
              background: isDark 
                ? `radial-gradient(ellipse at center, hsla(${getRandom(200, 300)}, 70%, 30%, ${getRandom(0.1, 0.3)}) 0%, transparent 70%)`
                : `radial-gradient(ellipse at center, hsla(${getRandom(180,240)}, 70%, 80%, ${getRandom(0.1,0.2)}) 0%, transparent 70%)`,
              filter: 'blur(50px)',
            }}
          />
        ))}
      </motion.div>

    </div>
  );
};
