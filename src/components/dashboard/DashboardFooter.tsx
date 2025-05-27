/**
 * Dashboard Footer Component
 * 
 * Professional and minimalistic footer for all dashboard pages
 * Features theme-aware styling and consistent branding
 */

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { MoonLogo } from "@/components/navigation/MoonLogo";

export const DashboardFooter = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: "Homepage", href: "/" },
    { label: "Whitepaper", href: "/whitepaper" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Help Center", href: "/help" }
  ];

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={cn(
        "mt-auto border-t backdrop-blur-xl transition-all duration-300",
        "glass bg-glass-bg/50 border-glass-border/30",
        "px-6 py-8"
      )}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and branding */}
          <div className="flex items-center gap-4">
            <MoonLogo 
              className="h-8 w-8 filter drop-shadow-[0_0_8px_rgba(124,58,237,0.6)]" 
              animated={false}
            />
            <div className="text-sm">
              <div className="font-semibold text-text-primary">
                MoonSet
              </div>
              <div className="text-text-tertiary text-xs">
                Bridging Worlds Through Technology
              </div>
            </div>
          </div>

          {/* Footer links */}
          <div className="flex flex-wrap items-center gap-6 text-sm">
            {footerLinks.map((link, index) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-text-secondary hover:text-primary transition-colors duration-200",
                  "hover:underline underline-offset-4"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-xs text-text-tertiary text-center md:text-right">
            <div>© {currentYear} MoonSet</div>
            <div className="mt-1">All rights reserved</div>
          </div>
        </div>

        {/* Secondary footer info */}
        <div className="mt-6 pt-6 border-t border-glass-border/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-tertiary">
            <div className="flex items-center gap-4">
              <span>Built with cutting-edge technology</span>
              <span className="hidden md:inline">•</span>
              <span>Powered by blockchain innovation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}; 