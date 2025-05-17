
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
import { BackgroundAnimation } from "@/components/home/BackgroundAnimation";
import { useEffect } from "react";

const Index = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  // Simple initialization effect
  useEffect(() => {
    console.log("Index component mounted - setting basic styles");
    
    // Set background color immediately for a smooth experience
    document.body.style.backgroundColor = isDark ? "#060606" : "#f8f8f8";
    document.documentElement.style.backgroundColor = isDark ? "#060606" : "#f8f8f8";
    
    // Hide loading indicator if it exists
    const loader = document.querySelector('.app-loading');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 300);
    }
  }, [theme]);
  
  return (
    <div className={`min-h-screen ${isDark ? "bg-[#060606]" : "bg-[#f8f8f8]"} text-foreground relative`}>
      {/* Simple, more reliable background animation */}
      <BackgroundAnimation />
      
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
