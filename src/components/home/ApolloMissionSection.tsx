
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export const ApolloMissionSection = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <div className={`${isDark ? "bg-transparent" : "bg-transparent"} relative z-10`}>
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
  );
};
