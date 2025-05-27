import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Brain, ShieldCheck, Command, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { HeroBackground } from "@/components/ui/specialized-backgrounds";
import { memo, useRef, useMemo, useCallback } from "react";
import { useAnimationConfig, usePerformanceMonitor, useGenerateParticles, useViewportCulling } from "@/utils/performance";

export const HeroSection = memo(() => {
  const { session } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Performance monitoring
  usePerformanceMonitor('HeroSection');
  
  // Animation configuration based on device capabilities
  const { 
    shouldReduceAnimations, 
    getParticleCount, 
    getAnimationDuration 
  } = useAnimationConfig();

  // Viewport culling for animations
  const isVisible = useViewportCulling(sectionRef);

  // Optimized parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const nebulaY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceAnimations ? 0 : -30]);
  const starsY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceAnimations ? 0 : -50]);

  // Reduced and memoized features
  const features = useMemo(() => [
    {
      icon: <Brain className="w-8 h-8 text-purple-400" />,
      title: "AI-Powered Analysis",
      description: "Uncover insights with advanced machine learning algorithms.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-green-400" />,
      title: "Blockchain Security", 
      description: "Ensure data integrity and transparency with decentralized ledger technology.",
    },
    {
      icon: <Command className="w-8 h-8 text-sky-400" />,
      title: "Collaborative Ecosystem",
      description: "Join a community dedicated to rigorous and open investigation.",
    }
  ], []);

  // Simplified pulse configurations
  const pulseConfigs = useMemo(() => {
    const baseConfigs = [
      { dx: 0, dy: 0, size: 300, color: isDark ? 'bg-purple-500/10' : 'bg-blue-500/8', blur: 40 },
      { dx: -120, dy: -80, size: 240, color: isDark ? 'bg-pink-500/8' : 'bg-purple-500/6', blur: 35 },
      { dx: 120, dy: -60, size: 200, color: isDark ? 'bg-blue-500/8' : 'bg-indigo-500/6', blur: 30 },
    ];
    
    return shouldReduceAnimations ? baseConfigs.slice(0, 1) : baseConfigs;
  }, [isDark, shouldReduceAnimations]);

  // Optimized star positions with reduced count
  const particleCount = useMemo(() => getParticleCount(15), [getParticleCount]);
  const starPositions = useGenerateParticles(particleCount, { width: 100, height: 100 });

  // Optimize button click handlers
  const handleDashboardClick = useCallback(() => {
    window.location.href = "/dashboard";
  }, []);
  
  return (
    <section 
      ref={sectionRef} 
      className="relative w-full pt-16 pb-24 sm:pt-20 sm:pb-32 text-center overflow-hidden"
      style={{ position: 'relative' }}
    >
      {/* Lightweight Base Background */}
      <HeroBackground intensity="medium" />
      
      {/* Optimized Nebula Effects - Only render when visible */}
      {isVisible && !shouldReduceAnimations && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{ y: nebulaY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: getAnimationDuration(2) }}
        >
          {/* Simplified nebula gradients */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: isDark
                ? `radial-gradient(ellipse 600px 400px at 25% 35%, rgba(139, 69, 255, 0.12) 0%, transparent 60%)`
                : `radial-gradient(ellipse 600px 400px at 25% 35%, rgba(59, 130, 246, 0.08) 0%, transparent 60%)`,
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      )}

      {/* Optimized Stars - Reduced count and complexity */}
      {isVisible && !shouldReduceAnimations && starPositions.length > 0 && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{ y: starsY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: getAnimationDuration(1.5) }}
        >
          {starPositions.map((star) => (
            <motion.div
              key={star.id}
              className={`absolute w-1 h-1 rounded-full ${
                isDark ? 'bg-white' : 'bg-gray-400'
              }`}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
              }}
              animate={{
                opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: star.delay,
              }}
            />
          ))}
        </motion.div>
      )}
      
      {/* Simplified Atmospheric Effects */}
      {isVisible && !shouldReduceAnimations && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-[3]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: getAnimationDuration(2) }}
        >
          {/* Simplified Pulses */}
          {pulseConfigs.map((pulse, i) => (
            <motion.div
              key={`pulse-${i}`}
              className={`absolute top-1/2 left-1/2 rounded-full ${pulse.color}`}
              style={{
                width: pulse.size,
                height: pulse.size,
                filter: `blur(${pulse.blur}px)`,
                transform: `translate(-50%, -50%) translate(${pulse.dx}px, ${pulse.dy}px)`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1,
              }}
            />
          ))}
        </motion.div>
      )}
      
      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Badge */}
        <motion.div 
          className="inline-flex items-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: getAnimationDuration(0.6) }}
        >
          <div className={`px-4 py-2 rounded-full border backdrop-blur-md ${
            isDark 
              ? 'border-purple-500/30 bg-purple-900/20' 
              : 'border-blue-500/30 bg-blue-100/20'
          }`}>
            <div className="flex items-center">
              <motion.div
                animate={{ rotate: shouldReduceAnimations ? 0 : 360 }}
                transition={{ 
                  duration: shouldReduceAnimations ? 0 : 3, 
                  repeat: shouldReduceAnimations ? 0 : Infinity, 
                  ease: "linear" 
                }}
              >
                <Sparkles className={`w-5 h-5 mr-2 ${isDark ? "text-pink-400" : "text-pink-500"}`} />
              </motion.div>
              <span className="text-sm font-medium tracking-wide">
                Pioneering Truth Discovery
              </span>
            </div>
          </div>
        </motion.div>
        
        {/* Main Title - Simplified Animation */}
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: getAnimationDuration(0.8), delay: 0.2 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-tight mb-6">
              <span className={`block ${isDark 
                ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400" 
                : "text-gray-900"
              }`}>
                Forge the Future of Verifiable Truth
              </span>
            </h1>
          </motion.div>
          
          <motion.p 
            className={`text-lg md:text-xl ${isDark ? "text-gray-300" : "text-gray-700"} mb-10 max-w-3xl mx-auto leading-relaxed`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: getAnimationDuration(0.6), delay: 0.4 }}
          >
            MoonSet leverages cutting-edge AI and the immutability of Blockchain to build a transparent, collaborative, and incentivized ecosystem for complex investigations.
          </motion.p>
          
          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: getAnimationDuration(0.6), delay: 0.6 }}
          >
            {session.isLoggedIn ? (
              <Link to="/dashboard">
                <motion.div
                  whileHover={shouldReduceAnimations ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceAnimations ? {} : { scale: 0.95 }}
                  className="relative"
                >
                  <Button 
                    size="lg" 
                    className={`px-8 py-3 relative overflow-hidden ${
                      isDark 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                    }`}
                    onClick={handleDashboardClick}
                  >
                    <span className="relative z-10 flex items-center">
                      Enter Dashboard 
                      {!shouldReduceAnimations ? (
                        <motion.div
                          className="ml-2"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      ) : (
                        <ArrowRight className="ml-2 w-5 h-5" />
                      )}
                    </span>
                  </Button>
                </motion.div>
              </Link>
            ) : (
              <Link to="/auth">
                <motion.div
                  whileHover={shouldReduceAnimations ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceAnimations ? {} : { scale: 0.95 }}
                  className="relative"
                >
                  <Button 
                    size="lg" 
                    className={`px-8 py-3 relative overflow-hidden ${
                      isDark 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                    }`}
                  >
                    <span className="relative z-10 flex items-center">
                      Join the Mission 
                      {!shouldReduceAnimations ? (
                        <motion.div
                          className="ml-2"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      ) : (
                        <ArrowRight className="ml-2 w-5 h-5" />
                      )}
                    </span>
                  </Button>
                </motion.div>
              </Link>
            )}
            <Link to="/whitepaper">
              <motion.div
                whileHover={shouldReduceAnimations ? {} : { scale: 1.05 }}
                whileTap={shouldReduceAnimations ? {} : { scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className={`px-8 py-3 backdrop-blur-md border-2 transition-all duration-300 ${
                    isDark 
                      ? 'border-purple-500/50 hover:border-purple-400 hover:bg-purple-500/10' 
                      : 'border-blue-500/50 hover:border-blue-400 hover:bg-blue-500/10'
                  }`}
                >
                  Read Whitepaper
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Optimized Feature Cards */}
        <motion.div 
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: getAnimationDuration(0.8), delay: 0.8 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={feature.title} 
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: getAnimationDuration(0.6), delay: 0.9 + index * 0.1 }}
              whileHover={shouldReduceAnimations ? {} : { scale: 1.02, y: -5 }}
            >
              <div className={`relative p-6 rounded-xl border backdrop-blur-md transition-all duration-300 ${
                isDark 
                  ? 'border-gray-700 bg-black/20 hover:bg-black/30' 
                  : 'border-gray-200 bg-white/10 hover:bg-white/20'
              }`}>
                {/* Icon */}
                <motion.div 
                  className={`flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                    isDark ? 'bg-gray-800' : 'bg-gray-100'
                  }`}
                  whileHover={shouldReduceAnimations ? {} : { rotate: 360 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  {feature.icon}
                </motion.div>
                
                <h3 className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  {feature.title}
                </h3>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {feature.description}
                </p>
                
                {/* Progress indicator */}
                <motion.div
                  className={`mt-4 h-1 rounded-full bg-gradient-to-r ${
                    isDark 
                      ? 'from-purple-500 to-pink-500' 
                      : 'from-blue-500 to-indigo-500'
                  }`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: getAnimationDuration(1), delay: 1.2 + index * 0.1 }}
                  style={{ originX: 0 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

