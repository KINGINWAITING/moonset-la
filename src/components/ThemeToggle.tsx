
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Toggle } from "@/components/ui/toggle";
import { useEffect } from "react";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  // Simplified theme change effect with performance optimization
  useEffect(() => {
    // Apply the theme directly to HTML element
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
    document.documentElement.style.backgroundColor = theme === 'dark' ? '#060606' : '#ffffff';
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
