import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { MoonLogo } from "./MoonLogo";
import { useTheme } from "@/context/ThemeContext";
import { memo, useRef, useMemo } from "react";

interface NavigationLogoProps {
  className?: string;
  isScrolled?: boolean;
  isWhitepaperPage?: boolean;
}

export const NavigationLogo = memo(({ className = "", isScrolled = false, isWhitepaperPage = false }: NavigationLogoProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const logoRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(logoRef, { once: true });

  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => 
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  const glowColor = isWhitepaperPage 
    ? "rgba(57, 255, 20, 0.4)" // Neon green for whitepaper
    : "rgba(139, 69, 255, 0.4)"; // Default purple

  return (
    <motion.div
      ref={logoRef}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: prefersReducedMotion ? 0.3 : 0.8, ease: "easeOut" }}
    >
      <Link 
        to="/" 
        className={`flex items-center gap-3 mr-6 group relative ${className}`}
      >
        {/* Enhanced logo container with futuristic effects */}
        <motion.div 
          className="relative"
          whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Outer glow ring that appears on hover */}
          <motion.div
            className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${
              isWhitepaperPage
                ? "bg-gradient-to-r from-green-500 via-green-400 to-emerald-400"
                : isDark 
                  ? "bg-gradient-to-r from-purple-500 via-blue-400 to-cyan-400"
                  : "bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"
            }`}
            style={{
              filter: "blur(12px)",
              transform: "scale(1.8)",
              zIndex: -1
            }}
          />
          
          {/* Rotating border effect */}
          {!prefersReducedMotion && (
            <motion.div
              className={`absolute inset-0 rounded-full border-2 opacity-0 group-hover:opacity-50 ${
                isWhitepaperPage
                  ? "border-green-400"
                  : isDark ? "border-cyan-400" : "border-blue-500"
              }`}
              style={{
                transform: "scale(1.4)",
                zIndex: -1
              }}
              animate={{
                rotate: 360,
                scale: [1.4, 1.6, 1.4]
              }}
              transition={{
                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          )}
          
          {/* Main logo with enhanced sizing */}
          <MoonLogo 
            className={`transition-all duration-300 ${
              isScrolled 
                ? 'w-10 h-10 scale-90' 
                : 'w-12 h-12 scale-100'
            }`}
            style={{
              filter: `drop-shadow(0 0 8px ${glowColor})`
            }}
            animated={!prefersReducedMotion}
            isWhitepaperPage={isWhitepaperPage}
          />
          
          {/* Pulse effect on hover */}
          {!prefersReducedMotion && (
            <motion.div
              className={`absolute inset-0 rounded-full ${
                isWhitepaperPage
                  ? "bg-gradient-to-r from-green-500/20 to-emerald-400/20"
                  : isDark 
                    ? "bg-gradient-to-r from-purple-500/20 to-cyan-400/20"
                    : "bg-gradient-to-r from-blue-500/15 to-purple-500/15"
              } opacity-0 group-hover:opacity-100`}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0, 0.3, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.div>

        {/* Enhanced text with futuristic styling */}
        <motion.div 
          className="font-light tracking-wider flex items-center relative"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.6, delay: prefersReducedMotion ? 0 : 0.2 }}
        >
          {/* Background glow for text */}
          <motion.div
            className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${
              isWhitepaperPage
                ? "bg-gradient-to-r from-green-500 to-emerald-400"
                : isDark 
                  ? "bg-gradient-to-r from-purple-500 to-cyan-400"
                  : "bg-gradient-to-r from-blue-500 to-purple-500"
            }`}
            style={{
              filter: "blur(8px)",
              borderRadius: "8px",
              transform: "scale(1.2)"
            }}
          />
          
          {/* Main text */}
          <div className={`relative z-10 ${isScrolled ? 'text-lg' : 'text-xl'} transition-all duration-300`}>
            <motion.span 
              className={`font-semibold bg-clip-text text-transparent bg-gradient-to-r ${
                isWhitepaperPage
                  ? "from-green-400 via-emerald-400 to-green-400"
                  : isDark 
                    ? "from-purple-400 via-cyan-400 to-blue-400" 
                    : "from-blue-600 via-purple-600 to-indigo-600"
              } transition-all duration-300 group-hover:from-green-300 group-hover:via-emerald-300 group-hover:to-green-300`}
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              MOON
            </motion.span>
            <motion.span 
              className={`font-light transition-colors duration-300 ${
                isDark 
                  ? "text-gray-300 group-hover:text-white" 
                  : "text-gray-700 group-hover:text-gray-900"
              }`}
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              transition={{ duration: 0.2, delay: 0.05 }}
            >
              SET
            </motion.span>
          </div>
          
          {/* Futuristic scanning line effect */}
          {!prefersReducedMotion && (
            <motion.div
              className={`absolute top-0 left-0 w-1 h-full opacity-0 group-hover:opacity-60 ${
                isDark ? "bg-cyan-400" : "bg-blue-500"
              }`}
              animate={{
                x: ['-100%', '200%'],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          )}
        </motion.div>

        {/* Data stream particles */}
        {!prefersReducedMotion && isInView && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className={`absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-60 ${
                  isDark ? "bg-purple-400" : "bg-blue-500"
                }`}
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 20}%`,
                }}
                animate={{
                  x: [0, 100, 0],
                  y: [0, -20, 0],
                  opacity: [0, 0.6, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
              />
            ))}
          </div>
        )}
      </Link>
    </motion.div>
  );
});

NavigationLogo.displayName = 'NavigationLogo';
