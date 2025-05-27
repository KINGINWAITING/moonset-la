import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NavigationItems } from "./NavigationItems";
import { useTheme } from "@/context/ThemeContext";

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
  handleDashboardClick: (e: React.MouseEvent) => void;
  handleSignOut: (e: React.MouseEvent) => void;
  scrollToSection: (sectionId: string) => void;
  isLoggedIn: boolean;
  onOpenAuthModal: () => void;
}

export const MobileMenu = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  handleDashboardClick,
  handleSignOut,
  scrollToSection,
  isLoggedIn,
  onOpenAuthModal,
}: MobileMenuProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="md:hidden flex items-center gap-2">
      <ThemeToggle />
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost"
            size="icon" 
            className={`rounded-full p-2 ${isDark ? "hover:bg-slate-700 focus-visible:bg-slate-700" : "hover:bg-gray-200 focus-visible:bg-gray-200"}`}>
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent 
          side="right"
          className={`w-[300px] sm:w-[360px] p-0 flex flex-col ${isDark ? "bg-slate-950 border-slate-800" : "bg-white border-gray-200"}`}>
          
          <div className={`flex items-center justify-between p-4 border-b ${isDark ? "border-slate-800" : "border-gray-200"}`}>
            <span className={`font-semibold text-lg ${isDark ? "text-slate-200" : "text-slate-800"}`}>Menu</span>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className={`rounded-full ${isDark ? "text-slate-400 hover:text-slate-200 hover:bg-slate-700" : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"}`}>
                <X className="h-5 w-5" />
              </Button>
            </SheetClose>
          </div>

          <div className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto">
            <NavigationItems 
              isMobile={true} 
              setIsMobileMenuOpen={setIsMobileMenuOpen} 
              scrollToSection={scrollToSection} 
              className="flex flex-col space-y-1"
              linkClassName={`text-base font-medium p-3 rounded-lg transition-colors ${isDark ? "text-slate-300 hover:bg-slate-800 hover:text-slate-100" : "text-slate-700 hover:bg-gray-100 hover:text-slate-900"}`}
            />
            
            <hr className={`my-2 ${isDark ? "border-slate-800" : "border-gray-200"}`} />
            
            <div className={`mt-auto pt-4 border-t ${isDark ? "border-slate-800" : "border-gray-200"}`}>
              {isLoggedIn ? (
                <Button 
                  onClick={(e) => {
                    closeMenu();
                    handleSignOut(e);
                  }}
                  variant="outline"
                  className={`w-full text-base py-3 ${isDark ? "border-red-500/60 text-red-400 hover:bg-red-500/20 hover:text-red-300" : "border-red-400/70 text-red-500 hover:bg-red-50 hover:text-red-700"}`}
                >
                  Sign Out
                </Button>
              ) : (
                <Button 
                  onClick={() => {
                    closeMenu();
                    onOpenAuthModal();
                  }}
                  className="w-full text-base py-3 futuristic-button button-glow"
                >
                  Sign In / Sign Up
                </Button>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
