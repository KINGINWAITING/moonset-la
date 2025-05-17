import { motion } from "framer-motion";
import { ArrowRight, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { FeaturesSection } from "@/components/features/FeaturesSection";
import { PricingSection } from "@/components/pricing/PricingSection";
import LogoCarousel from "@/components/LogoCarousel";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

const Index = () => {
  const { session } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <div className={`min-h-screen ${isDark ? "bg-black" : "bg-white"} text-foreground`}>
      <Navigation />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative container px-4 pt-40 pb-20"
      >
        {/* Background */}
        <div 
          className={`absolute inset-0 -z-10 ${isDark ? "bg-[#0A0A0A]" : "bg-white"}`}
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-4 px-4 py-1.5 rounded-full glass"
        >
          <span className="text-sm font-medium">
            <Command className="w-4 h-4 inline-block mr-2" />
            Technology-Driven Truth Discovery
          </span>
        </motion.div>
        
        <div className="max-w-4xl relative z-10">
          <h1 className="text-5xl md:text-7xl font-normal mb-4 tracking-tight text-left">
            <span className={isDark ? "text-gray-200" : "text-gray-800"}>
              <TextGenerateEffect words="Engineering a new standard" />
            </span>
            <br />
            <span className={isDark ? "text-white" : "text-black"}>
              <TextGenerateEffect words="for verifiable truth" />
            </span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`text-lg md:text-xl ${isDark ? "text-gray-200" : "text-gray-700"} mb-8 max-w-2xl text-left`}
          >
            MoonSet combines the analytical power of Artificial Intelligence with the immutable security of Blockchain to create a transparent, collaborative, and incentivized ecosystem for rigorous scientific investigations.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 items-start"
          >
            {session.isLoggedIn ? (
              <Link to="/dashboard">
                <Button size="lg" className="button-gradient">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button size="lg" className="button-gradient">
                  Join Community
                </Button>
              </Link>
            )}
            <Button size="lg" variant="link" className={isDark ? "text-white" : "text-black"}>
              View Whitepaper <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative mx-auto max-w-5xl mt-20"
        >
          <div className="glass rounded-xl overflow-hidden">
            <img
              src="/lovable-uploads/0ea2d2b4-8dc0-442b-aca0-f5622012b579.png"
              alt="MoonSet Dashboard Analytics"
              className="w-full h-auto"
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Logo Carousel */}
      <LogoCarousel />

      {/* Features Section - Replace with MoonSet Features */}
      <div id="features" className={isDark ? "bg-black" : "bg-white"}>
        <section className="container px-4 py-24">
          {/* Header Section */}
          <div className="max-w-2xl mb-20">
            <h2 className="text-5xl md:text-6xl font-normal mb-6 tracking-tight text-left">
              The MoonSet
              <br />
              <span className="text-gradient font-medium">Truth Protocol</span>
            </h2>
            <p className={`text-lg md:text-xl ${isDark ? "text-gray-400" : "text-gray-600"} text-left`}>
              Our mission is to build tools that empower individuals and communities to critically examine complex narratives, fostering a culture of evidence-based reasoning.
            </p>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Feature 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-6 h-full"
            >
              <h3 className="text-xl font-semibold mb-4">MoonSet AI Research Engine (MARE)</h3>
              <p className={isDark ? "text-gray-300" : "text-gray-700"}>
                Advanced AI that analyzes vast datasets, identifies anomalies, and assists researchers in uncovering insights from historical records, including the Apollo missions.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-6 h-full"
            >
              <h3 className="text-xl font-semibold mb-4">Decentralized Evidence Ledger (DEL)</h3>
              <p className={isDark ? "text-gray-300" : "text-gray-700"}>
                All submitted evidence, research, and findings are cryptographically secured on the blockchain, making them transparent, timestamped, and censorship-resistant.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-6 h-full"
            >
              <h3 className="text-xl font-semibold mb-4">Community-Driven & Rewarded</h3>
              <p className={isDark ? "text-gray-300" : "text-gray-700"}>
                Contribute data, research, or participate in peer review. The MOONSET token incentivizes valuable contributions to the ecosystem and empowers decentralized governance.
              </p>
            </motion.div>
          </div>
        </section>
      </div>

      {/* MOONSET Token Section */}
      <div className={isDark ? "bg-black" : "bg-white"} id="token">
        <section className="container px-4 py-20">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <h2 className="text-4xl md:text-5xl font-normal mb-6">
                <span className="text-gradient font-medium">MOONSET Token:</span> Fueling the Pursuit of Truth
              </h2>
              <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-700"} mb-6`}>
                The MOONSET ERC-20 utility token is central to our ecosystem. It grants access to advanced platform features, rewards contributions, enables staking, and empowers community governance over the MoonSet Truth Protocol.
              </p>
              <Link to="/dashboard/moonset-token">
                <Button className="button-gradient">
                  Learn About Tokenomics <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex-1 glass rounded-xl overflow-hidden p-6"
            >
              <div className="flex justify-center">
                <img 
                  src="/lovable-uploads/79f2b901-8a4e-42a5-939f-fae0828e0aef.png" 
                  alt="MOONSET Token" 
                  className="max-w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Apollo Mission Case Study */}
      <div className={isDark ? "bg-black" : "bg-white"}>
        <section className="container px-4 py-20">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="glass rounded-xl p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-medium mb-6">The Apollo Missions: A Defining Case Study</h2>
            <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-700"} mb-6`}>
              The Apollo program serves as a compelling and high-impact initial case study for the MoonSet Truth Protocol due to its enduring public interest, scientific significance, vast data pool, and potential for demonstrating the power of our approach.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl font-medium">Enduring Public Interest</h3>
                <p className={isDark ? "text-gray-400" : "text-gray-600"}>A subject of global fascination and ongoing debate</p>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl font-medium">Scientific Significance</h3>
                <p className={isDark ? "text-gray-400" : "text-gray-600"}>Extraordinary claims demanding rigorous verification</p>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl font-medium">Vast Data Pool</h3>
                <p className={isDark ? "text-gray-400" : "text-gray-600"}>A large body of evidence ripe for AI-powered analysis</p>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl font-medium">Demonstrable Impact</h3>
                <p className={isDark ? "text-gray-400" : "text-gray-600"}>Showcasing the protocol's power for complex inquiries</p>
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      {/* Framework Section */}
      <div className={isDark ? "bg-black" : "bg-white"}>
        <section className="container px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-medium mb-8">A Framework for Investigation, Not Pre-Determined Conclusions</h2>
            <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-700"} mb-6`}>
              MoonSet provides powerful tools and a transparent protocol for investigation. Our platform welcomes evidence supporting all perspectives, emphasizing the scientific method and rigorous peer review.
            </p>
            <div className="flex justify-center mt-8">
              {session.isLoggedIn ? (
                <Link to="/dashboard">
                  <Button size="lg" className="button-gradient">
                    Explore Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button size="lg" className="button-gradient">
                    Join The Community
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <section className={`container px-4 py-20 relative ${isDark ? "bg-black" : "bg-white"}`}>
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'url("/lovable-uploads/21f3edfb-62b5-4e35-9d03-7339d803b980.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`${isDark ? "bg-[#0A0A0A]/80" : "bg-white/80"} backdrop-blur-lg border ${isDark ? "border-white/10" : "border-black/10"} rounded-2xl p-8 md:p-12 text-center relative z-10`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to join the truth discovery?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Be part of a community committed to evidence-based reasoning and technological innovation.
          </p>
          <Link to={session.isLoggedIn ? "/dashboard" : "/auth"}>
            <Button size="lg" className="button-gradient">
              {session.isLoggedIn ? "Go to Dashboard" : "Join MoonSet"}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <div className={isDark ? "bg-black" : "bg-white"}>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
