import { motion, useInView } from "framer-motion";
import { ArrowRight, Coins, TrendingUp, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { TokenBackground } from "@/components/ui/specialized-backgrounds";
import { Card, SectionContainer, Heading, Grid, AnimatedIcon } from "@/components/ui/design-system";
import { memo, useRef, useMemo } from "react";

export const TokenSection = memo(() => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => 
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  // Memoize token features
  const tokenFeatures = useMemo(() => [
    {
      icon: <Coins className="w-6 h-6" />,
      title: "Utility & Access",
      description: "Access advanced platform features and premium research tools",
      color: "primary" as const
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Staking Rewards",
      description: "Earn rewards by staking tokens and contributing to network security",
      color: "secondary" as const
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Governance Rights",
      description: "Vote on protocol decisions and shape the future of truth discovery",
      color: "accent" as const
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Incentives",
      description: "Rewards for quality research contributions and peer review participation",
      color: "primary" as const
    }
  ], []);
  
  return (
    <div ref={sectionRef} className="relative z-10" id="token">
      {/* Enhanced Token Background */}
      <TokenBackground intensity="medium" />
      
      <SectionContainer padding="xl" background="subtle">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Content Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
            className="flex-1 lg:pr-8"
            style={{ willChange: prefersReducedMotion ? 'auto' : 'transform, opacity' }}
          >
            <Heading level={2} className="text-left mb-8">
              <span className={isDark ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400" : "text-blue-600 font-medium"}>
                MOONSET Token:
              </span>{" "}
              Fueling the Pursuit of Truth
            </Heading>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.3 : 0.6, delay: prefersReducedMotion ? 0 : 0.2 }}
              className={`text-lg ${isDark ? "text-gray-300" : "text-gray-700"} mb-8 leading-relaxed`}
            >
              The MOONSET ERC-20 utility token is central to our ecosystem. It grants access to advanced platform features, rewards contributions, enables staking, and empowers community governance over the MoonSet Truth Protocol.
            </motion.p>

            {/* Optimized Token Features Grid */}
            <Grid cols={2} gap="md" className="mb-8">
              {tokenFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ 
                    duration: prefersReducedMotion ? 0.3 : 0.5, 
                    delay: prefersReducedMotion ? 0 : 0.1 * index 
                  }}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02, y: -2 }}
                  style={{ willChange: prefersReducedMotion ? 'auto' : 'transform, opacity' }}
                >
                  <Card variant="minimal" size="sm" className="hover:bg-white/5 transition-colors duration-300 backdrop-blur-sm">
                    <div className="flex items-start space-x-4">
                      <AnimatedIcon color={feature.color} size="sm">
                        {feature.icon}
                      </AnimatedIcon>
                      <div>
                        <h4 className={`font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                          {feature.title}
                        </h4>
                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </Grid>

            {/* Optimized Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: prefersReducedMotion ? 0.3 : 0.6, delay: prefersReducedMotion ? 0 : 0.4 }}
              style={{ willChange: prefersReducedMotion ? 'auto' : 'transform, opacity' }}
            >
              <Link to="/dashboard/moonset-token">
                <motion.div
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                >
                  <Button className={`px-8 py-4 text-lg font-medium transition-all duration-300 ${
                    isDark 
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/25" 
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-blue-500/25"
                  }`}>
                    Learn About Tokenomics <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Optimized Visual Section */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: prefersReducedMotion ? 0.3 : 0.6, delay: prefersReducedMotion ? 0 : 0.2 }}
            className="flex-1 lg:pl-8"
            style={{ willChange: prefersReducedMotion ? 'auto' : 'transform, opacity' }}
          >
            <Card variant="glass" size="lg" glow={!prefersReducedMotion} className="overflow-hidden">
              <div className="relative p-8">
                {/* Background gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  isDark 
                    ? "from-purple-600/20 via-pink-600/10 to-blue-600/20" 
                    : "from-blue-100/50 via-purple-100/30 to-pink-100/50"
                } rounded-lg`} />
                
                {/* Dashboard-style Token Staking Display */}
                <div className="relative z-10 space-y-6">
                  {/* Header */}
                  <div className="text-center">
                    <h3 className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                      MOONSET Token
                    </h3>
                    <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      Staking Dashboard
                    </p>
                  </div>

                  {/* Main Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Total Rewards */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: prefersReducedMotion ? 0.3 : 0.6, delay: prefersReducedMotion ? 0 : 0.6 }}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                    >
                      <Card variant="glass" size="sm" className="text-center">
                        <div className={`text-3xl font-bold ${isDark ? "text-purple-400" : "text-blue-600"} mb-2`}>
                          $1,250
                        </div>
                        <div className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                          Total Rewards
                        </div>
                        <div className={`text-xs ${isDark ? "text-green-400" : "text-green-600"} mt-1`}>
                          +2.34%
                        </div>
                      </Card>
                    </motion.div>

                    {/* APY Rate */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: prefersReducedMotion ? 0.3 : 0.6, delay: prefersReducedMotion ? 0 : 0.7 }}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                    >
                      <Card variant="glass" size="sm" className="text-center">
                        <div className={`text-3xl font-bold ${isDark ? "text-pink-400" : "text-purple-600"} mb-2`}>
                          25%
                        </div>
                        <div className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                          APY Rewards
                        </div>
                      </Card>
                    </motion.div>

                    {/* Token Holders */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: prefersReducedMotion ? 0.3 : 0.6, delay: prefersReducedMotion ? 0 : 0.8 }}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                    >
                      <Card variant="glass" size="sm" className="text-center">
                        <div className={`text-2xl font-bold ${isDark ? "text-cyan-400" : "text-cyan-600"} mb-2`}>
                          10K+
                        </div>
                        <div className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                          Token Holders
                        </div>
                      </Card>
                    </motion.div>

                    {/* Market Cap */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: prefersReducedMotion ? 0.3 : 0.6, delay: prefersReducedMotion ? 0 : 0.9 }}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                    >
                      <Card variant="glass" size="sm" className="text-center">
                        <div className={`text-2xl font-bold ${isDark ? "text-orange-400" : "text-orange-600"} mb-2`}>
                          $2.5M
                        </div>
                        <div className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                          Market Cap
                        </div>
                      </Card>
                    </motion.div>
                  </div>

                  {/* Progress Ring */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: prefersReducedMotion ? 0.3 : 0.6, delay: prefersReducedMotion ? 0 : 1.0 }}
                    className="flex justify-center"
                  >
                    <div className="relative w-24 h-24">
                      {/* Background Circle */}
                      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke={isDark ? "rgba(75, 85, 99, 0.3)" : "rgba(156, 163, 175, 0.3)"}
                          strokeWidth="8"
                          fill="none"
                        />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke={isDark ? "#8B5CF6" : "#3B82F6"}
                          strokeWidth="8"
                          fill="none"
                          strokeLinecap="round"
                          pathLength="1"
                          strokeDasharray="1"
                          initial={{ strokeDashoffset: 1 }}
                          animate={{ strokeDashoffset: 0.6 }}
                          transition={{ duration: 2, delay: 1.2 }}
                        />
                      </svg>
                      {/* Center Text */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                          40%
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Footer Info */}
                  <div className="text-center">
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      Staking Progress as of {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </SectionContainer>
    </div>
  );
});

TokenSection.displayName = 'TokenSection';
