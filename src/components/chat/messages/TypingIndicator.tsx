/**
 * TypingIndicator Component
 * Shows an animated typing indicator when AI is generating a response
 * Features a smooth, slow wavy effect for a more elegant appearance
 */

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Bot, Sparkles } from 'lucide-react';

interface TypingIndicatorProps {
  className?: string;
  showIcon?: boolean;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ 
  className,
  showIcon = true 
}) => {
  // Wavy animation variants
  const dotVariants = {
    initial: { y: 0 },
    animate: {
      y: [-3, -6, -3, 0, 3, 6, 3, 0],
      transition: {
        duration: 2.4,
        repeat: Infinity,
        ease: [0.36, 0, 0.66, -0.56], // Custom bezier curve for smooth wave
      }
    }
  };

  // Subtle glow effect
  const glowVariants = {
    initial: { opacity: 0.5, scale: 1 },
    animate: {
      opacity: [0.5, 0.8, 1, 0.8, 0.5],
      scale: [1, 1.1, 1.2, 1.1, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        'flex items-center gap-3 px-4 py-3 max-w-xs',
        'bg-gradient-to-r from-bg-secondary/60 to-bg-secondary/40',
        'rounded-2xl rounded-bl-md',
        'border border-border/50 backdrop-blur-sm',
        'shadow-sm',
        className
      )}
    >
      {/* AI Avatar with subtle pulse */}
      {showIcon && (
        <motion.div 
          className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 relative"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {/* Glow effect behind icon */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/20 blur-md"
            variants={glowVariants}
            initial="initial"
            animate="animate"
          />
          <Bot className="w-3.5 h-3.5 text-primary relative z-10" />
        </motion.div>
      )}

      {/* Enhanced Typing Animation with Wavy Effect */}
      <div className="flex items-center gap-1.5 px-1">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="relative"
            variants={dotVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: i * 0.15 }}
          >
            {/* Main dot */}
            <motion.div
              className="w-2 h-2 rounded-full bg-gradient-to-br from-primary/80 to-primary/60"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut"
              }}
            />
            
            {/* Subtle shadow dot for depth */}
            <motion.div
              className="absolute inset-0 w-2 h-2 rounded-full bg-primary/30 blur-sm"
              animate={{
                scale: [0.8, 1.4, 0.8],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Enhanced AI Indicator with shimmer effect */}
      <motion.div
        className="ml-1 relative"
        animate={{ 
          rotate: [0, 360],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 blur-sm"
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-3 h-3 text-primary" />
        </motion.div>
        
        {/* Main sparkle icon */}
        <Sparkles className="w-3 h-3 text-primary/70 relative z-10" />
      </motion.div>

      {/* Optional "Thinking" text with fade effect */}
      <motion.span
        className="text-xs text-text-tertiary ml-1 font-medium"
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        Thinking
      </motion.span>
    </motion.div>
  );
};

export default TypingIndicator; 