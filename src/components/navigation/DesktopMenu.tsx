
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NavigationItems } from "./NavigationItems";

interface DesktopMenuProps {
  handleDashboardClick: (e: React.MouseEvent) => void;
  handleSignOut: (e: React.MouseEvent) => void;
  scrollToSection: (sectionId: string) => void;
  isLoggedIn: boolean;
}

export const DesktopMenu = ({
  handleDashboardClick,
  handleSignOut,
  scrollToSection,
  isLoggedIn,
}: DesktopMenuProps) => {
  return (
    <div className="hidden md:flex items-center gap-6">
      <NavigationItems scrollToSection={scrollToSection} />
      
      <ThemeToggle />
      
      <Button 
        size="sm" 
        variant="outline" 
        className="mr-2" 
        onClick={handleDashboardClick}
      >
        Dashboard
      </Button>
      
      {isLoggedIn ? (
        <Button 
          onClick={handleSignOut}
          size="sm"
          variant="destructive"
        >
          Sign Out
        </Button>
      ) : (
        <Button 
          onClick={() => scrollToSection('cta')}
          size="sm"
          className="button-gradient"
        >
          Start Trading
        </Button>
      )}
    </div>
  );
};
