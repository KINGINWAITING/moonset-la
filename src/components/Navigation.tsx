
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "./AuthModal";
import { useNavigationScroll } from "@/hooks/useNavigationScroll";
import { NavigationLogo } from "./navigation/NavigationLogo";
import { DesktopMenu } from "./navigation/DesktopMenu";
import { MobileMenu } from "./navigation/MobileMenu";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { session, signOut } = useAuth();
  const navigate = useNavigate();
  const { isScrolled, scrollToSection } = useNavigationScroll();

  const handleDashboardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (session.isLoggedIn) {
      navigate("/dashboard");
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    await signOut();
    navigate("/");
  };

  return (
    <header
      className={`fixed top-3.5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-full ${
        isScrolled 
          ? "h-14 bg-[#1B1B1B]/40 backdrop-blur-xl border border-white/10 scale-95 w-[90%] max-w-2xl" 
          : "h-14 bg-[#1B1B1B] w-[95%] max-w-3xl"
      }`}
    >
      <div className="mx-auto h-full px-6">
        <nav className="flex items-center justify-between h-full">
          <NavigationLogo />

          {/* Desktop Navigation */}
          <DesktopMenu 
            handleDashboardClick={handleDashboardClick}
            handleSignOut={handleSignOut}
            scrollToSection={scrollToSection}
            isLoggedIn={session.isLoggedIn}
          />

          {/* Mobile Navigation */}
          <MobileMenu 
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            handleDashboardClick={handleDashboardClick}
            handleSignOut={handleSignOut}
            scrollToSection={scrollToSection}
            isLoggedIn={session.isLoggedIn}
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
