import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { ScrollOptimizer } from "./scroll-optimizer";
import { useState, useEffect, useRef } from 'react';

interface CosmicBackgroundProps {
  intensity?: 'subtle' | 'medium' | 'vibrant';
  showOrbs?: boolean;
  showParticles?: boolean;
  showGrid?: boolean;
  showScanning?: boolean;
  className?: string;
  optimizeForScroll?: boolean;
}

const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

export const CosmicBackground = ({ 
  intensity = 'subtle',
  showOrbs = true,
  showParticles = true,
  showGrid = true,
  showScanning = false,
  className = "",
  optimizeForScroll = true
}: CosmicBackgroundProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const prefersReducedMotion = useReducedMotion();
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  // Intensity multipliers with reduced particle counts for better performance
  const intensityMap = {
    subtle: { opacity: 0.15, particles: 2 },
    medium: { opacity: 0.3, particles: 3 },
    vibrant: { opacity: 0.6, particles: 4 }
  };
  
  const config = intensityMap[intensity];

  // Disable animations when component is far from viewport
  useEffect(() => {
    if (!optimizeForScroll || !backgroundRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Only animate when visible and not too far away
        setShouldAnimate(entries[0]?.isIntersecting || false);
      },
      { rootMargin: '100px' }
    );
    
    observer.observe(backgroundRef.current);
    
    return () => {
      if (backgroundRef.current) {
        observer.unobserve(backgroundRef.current);
      }
    };
  }, [optimizeForScroll]);

  // Skip animations for accessibility or when optimization needed
  if (prefersReducedMotion || !shouldAnimate) {
    return (
      <div 
        ref={backgroundRef}
        className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
        style={{
          background: isDark 
            ? `radial-gradient(ellipse at 50% 50%, rgba(120, 90, 230, ${config.opacity * 0.4}) 0%, transparent 70%)`
            : `radial-gradient(ellipse at 50% 50%, rgba(80, 120, 230, ${config.opacity * 0.3}) 0%, transparent 70%)`
        }}
      />
    );
  }
  
  // Use our scroll optimizer to improve performance
  const content = (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}>
      {/* Cosmic Gradient Orbs - Reduced count and simplified animations */}
      {showOrbs && (
        <div className="absolute inset-0">
          {[...Array(Math.min(2, 2))].map((_, i) => (
            <motion.div
              key={`cosmic-orb-${i}`}
              initial={{ 
                opacity: 0,
                x: `${-10 + i * 60}%`,
                y: `${30 + i * 20}%`,
              }}
              animate={{
                opacity: [0, config.opacity * (isDark ? 1 : 0.7), 0],
                x: [`${-10 + i * 60}%`, `${0 + i * 60}%`, `${-10 + i * 60}%`],
                y: [`${30 + i * 20}%`, `${20 + i * 20}%`, `${30 + i * 20}%`],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20 + i * 8,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: i * 5,
              }}
              className="absolute z-0"
              style={{
                width: `${150 + i * 80}px`,
                height: `${150 + i * 80}px`,
                borderRadius: '50%',
                background: isDark 
                  ? `radial-gradient(circle, hsla(${200 + i * 40}, 70%, 60%, ${config.opacity}) 0%, transparent 70%)`
                  : `radial-gradient(circle, hsla(${180 + i * 30}, 60%, 70%, ${config.opacity * 0.6}) 0%, transparent 70%)`,
                filter: 'blur(30px)',
                willChange: 'transform, opacity',
              }}
            />
          ))}
        </div>
      )}

      {/* Floating Cosmic Particles - Reduced count for performance */}
      {showParticles && (
        <div className="absolute inset-0" style={{ willChange: 'contents' }}>
          {[...Array(config.particles)].map((_, i) => (
            <motion.div
              key={`cosmic-particle-${i}`}
              initial={{ 
                opacity: 0,
                x: `${getRandom(-20, 120)}vw`,
                y: `${getRandom(-10, 110)}vh`,
                rotate: getRandom(0, 360),
              }}
              animate={{
                opacity: [0, config.opacity * (isDark ? 0.8 : 0.6), 0],
                x: [`${getRandom(-20, 120)}vw`, `${getRandom(-20, 120)}vw`],
                y: [`${getRandom(-10, 110)}vh`, `${getRandom(-10, 110)}vh`],
                rotate: [getRandom(0, 360), getRandom(0, 360) + 360],
              }}
              transition={{
                duration: getRandom(25, 40),
                repeat: Infinity,
                repeatType: "mirror",
                ease: "linear",
                delay: getRandom(0, 15),
              }}
              className="absolute z-0"
              style={{
                width: `${getRandom(1, 3)}px`,
                height: `${getRandom(1, 3)}px`,
                background: isDark 
                  ? `hsla(${getRandom(180, 320)}, 80%, 70%, ${config.opacity})`
                  : `hsla(${getRandom(200, 260)}, 70%, 60%, ${config.opacity * 0.7})`,
                borderRadius: i % 2 === 0 ? '50%' : '1px',
                boxShadow: isDark 
                  ? `0 0 ${getRandom(8, 16)}px hsla(${getRandom(180, 320)}, 80%, 70%, ${config.opacity * 0.5})`
                  : `0 0 ${getRandom(6, 12)}px hsla(${getRandom(200, 260)}, 70%, 60%, ${config.opacity * 0.4})`,
                willChange: 'transform, opacity',
              }}
            />
          ))}
        </div>
      )}

      {/* Subtle Grid Pattern - Using CSS background where possible */}
      {showGrid && (
        <div 
          className="absolute inset-0 z-0 w-full h-full"
          style={{
            background: isDark
              ? `linear-gradient(45deg, transparent 40%, hsla(220, 100%, 80%, ${config.opacity * 0.1}) 50%, transparent 60%),
                 linear-gradient(-45deg, transparent 40%, hsla(280, 100%, 80%, ${config.opacity * 0.1}) 50%, transparent 60%)`
              : `linear-gradient(45deg, transparent 40%, hsla(210, 80%, 60%, ${config.opacity * 0.08}) 50%, transparent 60%),
                 linear-gradient(-45deg, transparent 40%, hsla(190, 80%, 60%, ${config.opacity * 0.08}) 50%, transparent 60%)`,
            backgroundSize: '300px 300px, 300px 300px',
            opacity: 0.4,
          }}
        />
      )}

      {/* Scanning Effect - Simplified to reduce GPU usage */}
      {showScanning && (
        <motion.div
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ 
            x: ['100%', '-100%'],
            opacity: [0, config.opacity * (isDark ? 0.6 : 0.4), 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute inset-0 z-0"
          style={{
            background: isDark
              ? `linear-gradient(90deg, transparent, hsla(200, 100%, 80%, ${config.opacity * 0.2}), transparent)`
              : `linear-gradient(90deg, transparent, hsla(220, 80%, 70%, ${config.opacity * 0.15}), transparent)`,
            width: '200%',
            height: '100%',
            willChange: 'transform, opacity',
          }}
        />
      )}
    </div>
  );
  
  return optimizeForScroll ? (
    <ScrollOptimizer disableWhenScrolling={true} pauseTimeout={100}>
      <div ref={backgroundRef}>
        {content}
      </div>
    </ScrollOptimizer>
  ) : (
    <div ref={backgroundRef}>
      {content}
    </div>
  );
}; 