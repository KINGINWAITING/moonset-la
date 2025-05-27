import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

interface AnimatedTextLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "lg-plus" | "xl";
  showSubtext?: boolean;
  subtextContent?: string;
}

export const AnimatedTextLogo = ({ 
  className = "", 
  size = "md",
  showSubtext = false,
  subtextContent = "Dashboard"
}: AnimatedTextLogoProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  // Size configuration
  const sizeConfig = {
    sm: {
      mainText: "text-lg",
      subText: "text-xs"
    },
    md: {
      mainText: "text-xl",
      subText: "text-sm"
    },
    lg: {
      mainText: "text-2xl",
      subText: "text-base"
    },
    "lg-plus": {
      mainText: "text-2xl",
      subText: "text-sm"
    },
    xl: {
      mainText: "text-4xl",
      subText: "text-lg"
    }
  };

  const { mainText, subText } = sizeConfig[size];

  return (
    <motion.div 
      className={`relative font-inter ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Main MOONSET text */}
      <div className={`relative z-10 ${mainText} transition-all duration-300`}>
        <motion.span 
          className={`font-semibold bg-clip-text text-transparent bg-gradient-to-r transition-all duration-300 ${
            isDark 
              ? "from-purple-400 via-cyan-400 to-blue-400 group-hover:from-purple-300 group-hover:via-cyan-300 group-hover:to-blue-300" 
              : "from-blue-600 via-purple-600 to-indigo-600 group-hover:from-blue-500 group-hover:via-purple-500 group-hover:to-indigo-500"
          }`}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          MOON
        </motion.span>
        <motion.span 
          className={`font-light transition-colors duration-300 ${
            isDark 
              ? "text-gray-300 group-hover:text-white" 
              : "text-gray-700 group-hover:text-gray-900"
          }`}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2, delay: 0.05 }}
        >
          SET
        </motion.span>
      </div>
      
      {/* Optional subtext */}
      {showSubtext && (
        <motion.div 
          className={`${subText} text-text-tertiary transition-colors duration-300`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {subtextContent}
        </motion.div>
      )}
      
      {/* Futuristic scanning line effect */}
      <motion.div
        className={`absolute top-0 left-0 w-1 h-full opacity-0 group-hover:opacity-60 ${
          isDark ? "bg-cyan-400" : "bg-blue-500"
        }`}
        animate={{
          x: ['-100%', '200%'],
          opacity: [0, 0.6, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      {/* Data stream particles */}
      <motion.div
        className="absolute -top-1 -left-1 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-80"
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 0.8, 0],
          x: [0, 100, 200],
          y: [0, -10, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.5
        }}
      />
      
      <motion.div
        className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-60"
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 0.6, 0],
          x: [0, -80, -160],
          y: [0, 8, 0]
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeOut",
          delay: 1.2
        }}
      />
    </motion.div>
  );
}; 