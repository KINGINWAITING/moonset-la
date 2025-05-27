import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useState, useEffect, useRef, useMemo } from 'react';

const getRandom = (min: number, max: number, seed?: number) => {
  if (seed !== undefined) {
    // Use a simple seeded random for consistent positions
    const x = Math.sin(seed) * 10000;
    return (x - Math.floor(x)) * (max - min) + min;
  }
  return Math.random() * (max - min) + min;
};

interface FuturisticEffectsProps {
  intensity?: 'subtle' | 'medium' | 'vibrant';
  className?: string;
}

// Matrix Digital Rain Effect - Optimized
export const MatrixRain = ({ intensity = 'medium', className = '' }: FuturisticEffectsProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const config = useMemo(() => {
    const intensityMap = {
      subtle: { streams: 6, opacity: isDark ? 0.2 : 0.15 },
      medium: { streams: 8, opacity: isDark ? 0.3 : 0.2 },
      vibrant: { streams: 10, opacity: isDark ? 0.4 : 0.25 }
    };
    return intensityMap[intensity];
  }, [intensity, isDark]);

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '100px' }
    );
    
    const currentRef = containerRef.current;
    observer.observe(currentRef);
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion || !isVisible) {
    return <div ref={containerRef} className={className} />;
  }

  const digitalChars = ['0', '1', 'A', 'B', 'C', 'D', 'E', 'F'];
  const streams = useMemo(() => 
    Array.from({ length: config.streams }, (_, i) => ({
      id: i,
      left: getRandom(0, 100, i),
      duration: getRandom(4, 8, i + 10),
      delay: getRandom(0, 3, i + 20),
      charCount: Math.floor(getRandom(6, 10, i + 30))
    })), [config.streams]
  );

  return (
    <div ref={containerRef} className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}>
      {streams.map((stream) => (
        <motion.div
          key={`matrix-${stream.id}`}
          className="absolute flex flex-col items-center"
          style={{
            left: `${stream.left}%`,
            width: '20px',
          }}
          initial={{ y: '-100%' }}
          animate={{ y: '110%' }}
          transition={{
            duration: stream.duration,
            repeat: Infinity,
            ease: "linear",
            delay: stream.delay,
          }}
        >
          {Array.from({ length: stream.charCount }, (_, j) => (
            <motion.div
              key={`char-${stream.id}-${j}`}
              className={`text-xs font-mono ${
                isDark ? 'text-green-400' : 'text-blue-500'
              }`}
              style={{
                opacity: j === 0 ? config.opacity * 1.2 : config.opacity * (1 - j * 0.1),
                textShadow: isDark 
                  ? `0 0 8px rgba(34, 197, 94, ${config.opacity * 0.8})`
                  : `0 0 6px rgba(59, 130, 246, ${config.opacity * 0.6})`,
              }}
            >
              {digitalChars[j % digitalChars.length]}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

// Holographic Text Effect - Simplified
export const HolographicGlow = ({ children, intensity = 'medium', className = '' }: { 
  children: React.ReactNode; 
  intensity?: 'subtle' | 'medium' | 'vibrant';
  className?: string;
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const prefersReducedMotion = useReducedMotion();

  const config = useMemo(() => {
    const intensityMap = {
      subtle: { blur: 6, opacity: isDark ? 0.3 : 0.2 },
      medium: { blur: 8, opacity: isDark ? 0.4 : 0.3 },
      vibrant: { blur: 10, opacity: isDark ? 0.5 : 0.4 }
    };
    return intensityMap[intensity];
  }, [intensity, isDark]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={{
          background: isDark 
            ? `linear-gradient(45deg, rgba(139, 69, 255, ${config.opacity * 0.4}), rgba(236, 72, 153, ${config.opacity * 0.3}))`
            : `linear-gradient(45deg, rgba(59, 130, 246, ${config.opacity * 0.3}), rgba(147, 51, 234, ${config.opacity * 0.2}))`,
          filter: `blur(${config.blur}px)`,
        }}
        animate={{
          opacity: [config.opacity * 0.6, config.opacity, config.opacity * 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// Laser Scanning Lines - Optimized
export const LaserScanLines = ({ intensity = 'medium', className = '' }: FuturisticEffectsProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const config = useMemo(() => {
    const intensityMap = {
      subtle: { lines: 2, opacity: isDark ? 0.3 : 0.2 },
      medium: { lines: 3, opacity: isDark ? 0.4 : 0.3 },
      vibrant: { lines: 4, opacity: isDark ? 0.5 : 0.4 }
    };
    return intensityMap[intensity];
  }, [intensity, isDark]);

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '100px' }
    );
    
    const currentRef = containerRef.current;
    observer.observe(currentRef);
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion || !isVisible) {
    return <div ref={containerRef} className={className} />;
  }

  return (
    <div ref={containerRef} className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: config.lines }, (_, i) => (
        <motion.div
          key={`laser-h-${i}`}
          className="absolute w-full h-0.5"
          style={{
            background: isDark 
              ? `linear-gradient(90deg, transparent, rgba(34, 197, 94, ${config.opacity}), transparent)`
              : `linear-gradient(90deg, transparent, rgba(59, 130, 246, ${config.opacity}), transparent)`,
            top: `${25 + i * 25}%`,
          }}
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1,
          }}
        />
      ))}
    </div>
  );
};

// Cursor Tracking Interactive Effect - Optimized
export const CursorTracker = ({ intensity = 'medium', className = '' }: FuturisticEffectsProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const prefersReducedMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const config = useMemo(() => {
    const intensityMap = {
      subtle: { particles: 2, opacity: isDark ? 0.2 : 0.15 },
      medium: { particles: 3, opacity: isDark ? 0.3 : 0.2 },
      vibrant: { particles: 4, opacity: isDark ? 0.4 : 0.25 }
    };
    return intensityMap[intensity];
  }, [intensity, isDark]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        
        // Throttle updates
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        
        animationRef.current = requestAnimationFrame(() => {
          setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        });
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
      setIsHovering(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <div ref={containerRef} className={className} />;
  }

  return (
    <div ref={containerRef} className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      {isHovering && (
        <>
          <motion.div
            className="absolute w-20 h-20 rounded-full pointer-events-none"
            style={{
              background: isDark 
                ? `radial-gradient(circle, rgba(139, 69, 255, ${config.opacity * 0.4}) 0%, transparent 70%)`
                : `radial-gradient(circle, rgba(59, 130, 246, ${config.opacity * 0.3}) 0%, transparent 70%)`,
              filter: 'blur(8px)',
            }}
            animate={{
              x: mousePosition.x - 40,
              y: mousePosition.y - 40,
            }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 400,
            }}
          />
        </>
      )}
    </div>
  );
};

// Futuristic UI Grid Overlay - Simplified
export const FuturisticGrid = ({ intensity = 'medium', className = '' }: FuturisticEffectsProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const config = useMemo(() => {
    const intensityMap = {
      subtle: { opacity: isDark ? 0.15 : 0.1 },
      medium: { opacity: isDark ? 0.25 : 0.15 },
      vibrant: { opacity: isDark ? 0.35 : 0.2 }
    };
    return intensityMap[intensity];
  }, [intensity, isDark]);

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '100px' }
    );
    
    const currentRef = containerRef.current;
    observer.observe(currentRef);
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion || !isVisible) {
    return (
      <div 
        ref={containerRef}
        className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
        style={{
          backgroundImage: isDark
            ? `linear-gradient(rgba(34, 197, 94, ${config.opacity * 0.5}) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, ${config.opacity * 0.5}) 1px, transparent 1px)`
            : `linear-gradient(rgba(59, 130, 246, ${config.opacity * 0.5}) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, ${config.opacity * 0.5}) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    );
  }

  return (
    <div ref={containerRef} className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: isDark
            ? `linear-gradient(rgba(34, 197, 94, ${config.opacity}) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, ${config.opacity}) 1px, transparent 1px)`
            : `linear-gradient(rgba(59, 130, 246, ${config.opacity}) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, ${config.opacity}) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
        animate={{
          opacity: [config.opacity * 0.7, config.opacity, config.opacity * 0.7],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}; 