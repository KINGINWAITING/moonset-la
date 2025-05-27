import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, FileText, Users, CheckCircle, Zap, Shield, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { ResearchBackground } from "@/components/ui/specialized-backgrounds";
import { useRef, memo, useMemo } from "react";

const FrameworkSection = memo(() => {
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

  // Memoize framework features
  const frameworkFeatures = useMemo(() => [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Evidence Discovery",
      description: "Systematic collection and cataloging of all available evidence",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Rigorous Analysis", 
      description: "AI-powered examination using established scientific methodology",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Peer Review",
      description: "Community-driven validation and cross-verification processes",
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Transparent Results",
      description: "Open publication of findings regardless of conclusions",
    }
  ], []);

  // Memoize principles
  const principles = useMemo(() => [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Scientific Method",
      description: "Evidence-based hypothesis testing"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Methodological Neutrality", 
      description: "No predetermined outcomes or bias"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Open Collaboration",
      description: "Welcoming all perspectives and evidence"
    }
  ], []);

  return (
    <section ref={sectionRef} className={`py-20 relative ${isDark ? 'bg-black/50' : 'bg-gray-50/50'}`}>
      {/* Enhanced Research Background */}
      <ResearchBackground intensity="medium" />
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
          className="text-center mb-16"
          style={{ willChange: prefersReducedMotion ? 'auto' : 'transform, opacity' }}
        >
          <div className={`inline-flex items-center px-4 py-1.5 rounded-full border mb-6 ${
            isDark 
              ? 'border-purple-500/20 bg-purple-500/5 text-purple-400' 
              : 'border-blue-500/20 bg-blue-500/5 text-blue-600'
          }`}>
            <Shield className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Trusted Framework</span>
          </div>

          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl mx-auto mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            A Framework for Investigation, Not Pre-Determined Conclusions
          </h2>

          <p className={`max-w-2xl mx-auto text-lg ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Our platform provides powerful tools and a transparent protocol for investigation,
            welcoming evidence from all perspectives while maintaining rigorous standards.
          </p>
        </motion.div>

        {/* Optimized Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {frameworkFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                duration: prefersReducedMotion ? 0.3 : 0.5, 
                delay: prefersReducedMotion ? 0 : index * 0.1 
              }}
              whileHover={prefersReducedMotion ? {} : { scale: 1.02, y: -3 }}
              className={`p-6 rounded-xl border transition-all duration-300 backdrop-blur-md ${
                isDark 
                  ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                  : 'bg-white/60 border-gray-200/50 hover:bg-white/80'
              }`}
              style={{ willChange: prefersReducedMotion ? 'auto' : 'transform, opacity' }}
            >
              <div className="flex items-start">
                <div className={`flex-shrink-0 rounded-lg p-3 ${
                  isDark ? 'bg-purple-500/10' : 'bg-blue-500/5'
                }`}>
                  {feature.icon}
                </div>
                <div className="ml-4">
                  <h3 className={`text-xl font-semibold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {feature.title}
                  </h3>
                  <p className={`${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Optimized Principles Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.6, delay: prefersReducedMotion ? 0 : 0.4 }}
          className={`rounded-xl p-8 backdrop-blur-md ${
            isDark 
              ? 'bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-blue-900/20 border border-purple-500/20' 
              : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border border-blue-200/50'
          }`}
          style={{ willChange: prefersReducedMotion ? 'auto' : 'transform, opacity' }}
        >
          <h3 className={`text-2xl font-semibold mb-8 text-center ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Our Core Principles
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((principle, i) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ 
                  duration: prefersReducedMotion ? 0.3 : 0.5, 
                  delay: prefersReducedMotion ? 0 : 0.5 + (i * 0.1) 
                }}
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                className="text-center"
                style={{ willChange: prefersReducedMotion ? 'auto' : 'transform, opacity' }}
              >
                <div className={`mx-auto w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  isDark ? 'bg-white/10' : 'bg-blue-500/5'
                }`}>
                  {principle.icon}
                </div>
                <h4 className={`font-semibold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {principle.title}
                </h4>
                <p className={`text-sm ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Optimized CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: prefersReducedMotion ? 0.3 : 0.5, delay: prefersReducedMotion ? 0 : 0.8 }}
            className="mt-12 text-center"
            style={{ willChange: prefersReducedMotion ? 'auto' : 'transform, opacity' }}
          >
            <Link to={session.isLoggedIn ? "/dashboard" : "/auth"}>
              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className={`px-8 py-2.5 text-white transition-all duration-300 ${
                    isDark 
                      ? 'bg-purple-600 hover:bg-purple-700' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {session.isLoggedIn ? "Go to Dashboard" : "Join the Investigation"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

FrameworkSection.displayName = 'FrameworkSection';

export { FrameworkSection };
