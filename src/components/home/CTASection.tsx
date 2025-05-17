
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export const CTASection = () => {
  const { session } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <section className={`container px-4 py-20 relative ${isDark ? "bg-transparent" : "bg-transparent"} z-10`}>
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
  );
};
