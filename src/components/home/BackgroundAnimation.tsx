
import { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

export const BackgroundAnimation = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Simple animation setup with standard CSS animations
  useEffect(() => {
    // Set initial styles
    document.documentElement.style.backgroundColor = isDark ? '#060606' : '#f8f8f8';
    
    // Force immediate display of animation elements
    if (containerRef.current) {
      containerRef.current.style.opacity = '1';
      containerRef.current.style.visibility = 'visible';
    }
    
    console.log("Background animation initialized with theme:", theme);
  }, [theme]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 overflow-hidden -z-10"
      style={{ opacity: 1 }} // Force visibility
    >
      {/* Base background color */}
      <div className={`absolute inset-0 ${isDark ? "bg-[#060606]" : "bg-[#f8f8f8]"}`} />
      
      {/* Grid overlay */}
      <div className={`absolute inset-0 ${isDark ? "bg-grid-dark" : "bg-grid-light"}`} />
      
      {/* Three simpler animated blobs with standard CSS animations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary blob */}
        <div 
          className={`absolute w-[800px] h-[800px] rounded-full bg-animate-blob1 ${
            isDark 
              ? "bg-gradient-to-br from-[#4ADE80] to-[#45b06c]" 
              : "bg-gradient-to-br from-[#4ADE80] to-[#22c55e]"
          }`}
          style={{
            top: '5%',
            left: '10%',
            opacity: 0.7,
            animation: 'blob-movement-1 30s infinite alternate ease-in-out'
          }}
        />
        
        {/* Secondary blob */}
        <div 
          className={`absolute w-[700px] h-[700px] rounded-full bg-animate-blob2 ${
            isDark 
              ? "bg-gradient-to-bl from-[#1e293b] to-[#334155]" 
              : "bg-gradient-to-bl from-[#cbd5e1] to-[#94a3b8]"
          }`}
          style={{
            top: '10%',
            right: '5%',
            opacity: isDark ? 0.6 : 0.5,
            animation: 'blob-movement-2 25s infinite alternate ease-in-out'
          }}
        />
        
        {/* Third blob */}
        <div 
          className={`absolute w-[600px] h-[600px] rounded-full bg-animate-blob3 ${
            isDark 
              ? "bg-gradient-to-tr from-[#3b82f6] to-[#8b5cf6]" 
              : "bg-gradient-to-tr from-[#60a5fa] to-[#a78bfa]"
          }`}
          style={{
            bottom: '5%',
            left: '30%',
            opacity: isDark ? 0.5 : 0.4,
            animation: 'blob-movement-3 35s infinite alternate ease-in-out'
          }}
        />
      </div>
      
      {/* Additional subtle gradient overlay */}
      <div 
        className={`absolute inset-0 ${
          isDark 
            ? "bg-gradient-to-b from-black/50 via-transparent to-transparent" 
            : "bg-gradient-to-b from-white/50 via-transparent to-transparent"
        }`}
      />
    </div>
  );
};
