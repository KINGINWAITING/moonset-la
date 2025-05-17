
import React, { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

export const HeroBackground = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  // Create animated shapes for the background
  const shapes = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 20,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Base background */}
      <div 
        className={`absolute inset-0 ${isDark ? "bg-[#0A0A0A]" : "bg-white"}`}
      />
      
      {/* Grid pattern */}
      <div 
        className={`absolute inset-0 opacity-10 bg-grid-pattern 
          ${isDark ? "bg-[#333] bg-opacity-10" : "bg-[#000] bg-opacity-5"}`}
      />
      
      {/* Animated gradient backdrop */}
      <div className="absolute inset-0">
        <div
          className={`absolute -inset-[100px] opacity-20 blur-[100px] 
            ${isDark ? "" : "opacity-10 blur-[80px]"}`}
        >
          {/* Animated blobs */}
          <motion.div
            animate={{
              x: ["0%", "100%", "0%"],
              y: ["0%", "50%", "0%"],
            }}
            transition={{
              duration: 30,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary to-[#45b06c]"
          />
          <motion.div
            animate={{
              x: ["0%", "-50%", "0%"],
              y: ["0%", "30%", "0%"],
            }}
            transition={{
              duration: 25,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute top-10 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-[#1e293b] to-[#334155] opacity-70"
          />
        </div>
      </div>
      
      {/* Floating shapes */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          initial={{ 
            opacity: 0,
            x: `${shape.x}%`, 
            y: `${shape.y}%` 
          }}
          animate={{ 
            opacity: [0, 0.1, 0.05, 0.1, 0],
            x: [`${shape.x}%`, `${shape.x + 10}%`, `${shape.x - 5}%`, `${shape.x}%`],
            y: [`${shape.y}%`, `${shape.y - 15}%`, `${shape.y + 10}%`, `${shape.y}%`],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className={`absolute ${isDark ? "bg-white" : "bg-black"} rounded-full opacity-[0.03]`}
          style={{
            width: shape.size,
            height: shape.size,
          }}
        />
      ))}
      
      {/* Additional subtle effect for light/dark modes */}
      <div 
        className={`absolute inset-0 ${
          isDark 
            ? "bg-gradient-to-b from-black via-transparent to-transparent" 
            : "bg-gradient-to-b from-white via-transparent to-transparent"
        } opacity-40`}
      />
    </div>
  );
};
