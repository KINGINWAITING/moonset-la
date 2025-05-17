
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export const FeaturesHighlight = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <div id="features" className={`${isDark ? "bg-transparent" : "bg-transparent"} relative z-10`}>
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
  );
};
