import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Telescope, Globe, Database, Target, Rocket, Zap, Activity, Brain } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { SpaceBackground } from "@/components/ui/specialized-backgrounds";
import { Card, SectionContainer, Heading, Grid, AnimatedIcon } from "@/components/ui/design-system";
import { memo, useRef, useMemo } from "react";

export const ApolloMissionSection = memo(() => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => 
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  // Parallax scroll effects for futuristic feel
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15]);

  const caseStudyFeatures = useMemo(() => [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Fascination",
      description: "Enduring public interest spanning generations with continuous debate and analysis",
      color: "primary" as const,
      delay: 0,
      glow: true
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Ready Dataset", 
      description: "Perfect complexity for demonstrating advanced machine learning capabilities",
      color: "secondary" as const,
      delay: 0.1,
      glow: true
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Rich Data Archive",
      description: "Vast repository of documentation, imagery, and testimonies for comprehensive analysis",
      color: "accent" as const,
      delay: 0.2,
      glow: false
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Protocol Showcase",
      description: "Ideal demonstration of our truth discovery framework's investigative power",
      color: "primary" as const,
      delay: 0.3,
      glow: false
    }
  ], []);

  const missionStats = useMemo(() => [
    { value: "50+", label: "Years of Data", icon: <Activity className="w-4 h-4" />, color: "blue" },
    { value: "1000s", label: "Documents", icon: <Database className="w-4 h-4" />, color: "purple" },
    { value: "6", label: "Missions", icon: <Rocket className="w-4 h-4" />, color: "cyan" },
    { value: "12", label: "Astronauts", icon: <Zap className="w-4 h-4" />, color: "orange" }
  ], []);
  
  return (
    <div ref={sectionRef} className="relative z-10 overflow-hidden">
      {/* Enhanced Space Background with parallax */}
      <motion.div style={{ y: prefersReducedMotion ? 0 : y }}>
      <SpaceBackground intensity="vibrant" />
      </motion.div>

      {/* Futuristic grid overlay */}
      {isInView && !prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 opacity-20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2 }}
        >
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(${isDark ? 'rgba(139, 69, 255, 0.1)' : 'rgba(59, 130, 246, 0.1)'} 1px, transparent 1px),
                linear-gradient(90deg, ${isDark ? 'rgba(139, 69, 255, 0.1)' : 'rgba(59, 130, 246, 0.1)'} 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
            }}
          />
        </motion.div>
      )}
      
      <SectionContainer padding="xl" background="transparent">
        {/* Futuristic Header with Holographic Effect */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 1, ease: "easeOut" }}
          className="text-center mb-16 relative"
          style={{ willChange: prefersReducedMotion ? 'auto' : 'transform, opacity' }}
        >
          {/* Holographic glow effect */}
          {isInView && !prefersReducedMotion && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-48 ${
                isDark 
                  ? 'bg-gradient-to-b from-purple-500/20 via-blue-500/10 to-transparent' 
                  : 'bg-gradient-to-b from-blue-500/15 via-purple-500/8 to-transparent'
              } rounded-full blur-3xl`} />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: prefersReducedMotion ? 0.3 : 0.8, delay: prefersReducedMotion ? 0 : 0.2 }}
            className="relative z-10"
          >
            <div className={`inline-flex items-center px-6 py-2 rounded-full border backdrop-blur-md mb-6 ${
              isDark 
                ? 'border-purple-500/30 bg-purple-500/10 text-purple-300' 
                : 'border-blue-500/30 bg-blue-500/5 text-blue-600'
            }`}>
              <Rocket className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium tracking-wide">CASE STUDY SPOTLIGHT</span>
            </div>

            <Heading level={2} className="mb-6">
              <span className={isDark 
                ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400" 
                : "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"
              }>
                The Apollo Missions
              </span>
              <br />
              <span className={isDark ? "text-white" : "text-gray-900"}>
                Pioneering Truth Discovery
              </span>
              </Heading>
              
              <motion.p 
                initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.3 : 0.6, delay: prefersReducedMotion ? 0 : 0.4 }}
                className={`text-lg ${isDark ? "text-gray-300" : "text-gray-700"} max-w-4xl mx-auto leading-relaxed`}
            >
              Deploying cutting-edge AI and blockchain technology to conduct the most comprehensive, 
              transparent analysis of humanity's greatest space achievement.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Futuristic Data Visualization Hub */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.8, delay: prefersReducedMotion ? 0 : 0.3 }}
          className="mb-16"
          style={{ 
            willChange: prefersReducedMotion ? 'auto' : 'transform, opacity',
            perspective: prefersReducedMotion ? 'none' : '1000px'
          }}
        >
          <Card 
            variant="glass" 
            size="lg" 
            glow={!prefersReducedMotion}
            className="relative overflow-hidden"
          >
            {/* Animated circuit pattern overlay */}
            {isInView && !prefersReducedMotion && (
              <motion.div
                className="absolute inset-0 opacity-10 pointer-events-none"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 2 }}
              >
                <svg className="w-full h-full" viewBox="0 0 400 300">
                  <defs>
                    <pattern id="circuit" patternUnits="userSpaceOnUse" width="40" height="40">
                      <path 
                        d="M20 0 L20 10 L30 10 L30 20 L40 20 M0 20 L10 20 L10 30 L20 30 L20 40" 
                        stroke={isDark ? "#8B5CF6" : "#3B82F6"} 
                        strokeWidth="1" 
                        fill="none"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#circuit)" />
                </svg>
              </motion.div>
            )}

            <div className="relative z-10 p-8">
              {/* Central Mission Data Display */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: prefersReducedMotion ? 0.3 : 0.8, delay: prefersReducedMotion ? 0 : 0.5 }}
                style={{ 
                  willChange: prefersReducedMotion ? 'auto' : 'transform, opacity',
                  transform: prefersReducedMotion ? 'none' : 'rotateX(5deg)'
                }}
                className="relative mb-8"
              >
                <div className="relative mx-auto max-w-2xl">
                  <motion.img
                    src={isDark
                      ? "/lovable-uploads/c3fcfc24-1f71-49d3-a7f4-e6b9c5a28e7b.png"
                      : "/lovable-uploads/97f34c4f-c50e-4c72-8ed4-30e9b65b5f01.png"
                    }
                    alt="Apollo Mission Analysis"
                    className="rounded-lg shadow-2xl max-w-full h-auto"
                    whileHover={prefersReducedMotion ? {} : { scale: 1.02, rotateY: 2 }}
                    transition={{ duration: 0.3 }}
                    style={{ willChange: prefersReducedMotion ? 'auto' : 'transform' }}
                  />
                  
                  {/* Holographic scan lines */}
                  {isInView && !prefersReducedMotion && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <div className="relative w-full h-full overflow-hidden rounded-lg">
                        <motion.div
                          className={`absolute w-full h-1 ${
                            isDark ? 'bg-cyan-400/50' : 'bg-blue-500/50'
                          } shadow-lg`}
                          animate={{ y: [0, 400] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                          style={{ 
                            boxShadow: `0 0 20px ${isDark ? '#22D3EE' : '#3B82F6'}` 
                          }}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Futuristic Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: prefersReducedMotion ? 0.3 : 0.6, delay: prefersReducedMotion ? 0 : 0.8 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {missionStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ 
                      duration: prefersReducedMotion ? 0.3 : 0.5, 
                      delay: prefersReducedMotion ? 0 : 0.9 + index * 0.1 
                    }}
                    whileHover={prefersReducedMotion ? {} : { 
                      scale: 1.05, 
                      y: -5,
                      boxShadow: `0 10px 30px ${
                        stat.color === 'blue' ? 'rgba(59, 130, 246, 0.3)' :
                        stat.color === 'purple' ? 'rgba(139, 69, 255, 0.3)' :
                        stat.color === 'cyan' ? 'rgba(34, 211, 238, 0.3)' :
                        'rgba(251, 146, 60, 0.3)'
                      }`
                    }}
                    className="relative"
                  >
                    <Card 
                      variant="glass" 
                      size="sm" 
                      className="text-center h-full"
                    >
                      {/* Animated icon */}
                      <motion.div
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full mb-2 ${
                          stat.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                          stat.color === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                          stat.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-400' :
                          'bg-orange-500/20 text-orange-400'
                        }`}
                        whileHover={prefersReducedMotion ? {} : { rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {stat.icon}
                  </motion.div>

                  <motion.div
                        className={`text-2xl font-bold mb-1 ${
                          stat.color === 'blue' ? 'text-blue-400' :
                          stat.color === 'purple' ? 'text-purple-400' :
                          stat.color === 'cyan' ? 'text-cyan-400' :
                          'text-orange-400'
                        }`}
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className={`text-xs font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                        {stat.label}
                      </div>

                      {/* Pulsing glow effect */}
                      {isInView && !prefersReducedMotion && (
                        <motion.div
                          className={`absolute inset-0 rounded-lg opacity-20 ${
                            stat.color === 'blue' ? 'bg-blue-500' :
                            stat.color === 'purple' ? 'bg-purple-500' :
                            stat.color === 'cyan' ? 'bg-cyan-500' :
                            'bg-orange-500'
                          }`}
                          animate={{ 
                            scale: [1, 1.1, 1], 
                            opacity: [0.1, 0.3, 0.1] 
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            delay: index * 0.5 
                          }}
                        />
                      )}
                    </Card>
                  </motion.div>
                ))}
                </motion.div>
              </div>
          </Card>
        </motion.div>

        {/* Enhanced Feature Cards with Futuristic Design */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.8, delay: prefersReducedMotion ? 0 : 0.6 }}
          className="mb-16"
        >
          <Heading level={3} className="text-center mb-12">
            <span className={isDark ? "text-white" : "text-gray-900"}>
              Why Apollo as Our
            </span>{" "}
            <span className={isDark 
              ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400" 
              : "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600"
            }>
              First Investigation?
            </span>
          </Heading>
          
          <Grid cols={2} gap="lg">
            {caseStudyFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50, rotateX: 15 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: 15 }}
                transition={{ 
                  duration: prefersReducedMotion ? 0.3 : 0.6, 
                  delay: prefersReducedMotion ? 0 : feature.delay + 0.8,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={prefersReducedMotion ? {} : { 
                  scale: 1.02, 
                  y: -8,
                  rotateY: index % 2 === 0 ? 2 : -2
                }}
                style={{ 
                  willChange: prefersReducedMotion ? 'auto' : 'transform, opacity',
                  perspective: prefersReducedMotion ? 'none' : '1000px'
                }}
              >
                <Card 
                  variant="glass" 
                  size="md" 
                  glow={feature.glow && !prefersReducedMotion}
                  className="h-full transition-all duration-300 relative overflow-hidden group"
                >
                  {/* Dynamic background effect */}
                  {feature.glow && isInView && !prefersReducedMotion && (
                    <motion.div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${
                        feature.color === 'primary' 
                          ? 'bg-gradient-to-br from-purple-500 to-blue-500'
                          : feature.color === 'secondary'
                          ? 'bg-gradient-to-br from-pink-500 to-purple-500'
                          : 'bg-gradient-to-br from-orange-500 to-red-500'
                      }`}
                      animate={{ 
                        background: [
                          `linear-gradient(45deg, ${
                            feature.color === 'primary' ? '#8B5CF6, #3B82F6' :
                            feature.color === 'secondary' ? '#EC4899, #8B5CF6' :
                            '#F97316, #EF4444'
                          })`,
                          `linear-gradient(225deg, ${
                            feature.color === 'primary' ? '#3B82F6, #8B5CF6' :
                            feature.color === 'secondary' ? '#8B5CF6, #EC4899' :
                            '#EF4444, #F97316'
                          })`,
                          `linear-gradient(45deg, ${
                            feature.color === 'primary' ? '#8B5CF6, #3B82F6' :
                            feature.color === 'secondary' ? '#EC4899, #8B5CF6' :
                            '#F97316, #EF4444'
                          })`
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  )}

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-4">
                      <AnimatedIcon 
                        color={feature.color} 
                        size="md" 
                        glow={feature.glow && !prefersReducedMotion}
                      >
                        {feature.icon}
                      </AnimatedIcon>
                    </div>
                    
                    <h4 className={`text-lg font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                      {feature.title}
                    </h4>
                    
                    <p className={`${isDark ? "text-gray-300" : "text-gray-700"} leading-relaxed flex-grow`}>
                      {feature.description}
                    </p>
                    
                    {/* Enhanced progress bar with glow */}
                    <motion.div 
                      className={`mt-4 h-1 rounded-full relative overflow-hidden ${
                        feature.color === 'primary' 
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                          : feature.color === 'secondary'
                          ? 'bg-gradient-to-r from-pink-500 to-purple-500'
                          : 'bg-gradient-to-r from-orange-500 to-red-500'
                      }`}
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{ duration: prefersReducedMotion ? 0.3 : 1, delay: feature.delay + 1.2 }}
                      style={{ originX: 0 }}
                    >
                      {/* Animated shimmer effect */}
                      {isInView && !prefersReducedMotion && (
                        <motion.div
                          className="absolute inset-0 bg-white/30"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            repeatDelay: 3,
                            delay: feature.delay + 2
                          }}
                        />
                      )}
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </Grid>
        </motion.div>

        {/* Futuristic Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.8, delay: prefersReducedMotion ? 0 : 1.2 }}
          className="text-center"
        >
          <Card variant="gradient" size="lg" className="max-w-4xl mx-auto relative overflow-hidden">
            {/* Animated background pattern */}
            {isInView && !prefersReducedMotion && (
              <motion.div
                className="absolute inset-0 opacity-10"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className={`w-full h-full bg-gradient-conic ${
                  isDark 
                    ? 'from-purple-500 via-blue-500 via-cyan-500 to-purple-500' 
                    : 'from-blue-600 via-purple-600 via-cyan-600 to-blue-600'
                }`} />
              </motion.div>
            )}

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: prefersReducedMotion ? 0.3 : 0.6, delay: prefersReducedMotion ? 0 : 1.4 }}
              >
                <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              Join the Apollo Investigation
            </h3>
                <p className={`${isDark ? "text-gray-300" : "text-gray-700"} mb-8 text-lg max-w-2xl mx-auto`}>
                  Be part of the most comprehensive, transparent analysis of humanity's greatest space achievement 
                  using cutting-edge AI and blockchain technology.
                </p>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: prefersReducedMotion ? 0.3 : 0.6, delay: prefersReducedMotion ? 0 : 1.6 }}
                whileHover={prefersReducedMotion ? {} : { 
                  scale: 1.05, 
                  boxShadow: `0 20px 40px ${isDark ? 'rgba(139, 69, 255, 0.4)' : 'rgba(59, 130, 246, 0.4)'}` 
                }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                className={`inline-flex items-center px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 relative overflow-hidden ${
                isDark 
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-purple-500/25" 
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-blue-500/25"
              }`}
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
              Explore Apollo Data
                  <motion.div
                    className="ml-2"
                    animate={prefersReducedMotion ? {} : { x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Target className="w-5 h-5" />
            </motion.div>
                </span>
              </motion.button>
            </div>
          </Card>
        </motion.div>
      </SectionContainer>
    </div>
  );
});

ApolloMissionSection.displayName = 'ApolloMissionSection';
