import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NavigationItems } from "./NavigationItems";

interface DesktopMenuProps {
  handleDashboardClick: (e: React.MouseEvent) => void;
  handleSignOut: (e: React.MouseEvent) => void;
  scrollToSection: (sectionId: string) => void;
  isLoggedIn: boolean;
  isScrolled?: boolean;
  onOpenAuthModal: () => void;
  theme: string;
}

export const DesktopMenu = ({
  handleDashboardClick,
  handleSignOut,
  scrollToSection,
  isLoggedIn,
  isScrolled = false,
  onOpenAuthModal,
  theme,
}: DesktopMenuProps) => {

  return (
    <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
      <NavigationItems 
        scrollToSection={scrollToSection} 
        isScrolled={isScrolled}
      />
      
      <div className="flex items-center gap-2 lg:gap-3">
        <ThemeToggle />
        
        {!isLoggedIn && (
          <Button 
            size="sm" 
            variant={isScrolled ? "ghost" : "outline"} 
            className={`transition-colors duration-200 ${isScrolled ? (theme === "dark" ? "hover:bg-slate-700" : "hover:bg-gray-200") : "futuristic-button-outline"}`}
            onClick={onOpenAuthModal}
          >
            Sign In
          </Button>
        )}
        
        {isLoggedIn && (
          <Button 
            onClick={handleSignOut}
            size="sm"
            variant={isScrolled ? "ghost" : "outline"}
            className={`transition-colors duration-200 ${isScrolled ? (theme === "dark" ? "text-red-400 hover:bg-red-500/20" : "text-red-500 hover:bg-red-100") : (theme === "dark" ? "border-red-500/50 text-red-400 hover:bg-red-500/20" : "border-red-500/50 text-red-500 hover:bg-red-100")}`}
          >
            Sign Out
          </Button>
        )}
      </div>
    </div>
  );
};
