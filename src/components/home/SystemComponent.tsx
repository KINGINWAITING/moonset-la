import { motion, AnimatePresence } from "framer-motion";
import { memo, useState } from "react";

interface SystemComponentProps {
  component: {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    type: string;
    status: string;
  };
  isInView: boolean;
  prefersReducedMotion: boolean;
  isDark: boolean;
  delay: number;
}

export const SystemComponent = memo(({ 
  component, 
  isInView, 
  prefersReducedMotion, 
  isDark, 
  delay 
}: SystemComponentProps) => {
  
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false); // For mobile interaction
  
  // Define color schemes based on component type
  const getTypeColors = (type: string) => {
    switch (type) {
      case "interface":
        return {
          primary: isDark ? "#60A5FA" : "#3B82F6", // blue
          secondary: isDark ? "#93C5FD" : "#1E40AF",
          glow: "rgba(96, 165, 250, 0.3)",
          textPrimary: isDark ? "#FFFFFF" : "#1F2937",
          textSecondary: isDark ? "#E5E7EB" : "#4B5563",
          backgroundGradient: isDark 
            ? "linear-gradient(135deg, rgba(96, 165, 250, 0.15) 0%, rgba(147, 197, 253, 0.08) 100%)"
            : "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(147, 197, 253, 0.08) 100%)"
        };
      case "processing":
        return {
          primary: isDark ? "#A855F7" : "#9333EA", // purple
          secondary: isDark ? "#C084FC" : "#6B21A8",
          glow: "rgba(168, 85, 247, 0.3)",
          textPrimary: isDark ? "#FFFFFF" : "#1F2937",
          textSecondary: isDark ? "#E5E7EB" : "#4B5563",
          backgroundGradient: isDark 
            ? "linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(192, 132, 252, 0.08) 100%)"
            : "linear-gradient(135deg, rgba(147, 51, 234, 0.15) 0%, rgba(168, 85, 247, 0.08) 100%)"
        };
      case "storage":
        return {
          primary: isDark ? "#EC4899" : "#EC4899", // pink
          secondary: isDark ? "#F472B6" : "#BE185D",
          glow: "rgba(236, 72, 153, 0.3)",
          textPrimary: isDark ? "#FFFFFF" : "#1F2937",
          textSecondary: isDark ? "#E5E7EB" : "#4B5563",
          backgroundGradient: isDark 
            ? "linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(244, 114, 182, 0.08) 100%)"
            : "linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(244, 114, 182, 0.08) 100%)"
        };
      case "monitoring":
        return {
          primary: isDark ? "#10B981" : "#059669", // emerald
          secondary: isDark ? "#34D399" : "#047857",
          glow: "rgba(16, 185, 129, 0.3)",
          textPrimary: isDark ? "#FFFFFF" : "#1F2937",
          textSecondary: isDark ? "#E5E7EB" : "#4B5563",
          backgroundGradient: isDark 
            ? "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(52, 211, 153, 0.08) 100%)"
            : "linear-gradient(135deg, rgba(5, 150, 105, 0.15) 0%, rgba(16, 185, 129, 0.08) 100%)"
        };
      default:
        return {
          primary: isDark ? "#6B7280" : "#4B5563", // gray
          secondary: isDark ? "#9CA3AF" : "#374151",
          glow: "rgba(107, 114, 128, 0.3)",
          textPrimary: isDark ? "#FFFFFF" : "#1F2937",
          textSecondary: isDark ? "#E5E7EB" : "#4B5563",
          backgroundGradient: isDark 
            ? "linear-gradient(135deg, rgba(107, 114, 128, 0.15) 0%, rgba(156, 163, 175, 0.08) 100%)"
            : "linear-gradient(135deg, rgba(75, 85, 99, 0.15) 0%, rgba(107, 114, 128, 0.08) 100%)"
        };
    }
  };

  const colors = getTypeColors(component.type);
  const showDetails = isHovered || isTapped;

  // Handle mobile tap interactions
  const handleTap = () => {
    setIsTapped(!isTapped);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
      transition={{ 
        duration: prefersReducedMotion ? 0.3 : 0.8, 
        delay: prefersReducedMotion ? 0 : delay,
        type: "spring",
        stiffness: 100
      }}
      whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -5 }}
      className="relative group cursor-pointer"
      style={{ willChange: prefersReducedMotion ? 'auto' : 'transform, opacity' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTap={handleTap}
      role="button"
      tabIndex={0}
      aria-label={`${component.title} - ${component.type} component. Press to view details.`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleTap();
        }
      }}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {/* Hexagonal Container */}
      <div 
        className="relative w-72 h-52 mx-auto"
        style={{
          clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)"
        }}
      >
        {/* Background with improved contrast */}
        <div 
          className={`absolute inset-0 ${
            isDark ? 'bg-gray-900/95' : 'bg-white/95'
          } backdrop-blur-md transition-colors duration-300`}
          style={{
            background: isDark 
              ? `linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.90) 100%)`
              : `linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(249, 250, 251, 0.90) 100%)`,
            clipPath: "inherit"
          }}
        />
        
        {/* Subtle accent gradient overlay */}
        <motion.div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}08 0%, ${colors.secondary}04 100%)`,
            clipPath: "inherit"
          }}
          animate={{
            background: showDetails 
              ? `linear-gradient(135deg, ${colors.primary}15 0%, ${colors.secondary}08 100%)`
              : `linear-gradient(135deg, ${colors.primary}08 0%, ${colors.secondary}04 100%)`
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Border with glow effect */}
        <motion.div 
          className="absolute inset-0 border-2"
          style={{
            borderColor: colors.primary,
            clipPath: "inherit"
          }}
          animate={{
            filter: !prefersReducedMotion && showDetails 
              ? `drop-shadow(0 0 15px ${colors.glow})`
              : `drop-shadow(0 0 8px ${colors.glow})`
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Default Content - Always Visible */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
          {/* Icon */}
          <motion.div
            className="mb-3 relative"
            whileHover={prefersReducedMotion ? {} : { rotate: 360 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            animate={{
              scale: showDetails ? 0.8 : 1,
              y: showDetails ? -20 : 0
            }}
          >
            <motion.div 
              className="p-3 rounded-lg"
              style={{
                backgroundColor: `${colors.primary}20`,
                color: colors.primary
              }}
              animate={{
                boxShadow: !prefersReducedMotion && showDetails 
                  ? `0 0 25px ${colors.glow}`
                  : `0 0 15px ${colors.glow}`
              }}
              transition={{ duration: 0.3 }}
            >
              {component.icon}
            </motion.div>
          </motion.div>

          {/* Title - Always Visible with better formatting */}
          <motion.div
            className="text-center px-2"
            animate={{
              y: showDetails ? -25 : 0,
              scale: showDetails ? 0.85 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <h3 className={`text-sm font-bold leading-tight ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {component.title}
            </h3>
          </motion.div>
        </div>

        {/* Hover/Tap Content - Revealed on Interaction */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-20"
            >
              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                
                {/* Type Badge with matching colors */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="mb-3 flex justify-center"
                >
                  <div 
                    className="px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wide backdrop-blur-md"
                    style={{
                      background: colors.backgroundGradient,
                      color: colors.primary,
                      border: `1px solid ${colors.primary}40`
                    }}
                  >
                    {component.type}
                  </div>
                </motion.div>

                {/* Description with matching background */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="mb-3"
                >
                  <div 
                    className="px-4 py-3 rounded-lg backdrop-blur-md border"
                    style={{
                      background: colors.backgroundGradient,
                      borderColor: `${colors.primary}30`
                    }}
                  >
                    <p className={`text-sm text-center leading-relaxed font-medium ${
                      colors.textPrimary
                    }`}
                    style={{ color: colors.textPrimary }}
                    >
                      {component.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover overlay with tech patterns */}
        <AnimatePresence>
          {showDetails && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-5"
            >
              <div 
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(45deg, ${colors.primary}05 25%, transparent 25%, transparent 75%, ${colors.primary}05 75%), 
                               linear-gradient(45deg, ${colors.primary}05 25%, transparent 25%, transparent 75%, ${colors.primary}05 75%)`,
                  backgroundSize: '8px 8px',
                  backgroundPosition: '0 0, 4px 4px',
                  clipPath: "inherit"
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Connection points */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top connection point */}
        <motion.div 
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2"
          style={{ borderColor: colors.primary, backgroundColor: colors.primary }}
          animate={{
            scale: showDetails ? 1.2 : 1,
            boxShadow: showDetails ? `0 0 10px ${colors.glow}` : `0 0 5px ${colors.glow}`
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Bottom connection point */}
        <motion.div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full border-2"
          style={{ borderColor: colors.primary, backgroundColor: colors.primary }}
          animate={{
            scale: showDetails ? 1.2 : 1,
            boxShadow: showDetails ? `0 0 10px ${colors.glow}` : `0 0 5px ${colors.glow}`
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Left connection point */}
        <motion.div 
          className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2"
          style={{ borderColor: colors.primary, backgroundColor: colors.primary }}
          animate={{
            scale: showDetails ? 1.2 : 1,
            boxShadow: showDetails ? `0 0 10px ${colors.glow}` : `0 0 5px ${colors.glow}`
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Right connection point */}
        <motion.div 
          className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2"
          style={{ borderColor: colors.primary, backgroundColor: colors.primary }}
          animate={{
            scale: showDetails ? 1.2 : 1,
            boxShadow: showDetails ? `0 0 10px ${colors.glow}` : `0 0 5px ${colors.glow}`
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* ID Label for debugging - improved visibility */}
      <motion.div 
        className={`absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-xs font-mono px-2 py-1 rounded transition-colors duration-300 ${
          isDark 
            ? 'text-gray-400 bg-gray-800/50' 
            : 'text-gray-500 bg-gray-200/50'
        }`}
        animate={{
          opacity: showDetails ? 1 : 0.7,
          scale: showDetails ? 1.05 : 1
        }}
        transition={{ duration: 0.3 }}
      >
        {component.id.toUpperCase()}
      </motion.div>
    </motion.div>
  );
});

SystemComponent.displayName = 'SystemComponent'; 