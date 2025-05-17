
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { FeaturesSection } from "@/components/features/FeaturesSection";
import { PricingSection } from "@/components/pricing/PricingSection";
import LogoCarousel from "@/components/LogoCarousel";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import { useTheme } from "@/context/ThemeContext";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesHighlight } from "@/components/home/FeaturesHighlight";
import { TokenSection } from "@/components/home/TokenSection";
import { ApolloMissionSection } from "@/components/home/ApolloMissionSection";
import { FrameworkSection } from "@/components/home/FrameworkSection";
import { CTASection } from "@/components/home/CTASection";
import { PageBackground } from "@/components/home/PageBackground";
import { useEffect } from "react";

const Index = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  // Enhanced animation initialization
  useEffect(() => {
    console.log("Index component mounted - initializing animations");
    
    // Force all framer-motion animations to reset
    const resetAnimations = () => {
      // Add animation trigger class to body
      document.body.classList.add('animation-ready');
      
      // Force reflow to ensure animations reset
      void document.body.offsetHeight;
      
      console.log("Animation reset triggered");
      
      // Force a document repaint to ensure animations restart
      requestAnimationFrame(() => {
        document.body.style.opacity = '0.99';
        
        requestAnimationFrame(() => {
          document.body.style.opacity = '1';
          console.log("Animation repaint complete");
        });
      });
    };
    
    // Initial reset
    resetAnimations();
    
    // Secondary reset after a short delay for late-loaded components
    const timeout = setTimeout(() => {
      resetAnimations();
    }, 300);
    
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <div className={`min-h-screen ${isDark ? "bg-transparent" : "bg-transparent"} text-foreground relative`}>
      {/* Full page animated background */}
      <PageBackground />
      
      {/* Navigation - extended width */}
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Logo Carousel */}
      <LogoCarousel />

      {/* Features Highlight Section */}
      <FeaturesHighlight />

      {/* MOONSET Token Section */}
      <TokenSection />

      {/* Apollo Mission Case Study */}
      <ApolloMissionSection />

      {/* Framework Section */}
      <FrameworkSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <div className={isDark ? "bg-black/70 backdrop-blur-md relative z-10" : "bg-white/70 backdrop-blur-md relative z-10"}>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
