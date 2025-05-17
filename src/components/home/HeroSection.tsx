
import { motion } from "framer-motion";
import { ArrowRight, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export const HeroSection = () => {
  const { session } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative container px-4 pt-40 pb-20"
    >
      {/* Content - everything rendered on top of the background */}
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
  );
};
