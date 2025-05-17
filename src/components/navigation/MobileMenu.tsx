
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NavigationItems } from "./NavigationItems";

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
  handleDashboardClick: (e: React.MouseEvent) => void;
  handleSignOut: (e: React.MouseEvent) => void;
  scrollToSection: (sectionId: string) => void;
  isLoggedIn: boolean;
}

export const MobileMenu = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  handleDashboardClick,
  handleSignOut,
  scrollToSection,
  isLoggedIn,
}: MobileMenuProps) => {
  return (
    <div className="md:hidden flex items-center gap-2">
      <ThemeToggle />
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="glass">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-[#1B1B1B]">
          <div className="flex flex-col gap-4 mt-8">
            <NavigationItems 
              isMobile={true} 
              setIsMobileMenuOpen={setIsMobileMenuOpen} 
              scrollToSection={scrollToSection} 
            />
            
            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                handleDashboardClick(e);
              }}
              className="text-lg text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </a>
            
            {isLoggedIn ? (
              <Button 
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  handleSignOut(e);
                }}
                className="mt-4"
                variant="destructive"
              >
                Sign Out
              </Button>
            ) : (
              <Button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  scrollToSection('cta');
                }}
                className="button-gradient mt-4"
              >
                Start Trading
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
