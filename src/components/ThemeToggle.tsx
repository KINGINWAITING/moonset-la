
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Toggle } from "@/components/ui/toggle";
import { useEffect } from "react";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  // Force animation re-render when theme changes
  useEffect(() => {
    // Instead of trying to select all animations with a complex selector,
    // we'll use a simpler approach to trigger a global style recalculation
    document.body.classList.add('theme-transition');
    void document.body.offsetWidth; // Trigger reflow
    document.body.classList.remove('theme-transition');
    
    // For framer-motion animations specifically
    const motionElements = document.querySelectorAll('[style*="animation"]');
    motionElements.forEach(element => {
      // Brief pause and restart of animations by manipulating style
      const originalStyle = (element as HTMLElement).style.cssText;
      (element as HTMLElement).style.animation = 'none';
      void (element as HTMLElement).offsetWidth; // Trigger reflow
      (element as HTMLElement).style.cssText = originalStyle;
    });
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
