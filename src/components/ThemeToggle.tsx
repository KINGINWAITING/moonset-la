
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Toggle } from "@/components/ui/toggle";
import { useEffect } from "react";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  // Simplified animation refresh for theme changes
  useEffect(() => {
    // Apply a subtle transition to the entire document
    document.documentElement.classList.add('theme-transition');
    
    // Brief pause to ensure animations reset
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
      
      // Force repaint of the entire page
      document.body.style.display = 'none';
      void document.body.offsetHeight;
      document.body.style.display = '';
      
      console.log("Theme toggle animation refresh triggered");
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
