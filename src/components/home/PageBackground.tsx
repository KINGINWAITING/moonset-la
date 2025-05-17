
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

export const PageBackground = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  // Create animated shapes for the background with persistent animations
  const shapes = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 200 + 150, // Even larger size
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 30 + 20, // Slower movement for more subtle effect
    delay: Math.random() * 2,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      {/* Base background */}
      <div 
        className={`absolute inset-0 ${isDark ? "bg-[#0A0A0A]" : "bg-white"}`}
      />
      
      {/* Grid pattern with higher contrast */}
      <div 
        className={`absolute inset-0 opacity-20 bg-grid-pattern 
          ${isDark ? "bg-[#555] bg-opacity-20" : "bg-[#000] bg-opacity-10"}`}
      />
      
      {/* Animated gradient backdrop with higher opacity */}
      <div className="absolute inset-0">
        <div
          className={`absolute -inset-[200px] ${isDark ? "opacity-40" : "opacity-30"} blur-[150px]`}
        >
          {/* Primary blob with more vibrant colors */}
          <motion.div
            initial={{ x: "0%", y: "0%" }}
            animate={{
              x: ["0%", "100%", "50%", "0%"],
              y: ["0%", "50%", "20%", "0%"],
            }}
            transition={{
              duration: 60, // Much slower for subtle movement
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary to-[#45b06c]"
          />
          
          {/* Secondary blob with higher opacity */}
          <motion.div
            initial={{ x: "0%", y: "0%" }}
            animate={{
              x: ["0%", "-50%", "-20%", "0%"],
              y: ["0%", "30%", "10%", "0%"],
            }}
            transition={{
              duration: 50,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute top-10 right-0 w-[700px] h-[700px] rounded-full bg-gradient-to-bl from-[#1e293b] to-[#334155] opacity-70"
          />
          
          {/* Third blob for more visual interest */}
          <motion.div
            initial={{ x: "0%", y: "0%" }}
            animate={{
              x: ["0%", "30%", "10%", "0%"],
              y: ["0%", "-20%", "-5%", "0%"],
            }}
            transition={{
              duration: 55,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute bottom-0 left-[30%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#3b82f6] to-[#8b5cf6] opacity-40"
          />

          {/* Fourth blob for fuller coverage */}
          <motion.div
            initial={{ x: "0%", y: "0%" }}
            animate={{
              x: ["0%", "15%", "5%", "0%"],
              y: ["0%", "10%", "20%", "0%"],
            }}
            transition={{
              duration: 58,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute bottom-20 right-[20%] w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-[#10b981] to-[#4ade80] opacity-30"
          />
        </div>
      </div>
      
      {/* Floating shapes with higher opacity - ensure they're always visible */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          initial={{ 
            opacity: 0.2, // Start with higher opacity
            x: `${shape.x}%`, 
            y: `${shape.y}%` 
          }}
          animate={{ 
            opacity: [0.2, 0.25, 0.15, 0.25, 0.2], // More visible opacity values
            x: [`${shape.x}%`, `${shape.x + 10}%`, `${shape.x - 5}%`, `${shape.x}%`],
            y: [`${shape.y}%`, `${shape.y - 15}%`, `${shape.y + 8}%`, `${shape.y}%`],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0, // No delay between repetitions
          }}
          className={`absolute ${isDark ? "bg-white" : "bg-black"} rounded-full`}
          style={{
            width: shape.size,
            height: shape.size,
            opacity: isDark ? 0.07 : 0.04, // Increased fixed base opacity
          }}
        />
      ))}
      
      {/* Additional subtle effect for light/dark modes with higher opacity */}
      <div 
        className={`absolute inset-0 ${
          isDark 
            ? "bg-gradient-to-b from-black via-transparent to-transparent" 
            : "bg-gradient-to-b from-white via-transparent to-transparent"
        } opacity-60`}
      />
    </div>
  );
};
