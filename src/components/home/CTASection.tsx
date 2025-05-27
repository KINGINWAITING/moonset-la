import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { CosmicBackground } from "@/components/ui/cosmic-background";
import { memo, useRef, useMemo } from "react";

interface CTASectionProps {
  onOpenAuthModal: () => void;
}

export const CTASection = memo(({ onOpenAuthModal }: CTASectionProps) => {
  const { session } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => 
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [5, -5]);
  
  return (
    <section ref={sectionRef} className={`container px-4 py-24 relative ${isDark ? "bg-transparent" : "bg-transparent"} z-10 overflow-hidden`}>
      {/* Enhanced Cosmic Background with parallax */}
      <motion.div style={{ y: prefersReducedMotion ? 0 : y }}>
        <CosmicBackground 
          intensity="vibrant" 
          showOrbs={true}
          showParticles={!prefersReducedMotion}
          showGrid={false}
          showScanning={!prefersReducedMotion}
        />
      </motion.div>

      {/* Futuristic grid overlay */}
      {isInView && !prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 opacity-10 pointer-events-none"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2 }}
        >
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(${isDark ? 'rgba(139, 69, 255, 0.15)' : 'rgba(59, 130, 246, 0.1)'} 1px, transparent 1px),
                linear-gradient(90deg, ${isDark ? 'rgba(139, 69, 255, 0.15)' : 'rgba(59, 130, 246, 0.1)'} 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
            }}
          />
        </motion.div>
      )}
      
      {/* Optimized Spotlight Effect with enhanced glow */}
      {isInView && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: prefersReducedMotion ? 0.5 : 2.5, ease: "easeOut" }}
          style={{ willChange: prefersReducedMotion ? 'auto' : 'opacity, transform' }}
        >
          <div 
            className="absolute inset-0"
            style={{
              background: isDark 
                ? `radial-gradient(ellipse 800px 600px at 50% 50%, rgba(139, 69, 255, 0.2) 0%, rgba(236, 72, 153, 0.12) 30%, transparent 70%)`
                : `radial-gradient(ellipse 800px 600px at 50% 50%, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.08) 30%, transparent 70%)`,
            }}
          />
          
          {/* Animated energy rings */}
          {!prefersReducedMotion && (
            <div className="absolute inset-0">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`energy-ring-${i}`}
                  className={`absolute border-2 rounded-full ${
                    isDark 
                      ? "border-purple-500/20" 
                      : "border-blue-500/15"
                  }`}
                  style={{
                    left: `${10 + i * 10}%`,
                    right: `${10 + i * 10}%`,
                    top: `${10 + i * 10}%`,
                    bottom: `${10 + i * 10}%`,
                  }}
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.6, 0.3],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 8 + i * 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 1,
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
      
      {/* Main Content Card with enhanced styling */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9, rotateX: 15 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : { opacity: 0, y: 60, scale: 0.9, rotateX: 15 }}
        transition={{ 
          duration: prefersReducedMotion ? 0.5 : 1.2, 
          type: "spring", 
          stiffness: 100,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        whileHover={prefersReducedMotion ? {} : { scale: 1.02, y: -5, rotateX: 2 }}
        className={`${isDark ? "bg-[#0A0A0A]/90" : "bg-white/90"} backdrop-blur-xl border ${isDark ? "border-white/20" : "border-black/15"} rounded-3xl p-10 md:p-16 text-center relative z-10 shadow-2xl overflow-hidden`}
        style={{ 
          willChange: prefersReducedMotion ? 'auto' : 'transform, opacity',
          perspective: prefersReducedMotion ? 'none' : '1000px'
        }}
      >
        {/* Animated circuit pattern overlay */}
        {isInView && !prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 opacity-5 pointer-events-none"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.05, scale: 1 }}
            transition={{ duration: 3 }}
          >
            <svg className="w-full h-full" viewBox="0 0 400 300">
              <defs>
                <pattern id="cta-circuit" patternUnits="userSpaceOnUse" width="60" height="60">
                  <path 
                    d="M30 0 L30 15 L45 15 L45 30 L60 30 M0 30 L15 30 L15 45 L30 45 L30 60" 
                    stroke={isDark ? "#8B5CF6" : "#3B82F6"} 
                    strokeWidth="1" 
                    fill="none"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-circuit)" />
            </svg>
          </motion.div>
        )}

        {/* Floating particles around the CTA */}
        {isInView && !prefersReducedMotion && (
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`cta-particle-${i}`}
                className={`absolute w-3 h-3 rounded-full ${
                  isDark ? "bg-purple-400/40" : "bg-blue-400/40"
                }`}
                style={{
                  left: `${15 + (i % 4) * 20}%`,
                  top: `${20 + Math.floor(i / 4) * 60}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.sin(i) * 20, 0],
                  opacity: [0.4, 1, 0.4],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        )}

        {/* Enhanced header with badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.8, delay: prefersReducedMotion ? 0 : 0.2 }}
          className="mb-8"
        >
          <div className={`inline-flex items-center px-6 py-2 rounded-full border backdrop-blur-md mb-6 ${
            isDark 
              ? 'border-purple-500/30 bg-purple-500/10 text-purple-300' 
              : 'border-blue-500/30 bg-blue-500/5 text-blue-600'
          }`}>
            <motion.div
              animate={prefersReducedMotion ? {} : { rotate: 360 }}
              transition={{ 
                duration: prefersReducedMotion ? 0 : 4, 
                repeat: prefersReducedMotion ? 0 : Infinity, 
                ease: "linear" 
              }}
            >
              <Sparkles className="w-5 h-5 mr-2" />
            </motion.div>
            <span className="text-sm font-medium tracking-wide">JOIN THE REVOLUTION</span>
          </div>
        </motion.div>
        
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.6, delay: prefersReducedMotion ? 0 : 0.3 }}
        >
          <span className={isDark 
            ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400" 
            : "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"
          }>
            Ready to join
          </span>
          <br />
          <span className={isDark ? "text-white" : "text-gray-900"}>
            the truth discovery?
          </span>
        </motion.h2>
        
        <motion.p 
          className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.6, delay: prefersReducedMotion ? 0 : 0.5 }}
        >
          Be part of a community committed to evidence-based reasoning, technological innovation, 
          and the relentless pursuit of verifiable truth.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.8, delay: prefersReducedMotion ? 0 : 0.7 }}
        >
          {session.isLoggedIn ? (
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -3 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            >
              <Button 
                size="lg" 
                className={`px-10 py-5 text-xl font-semibold transition-all duration-300 relative overflow-hidden rounded-xl ${
                  isDark 
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-2xl hover:shadow-purple-500/30" 
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-2xl hover:shadow-blue-500/30"
                }`} 
                onClick={() => window.location.href = "/dashboard"}
                style={{ willChange: prefersReducedMotion ? 'auto' : 'transform, box-shadow' }}
              >
                {/* Button glow effect */}
                {!prefersReducedMotion && (
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-xl"
                    animate={{ 
                      scale: [1, 1.1, 1], 
                      opacity: [0, 0.3, 0] 
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                
                <span className="relative z-10 flex items-center">
                  Go to Dashboard
                  {!prefersReducedMotion ? (
                    <motion.div
                      className="ml-3"
                      animate={{ x: [0, 8, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <ArrowRight className="ml-3 w-6 h-6" />
                  )}
                </span>
              </Button>
            </motion.div>
          ) : (
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -3 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            >
              <Button 
                size="lg" 
                className={`px-10 py-5 text-xl font-semibold transition-all duration-300 relative overflow-hidden rounded-xl ${
                  isDark 
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-2xl hover:shadow-purple-500/30" 
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-2xl hover:shadow-blue-500/30"
                }`} 
                onClick={onOpenAuthModal}
                style={{ willChange: prefersReducedMotion ? 'auto' : 'transform, box-shadow' }}
              >
                {/* Button glow effect */}
                {!prefersReducedMotion && (
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-xl"
                    animate={{ 
                      scale: [1, 1.1, 1], 
                      opacity: [0, 0.3, 0] 
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                
                <span className="relative z-10 flex items-center">
                  <Zap className="mr-3 w-6 h-6" />
                  Join MoonSet
                  {!prefersReducedMotion ? (
                    <motion.div
                      className="ml-3"
                      animate={{ x: [0, 8, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <ArrowRight className="ml-3 w-6 h-6" />
                  )}
                </span>
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Enhanced energy rings around the CTA */}
        {isInView && !prefersReducedMotion && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`cta-ring-${i}`}
                className={`absolute border-2 rounded-3xl ${
                  isDark 
                    ? "border-purple-500/15" 
                    : "border-blue-500/10"
                }`}
                style={{
                  left: `${-5 - i * 3}%`,
                  right: `${-5 - i * 3}%`,
                  top: `${-5 - i * 3}%`,
                  bottom: `${-5 - i * 3}%`,
                }}
                animate={{
                  scale: [1, 1.02, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.8,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
});

CTASection.displayName = 'CTASection';
