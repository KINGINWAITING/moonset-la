
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NavigationItems } from "./NavigationItems";
import { useNavigate } from "react-router-dom";

interface DesktopMenuProps {
  handleDashboardClick: (e: React.MouseEvent) => void;
  handleSignOut: (e: React.MouseEvent) => void;
  scrollToSection: (sectionId: string) => void;
  isLoggedIn: boolean;
  isScrolled?: boolean;
  onOpenAuthModal: () => void;
}

export const DesktopMenu = ({
  handleDashboardClick,
  handleSignOut,
  scrollToSection,
  isLoggedIn,
  isScrolled = false,
  onOpenAuthModal,
}: DesktopMenuProps) => {
  const navigate = useNavigate();

  return (
    <div className="hidden md:flex items-center gap-6">
      <NavigationItems 
        scrollToSection={scrollToSection} 
        isScrolled={isScrolled}
      />
      
      <div className="flex items-center gap-4">
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
            onClick={onOpenAuthModal}
            size="sm"
            className="button-gradient"
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
};
