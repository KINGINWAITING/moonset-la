
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";

export const TokenSection = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <div className="bg-transparent relative z-10" id="token">
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
                src={isDark
                  ? "/lovable-uploads/e2e01f9c-1634-432c-8c56-1cf117558407.png"
                  : "/lovable-uploads/3a365caa-ecb9-494d-89b2-9a2633ddd782.png"
                } 
                alt="MOONSET Token Staking Rewards" 
                className="max-w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
