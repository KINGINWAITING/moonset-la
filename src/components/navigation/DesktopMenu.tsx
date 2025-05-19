
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NavigationItems } from "./NavigationItems";

interface DesktopMenuProps {
  handleDashboardClick: (e: React.MouseEvent) => void;
  handleSignOut: (e: React.MouseEvent) => void;
  scrollToSection: (sectionId: string) => void;
  isLoggedIn: boolean;
  isScrolled?: boolean;
}

export const DesktopMenu = ({
  handleDashboardClick,
  handleSignOut,
  scrollToSection,
  isLoggedIn,
  isScrolled = false,
}: DesktopMenuProps) => {
  return (
    <div className="hidden md:flex items-center gap-6 transition-all duration-300 ease-in-out">
      <NavigationItems 
        scrollToSection={scrollToSection} 
        isScrolled={isScrolled}
      />
      
      <div className="flex items-center gap-4 transition-all duration-300 ease-in-out">
        <ThemeToggle />
        
        <Button 
          size="sm" 
          variant="outline" 
          className="mr-2 transition-all duration-300 ease-in-out" 
          onClick={handleDashboardClick}
        >
          Dashboard
        </Button>
        
        {isLoggedIn ? (
          <Button 
            onClick={handleSignOut}
            size="sm"
            variant="destructive"
            className="transition-all duration-300 ease-in-out"
          >
            Sign Out
          </Button>
        ) : (
          <Button 
            onClick={() => scrollToSection('cta')}
            size="sm"
            className="button-gradient transition-all duration-300 ease-in-out"
          >
            Start Trading
          </Button>
        )}
      </div>
    </div>
  );
};
