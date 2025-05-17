
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Toggle } from "@/components/ui/toggle";
import { useEffect } from "react";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  // Force animation re-render when theme changes
  useEffect(() => {
    // Trigger animation recalculations
    const animations = document.querySelectorAll('.motion-safe\\:animate-*');
    animations.forEach(animation => {
      animation.classList.remove('motion-safe:animate-none');
      // Cast Element to HTMLElement to access offsetWidth property
      void (animation as HTMLElement).offsetWidth; // Trigger reflow
      animation.classList.add('motion-safe:animate-none');
      // Cast Element to HTMLElement to access offsetWidth property
      void (animation as HTMLElement).offsetWidth; // Trigger reflow again
      animation.classList.remove('motion-safe:animate-none');
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
