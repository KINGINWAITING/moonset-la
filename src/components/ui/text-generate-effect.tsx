"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export interface TextGenerateEffectProps {
  words: string;
  className?: string;
  duration?: number;
  loop?: boolean;
  loopDelay?: number;
}

export const TextGenerateEffect = ({
  words,
  className = "",
  duration = 2.5,
  loop = false,
  loopDelay = 1.5,
}: TextGenerateEffectProps) => {
  const [opacity, setOpacity] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Memoize the motion values to prevent recreation
  const count = useMemo(() => useMotionValue(0), []);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => words.slice(0, latest));

  // Memoize the animation function
  const startAnimation = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setOpacity(1);
    count.set(0);

    const animationControls = animate(count, words.length, {
      type: "tween",
      duration: duration,
      ease: "easeInOut",
      onComplete: () => {
        setIsAnimating(false);
        if (loop) {
          // Use requestAnimationFrame for better performance
          setTimeout(() => {
            setOpacity(0);
            setTimeout(() => {
              if (document.visibilityState === 'visible') {
                startAnimation();
              }
            }, 300);
          }, (loopDelay * 1000) - 300);
        }
      },
    });

    return animationControls;
  }, [words.length, duration, loop, loopDelay, count, isAnimating]);

  useEffect(() => {
    let isMounted = true;
    let animationControls: any;

    // Start animation only if component is mounted and page is visible
    if (document.visibilityState === 'visible') {
      animationControls = startAnimation();
    }

    // Handle visibility change to pause/resume animations
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && animationControls) {
        animationControls.stop();
        setIsAnimating(false);
      } else if (document.visibilityState === 'visible' && isMounted && !isAnimating) {
        animationControls = startAnimation();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isMounted = false;
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationControls) {
        animationControls.stop();
      }
      setIsAnimating(false);
    };
  }, [startAnimation, isAnimating]);

  const wordsArray = words.split(" ");

  return (
    <motion.span 
      className={className}
      animate={{ opacity }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {displayText}
    </motion.span>
  );
};