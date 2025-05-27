import { useTheme } from "@/context/ThemeContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion, useInView } from "framer-motion";
import { 
  FileText, 
  Brain, 
  Shield, 
  Coins, 
  Target, 
  Globe, 
  Database, 
  Telescope, 
  Zap, 
  Users,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Download,
  BookOpen,
  Rocket,
  Settings,
  CheckCircle
} from "lucide-react";
import { SpaceBackground } from "@/components/ui/specialized-backgrounds";
import { CosmicBackground } from "@/components/ui/cosmic-background";
import { Card, SectionContainer, Heading, Grid, AnimatedIcon, DesignButton } from "@/components/ui/design-system";
import { Button } from "@/components/ui/button";
import { memo, useRef, useState, useMemo } from "react";

// Enhanced Cosmic Animation Components
const StarField = memo(({ isDark, intensity = 'medium', count = 50 }: { 
  isDark: boolean; 
  intensity?: 'subtle' | 'medium' | 'vibrant';
  count?: number;
}) => {
  const stars = useMemo(() => 
    Array(count).fill(null).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      twinkleDelay: Math.random() * 5,
      twinkleDuration: Math.random() * 3 + 2,
    })), [count]
  );

  const intensityMap = {
    subtle: { opacity: 0.6, glow: 4 },
    medium: { opacity: 0.8, glow: 6 },
    vibrant: { opacity: 1.0, glow: 8 }
  };

  const config = intensityMap[intensity];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: isDark 
              ? `radial-gradient(circle, rgba(255, 255, 255, ${star.opacity * config.opacity}) 0%, transparent 70%)`
              : `radial-gradient(circle, rgba(200, 255, 200, ${star.opacity * config.opacity}) 0%, transparent 70%)`,
            boxShadow: isDark
              ? `0 0 ${config.glow}px rgba(255, 255, 255, ${star.opacity * 0.8})`
              : `0 0 ${config.glow}px rgba(34, 197, 94, ${star.opacity * 0.6})`,
          }}
          animate={{
            opacity: [star.opacity * config.opacity, star.opacity * config.opacity * 0.3, star.opacity * config.opacity],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.twinkleDuration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.twinkleDelay,
          }}
        />
      ))}
    </div>
  );
});

const NebulaField = memo(({ isDark, intensity = 'medium' }: { 
  isDark: boolean; 
  intensity?: 'subtle' | 'medium' | 'vibrant';
}) => {
  const nebulas = useMemo(() => 
    Array(4).fill(null).map((_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      width: Math.random() * 300 + 200,
      height: Math.random() * 200 + 150,
      rotation: Math.random() * 360,
      hue: Math.random() * 40 + (isDark ? 120 : 100),
      blur: Math.random() * 30 + 40,
    })), [isDark]
  );

  const intensityMap = {
    subtle: { opacity: 0.15, scale: 0.8 },
    medium: { opacity: 0.25, scale: 1.0 },
    vibrant: { opacity: 0.4, scale: 1.2 }
  };

  const config = intensityMap[intensity];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {nebulas.map((nebula) => (
        <motion.div
          key={nebula.id}
          className="absolute"
          style={{
            left: `${nebula.x}%`,
            top: `${nebula.y}%`,
            width: `${nebula.width}px`,
            height: `${nebula.height}px`,
            background: `radial-gradient(ellipse, 
              hsla(${nebula.hue}, 70%, 60%, ${config.opacity}) 0%, 
              hsla(${nebula.hue + 30}, 60%, 70%, ${config.opacity * 0.6}) 30%, 
              transparent 70%)`,
            filter: `blur(${nebula.blur}px)`,
            transform: `translate(-50%, -50%) rotate(${nebula.rotation}deg)`,
          }}
          animate={{
            opacity: [config.opacity, config.opacity * 0.7, config.opacity],
            scale: [config.scale, config.scale * 1.1, config.scale],
            rotate: [nebula.rotation, nebula.rotation + 180, nebula.rotation + 360],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
});

const ShootingStars = memo(({ isDark, count = 3 }: { isDark: boolean; count?: number }) => {
  const shootingStars = useMemo(() => 
    Array(count).fill(null).map((_, i) => ({
      id: i,
      startX: Math.random() * 50,
      startY: Math.random() * 50,
      endX: Math.random() * 100 + 50,
      endY: Math.random() * 100 + 50,
      delay: Math.random() * 10 + 2,
      duration: Math.random() * 2 + 1,
      tailLength: Math.random() * 100 + 50,
    })), [count]
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {shootingStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute"
          style={{
            left: `${star.startX}%`,
            top: `${star.startY}%`,
            width: '2px',
            height: '2px',
            background: isDark ? '#00FF88' : '#22C55E',
            borderRadius: '50%',
            boxShadow: isDark
              ? `0 0 8px rgba(0, 255, 136, 0.8), 0 0 16px rgba(0, 255, 136, 0.4)`
              : `0 0 8px rgba(34, 197, 94, 0.8), 0 0 16px rgba(34, 197, 94, 0.4)`,
          }}
          animate={{
            x: [`0%`, `${star.endX - star.startX}vw`],
            y: [`0%`, `${star.endY - star.startY}vh`],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeOut",
            delay: star.delay,
            repeatDelay: Math.random() * 8 + 5,
          }}
        >
          {/* Shooting star tail */}
          <motion.div
            className="absolute top-0 left-0"
            style={{
              width: `${star.tailLength}px`,
              height: '1px',
              background: isDark
                ? `linear-gradient(90deg, rgba(0, 255, 136, 0.8) 0%, transparent 100%)`
                : `linear-gradient(90deg, rgba(34, 197, 94, 0.8) 0%, transparent 100%)`,
              transformOrigin: 'left center',
              transform: `rotate(${Math.atan2(star.endY - star.startY, star.endX - star.startX)}rad)`,
            }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: "easeOut",
              delay: star.delay,
              repeatDelay: Math.random() * 8 + 5,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
});

const CosmicDust = memo(({ isDark, intensity = 'medium' }: { 
  isDark: boolean; 
  intensity?: 'subtle' | 'medium' | 'vibrant';
}) => {
  const dustParticles = useMemo(() => {
    const counts = { subtle: 20, medium: 30, vibrant: 40 };
    return Array(counts[intensity]).fill(null).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      driftX: (Math.random() - 0.5) * 50,
      driftY: (Math.random() - 0.5) * 30,
      opacity: Math.random() * 0.4 + 0.1,
      duration: Math.random() * 15 + 10,
    }));
  }, [intensity]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {dustParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: isDark 
              ? `rgba(100, 255, 180, ${particle.opacity})`
              : `rgba(34, 197, 94, ${particle.opacity})`,
            filter: 'blur(0.5px)',
          }}
          animate={{
            x: [0, particle.driftX, -particle.driftX, 0],
            y: [0, particle.driftY, -particle.driftY, 0],
            opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
});

const PulsarEffect = memo(({ isDark }: { isDark: boolean }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Central pulsar */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '4px',
          height: '4px',
          background: isDark ? '#00FF88' : '#22C55E',
          borderRadius: '50%',
        }}
        animate={{
          boxShadow: [
            `0 0 0px ${isDark ? '#00FF88' : '#22C55E'}`,
            `0 0 30px ${isDark ? '#00FF88' : '#22C55E'}, 0 0 60px ${isDark ? '#00FF8880' : '#22C55E80'}`,
            `0 0 0px ${isDark ? '#00FF88' : '#22C55E'}`,
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Pulsar rings */}
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border rounded-full"
          style={{
            width: `${ring * 150}px`,
            height: `${ring * 150}px`,
            border: `1px solid ${isDark ? 'rgba(0, 255, 136, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeOut",
            delay: ring * 0.5,
          }}
        />
      ))}
    </div>
  );
});

const Whitepaper = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => 
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  // Section expansion states
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${isDark ? "bg-[#060606]" : "bg-[#f8f8f8]"}`}>
      {/* Global Full-Width Cosmic Background Layer */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <SpaceBackground intensity="subtle" />
        {!prefersReducedMotion && (
          <>
            {/* Continuous star field across entire viewport */}
            <StarField isDark={isDark} intensity="subtle" count={150} />
            {/* Gentle cosmic dust throughout */}
            <CosmicDust isDark={isDark} intensity="subtle" />
          </>
        )}
      </div>

      {/* Content with enhanced section transitions */}
      <div className="relative z-10">
        <Navigation />

        {/* Hero Section - Executive Summary */}
        <WhitepaperHero isDark={isDark} prefersReducedMotion={prefersReducedMotion} />

        {/* Mission Overview - Core Technologies */}
        <MissionOverview isDark={isDark} prefersReducedMotion={prefersReducedMotion} />

        {/* Apollo Case Study Showcase */}
        <ApolloShowcase isDark={isDark} prefersReducedMotion={prefersReducedMotion} />

        {/* Technology Deep Dive Sections */}
        <TechnologySections 
          isDark={isDark} 
          prefersReducedMotion={prefersReducedMotion}
          expandedSections={expandedSections}
          toggleSection={toggleSection}
        />

        {/* Tokenomics Interactive Section */}
        <TokenomicsSection isDark={isDark} prefersReducedMotion={prefersReducedMotion} />

        {/* Roadmap and Future */}
        <RoadmapSection isDark={isDark} prefersReducedMotion={prefersReducedMotion} />

        {/* Call to Action */}
        <WhitepaperCTA isDark={isDark} prefersReducedMotion={prefersReducedMotion} />
        
        <Footer />
      </div>
    </div>
  );
};

// Hero Section Component
const WhitepaperHero = memo(({ isDark, prefersReducedMotion }: { isDark: boolean; prefersReducedMotion: boolean }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center pt-20 pb-10">
      {/* Full-Width Enhanced Space Background with Layered Effects */}
      <div className="absolute inset-0 w-screen overflow-hidden pointer-events-none">
        <SpaceBackground intensity="vibrant" />
        {!prefersReducedMotion && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 3, ease: "easeOut" }}
            >
              <StarField isDark={isDark} intensity="vibrant" count={120} />
              <NebulaField isDark={isDark} intensity="vibrant" />
              <ShootingStars isDark={isDark} count={8} />
              <CosmicDust isDark={isDark} intensity="medium" />
              <PulsarEffect isDark={isDark} />
            </motion.div>
          </>
        )}
        
        {/* Enhanced atmospheric gradient overlay */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 4, ease: "easeInOut" }}
          style={{
            background: isDark
              ? `radial-gradient(ellipse 120% 80% at 50% 20%, rgba(34, 197, 94, 0.15) 0%, rgba(16, 185, 129, 0.1) 30%, transparent 70%),
                 radial-gradient(ellipse 80% 120% at 80% 80%, rgba(34, 197, 94, 0.12) 0%, rgba(5, 150, 105, 0.08) 40%, transparent 70%)`
              : `radial-gradient(ellipse 120% 80% at 50% 20%, rgba(34, 197, 94, 0.08) 0%, rgba(16, 185, 129, 0.05) 30%, transparent 70%),
                 radial-gradient(ellipse 80% 120% at 80% 80%, rgba(34, 197, 94, 0.06) 0%, rgba(5, 150, 105, 0.04) 40%, transparent 70%)`,
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.8 }}
          className="text-center mb-12"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: prefersReducedMotion ? 0.3 : 0.6, delay: prefersReducedMotion ? 0 : 0.2 }}
            className="inline-flex items-center mb-8"
          >
            <div className={`px-6 py-3 rounded-full border backdrop-blur-md ${
              isDark 
                ? 'border-green-500/30 bg-green-900/20' 
                : 'border-green-500/30 bg-green-100/20'
            }`}>
              <div className="flex items-center">
                <Rocket className={`w-6 h-6 mr-3 ${isDark ? "text-green-400" : "text-green-500"}`} />
                <span className="text-lg font-medium tracking-wide">
                  Technical Whitepaper
                </span>
              </div>
            </div>
          </motion.div>

          {/* Main Title */}
          <Heading level={1} gradient={isDark} className="max-w-4xl mx-auto mb-8">
            MoonSet Truth Protocol: Revolutionizing Evidence-Based Investigation
          </Heading>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: prefersReducedMotion ? 0.3 : 0.6, delay: prefersReducedMotion ? 0 : 0.4 }}
            className={`text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Combining artificial intelligence, blockchain technology, and economic incentives to enable unprecedented analysis of complex historical events.
          </motion.p>

          {/* Key Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: prefersReducedMotion ? 0.3 : 0.6, delay: prefersReducedMotion ? 0 : 0.6 }}
          >
            <Grid cols={3} gap="lg" className="max-w-4xl mx-auto mb-12">
              {[
                { number: "3", label: "Core Technologies", icon: <Settings className="w-6 h-6" /> },
                { number: "∞", label: "Evidence Integrity", icon: <Shield className="w-6 h-6" /> },
                { number: "Apollo", label: "First Case Study", icon: <Rocket className="w-6 h-6" /> }
              ].map((stat, index) => (
                <Card key={stat.label} variant="glass" size="md" glow={!prefersReducedMotion}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ 
                      duration: prefersReducedMotion ? 0.3 : 0.5, 
                      delay: prefersReducedMotion ? 0 : 0.8 + index * 0.1 
                    }}
                    className="text-center"
                  >
                    <div className={`mb-3 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                      {stat.icon}
                    </div>
                    <div className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {stat.number}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {stat.label}
                    </div>
                  </motion.div>
                </Card>
              ))}
            </Grid>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: prefersReducedMotion ? 0.3 : 0.6, delay: prefersReducedMotion ? 0 : 0.8 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            <DesignButton variant="gradient" size="lg" glow>
              <BookOpen className="w-5 h-5 mr-2" />
              Start Reading
            </DesignButton>
            <DesignButton variant="outline" size="lg">
              <Download className="w-5 h-5 mr-2" />
              Download PDF
            </DesignButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

// Mission Overview Component
const MissionOverview = memo(({ isDark, prefersReducedMotion }: { isDark: boolean; prefersReducedMotion: boolean }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const technologies = [
    {
      icon: <Brain className="w-8 h-8" />,
      name: "MARE",
      fullName: "MoonSet AI Research Engine",
      description: "Advanced AI system for evidence analysis and anomaly detection",
      capabilities: ["Multi-modal Data Processing", "Visual Analysis", "Natural Language Processing", "Anomaly Detection"],
      color: "primary" as const
    },
    {
      icon: <Shield className="w-8 h-8" />,
      name: "DEL",
      fullName: "Decentralized Evidence Ledger",
      description: "Blockchain-based immutable evidence repository with provenance tracking",
      capabilities: ["Immutable Storage", "Provenance Tracking", "Transparent Registry", "Access Control"],
      color: "secondary" as const
    },
    {
      icon: <Coins className="w-8 h-8" />,
      name: "MOONSET",
      fullName: "Utility Token Ecosystem",
      description: "Economic incentives for quality research and platform governance",
      capabilities: ["Contribution Rewards", "Platform Governance", "Service Access", "Staking Mechanisms"],
      color: "accent" as const
    }
  ];

  return (
    <section className="relative py-24">
      {/* Full-Width Background with Seamless Transition */}
      <div className="absolute inset-0 w-screen overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <CosmicBackground intensity="medium" showOrbs={true} showParticles={!prefersReducedMotion} />
        </motion.div>
        
        {!prefersReducedMotion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
          >
            <StarField isDark={isDark} intensity="medium" count={80} />
            <NebulaField isDark={isDark} intensity="medium" />
            <CosmicDust isDark={isDark} intensity="subtle" />
          </motion.div>
        )}
        
        {/* Transition gradient from previous section */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 2, delay: 1 }}
          style={{
            background: isDark
              ? `linear-gradient(to bottom, transparent 0%, rgba(34, 197, 94, 0.05) 50%, transparent 100%)`
              : `linear-gradient(to bottom, transparent 0%, rgba(34, 197, 94, 0.03) 50%, transparent 100%)`,
          }}
        />
      </div>
      
      <SectionContainer background="transparent" padding="xl">
        <div ref={sectionRef} className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
            className="text-center mb-16"
          >
            <Heading level={2} className="max-w-4xl mx-auto mb-6">
              Mission Control: Core Technology Suite
            </Heading>
            <p className={`text-lg max-w-3xl mx-auto ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Three integrated technological pillars designed to address critical aspects of collaborative truth discovery.
            </p>
          </motion.div>

          <Grid cols={1} gap="lg" className="max-w-6xl mx-auto">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                transition={{ 
                  duration: prefersReducedMotion ? 0.3 : 0.6, 
                  delay: prefersReducedMotion ? 0 : index * 0.2 
                }}
              >
                <Card variant="gradient" size="lg" glow={!prefersReducedMotion}>
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    {/* Icon and Title */}
                    <div className="flex-shrink-0 text-center lg:text-left">
                      <AnimatedIcon color={tech.color} size="lg" glow={!prefersReducedMotion}>
                        {tech.icon}
                      </AnimatedIcon>
                      <div className="mt-4">
                        <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {tech.name}
                        </h3>
                        <h4 className={`text-lg font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {tech.fullName}
                        </h4>
                      </div>
                    </div>

                    {/* Description and Capabilities */}
                    <div className="flex-1">
                      <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {tech.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {tech.capabilities.map((capability, capIndex) => (
                          <div key={capability} className="flex items-center">
                            <CheckCircle className={`w-5 h-5 mr-2 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              {capability}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </Grid>
        </div>
      </SectionContainer>
    </section>
  );
});

// Apollo Showcase Component
const ApolloShowcase = memo(({ isDark, prefersReducedMotion }: { isDark: boolean; prefersReducedMotion: boolean }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const researchAreas = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Photographic Analysis",
      description: "Comprehensive photogrammetric reconstruction and shadow analysis"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Technical Feasibility",
      description: "Engineering capability assessment and radiation modeling"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Material Evidence",
      description: "Lunar samples cataloging and chain of custody analysis"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Testimony Review",
      description: "Systematic comparison of accounts across mission personnel"
    }
  ];

  return (
    <section className="relative py-24">
      {/* Full-Width Dynamic Background */}
      <div className="absolute inset-0 w-screen overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        >
          <SpaceBackground intensity="medium" />
        </motion.div>
        
        {!prefersReducedMotion && (
          <>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
            >
              <StarField isDark={isDark} intensity="vibrant" count={100} />
              <ShootingStars isDark={isDark} count={6} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, rotate: -10 }}
              animate={isInView ? { opacity: 1, rotate: 0 } : { opacity: 0, rotate: -10 }}
              transition={{ duration: 4, delay: 1, ease: "easeInOut" }}
            >
              <CosmicDust isDark={isDark} intensity="medium" />
              <NebulaField isDark={isDark} intensity="subtle" />
            </motion.div>
          </>
        )}
        
        {/* Apollo-themed atmospheric effects */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 3, delay: 1.5 }}
          style={{
            background: isDark
              ? `radial-gradient(ellipse 100% 60% at 30% 40%, rgba(34, 197, 94, 0.1) 0%, transparent 60%),
                 radial-gradient(ellipse 80% 50% at 70% 60%, rgba(16, 185, 129, 0.08) 0%, transparent 50%)`
              : `radial-gradient(ellipse 100% 60% at 30% 40%, rgba(34, 197, 94, 0.05) 0%, transparent 60%),
                 radial-gradient(ellipse 80% 50% at 70% 60%, rgba(16, 185, 129, 0.04) 0%, transparent 50%)`,
          }}
        />
      </div>
      
      <SectionContainer background="transparent" padding="xl">
        <div ref={sectionRef} className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
            className="text-center mb-16"
          >
            <Heading level={2} className="max-w-4xl mx-auto mb-6">
              Apollo Missions: First Investigation Case Study
            </Heading>
            <p className={`text-lg max-w-3xl mx-auto ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Demonstrating the power of our platform through rigorous analysis of one of humanity's greatest claimed achievements.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-12 items-center max-w-7xl mx-auto">
            {/* Research Areas */}
            <div className="flex-1">
              <Grid cols={2} gap="md">
                {researchAreas.map((area, index) => (
                  <motion.div
                    key={area.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ 
                      duration: prefersReducedMotion ? 0.3 : 0.5, 
                      delay: prefersReducedMotion ? 0 : index * 0.1 
                    }}
                  >
                    <Card variant="glass" size="md">
                      <div className="text-center">
                        <div className={`mb-4 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                          {area.icon}
                        </div>
                        <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {area.title}
                        </h4>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {area.description}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </Grid>
            </div>

            {/* Apollo Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: prefersReducedMotion ? 0.3 : 0.8, delay: prefersReducedMotion ? 0 : 0.4 }}
              className="flex-1 lg:max-w-md"
            >
              <Card variant="gradient" size="lg" glow={!prefersReducedMotion}>
                <div className="text-center">
                  <motion.div
                    animate={prefersReducedMotion ? {} : { rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-6"
                  >
                    <Globe className={`w-24 h-24 mx-auto ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                  </motion.div>
                  
                  <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Why Apollo Missions?
                  </h3>
                  
                  <ul className={`text-left space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <li className="flex items-start">
                      <CheckCircle className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                      <span>Historical significance and ongoing public interest</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                      <span>Rich evidence base across multiple data types</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                      <span>Technical complexity ideal for AI analysis</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                      <span>Methodological blueprint for future investigations</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
});

// Technology Sections Component (Expandable)
const TechnologySections = memo(({ 
  isDark, 
  prefersReducedMotion, 
  expandedSections, 
  toggleSection 
}: { 
  isDark: boolean; 
  prefersReducedMotion: boolean;
  expandedSections: Record<string, boolean>;
  toggleSection: (sectionId: string) => void;
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const sections = [
    {
      id: "research-methodology",
      title: "Research Methodology",
      subtitle: "Evidence-Based Investigation Framework",
      icon: <Telescope className="w-6 h-6" />,
      preview: "Rigorous standards for evidence classification, peer review, and consensus-building in collaborative research.",
      content: `Our research methodology establishes new standards for collaborative investigation:

Evidence Classification Framework:
• Multi-tier evidence verification system
• Source reliability assessment protocols
• Cross-reference validation mechanisms
• Temporal and spatial consistency checking

Peer Review Protocol:
• Anonymous expert evaluation system
• Reputation-based reviewer selection
• Conflict of interest disclosure requirements
• Transparent review process documentation

Consensus Mechanisms:
• Weighted voting based on expertise and stake
• Bayesian probability assessment for competing hypotheses
• Evidence strength quantification methods
• Convergence detection algorithms`
    },
    {
      id: "token-economics",
      title: "Token Economics",
      subtitle: "Sustainable Economic Model",
      icon: <Coins className="w-6 h-6" />,
      preview: "Comprehensive tokenomics designed to reward quality contributions and align long-term incentives.",
      content: `The MOONSET token ecosystem creates sustainable value alignment:

Distribution Model:
• Fair launch with community allocation
• Research contribution rewards (40%)
• Development team allocation (20%)
• Community treasury (30%)
• Liquidity provision (10%)

Utility Framework:
• Platform access and premium features
• Computational resource allocation
• Governance voting weight
• Staking rewards and yield generation

Value Accrual Mechanisms:
• Fee distribution to token holders
• Treasury buyback programs
• Service demand-driven utilization
• Protocol revenue sharing`
    },
    {
      id: "governance-dao",
      title: "Governance & DAO",
      subtitle: "Decentralized Decision Making",
      icon: <Users className="w-6 h-6" />,
      preview: "Community-driven governance structure enabling democratic participation in platform evolution.",
      content: `The MoonSet DAO ensures community control over platform development:

Governance Framework:
• Token-weighted voting on protocol upgrades
• Research direction prioritization
• Treasury management and allocation
• Validator selection and management

Proposal System:
• Community-initiated improvement proposals
• Technical review and feasibility assessment
• Stakeholder discussion and debate periods
• Implementation roadmap development

Treasury Management:
• Transparent fund allocation
• Research grant distribution
• Infrastructure maintenance funding
• Community incentive programs`
    }
  ];

  return (
    <section className="relative py-24">
      {/* Full-Width Adaptive Background */}
      <div className="absolute inset-0 w-screen overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <CosmicBackground intensity="subtle" showGrid={true} showParticles={!prefersReducedMotion} />
        </motion.div>
        
        {!prefersReducedMotion && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
            >
              <StarField isDark={isDark} intensity="subtle" count={60} />
              <CosmicDust isDark={isDark} intensity="vibrant" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
              transition={{ duration: 4, delay: 1, ease: "easeInOut" }}
            >
              <NebulaField isDark={isDark} intensity="medium" />
            </motion.div>
          </>
        )}
        
        {/* Interactive background that responds to section expansions */}
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: Object.keys(expandedSections).some(key => expandedSections[key]) ? 0.8 : 0.4,
          }}
          transition={{ duration: 1 }}
          style={{
            background: isDark
              ? `radial-gradient(ellipse 120% 80% at 50% 50%, rgba(34, 197, 94, 0.08) 0%, transparent 70%)`
              : `radial-gradient(ellipse 120% 80% at 50% 50%, rgba(34, 197, 94, 0.04) 0%, transparent 70%)`,
          }}
        />
      </div>
      
      <SectionContainer background="transparent" padding="xl">
        <div ref={sectionRef} className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
            className="text-center mb-16"
          >
            <Heading level={2} className="max-w-4xl mx-auto mb-6">
              Deep Dive: Technical Architecture
            </Heading>
            <p className={`text-lg max-w-3xl mx-auto ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Explore the detailed technical specifications and methodologies powering the MoonSet platform.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ 
                  duration: prefersReducedMotion ? 0.3 : 0.5, 
                  delay: prefersReducedMotion ? 0 : index * 0.1 
                }}
              >
                <Card variant="gradient" size="lg">
                  {/* Section Header */}
                  <motion.div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleSection(section.id)}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <div className="flex items-center flex-1">
                      <div className={`mr-4 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                        {section.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {section.title}
                        </h3>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {section.subtitle}
                        </p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedSections[section.id] ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className={`w-6 h-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                    </motion.div>
                  </motion.div>

                  {/* Preview */}
                  <div className="mt-4">
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {section.preview}
                    </p>
                  </div>

                  {/* Expandable Content */}
                  <motion.div
                    initial={false}
                    animate={{ 
                      height: expandedSections[section.id] ? "auto" : 0,
                      opacity: expandedSections[section.id] ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <div className={`prose prose-lg max-w-none ${isDark ? 'prose-invert' : ''}`}>
                        <pre className={`whitespace-pre-wrap text-sm leading-relaxed ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {section.content}
                        </pre>
                      </div>
                    </div>
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
});

// Tokenomics Section Component
const TokenomicsSection = memo(({ isDark, prefersReducedMotion }: { isDark: boolean; prefersReducedMotion: boolean }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section className="relative py-24">
      {/* Full-Width Financial-Themed Background */}
      <div className="absolute inset-0 w-screen overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 1.2 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.2 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        >
          <SpaceBackground intensity="subtle" />
        </motion.div>
        
        {!prefersReducedMotion && (
          <>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
              transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
            >
              <StarField isDark={isDark} intensity="medium" count={90} />
              <ShootingStars isDark={isDark} count={4} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
              transition={{ duration: 4, delay: 1, ease: "easeInOut" }}
            >
              <NebulaField isDark={isDark} intensity="vibrant" />
              <CosmicDust isDark={isDark} intensity="subtle" />
              <PulsarEffect isDark={isDark} />
            </motion.div>
          </>
        )}
        
        {/* Economic-themed gradients */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 3, delay: 2 }}
          style={{
            background: isDark
              ? `conic-gradient(from 45deg at 25% 25%, rgba(34, 197, 94, 0.1) 0deg, transparent 120deg),
                 conic-gradient(from 225deg at 75% 75%, rgba(16, 185, 129, 0.08) 0deg, transparent 120deg)`
              : `conic-gradient(from 45deg at 25% 25%, rgba(34, 197, 94, 0.05) 0deg, transparent 120deg),
                 conic-gradient(from 225deg at 75% 75%, rgba(16, 185, 129, 0.04) 0deg, transparent 120deg)`,
          }}
        />
      </div>
      
      <SectionContainer background="transparent" padding="xl">
        <div ref={sectionRef} className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
            className="text-center mb-16"
          >
            <Heading level={2} className="max-w-4xl mx-auto mb-6">
              MOONSET Token: Fueling Discovery
            </Heading>
            <p className={`text-lg max-w-3xl mx-auto ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              A utility token designed to reward quality research and enable sustainable platform growth.
            </p>
          </motion.div>

          {/* Token Distribution Visualization */}
          <div className="flex flex-col lg:flex-row gap-12 items-center max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: prefersReducedMotion ? 0.3 : 0.6, delay: prefersReducedMotion ? 0 : 0.2 }}
              className="flex-1"
            >
              <Card variant="glass" size="lg" glow={!prefersReducedMotion}>
                <div className="text-center">
                  <h3 className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Token Allocation
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: "Research Rewards", percentage: "40%", color: isDark ? "text-green-400" : "text-green-600" },
                      { label: "Community Treasury", percentage: "30%", color: isDark ? "text-green-400" : "text-green-600" },
                      { label: "Development Team", percentage: "20%", color: isDark ? "text-emerald-400" : "text-emerald-600" },
                      { label: "Liquidity", percentage: "10%", color: isDark ? "text-lime-400" : "text-lime-600" }
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ 
                          duration: prefersReducedMotion ? 0.3 : 0.5, 
                          delay: prefersReducedMotion ? 0 : 0.4 + index * 0.1 
                        }}
                        className="text-center"
                      >
                        <div className={`text-3xl font-bold mb-2 ${item.color}`}>
                          {item.percentage}
                        </div>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {item.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: prefersReducedMotion ? 0.3 : 0.6, delay: prefersReducedMotion ? 0 : 0.4 }}
              className="flex-1"
            >
              <Card variant="gradient" size="lg">
                <div>
                  <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Utility Features
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      { icon: <Zap className="w-5 h-5" />, title: "Platform Access", desc: "Premium features and tools" },
                      { icon: <Users className="w-5 h-5" />, title: "Governance", desc: "Vote on protocol decisions" },
                      { icon: <Coins className="w-5 h-5" />, title: "Staking Rewards", desc: "Earn through participation" },
                      { icon: <Target className="w-5 h-5" />, title: "Research Incentives", desc: "Rewards for contributions" }
                    ].map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                        transition={{ 
                          duration: prefersReducedMotion ? 0.3 : 0.4, 
                          delay: prefersReducedMotion ? 0 : 0.6 + index * 0.1 
                        }}
                        className="flex items-center"
                      >
                        <div className={`mr-4 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {feature.title}
                          </h4>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {feature.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
});

// Roadmap Section Component
const RoadmapSection = memo(({ isDark, prefersReducedMotion }: { isDark: boolean; prefersReducedMotion: boolean }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const roadmapPhases = [
    {
      phase: "Phase 1",
      title: "Foundation",
      timeline: "Q1-Q2 2024",
      items: ["Core protocol development", "MARE AI engine initial build", "Community formation"]
    },
    {
      phase: "Phase 2", 
      title: "Apollo Launch",
      timeline: "Q3-Q4 2024",
      items: ["Apollo case study deployment", "Beta platform release", "Token generation event"]
    },
    {
      phase: "Phase 3",
      title: "Expansion",
      timeline: "Q1-Q2 2025",
      items: ["Additional case studies", "Enhanced AI capabilities", "Mobile application"]
    },
    {
      phase: "Phase 4",
      title: "Evolution",
      timeline: "Q3+ 2025",
      items: ["Full DAO governance", "Cross-chain integration", "Global partnerships"]
    }
  ];

  return (
    <section className="relative py-24">
      {/* Full-Width Timeline-Themed Background */}
      <div className="absolute inset-0 w-screen overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, rotateX: 20 }}
          animate={isInView ? { opacity: 1, rotateX: 0 } : { opacity: 0, rotateX: 20 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        >
          <CosmicBackground intensity="medium" showOrbs={true} />
        </motion.div>
        
        {!prefersReducedMotion && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
            >
              <StarField isDark={isDark} intensity="vibrant" count={110} />
              <NebulaField isDark={isDark} intensity="subtle" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 4, delay: 1, ease: "easeInOut" }}
            >
              <ShootingStars isDark={isDark} count={5} />
              <CosmicDust isDark={isDark} intensity="medium" />
            </motion.div>
          </>
        )}
        
        {/* Timeline-inspired gradients */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 3, delay: 1.5 }}
          style={{
            background: isDark
              ? `linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, transparent 30%, rgba(16, 185, 129, 0.08) 70%, transparent 100%)`
              : `linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, transparent 30%, rgba(16, 185, 129, 0.04) 70%, transparent 100%)`,
          }}
        />
      </div>
      
      <SectionContainer background="transparent" padding="xl">
        <div ref={sectionRef} className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
            className="text-center mb-16"
          >
            <Heading level={2} className="max-w-4xl mx-auto mb-6">
              Development Roadmap
            </Heading>
            <p className={`text-lg max-w-3xl mx-auto ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Our strategic timeline for building the future of evidence-based investigation.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <Grid cols={2} gap="lg">
              {roadmapPhases.map((phase, index) => (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ 
                    duration: prefersReducedMotion ? 0.3 : 0.5, 
                    delay: prefersReducedMotion ? 0 : index * 0.1 
                  }}
                >
                  <Card variant="gradient" size="lg" glow={!prefersReducedMotion}>
                    <div className="text-center">
                      <div className={`text-sm font-semibold mb-2 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                        {phase.phase}
                      </div>
                      <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {phase.title}
                      </h3>
                      <div className={`text-sm font-medium mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {phase.timeline}
                      </div>
                      <ul className="space-y-2">
                        {phase.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center text-left">
                            <CheckCircle className={`w-4 h-4 mr-2 flex-shrink-0 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </Grid>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
});

// Whitepaper CTA Component
const WhitepaperCTA = memo(({ isDark, prefersReducedMotion }: { isDark: boolean; prefersReducedMotion: boolean }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section className="relative py-32">
      {/* Full-Width Epic Finale Background */}
      <div className="absolute inset-0 w-screen overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 3, ease: "easeOut" }}
        >
          <SpaceBackground intensity="vibrant" />
        </motion.div>
        
        {!prefersReducedMotion && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ duration: 4, ease: "easeOut" }}
            >
              <StarField isDark={isDark} intensity="vibrant" count={200} />
              <NebulaField isDark={isDark} intensity="vibrant" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
              transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
            >
              <ShootingStars isDark={isDark} count={10} />
              <CosmicDust isDark={isDark} intensity="vibrant" />
              <PulsarEffect isDark={isDark} />
            </motion.div>
          </>
        )}
        
        {/* Epic finale gradients */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 4, delay: 2 }}
          style={{
            background: isDark
              ? `radial-gradient(ellipse 150% 100% at 50% 50%, rgba(34, 197, 94, 0.2) 0%, rgba(16, 185, 129, 0.15) 30%, transparent 70%),
                 radial-gradient(circle at 20% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
                 radial-gradient(circle at 80% 80%, rgba(5, 150, 105, 0.12) 0%, transparent 50%)`
              : `radial-gradient(ellipse 150% 100% at 50% 50%, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.08) 30%, transparent 70%),
                 radial-gradient(circle at 20% 20%, rgba(34, 197, 94, 0.05) 0%, transparent 50%),
                 radial-gradient(circle at 80% 80%, rgba(5, 150, 105, 0.06) 0%, transparent 50%)`,
          }}
        />
      </div>
      
      <SectionContainer background="transparent" padding="xl">
        <div ref={sectionRef} className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Card variant="gradient" size="lg" glow={!prefersReducedMotion}>
              <Heading level={2} className="mb-6">
                Join the Truth Discovery Mission
              </Heading>
              
              <p className={`text-lg mb-8 max-w-2xl mx-auto ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                Be part of a revolutionary platform that combines cutting-edge technology with rigorous methodology to advance human understanding.
              </p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: prefersReducedMotion ? 0.3 : 0.6, delay: prefersReducedMotion ? 0 : 0.2 }}
                className="flex flex-col sm:flex-row gap-4 items-center justify-center"
              >
                <DesignButton variant="gradient" size="lg" glow>
                  <Rocket className="w-5 h-5 mr-2" />
                  Get Started
                </DesignButton>
                
                <DesignButton variant="outline" size="lg">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View Documentation
                </DesignButton>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0.3 : 0.6, delay: prefersReducedMotion ? 0 : 0.4 }}
                className={`mt-8 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
              >
                Built with transparency, powered by community, secured by blockchain
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </SectionContainer>
    </section>
  );
});

// Add display names
StarField.displayName = 'StarField';
NebulaField.displayName = 'NebulaField';
ShootingStars.displayName = 'ShootingStars';
CosmicDust.displayName = 'CosmicDust';
PulsarEffect.displayName = 'PulsarEffect';
WhitepaperHero.displayName = 'WhitepaperHero';
MissionOverview.displayName = 'MissionOverview';
ApolloShowcase.displayName = 'ApolloShowcase';
TechnologySections.displayName = 'TechnologySections';
TokenomicsSection.displayName = 'TokenomicsSection';
RoadmapSection.displayName = 'RoadmapSection';
WhitepaperCTA.displayName = 'WhitepaperCTA';

export default Whitepaper;
