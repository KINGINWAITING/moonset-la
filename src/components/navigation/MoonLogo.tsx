import React from "react";
import { motion } from "framer-motion";

interface MoonLogoProps {
  className?: string;
  animated?: boolean;
  isWhitepaperPage?: boolean;
}

export const MoonLogo = ({ className = "", animated = true, isWhitepaperPage = false }: MoonLogoProps) => {
  const MotionSVG = animated ? motion.svg : 'svg';
  const MotionCircle = animated ? motion.circle : 'circle';
  const MotionPath = animated ? motion.path : 'path';

  return (
    <MotionSVG
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...(animated && {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { duration: 0.8, ease: "easeOut" },
        whileHover: { scale: 1.05, transition: { duration: 0.3 } }
      })}
    >
      {/* Outer glow ring - larger and more pronounced */}
      <MotionCircle 
        cx="16" 
        cy="16" 
        r="14" 
        fill={`url(${isWhitepaperPage ? '#outerGlowGreen' : '#outerGlow'})`}
        {...(animated && {
          animate: { 
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3]
          },
          transition: { 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }
        })}
      />
      
      {/* Energy field background */}
      <MotionCircle 
        cx="16" 
        cy="16" 
        r="13" 
        fill={`url(${isWhitepaperPage ? '#energyFieldGreen' : '#energyField'})`}
        {...(animated && {
          animate: { 
            rotate: 360,
            scale: [1, 1.02, 1]
          },
          transition: { 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }
        })}
      />
      
      {/* Main outer ring with enhanced gradient */}
      <MotionCircle 
        cx="16" 
        cy="16" 
        r="12" 
        stroke="url(#mainGradient)" 
        strokeWidth="2" 
        strokeLinecap="round" 
        fill="none"
        filter="url(#mainGlow)" 
        {...(animated && {
          animate: { 
            strokeDasharray: ["0 75", "37.5 37.5", "75 0", "37.5 37.5", "0 75"],
            rotate: [0, 360]
          },
          transition: { 
            strokeDasharray: { duration: 4, repeat: Infinity },
            rotate: { duration: 8, repeat: Infinity, ease: "linear" }
          }
        })}
      />
      
      {/* Secondary ring */}
      <MotionCircle 
        cx="16" 
        cy="16" 
        r="10" 
        stroke="url(#secondaryGradient)" 
        strokeWidth="1" 
        strokeLinecap="round" 
        fill="none"
        opacity="0.7"
        filter="url(#secondaryGlow)" 
        {...(animated && {
          animate: { 
            rotate: -360,
            strokeDasharray: ["0 63", "31.5 31.5", "63 0"]
          },
          transition: { 
            rotate: { duration: 12, repeat: Infinity, ease: "linear" },
            strokeDasharray: { duration: 3, repeat: Infinity }
          }
        })}
      />
      
      {/* Enhanced crescent shape */}
      <MotionPath
        d="M20 10C18.5 10 16 11.2 16 16C16 20.8 18.5 22 20 22C17 22 11 20.5 11 16C11 11.5 17 10 20 10Z"
        fill="url(#crescentGradient)"
        filter="url(#crescentGlow)"
        {...(animated && {
          animate: { 
            opacity: [0.8, 1, 0.8],
            scale: [1, 1.02, 1]
          },
          transition: { 
            duration: 2.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }
        })}
      />
      
      {/* Inner energy core */}
      <MotionCircle 
        cx="16" 
        cy="16" 
        r="3" 
        fill="url(#coreGradient)" 
        filter="url(#coreGlow)"
        {...(animated && {
          animate: { 
            scale: [1, 1.3, 1],
            opacity: [0.6, 1, 0.6]
          },
          transition: { 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }
        })}
      />
      
      {/* Enhanced star constellation */}
      <MotionCircle 
        cx="24" 
        cy="8" 
        r="1" 
        fill="url(#starGradient)" 
        filter="url(#starGlow)"
        {...(animated && {
          animate: { 
            opacity: [0.5, 1, 0.5],
            scale: [0.8, 1.2, 0.8]
          },
          transition: { 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0
          }
        })}
      />
      <MotionCircle 
        cx="21" 
        cy="13" 
        r="0.7" 
        fill="url(#starGradient)" 
        filter="url(#starGlow)"
        {...(animated && {
          animate: { 
            opacity: [0.4, 0.9, 0.4],
            scale: [0.8, 1.1, 0.8]
          },
          transition: { 
            duration: 1.8, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0.5
          }
        })}
      />
      <MotionCircle 
        cx="23" 
        cy="18" 
        r="0.5" 
        fill="url(#starGradient)" 
        filter="url(#starGlow)"
        {...(animated && {
          animate: { 
            opacity: [0.3, 0.8, 0.3],
            scale: [0.7, 1, 0.7]
          },
          transition: { 
            duration: 2.2, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }
        })}
      />
      
      {/* Futuristic data stream lines */}
      <MotionPath 
        d="M6 16h6" 
        stroke="url(#streamGradient)" 
        strokeWidth="1.5"
        strokeLinecap="round"
        filter="url(#streamGlow)"
        {...(animated && {
          animate: { 
            strokeDasharray: ["0 12", "6 6", "12 0"],
            opacity: [0.5, 1, 0.5]
          },
          transition: { 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }
        })}
      />
      <MotionPath 
        d="M6 12h4" 
        stroke="url(#streamGradient)" 
        strokeWidth="1"
        strokeLinecap="round"
        filter="url(#streamGlow)"
        opacity="0.7"
        {...(animated && {
          animate: { 
            strokeDasharray: ["0 8", "4 4", "8 0"],
            opacity: [0.3, 0.7, 0.3]
          },
          transition: { 
            duration: 1.2, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0.3
          }
        })}
      />
      <MotionPath 
        d="M6 20h5" 
        stroke="url(#streamGradient)" 
        strokeWidth="1"
        strokeLinecap="round"
        filter="url(#streamGlow)"
        opacity="0.6"
        {...(animated && {
          animate: { 
            strokeDasharray: ["0 10", "5 5", "10 0"],
            opacity: [0.2, 0.6, 0.2]
          },
          transition: { 
            duration: 1.8, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0.6
          }
        })}
      />
      
      {/* Enhanced gradient and filter definitions */}
      <defs>
        {/* Radial gradients for glow effects */}
        <radialGradient id="outerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(139, 69, 255, 0.1)" />
          <stop offset="50%" stopColor="rgba(96, 239, 255, 0.15)" />
          <stop offset="100%" stopColor="rgba(74, 222, 128, 0.05)" />
        </radialGradient>
        
        <radialGradient id="energyField" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(139, 69, 255, 0.05)" />
          <stop offset="70%" stopColor="rgba(96, 239, 255, 0.08)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        
        {/* Linear gradients for futuristic colors */}
        <linearGradient id="mainGradient" x1="4" y1="16" x2="28" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="25%" stopColor="#60EFFF" />
          <stop offset="50%" stopColor="#4ADE80" />
          <stop offset="75%" stopColor="#60EFFF" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        
        <linearGradient id="secondaryGradient" x1="6" y1="16" x2="26" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EC4899" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        
        <linearGradient id="crescentGradient" x1="11" y1="16" x2="20" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="30%" stopColor="#60EFFF" />
          <stop offset="70%" stopColor="#4ADE80" />
          <stop offset="100%" stopColor="#60EFFF" />
        </linearGradient>
        
        <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#60EFFF" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </radialGradient>
        
        <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#60EFFF" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        
        <linearGradient id="streamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4ADE80" />
          <stop offset="50%" stopColor="#60EFFF" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        
        {/* Enhanced filter effects */}
        <filter id="mainGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        <filter id="secondaryGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        <filter id="crescentGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        <filter id="coreGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        <filter id="starGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        <filter id="streamGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    </MotionSVG>
  );
};
