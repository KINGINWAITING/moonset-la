
import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Wallet, BarChart3, Settings, LogOut, Users, Bot, DollarSign } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";
import { MoonLogo } from "@/components/navigation/MoonLogo";

interface SidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (value: boolean) => void;
}

export const Sidebar = ({ isMobileOpen, setIsMobileOpen }: SidebarProps) => {
  const { signOut } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const navItems = [
    { name: "Portfolio", path: "/dashboard/portfolio", icon: <Wallet className="w-5 h-5" /> },
    { name: "MOONSET", path: "/dashboard/moonset-token", icon: <DollarSign className="w-5 h-5" /> },
    { name: "Community", path: "/dashboard/community", icon: <Users className="w-5 h-5" /> },
    { name: "MoonChat AI", path: "/dashboard/moonchat", icon: <Bot className="w-5 h-5" /> },
    { name: "Markets", path: "/dashboard/markets", icon: <BarChart3 className="w-5 h-5" /> },
    { name: "Settings", path: "/dashboard/settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/80 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      {/* Mobile sidebar toggle button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md text-foreground lg:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar with improved theme handling */}
      <motion.aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 transition-transform duration-200 ease-in-out ${
          isDark 
            ? "bg-[#0A0A0A] border-gray-800 text-white" 
            : "bg-white border-gray-200 text-black"
        } border-r transform ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo and Theme Toggle */}
        <div className="flex items-center justify-between p-6">
          <Link to="/" className="flex items-center gap-2">
            <MoonLogo className="h-6 w-6 filter drop-shadow-[0_0_3px_#4ADE80]" />
            <span className="text-xl font-bold">MOONSET</span>
          </Link>
          <ThemeToggle />
        </div>
        
        {/* Navigation with improved theme handling */}
        <nav className="px-4 pt-6">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? isDark 
                          ? "bg-gray-800/50 text-primary" 
                          : "bg-gray-100 text-primary"
                        : isDark 
                          ? "text-gray-400 hover:bg-gray-800/30 hover:text-white" 
                          : "text-gray-600 hover:bg-gray-100 hover:text-black"
                    }`
                  }
                  onClick={() => setIsMobileOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Sign out button with improved theme handling */}
        <div className="absolute bottom-6 left-0 right-0 px-4">
          <Button 
            variant="ghost" 
            className={isDark 
              ? "w-full justify-start text-gray-400 hover:text-white" 
              : "w-full justify-start text-gray-600 hover:text-black"
            }
            onClick={signOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </motion.aside>
    </>
  );
};
