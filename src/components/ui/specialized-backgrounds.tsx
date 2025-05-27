import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useState, useEffect, useRef } from 'react';

const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

interface BackgroundProps {
  intensity?: 'subtle' | 'medium' | 'vibrant';
  className?: string;
}

// Hero Background - Dynamic geometric shapes and particles
export const HeroBackground = ({ intensity = 'medium', className = '' }: BackgroundProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const prefersReducedMotion = useReducedMotion();
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  const intensityMap = {
    subtle: { opacity: isDark ? 0.3 : 0.2, shapes: 3, particles: 8 },
    medium: { opacity: isDark ? 0.6 : 0.4, shapes: 5, particles: 12 },
    vibrant: { opacity: isDark ? 0.9 : 0.7, shapes: 7, particles: 16 }
  };
  
  const config = intensityMap[intensity];

  useEffect(() => {
    if (!backgroundRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setShouldAnimate(entries[0]?.isIntersecting || false);
      },
      { rootMargin: '50px' }
    );
    
    observer.observe(backgroundRef.current);
    
    return () => {
      if (backgroundRef.current) {
        observer.unobserve(backgroundRef.current);
      }
    };
  }, []);

  if (prefersReducedMotion || !shouldAnimate) {
    return (
      <div 
        ref={backgroundRef}
        className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
        style={{
          background: isDark 
            ? `radial-gradient(ellipse at 30% 70%, rgba(139, 69, 255, ${config.opacity * 0.3}) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(236, 72, 153, ${config.opacity * 0.2}) 0%, transparent 50%)`
            : `radial-gradient(ellipse at 30% 70%, rgba(59, 130, 246, ${config.opacity * 0.2}) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(147, 51, 234, ${config.opacity * 0.15}) 0%, transparent 50%)`
        }}
      />
    );
  }

  return (
    <div ref={backgroundRef} className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}>
      {/* Dynamic Gradient Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, config.opacity * 0.4, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="absolute inset-0"
        style={{
          background: isDark 
            ? `radial-gradient(ellipse at 30% 70%, rgba(139, 69, 255, 0.4) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)`
            : `radial-gradient(ellipse at 30% 70%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)`,
        }}
      />

      {/* Floating Geometric Shapes */}
      {[...Array(config.shapes)].map((_, i) => {
        const shapeTypes = ['circle', 'square', 'triangle', 'hexagon', 'diamond'];
        const shapeType = shapeTypes[i % shapeTypes.length];
        const size = getRandom(40, 120);
        
        return (
          <motion.div
            key={`hero-shape-${i}`}
            initial={{ 
              opacity: 0,
              x: `${getRandom(-10, 110)}%`,
              y: `${getRandom(-10, 110)}%`,
              rotate: getRandom(0, 360),
            }}
            animate={{
              opacity: [0, config.opacity * 0.6, 0],
              x: [`${getRandom(-10, 110)}%`, `${getRandom(-10, 110)}%`],
              y: [`${getRandom(-10, 110)}%`, `${getRandom(-10, 110)}%`],
              rotate: [getRandom(0, 360), getRandom(0, 360) + 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: getRandom(15, 25),
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: i * 2,
            }}
            className="absolute z-0"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              background: isDark 
                ? `linear-gradient(135deg, hsla(${240 + i * 30}, 80%, 70%, ${config.opacity * 0.3}) 0%, hsla(${270 + i * 20}, 90%, 80%, ${config.opacity * 0.2}) 100%)`
                : `linear-gradient(135deg, hsla(${210 + i * 20}, 70%, 80%, ${config.opacity * 0.2}) 0%, hsla(${240 + i * 15}, 80%, 85%, ${config.opacity * 0.15}) 100%)`,
              borderRadius: shapeType === 'circle' ? '50%' : shapeType === 'square' ? '8px' : '0',
              clipPath: shapeType === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' :
                       shapeType === 'hexagon' ? 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)' :
                       shapeType === 'diamond' ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' : 'none',
              filter: 'blur(1px)',
              willChange: 'transform, opacity',
            }}
          />
        );
      })}

      {/* Dynamic Particles */}
      {[...Array(config.particles)].map((_, i) => (
        <motion.div
          key={`hero-particle-${i}`}
          initial={{ 
            opacity: 0,
            x: `${getRandom(-20, 120)}%`,
            y: `${getRandom(-20, 120)}%`,
          }}
          animate={{
            opacity: [0, config.opacity * 0.8, 0],
            x: [`${getRandom(-20, 120)}%`, `${getRandom(-20, 120)}%`],
            y: [`${getRandom(-20, 120)}%`, `${getRandom(-20, 120)}%`],
            scale: [0, getRandom(1, 2), 0],
          }}
          transition={{
            duration: getRandom(8, 16),
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: getRandom(0, 10),
          }}
          className="absolute z-0"
          style={{
            width: `${getRandom(2, 6)}px`,
            height: `${getRandom(2, 6)}px`,
            background: isDark 
              ? `hsla(${getRandom(240, 320)}, 90%, 80%, ${config.opacity * 0.8})`
              : `hsla(${getRandom(200, 280)}, 80%, 70%, ${config.opacity * 0.6})`,
            borderRadius: '50%',
            boxShadow: isDark 
              ? `0 0 ${getRandom(10, 20)}px hsla(${getRandom(240, 320)}, 90%, 80%, ${config.opacity * 0.6})`
              : `0 0 ${getRandom(8, 16)}px hsla(${getRandom(200, 280)}, 80%, 70%, ${config.opacity * 0.4})`,
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* Animated Grid Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, config.opacity * 0.1, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: isDark
            ? `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`
            : `linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  );
};

// Research Background - Scientific data visualization theme
export const ResearchBackground = ({ intensity = 'medium', className = '' }: BackgroundProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const prefersReducedMotion = useReducedMotion();
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  const intensityMap = {
    subtle: { opacity: isDark ? 0.4 : 0.3, nodes: 6, connections: 8 },
    medium: { opacity: isDark ? 0.7 : 0.5, nodes: 8, connections: 12 },
    vibrant: { opacity: isDark ? 1.0 : 0.8, nodes: 10, connections: 16 }
  };
  
  const config = intensityMap[intensity];

  useEffect(() => {
    if (!backgroundRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setShouldAnimate(entries[0]?.isIntersecting || false);
      },
      { rootMargin: '50px' }
    );
    
    observer.observe(backgroundRef.current);
    
    return () => {
      if (backgroundRef.current) {
        observer.unobserve(backgroundRef.current);
      }
    };
  }, []);

  if (prefersReducedMotion || !shouldAnimate) {
    return (
      <div 
        ref={backgroundRef}
        className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
        style={{
          background: isDark 
            ? `linear-gradient(135deg, rgba(16, 185, 129, ${config.opacity * 0.1}) 0%, rgba(59, 130, 246, ${config.opacity * 0.1}) 100%)`
            : `linear-gradient(135deg, rgba(34, 197, 94, ${config.opacity * 0.08}) 0%, rgba(59, 130, 246, ${config.opacity * 0.08}) 100%)`
        }}
      />
    );
  }

  return (
    <div ref={backgroundRef} className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}>
      {/* Data Visualization Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, config.opacity * 0.3, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="absolute inset-0"
        style={{
          background: isDark 
            ? `linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(59, 130, 246, 0.1) 100%)`
            : `linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.08) 100%)`,
        }}
      />

      {/* Network Nodes */}
      {[...Array(config.nodes)].map((_, i) => (
        <motion.div
          key={`research-node-${i}`}
          initial={{ 
            opacity: 0,
            x: `${getRandom(10, 90)}%`,
            y: `${getRandom(10, 90)}%`,
            scale: 0,
          }}
          animate={{
            opacity: [0, config.opacity * 0.7, 0],
            scale: [0, getRandom(0.5, 1.5), 0],
          }}
          transition={{
            duration: getRandom(6, 12),
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: i * 0.8,
          }}
          className="absolute z-0"
          style={{
            width: `${getRandom(8, 16)}px`,
            height: `${getRandom(8, 16)}px`,
            background: isDark 
              ? `radial-gradient(circle, hsla(${160 + i * 15}, 80%, 70%, ${config.opacity * 0.8}) 0%, transparent 70%)`
              : `radial-gradient(circle, hsla(${140 + i * 10}, 70%, 60%, ${config.opacity * 0.6}) 0%, transparent 70%)`,
            borderRadius: '50%',
            boxShadow: isDark 
              ? `0 0 ${getRandom(15, 25)}px hsla(${160 + i * 15}, 80%, 70%, ${config.opacity * 0.4})`
              : `0 0 ${getRandom(12, 20)}px hsla(${140 + i * 10}, 70%, 60%, ${config.opacity * 0.3})`,
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* Connecting Lines */}
      {[...Array(config.connections)].map((_, i) => (
        <motion.div
          key={`research-connection-${i}`}
          initial={{ 
            opacity: 0,
            scaleX: 0,
          }}
          animate={{
            opacity: [0, config.opacity * 0.5, 0],
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: getRandom(4, 8),
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: i * 0.5,
          }}
          className="absolute z-0"
          style={{
            left: `${getRandom(10, 80)}%`,
            top: `${getRandom(20, 80)}%`,
            width: `${getRandom(50, 200)}px`,
            height: '1px',
            background: isDark 
              ? `linear-gradient(90deg, transparent, hsla(180, 70%, 70%, ${config.opacity * 0.6}), transparent)`
              : `linear-gradient(90deg, transparent, hsla(160, 60%, 50%, ${config.opacity * 0.4}), transparent)`,
            transformOrigin: 'left center',
            transform: `rotate(${getRandom(-45, 45)}deg)`,
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* Scanning Lines */}
      <motion.div
        initial={{ x: '-100%', opacity: 0 }}
        animate={{ 
          x: ['100%', '-100%'],
          opacity: [0, config.opacity * 0.4, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute inset-0 z-0"
        style={{
          background: isDark
            ? `linear-gradient(90deg, transparent, hsla(180, 100%, 80%, ${config.opacity * 0.3}), transparent)`
            : `linear-gradient(90deg, transparent, hsla(160, 80%, 70%, ${config.opacity * 0.2}), transparent)`,
          width: '200%',
          height: '100%',
          willChange: 'transform, opacity',
        }}
      />
    </div>
  );
};

// Space Background - Enhanced cosmic theme for Apollo section
export const SpaceBackground = ({ intensity = 'medium', className = '' }: BackgroundProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const prefersReducedMotion = useReducedMotion();
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  const intensityMap = {
    subtle: { opacity: isDark ? 0.5 : 0.4, stars: 15, nebulas: 2 },
    medium: { opacity: isDark ? 0.8 : 0.6, stars: 25, nebulas: 3 },
    vibrant: { opacity: isDark ? 1.0 : 0.8, stars: 35, nebulas: 4 }
  };
  
  const config = intensityMap[intensity];

  useEffect(() => {
    if (!backgroundRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setShouldAnimate(entries[0]?.isIntersecting || false);
      },
      { rootMargin: '50px' }
    );
    
    observer.observe(backgroundRef.current);
    
    return () => {
      if (backgroundRef.current) {
        observer.unobserve(backgroundRef.current);
      }
    };
  }, []);

  if (prefersReducedMotion || !shouldAnimate) {
    return (
      <div 
        ref={backgroundRef}
        className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
        style={{
          background: isDark 
            ? `radial-gradient(ellipse at 20% 80%, rgba(79, 70, 229, ${config.opacity * 0.2}) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(139, 69, 255, ${config.opacity * 0.15}) 0%, transparent 50%)`
            : `radial-gradient(ellipse at 20% 80%, rgba(59, 130, 246, ${config.opacity * 0.15}) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(147, 51, 234, ${config.opacity * 0.1}) 0%, transparent 50%)`
        }}
      />
    );
  }

  return (
    <div ref={backgroundRef} className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}>
      {/* Deep Space Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, config.opacity * 0.4, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="absolute inset-0"
        style={{
          background: isDark 
            ? `radial-gradient(ellipse at 20% 80%, rgba(79, 70, 229, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(139, 69, 255, 0.2) 0%, transparent 50%)`
            : `radial-gradient(ellipse at 20% 80%, rgba(59, 130, 246, 0.2) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)`,
        }}
      />

      {/* Twinkling Stars */}
      {[...Array(config.stars)].map((_, i) => (
        <motion.div
          key={`space-star-${i}`}
          initial={{ 
            opacity: 0,
            x: `${getRandom(0, 100)}%`,
            y: `${getRandom(0, 100)}%`,
          }}
          animate={{
            opacity: [0, config.opacity * getRandom(0.5, 1), 0],
            scale: [0, getRandom(0.5, 1.5), 0],
          }}
          transition={{
            duration: getRandom(3, 8),
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: getRandom(0, 15),
          }}
          className="absolute z-0"
          style={{
            width: `${getRandom(2, 4)}px`,
            height: `${getRandom(2, 4)}px`,
            background: isDark 
              ? `hsla(${getRandom(200, 280)}, 100%, 90%, ${config.opacity * 0.9})`
              : `hsla(${getRandom(220, 260)}, 80%, 70%, ${config.opacity * 0.7})`,
            borderRadius: '50%',
            boxShadow: isDark 
              ? `0 0 ${getRandom(8, 16)}px hsla(${getRandom(200, 280)}, 100%, 90%, ${config.opacity * 0.6})`
              : `0 0 ${getRandom(6, 12)}px hsla(${getRandom(220, 260)}, 80%, 70%, ${config.opacity * 0.4})`,
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* Nebula Clouds */}
      {[...Array(config.nebulas)].map((_, i) => (
        <motion.div
          key={`space-nebula-${i}`}
          initial={{ 
            opacity: 0,
            scale: 0.3,
            x: `${getRandom(10, 90)}%`,
            y: `${getRandom(10, 90)}%`,
          }}
          animate={{
            opacity: [0, config.opacity * 0.6, 0],
            scale: [0.3, getRandom(1.5, 2.5), 0.3],
            rotate: [0, 360],
          }}
          transition={{
            duration: getRandom(30, 45),
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: i * 8,
          }}
          className="absolute z-0"
          style={{
            width: `${getRandom(200, 400)}px`,
            height: `${getRandom(150, 300)}px`,
            background: isDark 
              ? `radial-gradient(ellipse, hsla(${240 + i * 40}, 100%, 70%, ${config.opacity * 0.4}) 0%, hsla(${260 + i * 30}, 80%, 60%, ${config.opacity * 0.2}) 40%, transparent 70%)`
              : `radial-gradient(ellipse, hsla(${220 + i * 30}, 80%, 80%, ${config.opacity * 0.3}) 0%, hsla(${240 + i * 20}, 70%, 70%, ${config.opacity * 0.15}) 40%, transparent 70%)`,
            filter: `blur(${getRandom(40, 60)}px)`,
            borderRadius: '50%',
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* Aurora Effect */}
      <motion.div
        initial={{ opacity: 0, y: '100%' }}
        animate={{ 
          opacity: [0, config.opacity * 0.3, 0],
          y: ['100%', '-20%', '100%'],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        className="absolute inset-0 z-0"
        style={{
          background: isDark
            ? `linear-gradient(0deg, transparent 0%, hsla(280, 100%, 80%, ${config.opacity * 0.2}) 30%, hsla(260, 90%, 70%, ${config.opacity * 0.15}) 60%, transparent 100%)`
            : `linear-gradient(0deg, transparent 0%, hsla(240, 80%, 85%, ${config.opacity * 0.15}) 30%, hsla(220, 70%, 80%, ${config.opacity * 0.1}) 60%, transparent 100%)`,
          width: '100%',
          height: '150%',
          willChange: 'transform, opacity',
        }}
      />
    </div>
  );
};

// Token Background - Cryptocurrency themed effects
export const TokenBackground = ({ intensity = 'medium', className = '' }: BackgroundProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const prefersReducedMotion = useReducedMotion();
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  const intensityMap = {
    subtle: { opacity: isDark ? 0.4 : 0.3, coins: 8, rings: 3 },
    medium: { opacity: isDark ? 0.7 : 0.5, coins: 12, rings: 4 },
    vibrant: { opacity: isDark ? 1.0 : 0.8, coins: 16, rings: 5 }
  };
  
  const config = intensityMap[intensity];

  useEffect(() => {
    if (!backgroundRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setShouldAnimate(entries[0]?.isIntersecting || false);
      },
      { rootMargin: '50px' }
    );
    
    observer.observe(backgroundRef.current);
    
    return () => {
      if (backgroundRef.current) {
        observer.unobserve(backgroundRef.current);
      }
    };
  }, []);

  if (prefersReducedMotion || !shouldAnimate) {
    return (
      <div 
        ref={backgroundRef}
        className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
        style={{
          background: isDark 
            ? `radial-gradient(ellipse at 50% 50%, rgba(251, 191, 36, ${config.opacity * 0.1}) 0%, transparent 50%), radial-gradient(ellipse at 25% 75%, rgba(139, 69, 255, ${config.opacity * 0.1}) 0%, transparent 50%)`
            : `radial-gradient(ellipse at 50% 50%, rgba(245, 158, 11, ${config.opacity * 0.08}) 0%, transparent 50%), radial-gradient(ellipse at 25% 75%, rgba(147, 51, 234, ${config.opacity * 0.08}) 0%, transparent 50%)`
        }}
      />
    );
  }

  return (
    <div ref={backgroundRef} className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}>
      {/* Golden Gradient Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, config.opacity * 0.3, 0],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="absolute inset-0"
        style={{
          background: isDark 
            ? `radial-gradient(ellipse at 50% 50%, rgba(251, 191, 36, 0.2) 0%, transparent 50%), radial-gradient(ellipse at 25% 75%, rgba(139, 69, 255, 0.15) 0%, transparent 50%)`
            : `radial-gradient(ellipse at 50% 50%, rgba(245, 158, 11, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 25% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)`,
        }}
      />

      {/* Floating Coins */}
      {[...Array(config.coins)].map((_, i) => (
        <motion.div
          key={`token-coin-${i}`}
          initial={{ 
            opacity: 0,
            x: `${getRandom(-10, 110)}%`,
            y: `${getRandom(-10, 110)}%`,
            rotateY: 0,
          }}
          animate={{
            opacity: [0, config.opacity * 0.7, 0],
            x: [`${getRandom(-10, 110)}%`, `${getRandom(-10, 110)}%`],
            y: [`${getRandom(-10, 110)}%`, `${getRandom(-10, 110)}%`],
            rotateY: [0, 360],
            scale: [0.5, getRandom(1, 1.5), 0.5],
          }}
          transition={{
            duration: getRandom(12, 20),
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: i * 1.5,
          }}
          className="absolute z-0"
          style={{
            width: `${getRandom(20, 40)}px`,
            height: `${getRandom(20, 40)}px`,
            background: isDark 
              ? `linear-gradient(45deg, hsla(45, 100%, 70%, ${config.opacity * 0.8}) 0%, hsla(35, 90%, 60%, ${config.opacity * 0.6}) 100%)`
              : `linear-gradient(45deg, hsla(45, 80%, 60%, ${config.opacity * 0.6}) 0%, hsla(35, 70%, 50%, ${config.opacity * 0.4}) 100%)`,
            borderRadius: '50%',
            border: isDark 
              ? `1px solid hsla(45, 100%, 80%, ${config.opacity * 0.4})`
              : `1px solid hsla(45, 80%, 70%, ${config.opacity * 0.3})`,
            boxShadow: isDark 
              ? `0 0 ${getRandom(15, 25)}px hsla(45, 100%, 70%, ${config.opacity * 0.5})`
              : `0 0 ${getRandom(12, 20)}px hsla(45, 80%, 60%, ${config.opacity * 0.3})`,
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* Energy Rings */}
      {[...Array(config.rings)].map((_, i) => (
        <motion.div
          key={`token-ring-${i}`}
          initial={{ 
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            opacity: [0, config.opacity * 0.5, 0],
            scale: [0.5, 2 + i * 0.5, 0.5],
          }}
          transition={{
            duration: getRandom(8, 14),
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: i * 3,
          }}
          className="absolute z-0"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: `${100 + i * 50}px`,
            height: `${100 + i * 50}px`,
            border: isDark 
              ? `2px solid hsla(${45 + i * 20}, 90%, 70%, ${config.opacity * 0.4})`
              : `2px solid hsla(${45 + i * 15}, 80%, 60%, ${config.opacity * 0.3})`,
            borderRadius: '50%',
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* Blockchain Data Stream */}
      <motion.div
        initial={{ x: '-100%', opacity: 0 }}
        animate={{ 
          x: ['100%', '-100%'],
          opacity: [0, config.opacity * 0.4, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
          delay: 3,
        }}
        className="absolute top-1/2 z-0"
        style={{
          width: '200%',
          height: '2px',
          background: isDark
            ? `linear-gradient(90deg, transparent, hsla(45, 100%, 70%, ${config.opacity * 0.6}), hsla(280, 90%, 70%, ${config.opacity * 0.4}), transparent)`
            : `linear-gradient(90deg, transparent, hsla(45, 80%, 60%, ${config.opacity * 0.4}), hsla(260, 70%, 60%, ${config.opacity * 0.3}), transparent)`,
          willChange: 'transform, opacity',
        }}
      />
    </div>
  );
}; 