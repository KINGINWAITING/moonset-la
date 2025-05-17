
import React, { useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

export const PageBackground = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  // Force animation to run on component mount with more robust initialization
  useEffect(() => {
    console.log("PageBackground mounted - animations should start");
    
    // Make sure DOM is fully loaded before attempting animations
    const initializeAnimations = () => {
      // Log all animation elements to help debug
      const animationElements = document.querySelectorAll('.framer-animation');
      console.log(`Found ${animationElements.length} animation elements`);
      
      // Force all animations to be visible
      animationElements.forEach(element => {
        if (element instanceof HTMLElement) {
          element.style.opacity = '1';
          element.style.visibility = 'visible';
          element.classList.add('animation-active');
        }
      });
      
      // Force repaint
      document.body.style.display = 'none';
      void document.body.offsetHeight;
      document.body.style.display = '';
    };
    
    // Run immediately and also after a short delay to ensure everything is loaded
    initializeAnimations();
    
    const timeout = setTimeout(() => {
      initializeAnimations();
    }, 100);
    
    return () => clearTimeout(timeout);
  }, []);

  // Create animated shapes with very high opacity for maximum visibility
  const shapes = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    size: Math.random() * 400 + 300, // Much larger shapes
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 20,
    delay: Math.random() * 1, // Shorter delays
    opacity: Math.random() * 0.15 + 0.15, // Much higher opacity
  }));

  return (
    <div className="fixed inset-0 overflow-hidden -z-10 bg-animation-wrapper">
      {/* Base background to ensure there's always a visible background */}
      <div 
        className={`absolute inset-0 ${isDark ? "bg-[#060606]" : "bg-[#f8f8f8]"}`}
        style={{opacity: 1}} // Force opacity
      />
      
      {/* Grid pattern with higher contrast */}
      <div 
        className={`absolute inset-0 ${
          isDark ? "bg-grid-dark" : "bg-grid-light"
        }`}
        style={{opacity: isDark ? 0.5 : 0.6}} // Force opacity
      />
      
      {/* Animated gradient backdrop with much higher opacity */}
      <div className="absolute inset-0" style={{opacity: 1}}>
        <div
          className={`absolute -inset-[300px] ${isDark ? "opacity-80" : "opacity-70"} blur-[120px]`}
          style={{visibility: 'visible'}}
        >
          {/* Primary blob with theme-specific colors - using inline styles for guaranteed visibility */}
          <motion.div
            initial={{ x: "0%", y: "0%", opacity: 1 }}
            animate={{
              x: ["0%", "100%", "50%", "0%"],
              y: ["0%", "50%", "20%", "0%"],
              opacity: [1, 0.8, 0.9, 1],
            }}
            transition={{
              duration: 40, // Shorter duration
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
            }}
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "800px",
              height: "800px",
              borderRadius: "50%",
              background: isDark 
                ? "linear-gradient(to bottom right, #4ADE80, #45b06c)" 
                : "linear-gradient(to bottom right, #4ADE80, #22c55e)",
              opacity: 0.8,
              willChange: "transform, opacity",
              visibility: "visible", // Force visibility
            }}
            className="framer-animation animation-active"
          />
          
          {/* Secondary blob with theme-specific colors */}
          <motion.div
            initial={{ x: "0%", y: "0%", opacity: 1 }}
            animate={{
              x: ["0%", "-50%", "-20%", "0%"],
              y: ["0%", "30%", "10%", "0%"],
              opacity: [1, 0.7, 0.9, 1],
            }}
            transition={{
              duration: 35,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
            }}
            style={{
              position: "absolute",
              top: "10px",
              right: "0",
              width: "700px",
              height: "700px",
              borderRadius: "50%",
              background: isDark 
                ? "linear-gradient(to bottom left, #1e293b, #334155)" 
                : "linear-gradient(to bottom left, #cbd5e1, #94a3b8)",
              opacity: isDark ? 0.8 : 0.6,
              willChange: "transform, opacity",
              visibility: "visible", // Force visibility
            }}
            className="framer-animation animation-active"
          />
          
          {/* Third blob for more visual interest */}
          <motion.div
            initial={{ x: "0%", y: "0%", opacity: 1 }}
            animate={{
              x: ["0%", "30%", "10%", "0%"],
              y: ["0%", "-20%", "-5%", "0%"],
              opacity: [1, 0.8, 0.9, 1],
            }}
            transition={{
              duration: 45,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
            }}
            style={{
              position: "absolute",
              bottom: "0",
              left: "30%",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background: isDark 
                ? "linear-gradient(to top right, #3b82f6, #8b5cf6)" 
                : "linear-gradient(to top right, #60a5fa, #a78bfa)",
              opacity: isDark ? 0.5 : 0.4,
              willChange: "transform, opacity",
              visibility: "visible", // Force visibility
            }}
            className="framer-animation animation-active"
          />
        </div>
      </div>
      
      {/* Floating shapes with much higher opacity and direct style props */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          initial={{ 
            opacity: shape.opacity,
            x: `${shape.x}%`, 
            y: `${shape.y}%` 
          }}
          animate={{ 
            opacity: [shape.opacity, shape.opacity + 0.05, shape.opacity - 0.03, shape.opacity],
            x: [`${shape.x}%`, `${shape.x + 10}%`, `${shape.x - 5}%`, `${shape.x}%`],
            y: [`${shape.y}%`, `${shape.y - 15}%`, `${shape.y + 8}%`, `${shape.y}%`],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            repeatType: "loop",
          }}
          style={{
            position: "absolute",
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            borderRadius: "50%",
            background: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
            filter: "blur(20px)",
            willChange: "transform, opacity",
            visibility: "visible", // Force visibility
          }}
          className="framer-animation animation-active"
        />
      ))}
      
      {/* Additional subtle effect for light/dark modes */}
      <div 
        className={`absolute inset-0 ${
          isDark 
            ? "bg-gradient-to-b from-black via-transparent to-transparent" 
            : "bg-gradient-to-b from-white via-transparent to-transparent"
        } opacity-70`}
        style={{visibility: 'visible'}} // Force visibility
      />
    </div>
  );
};
