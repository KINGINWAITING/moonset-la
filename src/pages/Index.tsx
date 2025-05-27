import { useState, useEffect, memo, useCallback } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import AuthModal from "@/components/AuthModal";
import { motion } from "framer-motion";
import { usePerformanceMonitor, useOptimizedInView, SectionSeparator, sectionVariants } from "@/utils/performance";
import { addCriticalResourceHints, applyNetworkAwarePreloading } from "@/utils/preload";
import { 
  TokenSectionWithSuspense,
  FrameworkSectionWithSuspense,
  FeaturesHighlightWithSuspense,
  CTASectionWithSuspense,
  ApolloMissionSectionWithSuspense
} from "@/components/home/LazyComponents";

const Index = memo(() => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // Performance monitoring
  usePerformanceMonitor('IndexPage');

  // Optimized section visibility
  const { ref: heroRef, isInView: heroInView } = useOptimizedInView({ 
    threshold: 0.1, 
    triggerOnce: true 
  });

  const handleOpenAuthModal = useCallback(() => {
    setIsAuthModalOpen(true);
  }, []);

  const handleCloseAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  // Critical resource loading
  useEffect(() => {
    addCriticalResourceHints();
    applyNetworkAwarePreloading();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 relative">
      {/* Navigation that scrolls with content */}
      <Navigation />
      
      {/* Main content without top padding */}
      <main className="relative">
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={sectionVariants}
          custom={0}
          className="relative z-10"
        >
          <HeroSection />
        </motion.section>

        {/* Section Separator */}
        <SectionSeparator variant="gradient" className="my-8" />

        {/* Token Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
          custom={1}
          className="relative z-10"
        >
          <TokenSectionWithSuspense />
        </motion.section>

        {/* Section Separator */}
        <SectionSeparator variant="glow" className="my-12" />

        {/* Framework Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
          custom={2}
          className="relative z-10"
        >
          <FrameworkSectionWithSuspense />
        </motion.section>

        {/* Section Separator */}
        <SectionSeparator variant="dots" className="my-12" />

        {/* Features Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
          custom={3}
          className="relative z-10"
        >
          <FeaturesHighlightWithSuspense />
        </motion.section>

        {/* Section Separator */}
        <SectionSeparator variant="gradient" className="my-12" />

        {/* Apollo Mission Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
          custom={4}
          className="relative z-10"
        >
          <ApolloMissionSectionWithSuspense />
        </motion.section>

        {/* Section Separator */}
        <SectionSeparator variant="glow" className="my-12" />

        {/* CTA Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
          custom={5}
          className="relative z-10"
        >
          <CTASectionWithSuspense onOpenAuthModal={handleOpenAuthModal} />
        </motion.section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={handleCloseAuthModal} 
      />
    </div>
  );
});

Index.displayName = 'Index';

export default Index;
