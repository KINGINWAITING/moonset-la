import { motion } from "framer-motion";
import { memo } from "react";

interface SystemMonitorProps {
  isInView: boolean;
  prefersReducedMotion: boolean;
  isDark: boolean;
}

export const SystemMonitor = memo(({ 
  isInView, 
  prefersReducedMotion, 
  isDark 
}: SystemMonitorProps) => {

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {/* Protocol version - top-right */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: prefersReducedMotion ? 0.3 : 0.8, delay: prefersReducedMotion ? 0 : 2.4 }}
        className={`absolute top-4 right-4 p-3 rounded-lg backdrop-blur-md border ${
          isDark 
            ? 'bg-gray-900/90 border-gray-700/50' 
            : 'bg-white/90 border-gray-300/50'
        }`}
      >
        <div className="text-sm">
          <div className={`font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
            MOONSET TRUTH PROTOCOL
          </div>
          <div className={`text-sm mt-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            v2.0.1-stable
          </div>
          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Architecture View
          </div>
        </div>
      </motion.div>

      {/* Heartbeat indicator - center */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ duration: prefersReducedMotion ? 0.3 : 0.8, delay: prefersReducedMotion ? 0 : 3 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        {!prefersReducedMotion && (
          <motion.div
            className={`w-4 h-4 rounded-full border-2 ${
              isDark ? 'border-purple-400' : 'border-purple-600'
            }`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5 // Start after other animations
            }}
          >
            <motion.div
              className={`w-full h-full rounded-full ${
                isDark ? 'bg-purple-400' : 'bg-purple-600'
              }`}
              animate={{
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 5
              }}
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
});

SystemMonitor.displayName = 'SystemMonitor'; 