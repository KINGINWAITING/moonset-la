import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "./AuthModal";
import { NavigationLogo } from "./navigation/NavigationLogo";
import { DesktopMenu } from "./navigation/DesktopMenu";
import { MobileMenu } from "./navigation/MobileMenu";
import { useTheme } from "@/context/ThemeContext";
import { useNavigationScroll } from "@/hooks/useNavigationScroll";
import { motion } from "framer-motion";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { session, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  
  // Use the enhanced scroll hook with progress tracking
  const { isScrolled, scrollToSection } = useNavigationScroll();

  const isWhitepaperPage = location.pathname.includes("/whitepaper");

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
    setIsMobileMenuOpen(false);
  };

  // Ultra-transparent futuristic glass navigation styles
  const futuristicStyles = theme === "dark" 
    ? {
        initial: {
          background: "rgba(5, 10, 20, 0.15)",
          backdropFilter: "blur(40px) saturate(180%)",
          border: `1px solid ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.25)' : 'rgba(139, 69, 255, 0.2)'}`,
          boxShadow: `
            0 8px 32px ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.1)' : 'rgba(139, 69, 255, 0.1)'},
            0 0 0 1px ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.2)' : 'rgba(139, 69, 255, 0.15)'},
            inset 0 1px 0 rgba(255, 255, 255, 0.08),
            inset 0 -1px 0 ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.1)' : 'rgba(139, 69, 255, 0.08)'}
          `
        },
        scrolled: {
          background: "rgba(5, 10, 20, 0.25)",
          backdropFilter: "blur(60px) saturate(200%)",
          border: `1px solid ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.35)' : 'rgba(139, 69, 255, 0.3)'}`,
          boxShadow: `
            0 16px 64px ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.15)' : 'rgba(139, 69, 255, 0.15)'},
            0 0 0 1px ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.3)' : 'rgba(139, 69, 255, 0.25)'},
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.15)' : 'rgba(139, 69, 255, 0.15)'},
            0 0 100px ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.1)' : 'rgba(139, 69, 255, 0.08)'}
          `
        }
      }
    : {
        initial: {
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(40px) saturate(180%)",
          border: `1px solid ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.25)' : 'rgba(59, 130, 246, 0.2)'}`,
          boxShadow: `
            0 8px 32px ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.1)' : 'rgba(59, 130, 246, 0.08)'},
            0 0 0 1px ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.15)' : 'rgba(59, 130, 246, 0.1)'},
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            inset 0 -1px 0 ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.08)' : 'rgba(59, 130, 246, 0.08)'}
          `
        },
        scrolled: {
          background: "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(60px) saturate(200%)",
          border: `1px solid ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.35)' : 'rgba(59, 130, 246, 0.3)'}`,
          boxShadow: `
            0 16px 64px ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.15)' : 'rgba(59, 130, 246, 0.1)'},
            0 0 0 1px ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.25)' : 'rgba(59, 130, 246, 0.2)'},
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            inset 0 -1px 0 ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.1)' : 'rgba(59, 130, 246, 0.1)'},
            0 0 100px ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.08)' : 'rgba(59, 130, 246, 0.05)'}
          `
        }
      };

  const currentStyle = isScrolled ? futuristicStyles.scrolled : futuristicStyles.initial;

  return (
    <>
      {/* Navigation container that scrolls with page content */}
      <div 
        className="relative w-full flex justify-center pointer-events-none"
        style={{ 
          zIndex: 50,
          paddingTop: '8px',
          paddingBottom: '4px'
        }}
      >
        {/* Ultra-transparent futuristic glass navigation container */}
        <motion.header
          className="pointer-events-auto transition-all duration-700 ease-out relative overflow-hidden"
          style={{
            marginLeft: '20px',
            marginRight: '20px',
            borderRadius: isScrolled ? '20px' : '28px',
            minWidth: '300px',
            maxWidth: 'calc(100vw - 40px)',
            width: isScrolled ? 'calc(100vw - 40px)' : 'calc(100vw - 40px)',
            ...currentStyle
          }}
          initial={{ 
            scale: 0.95, 
            opacity: 0,
            y: -30
          }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            y: 0
          }}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          whileHover={{
            scale: 1.01,
            boxShadow: theme === "dark" 
              ? `0 20px 80px ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.2)' : 'rgba(139, 69, 255, 0.2)'}, 
                 0 0 0 1px ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.3)' : 'rgba(139, 69, 255, 0.3)'},
                 inset 0 1px 0 rgba(255, 255, 255, 0.15)`
              : `0 20px 80px ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.15)' : 'rgba(59, 130, 246, 0.15)'}, 
                 0 0 0 1px ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.25)' : 'rgba(59, 130, 246, 0.25)'},
                 inset 0 1px 0 rgba(255, 255, 255, 0.4)`
          }}
        >
          {/* Animated border gradient overlay */}
          <motion.div
            className="absolute inset-0 rounded-inherit pointer-events-none opacity-50"
            style={{
              background: theme === "dark"
                ? `conic-gradient(from 0deg, 
                   ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.3)' : 'rgba(139, 69, 255, 0.3)'} 0deg, 
                   ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.2)' : 'rgba(236, 72, 153, 0.3)'} 120deg, 
                   ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.3)' : 'rgba(59, 130, 246, 0.3)'} 240deg, 
                   ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.3)' : 'rgba(139, 69, 255, 0.3)'} 360deg)`
                : `conic-gradient(from 0deg, 
                   ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.25)' : 'rgba(59, 130, 246, 0.2)'} 0deg, 
                   ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.15)' : 'rgba(147, 51, 234, 0.2)'} 120deg, 
                   ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.25)' : 'rgba(236, 72, 153, 0.2)'} 240deg, 
                   ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.25)' : 'rgba(59, 130, 246, 0.2)'} 360deg)`,
              borderRadius: 'inherit',
              padding: '1px'
            }}
            animate={{
              rotate: [0, 360]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div 
              className="w-full h-full rounded-inherit"
              style={{
                background: theme === "dark" ? 'rgba(5, 10, 20, 0.95)' : 'rgba(255, 255, 255, 0.95)'
              }}
            />
          </motion.div>

          {/* Holographic effect overlay */}
          <motion.div
            className="absolute inset-0 rounded-inherit pointer-events-none"
            style={{
              background: theme === "dark"
                ? `linear-gradient(135deg, 
                   ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.1)' : 'rgba(139, 69, 255, 0.08)'} 0%, 
                   transparent 25%, 
                   ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.08)' : 'rgba(236, 72, 153, 0.06)'} 50%, 
                   transparent 75%, 
                   ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.1)' : 'rgba(59, 130, 246, 0.08)'} 100%)`
                : `linear-gradient(135deg, 
                   ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.08)' : 'rgba(59, 130, 246, 0.06)'} 0%, 
                   transparent 25%, 
                   ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.06)' : 'rgba(147, 51, 234, 0.04)'} 50%, 
                   transparent 75%, 
                   ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.08)' : 'rgba(236, 72, 153, 0.06)'} 100%)`,
              borderRadius: 'inherit'
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Scroll progress indicator with neon effect */}
          {/* <motion.div
            className="absolute bottom-0 left-0 h-0.5 rounded-full"
            style={{
              background: theme === "dark"
                ? `linear-gradient(90deg, 
                   ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.7)' : 'rgba(139, 69, 255, 0.8)'} 0%, 
                   ${isWhitepaperPage ? 'rgba(128, 255, 0, 0.7)' : 'rgba(236, 72, 153, 0.8)'} 50%, 
                   ${isWhitepaperPage ? 'rgba(0, 255, 128, 0.7)' : 'rgba(59, 130, 246, 0.8)'} 100%)`
                : `linear-gradient(90deg, 
                   ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.6)' : 'rgba(59, 130, 246, 0.7)'} 0%, 
                   ${isWhitepaperPage ? 'rgba(128, 255, 0, 0.6)' : 'rgba(147, 51, 234, 0.7)'} 50%, 
                   ${isWhitepaperPage ? 'rgba(0, 255, 128, 0.6)' : 'rgba(236, 72, 153, 0.7)'} 100%)`,
              scaleX: scrollProgress,
              transformOrigin: "left",
              width: '100%',
              filter: 'drop-shadow(0 0 8px currentColor)'
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: scrollProgress }}
            transition={{ duration: 0.1 }}
          /> */}

          {/* Enhanced inner glow with pulse effect */}
          <motion.div 
            className="absolute inset-0 rounded-inherit opacity-30 pointer-events-none"
            style={{
              background: theme === "dark"
                ? `radial-gradient(ellipse at center, 
                   ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.1)' : 'rgba(139, 69, 255, 0.1)'} 0%, 
                   ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.08)' : 'rgba(236, 72, 153, 0.08)'} 40%, 
                   transparent 70%)`
                : `radial-gradient(ellipse at center, 
                   ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.08)' : 'rgba(59, 130, 246, 0.1)'} 0%, 
                   ${isWhitepaperPage ? 'rgba(57, 255, 20, 0.06)' : 'rgba(147, 51, 234, 0.06)'} 40%, 
                   transparent 70%)`,
              borderRadius: 'inherit'
            }}
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.02, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Navigation content */}
          <div 
            className={`relative z-20 transition-all duration-500 ${
              isScrolled ? 'px-4 py-1.5' : 'px-6 py-2'
            }`}
          >
            <nav className="flex items-center justify-between h-full min-h-[36px]">
              <NavigationLogo isScrolled={isScrolled} isWhitepaperPage={isWhitepaperPage} />

              {/* Desktop Navigation */}
              <DesktopMenu 
                handleDashboardClick={handleDashboardClick}
                handleSignOut={handleSignOut}
                scrollToSection={scrollToSection}
                isLoggedIn={session.isLoggedIn}
                isScrolled={isScrolled}
                onOpenAuthModal={handleOpenAuthModal}
                theme={theme}
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

          {/* Enhanced futuristic floating particles */}
          {isScrolled && (
            <div className="absolute inset-0 overflow-hidden rounded-inherit pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`nav-particle-${i}`}
                  className="absolute rounded-full"
                  style={{
                    width: `${1.5 + Math.random() * 2}px`,
                    height: `${1.5 + Math.random() * 2}px`,
                    background: theme === "dark" 
                      ? `rgba(${isWhitepaperPage ? '57, 255, 20' : (i % 2 === 0 ? '139, 69, 255' : '236, 72, 153')}, 0.6)`
                      : `rgba(${isWhitepaperPage ? '57, 255, 20' : (i % 2 === 0 ? '59, 130, 246' : '147, 51, 234')}, 0.5)`,
                    left: `${15 + (i * 15)}%`,
                    top: `${30 + Math.sin(i) * 40}%`,
                    filter: 'blur(0.5px)',
                    boxShadow: `0 0 10px currentColor`
                  }}
                  animate={{
                    y: [0, -20, 0],
                    x: [0, Math.cos(i) * 10, 0],
                    opacity: [0.3, 1, 0.3],
                    scale: [0.5, 1.2, 0.5],
                  }}
                  transition={{
                    duration: 4 + i * 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>
          )}

          {/* Cyber grid overlay effect */}
          <motion.div
            className="absolute inset-0 rounded-inherit pointer-events-none opacity-15"
            style={{
              backgroundImage: `
                linear-gradient(${theme === "dark" ? (isWhitepaperPage ? 'rgba(57, 255, 20, 0.08)' : 'rgba(139, 69, 255, 0.08)') : (isWhitepaperPage ? 'rgba(57, 255, 20, 0.06)' : 'rgba(59, 130, 246, 0.06)')} 1px, transparent 1px),
                linear-gradient(90deg, ${theme === "dark" ? (isWhitepaperPage ? 'rgba(57, 255, 20, 0.08)' : 'rgba(139, 69, 255, 0.08)') : (isWhitepaperPage ? 'rgba(57, 255, 20, 0.06)' : 'rgba(59, 130, 246, 0.06)')} 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
              borderRadius: 'inherit'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '20px 20px', '0px 0px']
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Edge highlight effect */}
          <div 
            className="absolute inset-0 rounded-inherit pointer-events-none"
            style={{
              background: `linear-gradient(to right, 
                ${theme === "dark" ? (isWhitepaperPage ? 'rgba(57, 255, 20, 0.15)' : 'rgba(139, 69, 255, 0.15)') : (isWhitepaperPage ? 'rgba(57, 255, 20, 0.1)' : 'rgba(59, 130, 246, 0.1)')} 0%, 
                transparent 30%, 
                transparent 70%, 
                ${theme === "dark" ? (isWhitepaperPage ? 'rgba(57, 255, 20, 0.15)' : 'rgba(236, 72, 153, 0.15)') : (isWhitepaperPage ? 'rgba(57, 255, 20, 0.1)' : 'rgba(147, 51, 234, 0.1)')} 100%)`,
              borderRadius: 'inherit',
              opacity: 0.5
            }}
          />
        </motion.header>
      </div>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
};

export default Navigation;
