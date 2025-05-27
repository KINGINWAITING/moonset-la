import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

interface NavigationItemProps {
  isMobile?: boolean;
  setIsMobileMenuOpen?: (value: boolean) => void;
  scrollToSection: (sectionId: string) => void;
  isScrolled?: boolean;
  className?: string;
  linkClassName?: string;
}

export const NavigationItems: React.FC<NavigationItemProps> = ({ 
  isMobile = false,
  setIsMobileMenuOpen,
  scrollToSection,
  isScrolled = false,
  className = "",
  linkClassName = ""
}) => {
  const navigate = useNavigate();
  const { session } = useAuth();

  const navItems = [
    { name: "Whitepaper", href: "/whitepaper", onClick: () => navigate('/whitepaper') },
    { name: "Token Pre-Sale", href: "/preview", onClick: () => navigate('/preview'), special: true },
    { name: "Contact", href: "/contact", onClick: () => navigate('/contact') },
    ...(session.isLoggedIn ? [{ name: "Dashboard", href: "/dashboard", onClick: () => navigate('/dashboard') }] : []),
  ];

  const TokenPreSaleButton = ({ item, isMobile }: { item: any, isMobile: boolean }) => (
    <motion.div
      className="relative group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-lg opacity-75 group-hover:opacity-100 blur-sm"
        animate={{
          background: [
            "linear-gradient(to right, #ec4899, #8b5cf6, #3b82f6)",
            "linear-gradient(to right, #8b5cf6, #3b82f6, #10b981)",
            "linear-gradient(to right, #3b82f6, #10b981, #f59e0b)",
            "linear-gradient(to right, #10b981, #f59e0b, #ef4444)",
            "linear-gradient(to right, #f59e0b, #ef4444, #ec4899)",
            "linear-gradient(to right, #ef4444, #ec4899, #8b5cf6)",
            "linear-gradient(to right, #ec4899, #8b5cf6, #3b82f6)"
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Inner glow effect */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-pink-400/50 via-purple-500/50 to-blue-500/50 rounded-lg blur-lg opacity-0 group-hover:opacity-60"
        animate={{
          opacity: [0, 0.6, 0],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Button content */}
      <a
        href={item.href}
        onClick={(e) => {
          e.preventDefault();
          if (isMobile && setIsMobileMenuOpen) setIsMobileMenuOpen(false);
          if (item.onClick) {
            item.onClick();
          }
        }}
        className={`relative z-10 inline-flex items-center justify-center px-4 py-2 bg-black/90 dark:bg-white/10 backdrop-blur-sm rounded-lg font-semibold text-white dark:text-white transition-all duration-300 group-hover:bg-black/80 dark:group-hover:bg-white/20 ${
          isMobile ? "text-lg" : "text-sm"
        }`}
      >
        <motion.span
          className="relative"
          animate={{
            textShadow: [
              "0 0 4px rgba(236, 72, 153, 0.8)",
              "0 0 8px rgba(139, 92, 246, 0.8)",
              "0 0 12px rgba(59, 130, 246, 0.8)",
              "0 0 8px rgba(139, 92, 246, 0.8)",
              "0 0 4px rgba(236, 72, 153, 0.8)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Token Pre-Sale
        </motion.span>
        
        {/* Sparkle effects */}
        <motion.div
          className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 0
          }}
        />
        <motion.div
          className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-green-500 rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 0.5
          }}
        />
        <motion.div
          className="absolute top-1/2 -right-2 w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            x: [0, 4, 0]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: 1
          }}
        />
      </a>
    </motion.div>
  );

  if (isMobile) {
    return (
      <div className={className}>
        {navItems.map((item) => (
          <div key={item.name}>
            {item.special ? (
              <TokenPreSaleButton item={item} isMobile={true} />
            ) : (
              <a
                href={item.href}
                className={linkClassName || "text-lg text-muted-foreground hover:text-foreground transition-colors"}
                onClick={(e) => {
                  e.preventDefault();
                  if (setIsMobileMenuOpen) setIsMobileMenuOpen(false);
                  if (item.onClick) {
                    item.onClick();
                  }
                }}
              >
                {item.name}
              </a>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={className || "flex items-center gap-5"}>
      {navItems.map((item) => (
        <div key={item.name}>
          {item.special ? (
            <TokenPreSaleButton item={item} isMobile={false} />
          ) : (
            <a
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                if (item.onClick) {
                  item.onClick();
                }
              }}
              className={linkClassName || `text-sm text-muted-foreground hover:text-foreground transition-colors ${
                item.name === "Dashboard" ? "font-medium" : ""
              }`}
            >
              {item.name}
            </a>
          )}
        </div>
      ))}
    </div>
  );
};
