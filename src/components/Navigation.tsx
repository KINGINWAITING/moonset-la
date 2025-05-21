
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "./AuthModal";
import { useNavigationScroll } from "@/hooks/useNavigationScroll";
import { NavigationLogo } from "./navigation/NavigationLogo";
import { DesktopMenu } from "./navigation/DesktopMenu";
import { MobileMenu } from "./navigation/MobileMenu";
import { useTheme } from "@/context/ThemeContext";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { session, signOut } = useAuth();
  const navigate = useNavigate();
  const { isScrolled, scrollToSection } = useNavigationScroll();
  const { theme } = useTheme();

  const handleOpenAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const handleDashboardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (session.isLoggedIn) {
      navigate("/dashboard");
    } else {
      handleOpenAuthModal();
    }
  };

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    await signOut();
    navigate("/");
  };

  return (
    <header
      className={`fixed top-3.5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? `h-14 ${theme === "dark" ? "bg-[#1B1B1B]/40" : "bg-white/40"} backdrop-blur-xl border ${theme === "dark" ? "border-white/10" : "border-gray-300/20"} rounded-full w-auto min-w-[650px] max-w-[800px]` 
          : `h-14 ${theme === "dark" ? "bg-[#1B1B1B]" : "bg-white"} rounded-full w-full max-w-7xl`
      }`}
    >
      <div className="mx-auto h-full px-5 md:px-8">
        <nav className="flex items-center justify-between h-full">
          <NavigationLogo />

          {/* Desktop Navigation */}
          <DesktopMenu 
            handleDashboardClick={handleDashboardClick}
            handleSignOut={handleSignOut}
            scrollToSection={scrollToSection}
            isLoggedIn={session.isLoggedIn}
            isScrolled={isScrolled}
            onOpenAuthModal={handleOpenAuthModal}
          />

          {/* Mobile Navigation */}
          <MobileMenu 
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            handleDashboardClick={handleDashboardClick}
            handleSignOut={handleSignOut}
            scrollToSection={scrollToSection}
            isLoggedIn={session.isLoggedIn}
            onOpenAuthModal={handleOpenAuthModal}
          />
        </nav>
      </div>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  );
};

export default Navigation;
