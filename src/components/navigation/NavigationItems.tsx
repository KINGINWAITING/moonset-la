
import React from "react";

interface NavigationItemProps {
  isMobile?: boolean;
  setIsMobileMenuOpen?: (value: boolean) => void;
  scrollToSection: (sectionId: string) => void;
}

export const NavigationItems: React.FC<NavigationItemProps> = ({ 
  isMobile = false,
  setIsMobileMenuOpen,
  scrollToSection 
}) => {
  const navItems = [
    { name: "Features", href: "#features", onClick: () => scrollToSection('features') },
    { name: "Prices", href: "#pricing", onClick: () => scrollToSection('pricing') },
    { name: "Testimonials", href: "#testimonials", onClick: () => scrollToSection('testimonials') },
  ];

  if (isMobile) {
    return (
      <>
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="text-lg text-muted-foreground hover:text-foreground transition-colors"
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
        ))}
      </>
    );
  }

  return (
    <div className="flex items-center gap-5">
      {navItems.map((item) => (
        <a
          key={item.name}
          href={item.href}
          onClick={(e) => {
            e.preventDefault();
            if (item.onClick) {
              item.onClick();
            }
          }}
          className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300"
        >
          {item.name}
        </a>
      ))}
    </div>
  );
};
