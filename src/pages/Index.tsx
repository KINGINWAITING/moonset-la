
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

const Index = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <div className={`min-h-screen ${isDark ? "bg-black" : "bg-white"} text-foreground relative`}>
      {/* Page-wide animated background */}
      <PageBackground />
      
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
      <div className={isDark ? "bg-black relative z-10" : "bg-white relative z-10"}>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
