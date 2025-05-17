
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Toggle } from "@/components/ui/toggle";
import { useEffect } from "react";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  // Force animation re-render when theme changes
  useEffect(() => {
    // Apply a subtle transition to the entire document
    document.documentElement.classList.add('theme-transition');
    
    // Brief pause to ensure animations reset
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
      
      // Target motion elements specifically without complex selectors
      const animatedElements = document.querySelectorAll('[style*="animation"], .animated');
      
      if (animatedElements.length > 0) {
        animatedElements.forEach(element => {
          if (element instanceof HTMLElement) {
            // Store original style
            const originalStyle = element.style.cssText;
            
            // Pause animation
            element.style.animationPlayState = 'paused';
            
            // Force reflow
            void element.offsetWidth;
            
            // Resume with original style
            element.style.animationPlayState = 'running';
          }
        });
      }
      
      // Refresh framer motion animations
      const framerElements = document.querySelectorAll('[data-framer-motion]');
      framerElements.forEach(el => {
        if (el.parentNode) {
          const parent = el.parentNode;
          const nextSibling = el.nextSibling;
          parent.removeChild(el);
          setTimeout(() => {
            if (nextSibling) {
              parent.insertBefore(el, nextSibling);
            } else {
              parent.appendChild(el);
            }
          }, 10);
        }
      });
    }, 50);
  }, [theme]);
  
  return (
    <Toggle 
      pressed={theme === "light"}
      onPressedChange={toggleTheme}
      aria-label="Toggle theme"
      className="bg-transparent border-0"
    >
      {theme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-primary" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] text-gray-700" />
      )}
    </Toggle>
  );
};
