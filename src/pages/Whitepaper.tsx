
import { useTheme } from "@/context/ThemeContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

const Whitepaper = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <div className={`min-h-screen ${isDark ? "bg-[#060606]" : "bg-[#f8f8f8]"}`}>
      <Navigation />
      
      <div className="container pt-32 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4"
        >
          <div className="text-center mb-12">
            <FileText className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">MoonSet Whitepaper</h1>
            <p className="text-lg text-muted-foreground">
              Understanding the technical foundations and future vision of MoonSet
            </p>
          </div>
          
          <div className="glass p-8 md:p-12 rounded-2xl">
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <h2>Abstract</h2>
              <p>
                MoonSet represents a paradigm shift in decentralized financial ecosystems, 
                introducing novel methods for transparent evaluation and verification of 
                blockchain-based assets. This whitepaper outlines our technical approach, 
                tokenomics, and roadmap for the next 3 years of development.
              </p>
              
              <h2>Introduction</h2>
              <p>
                The increasing complexity of cryptocurrency markets demands sophisticated 
                tools for analysis and understanding. MoonSet addresses this need with a 
                comprehensive framework for asset evaluation that combines traditional 
                financial metrics with blockchain-specific indicators.
              </p>
              
              <h2>Technical Architecture</h2>
              <p>
                MoonSet's architecture consists of four primary components:
              </p>
              <ul>
                <li>Data Collection Layer</li>
                <li>Analysis Engine</li>
                <li>Consensus Mechanism</li>
                <li>User Interface</li>
              </ul>
              
              <p>
                Each component is designed for maximum scalability and interoperability
                with existing blockchain infrastructure.
              </p>
              
              <h2>Tokenomics</h2>
              <p>
                The MOONSET token serves as both a governance mechanism and utility 
                token within the ecosystem. Token distribution has been carefully 
                structured to ensure long-term sustainability and prevent concentration
                of ownership.
              </p>
              
              <h2>Roadmap</h2>
              <p>
                Our development roadmap is divided into three phases:
              </p>
              <ul>
                <li>Phase 1: Foundation (Q3 2023 - Q2 2024)</li>
                <li>Phase 2: Expansion (Q3 2024 - Q4 2025)</li>
                <li>Phase 3: Maturity (2026 onwards)</li>
              </ul>
              
              <div className="text-center mt-12">
                <em>Full whitepaper document coming soon. Subscribe to our newsletter for updates.</em>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Whitepaper;
