
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Toggle } from "@/components/ui/toggle";
import { useEffect } from "react";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  // Force animation re-render when theme changes
  useEffect(() => {
    // Trigger animation recalculations
    // Instead of using wildcard selector which causes error, target specific animation classes
    const animations = document.querySelectorAll('[class*="animate-"]');
    animations.forEach(animation => {
      // Store original classes
      const originalClasses = [...animation.classList];
      
      // Apply a small forced reflow by temporarily adding and removing a class
      animation.classList.add('theme-transition');
      void (animation as HTMLElement).offsetWidth; // Trigger reflow
      animation.classList.remove('theme-transition');
      void (animation as HTMLElement).offsetWidth; // Trigger reflow again
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
