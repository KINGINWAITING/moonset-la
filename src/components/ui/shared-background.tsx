import { memo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export const SharedBackground = memo(() => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
      {/* Base gradient background */}
      <motion.div
        initial={false}
        className="absolute inset-0 z-[-2]"
        animate={{
          background: isDark
            ? "radial-gradient(circle at 50% 50%, hsla(240, 50%, 18%, 1) 0%, hsla(220, 40%, 10%, 1) 90%)"
            : "radial-gradient(circle at 50% 50%, hsla(200, 60%, 94%, 1) 0%, hsla(210, 50%, 89%, 1) 90%)",
        }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Subtle Grid Overlay */}
      <div 
        className="absolute inset-0 z-[-1]"
        style={{
          backgroundImage: isDark 
            ? `linear-gradient(rgba(100, 120, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 120, 255, 0.03) 1px, transparent 1px)`
            : `linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
          opacity: isDark ? 0.5 : 0.7,
        }}
      />

      {/* Ambient glow */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={false}
        animate={{
          background: isDark
            ? 'radial-gradient(circle at 50% 50%, rgba(88, 28, 135, 0.15), transparent 70%)'
            : 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1), transparent 70%)',
        }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
});

SharedBackground.displayName = 'SharedBackground'; 