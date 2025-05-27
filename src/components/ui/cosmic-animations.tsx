import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

interface CosmicOrbProps {
  index: number;
  size?: 'small' | 'medium' | 'large';
  intensity?: 'low' | 'medium' | 'high';
}

export const CosmicOrb = ({ index, size = 'medium', intensity = 'medium' }: CosmicOrbProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const sizeMap = {
    small: 120 + index * 40,
    medium: 200 + index * 80, 
    large: 300 + index * 100
  };
  
  const intensityMap = {
    low: isDark ? 0.3 : 0.2,
    medium: isDark ? 0.7 : 0.5,
    high: isDark ? 0.9 : 0.7
  };

  const orbSize = sizeMap[size];
  const opacity = intensityMap[intensity];

  return (
    <motion.div
      initial={{ 
        opacity: 0,
        x: `${-30 + index * 25}%`,
        y: `${15 + index * 20}%`,
      }}
      animate={{
        opacity: [0, opacity, 0],
        x: [`${-30 + index * 25}%`, `${-15 + index * 25}%`, `${-30 + index * 25}%`],
        y: [`${15 + index * 20}%`, `${5 + index * 20}%`, `${15 + index * 20}%`],
        scale: [1, 1.4, 1],
      }}
      transition={{
        duration: 12 + index * 3,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay: index * 2,
      }}
      className="absolute z-0 pointer-events-none"
      style={{
        width: `${orbSize}px`,
        height: `${orbSize}px`,
        borderRadius: '50%',
        background: isDark 
          ? `radial-gradient(circle, hsla(${220 + index * 25}, 80%, 70%, ${opacity}) 0%, transparent 80%)`
          : `radial-gradient(circle, hsla(${180 + index * 15}, 70%, 80%, ${opacity * 0.8}) 0%, transparent 80%)`,
        filter: 'blur(15px)',
      }}
    />
  );
};

interface FloatingParticleProps {
  index: number;
  count: number;
  type?: 'particle' | 'spark' | 'light';
}

export const FloatingParticle = ({ index, count, type = 'particle' }: FloatingParticleProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const configs = {
    particle: {
      size: getRandom(3, 8),
      opacity: isDark ? 0.9 : 0.7,
      duration: getRandom(15, 25),
      glow: getRandom(15, 30)
    },
    spark: {
      size: 1,
      opacity: isDark ? 1 : 0.8,
      duration: getRandom(3, 8),
      glow: getRandom(20, 40)
    },
    light: {
      size: getRandom(10, 20),
      opacity: 0.9,
      duration: getRandom(8, 16),
      glow: getRandom(30, 60)
    }
  };

  const config = configs[type];

  return (
    <motion.div
      initial={{ 
        opacity: 0,
        x: `${getRandom(-40, 140)}vw`,
        y: `${getRandom(-30, 130)}vh`,
        rotate: getRandom(0, 360),
      }}
      animate={{
        opacity: [0, config.opacity, 0],
        x: [`${getRandom(-40, 140)}vw`, `${getRandom(-40, 140)}vw`],
        y: [`${getRandom(-30, 130)}vh`, `${getRandom(-30, 130)}vh`],
        rotate: [getRandom(0, 360), getRandom(0, 360) + (type === 'spark' ? 720 : 360)],
        scale: type === 'spark' ? [0, getRandom(2, 4), 0] : [1, getRandom(1.5, 2.5), 1],
      }}
      transition={{
        duration: config.duration,
        repeat: Infinity,
        repeatType: type === 'spark' ? "loop" : "mirror",
        ease: type === 'particle' ? "linear" : "easeInOut",
        delay: getRandom(0, 8),
      }}
      className="absolute z-0 pointer-events-none"
      style={{
        width: `${config.size}px`,
        height: `${config.size}px`,
        background: isDark 
          ? `hsla(${getRandom(180, 320)}, 90%, 80%, ${config.opacity})`
          : `hsla(${getRandom(160, 280)}, 80%, 70%, ${config.opacity * 0.8})`,
        borderRadius: type === 'light' ? '50%' : index % 3 === 0 ? '50%' : '2px',
        boxShadow: `0 0 ${config.glow}px hsla(${getRandom(180, 320)}, 90%, 80%, ${config.opacity * 0.8})`,
      }}
    />
  );
};

interface AmbientLightProps {
  intensity?: 'subtle' | 'medium' | 'strong';
}

export const AmbientLight = ({ intensity = 'medium' }: AmbientLightProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const intensityMap = {
    subtle: { opacity: isDark ? 0.4 : 0.3, scale: 1.2 },
    medium: { opacity: isDark ? 0.8 : 0.6, scale: 1.3 },
    strong: { opacity: isDark ? 1 : 0.8, scale: 1.5 }
  };

  const config = intensityMap[intensity];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, config.opacity, 0],
          scale: [1, config.scale, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="absolute inset-0 z-0 pointer-events-none w-full h-full"
        style={{
          background: isDark
            ? `radial-gradient(ellipse at center, hsla(250, 100%, 80%, 0.15) 0%, hsla(280, 90%, 70%, 0.08) 30%, transparent 60%)`
            : `radial-gradient(ellipse at center, hsla(210, 100%, 85%, 0.12) 0%, hsla(190, 80%, 75%, 0.06) 30%, transparent 60%)`,
        }}
      />
      
      {/* Secondary waves */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0, config.opacity * 0.5, 0],
            scale: [0.5, 2 + i * 0.5, 0.5],
          }}
          transition={{
            duration: 10 + i * 3,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: i * 2,
          }}
          className="absolute inset-0 z-0 pointer-events-none w-full h-full"
          style={{
            background: isDark
              ? `radial-gradient(circle at ${30 + i * 30}% ${40 + i * 20}%, hsla(${200 + i * 40}, 80%, 70%, 0.2) 0%, transparent 40%)`
              : `radial-gradient(circle at ${30 + i * 30}% ${40 + i * 20}%, hsla(${160 + i * 30}, 70%, 80%, 0.15) 0%, transparent 40%)`,
          }}
        />
      ))}
    </>
  );
};

interface ScanningEffectProps {
  direction?: 'horizontal' | 'vertical';
  speed?: 'slow' | 'medium' | 'fast';
}

export const ScanningEffect = ({ direction = 'horizontal', speed = 'medium' }: ScanningEffectProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const speedMap = {
    slow: 15,
    medium: 10,
    fast: 6
  };

  const duration = speedMap[speed];

  return (
    <motion.div
      initial={{ [direction === 'horizontal' ? 'x' : 'y']: '-100%', opacity: 0 }}
      animate={{ 
        [direction === 'horizontal' ? 'x' : 'y']: ['100%', '-100%'],
        opacity: [0, isDark ? 0.9 : 0.7, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1,
      }}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        background: isDark
          ? `linear-gradient(${direction === 'horizontal' ? '90deg' : '0deg'}, transparent, hsla(200, 100%, 80%, 0.15), hsla(260, 100%, 85%, 0.1), transparent)`
          : `linear-gradient(${direction === 'horizontal' ? '90deg' : '0deg'}, transparent, hsla(220, 80%, 70%, 0.12), hsla(200, 90%, 80%, 0.08), transparent)`,
        width: direction === 'horizontal' ? '200%' : '100%',
        height: direction === 'vertical' ? '200%' : '100%',
      }}
    />
  );
};

interface LightModeEffectsProps {
  intensity?: 'subtle' | 'medium' | 'vibrant';
}

export const LightModeEffects = ({ intensity = 'medium' }: LightModeEffectsProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (isDark) return null;

  const intensityMap = {
    subtle: { opacity: 0.2, particles: 6, beams: 2 },
    medium: { opacity: 0.4, particles: 12, beams: 4 },
    vibrant: { opacity: 0.6, particles: 18, beams: 6 }
  };

  const config = intensityMap[intensity];

  return (
    <>
      {/* Radial Light Rays */}
      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{
          opacity: [0, config.opacity * 0.75, 0],
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 z-0 pointer-events-none w-full h-full"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, 
            transparent 0deg,
            hsla(45, 100%, 70%, ${config.opacity * 0.4}) 30deg,
            transparent 60deg,
            hsla(200, 80%, 70%, ${config.opacity * 0.3}) 120deg,
            transparent 150deg,
            hsla(280, 60%, 75%, ${config.opacity * 0.25}) 210deg,
            transparent 240deg,
            transparent 360deg)`,
          filter: 'blur(2px)',
        }}
      />

      {/* Enhanced Light Particles */}
      {[...Array(config.particles)].map((_, i) => (
        <FloatingParticle key={`light-${i}`} index={i} count={config.particles} type="light" />
      ))}

      {/* Prismatic Beams */}
      {[...Array(config.beams)].map((_, i) => (
        <motion.div
          key={`beam-${i}`}
          initial={{ 
            opacity: 0,
            x: `${getRandom(20, 80)}%`,
            y: `${getRandom(25, 75)}%`,
            rotate: getRandom(0, 360),
          }}
          animate={{
            opacity: [0, config.opacity, 0],
            rotate: [getRandom(0, 360), getRandom(0, 360) + 180],
            scale: [0.5, getRandom(1.5, 2.5), 0.5],
          }}
          transition={{
            duration: getRandom(6, 12),
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: getRandom(0, 8),
          }}
          className="absolute z-0 pointer-events-none"
          style={{
            width: `${getRandom(20, 40)}px`,
            height: '2px',
            background: `linear-gradient(90deg, 
              transparent, 
              hsla(${getRandom(180, 280)}, 100%, 85%, ${config.opacity}) 50%, 
              transparent)`,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
    </>
  );
};

interface DarkModeEffectsProps {
  intensity?: 'subtle' | 'medium' | 'intense';
}

export const DarkModeEffects = ({ intensity = 'medium' }: DarkModeEffectsProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (!isDark) return null;

  const intensityMap = {
    subtle: { opacity: 0.3, nebulas: 2, lightning: 3 },
    medium: { opacity: 0.6, nebulas: 3, lightning: 6 },
    intense: { opacity: 0.9, nebulas: 4, lightning: 9 }
  };

  const config = intensityMap[intensity];

  return (
    <>
      {/* Cosmic Nebulas */}
      {[...Array(config.nebulas)].map((_, i) => (
        <motion.div
          key={`nebula-${i}`}
          initial={{ 
            opacity: 0,
            scale: 0.5,
            x: `${getRandom(10, 90)}%`,
            y: `${getRandom(20, 80)}%`,
          }}
          animate={{
            opacity: [0, config.opacity, 0],
            scale: [0.5, 2.5, 0.5],
            rotate: [0, 360],
          }}
          transition={{
            duration: getRandom(25, 35),
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: getRandom(0, 10),
          }}
          className="absolute z-0 pointer-events-none"
          style={{
            width: `${getRandom(200, 400)}px`,
            height: `${getRandom(150, 300)}px`,
            background: `radial-gradient(ellipse, 
              hsla(${getRandom(240, 320)}, 100%, 70%, ${config.opacity * 0.7}) 0%,
              hsla(${getRandom(200, 280)}, 80%, 60%, ${config.opacity * 0.3}) 40%,
              transparent 70%)`,
            filter: `blur(${getRandom(30, 50)}px)`,
            borderRadius: '50%',
          }}
        />
      ))}

      {/* Energy Lightning */}
      {[...Array(config.lightning)].map((_, i) => (
        <motion.div
          key={`lightning-${i}`}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: getRandom(2, 5),
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: getRandom(0, 8),
          }}
          className="absolute z-0 pointer-events-none"
          style={{
            left: `${getRandom(10, 90)}%`,
            top: `${getRandom(20, 80)}%`,
            width: '2px',
            height: `${getRandom(50, 150)}px`,
            background: `linear-gradient(${getRandom(0, 360)}deg, 
              transparent,
              hsla(${getRandom(200, 300)}, 100%, 90%, ${config.opacity}) 30%,
              hsla(${getRandom(250, 350)}, 100%, 80%, ${config.opacity * 0.7}) 70%,
              transparent)`,
            boxShadow: `0 0 ${getRandom(15, 25)}px hsla(${getRandom(200, 300)}, 100%, 90%, ${config.opacity * 0.8})`,
            transform: `rotate(${getRandom(-30, 30)}deg)`,
          }}
        />
      ))}

      {/* Cosmic Vortex */}
      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{
          opacity: [0, config.opacity * 0.5, 0],
          rotate: [0, 720],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 z-0 pointer-events-none w-full h-full"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%,
            transparent 0deg,
            hsla(260, 100%, 80%, ${config.opacity * 0.2}) 60deg,
            transparent 120deg,
            hsla(280, 90%, 70%, ${config.opacity * 0.15}) 180deg,
            transparent 240deg,
            hsla(240, 100%, 85%, ${config.opacity * 0.1}) 300deg,
            transparent 360deg)`,
          filter: 'blur(3px)',
        }}
      />
    </>
  );
}; 