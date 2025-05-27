/**
 * Enhanced Sidebar Component for Moonset Dashboard
 * 
 * Features:
 * - Advanced glass morphism effects matching token page
 * - Sophisticated gradient hover states and active indicators
 * - Professional micro-animations and transitions
 * - Enhanced visual hierarchy with improved iconography
 * - Perfect theme-aware color system integration
 * - Mobile-optimized slide transitions
 */

import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  Wallet, 
  BarChart3, 
  Settings, 
  LogOut, 
  Users, 
  Bot, 
  DollarSign,
  ChevronRight,
  Home,
  TrendingUp,
  Zap,
  Shield,
  Sparkles,
  Rocket,
  Database
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button, IconButton } from "@/design-system/components/base";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MoonLogo } from "@/components/navigation/MoonLogo";
import { AnimatedTextLogo } from "@/components/navigation/AnimatedTextLogo";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

interface EnhancedSidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

const navigationItems = [
  {
    title: "Portfolio",
    href: "/dashboard/portfolio",
    icon: Home,
    description: "View your assets"
  },
  {
    title: "MOONSET",
    href: "/dashboard/moonset-token", 
    icon: DollarSign,
    description: "Token trading",
    highlight: true // Special highlighting for token page
  },
  {
    title: "Community",
    href: "/dashboard/community",
    icon: Users,
    description: "Connect with others"
  },
  {
    title: "MoonChat AI",
    href: "/dashboard/moonchat",
    icon: Bot,
    description: "AI assistant"
  },
  {
    title: "Markets",
    href: "/dashboard/markets",
    icon: TrendingUp,
    description: "Market analysis"
  },
  {
    title: "Settings", 
    href: "/dashboard/settings",
    icon: Settings,
    description: "Configure your account"
  }
];

// Enhanced navigation item component
const NavigationItem = ({ item, isMobile = false, onClick }: {
  item: typeof navigationItems[0];
  isMobile?: boolean;
  onClick?: () => void;
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <NavLink
      to={item.href}
      onClick={onClick}
      className={({ isActive }) => cn(
        "group relative flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300 ease-out no-underline hover:no-underline decoration-none hover:decoration-none",
        "hover:scale-[1.02] active:scale-[0.98]",
        // Enhanced glass morphism effects
        isActive 
          ? "glass-elevated shadow-glass-glow bg-glass-bg-elevated border border-glass-border-hover backdrop-blur-xl" 
          : "glass bg-glass-bg/30 hover:bg-glass-bg hover:shadow-glass-subtle border border-transparent hover:border-glass-border backdrop-blur-lg",
        // Special highlight for MOONSET token page
        item.highlight && "hover:border-gradient-to-r hover:from-purple-500/50 hover:to-blue-500/50"
      )}
    >
      {({ isActive }) => (
        <>
          {/* Enhanced gradient background for active state */}
          {isActive && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-500/20"
              initial={false}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30
              }}
            />
          )}
          
          {/* Icon with enhanced styling */}
          <div className={cn(
            "relative flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300",
            isActive 
              ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-glass-glow" 
              : cn(
                  // Theme-aware background and text colors for better contrast
                  isDark 
                    ? "bg-slate-800/60 text-slate-300 group-hover:bg-gradient-to-r group-hover:from-purple-500/20 group-hover:to-blue-500/20 group-hover:text-purple-300"
                    : "bg-white/90 text-slate-600 group-hover:bg-gradient-to-r group-hover:from-purple-500/15 group-hover:to-blue-500/15 group-hover:text-purple-600",
                  "border border-white/20 group-hover:border-purple-500/30 shadow-sm"
                ),
            item.highlight && "group-hover:scale-110"
          )}>
            <item.icon className={cn(
              "h-5 w-5 transition-colors duration-300",
              isActive 
                ? "text-white" 
                : isDark 
                  ? "text-slate-300 group-hover:text-purple-300" 
                  : "text-slate-600 group-hover:text-purple-600"
            )} />
            
            {/* Subtle glow effect for highlighted items */}
            {item.highlight && (
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}
          </div>

          {/* Text content with enhanced typography */}
          <div className="flex-1 min-w-0">
            <div className={cn(
              "text-sm font-medium transition-colors duration-200 no-underline hover:no-underline decoration-none hover:decoration-none",
              isActive ? "text-text-primary" : "text-text-secondary group-hover:text-text-primary"
            )}>
              {item.title}
            </div>
            <div className={cn(
              "text-xs transition-colors duration-200 no-underline hover:no-underline decoration-none hover:decoration-none",
              isActive ? "text-text-secondary" : "text-text-tertiary group-hover:text-text-secondary"
            )}>
              {item.description}
            </div>
          </div>

          {/* Enhanced active indicator */}
          {isActive && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-glass-glow"
            >
              <ChevronRight className="h-3 w-3" />
            </motion.div>
          )}
        </>
      )}
    </NavLink>
  );
};

// Special coming soon button component
const ComingSoonButton = ({ 
  title, 
  description, 
  icon: Icon, 
  gradient,
  glowColor,
  onClick 
}: {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  gradient: string;
  glowColor: string;
  onClick?: () => void;
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isADA = title === "ADA";
  
  return (
    <motion.button
      onClick={onClick}
      disabled
      className={cn(
        "group relative w-full flex items-center gap-3 rounded-xl p-3 transition-all duration-500 ease-out",
        "glass-elevated bg-glass-bg/20 border border-glass-border/30 backdrop-blur-xl",
        "hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]",
        "cursor-pointer opacity-90 hover:opacity-100",
        isADA && "overflow-hidden"
      )}
      style={{
        cursor: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23fbbf24\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'><polygon points=\'12,2 15.09,8.26 22,9 17,14.74 18.18,21.02 12,17.77 5.82,21.02 7,14.74 2,9 8.91,8.26 12,2\'/></svg>") 10 10, pointer'
      }}
      whileHover={{ 
        y: -4,
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Enhanced pulsing border effect */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{
          border: `2px solid ${glowColor}40`,
          filter: 'blur(1px)'
        }}
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Animated gradient background with enhanced hover effect */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700",
          gradient
        )}
        animate={{
          background: [
            "linear-gradient(45deg, transparent, transparent)",
            `linear-gradient(45deg, ${glowColor}15, transparent, ${glowColor}15)`,
            "linear-gradient(45deg, transparent, transparent)",
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Sweeping light effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${glowColor}30, transparent)`,
        }}
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut"
        }}
      />

      {/* Enhanced particle effects with more variety */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              "absolute rounded-full",
              i % 3 === 0 ? "h-1 w-1" : i % 3 === 1 ? "h-0.5 w-0.5" : "h-1.5 w-1.5",
              i % 2 === 0 ? "bg-white" : glowColor.includes("red") ? "bg-red-400" : 
              glowColor.includes("147") ? "bg-purple-400" : "bg-blue-400"
            )}
            style={{
              left: `${5 + i * 12}%`,
              top: `${15 + (i % 4) * 20}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 2, 0.5],
              y: [-30, 30, -30],
              x: [-15, 15, -15],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: 4 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Floating orbs effect */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${8 + i * 4}px`,
              height: `${8 + i * 4}px`,
              background: `radial-gradient(circle, ${glowColor}60, transparent)`,
              left: `${20 + i * 30}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Special cosmic effects for ADA */}
      {isADA && (
        <>
          {/* Enhanced orbiting stars effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute h-0.5 w-0.5 bg-white rounded-full"
                style={{
                  left: "50%",
                  top: "50%",
                }}
                animate={{
                  x: [
                    Math.cos((i * 30) * Math.PI / 180) * 60,
                    Math.cos((i * 30 + 360) * Math.PI / 180) * 60
                  ],
                  y: [
                    Math.sin((i * 30) * Math.PI / 180) * 60,
                    Math.sin((i * 30 + 360) * Math.PI / 180) * 60
                  ],
                  opacity: [0.2, 1, 0.2],
                  scale: [0.5, 2, 0.5],
                }}
                transition={{
                  duration: 4 + i * 0.2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>
          
          {/* Enhanced cosmic nebula effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: "radial-gradient(ellipse at center, transparent 0%, rgba(147, 51, 234, 0.2) 40%, transparent 70%)",
              filter: "blur(12px)",
            }}
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          
          {/* Enhanced data stream effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={`stream-${i}`}
                className="absolute h-full w-0.5"
                style={{
                  left: `${15 + i * 12}%`,
                  background: "linear-gradient(to bottom, transparent, rgba(147, 51, 234, 0.8), transparent)",
                }}
                animate={{
                  y: ["-100%", "200%"],
                  opacity: [0, 1, 0],
                  scaleY: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {/* Quantum field effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`quantum-${i}`}
                className="absolute h-px bg-purple-400"
                style={{
                  width: `${10 + Math.random() * 20}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scaleX: [0, 1, 0],
                  rotate: [0, 90, 180],
                }}
                transition={{
                  duration: 1.5 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </>
      )}
      
      {/* Enhanced icon with special effects */}
      <div className={cn(
        "relative flex h-12 w-12 items-center justify-center rounded-lg transition-all duration-500",
        "bg-glass-bg/50 group-hover:scale-125 border border-glass-border/20",
        gradient,
        "shadow-lg group-hover:shadow-2xl"
      )}>
        <Icon className={cn(
          "h-6 w-6 drop-shadow-lg relative z-10 transition-colors duration-300",
          isDark ? "text-white" : "text-slate-700 group-hover:text-white"
        )} />
        
        {/* Enhanced pulsing glow effect */}
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
          style={{
            boxShadow: `0 0 40px ${glowColor}90`,
            background: `radial-gradient(circle at center, ${glowColor}40 0%, transparent 70%)`
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.8, 1.4, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />

        {/* Rotating border effect */}
        <motion.div
          className="absolute inset-0 rounded-lg border-2 border-transparent opacity-0 group-hover:opacity-100"
          style={{
            background: `linear-gradient(90deg, transparent, ${glowColor}80, transparent) border-box`,
            WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'destination-out',
            maskComposite: 'exclude',
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Icon breathing effect */}
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at center, ${glowColor}20 0%, transparent 60%)`
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Text content with enhanced hover effect */}
      <div className="flex-1 min-w-0 text-left relative">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-text-primary group-hover:text-white transition-colors duration-500 relative">
            {title}
            <motion.div
              className="absolute bottom-0 left-0 w-0 h-0.5 bg-white opacity-0 group-hover:opacity-100"
              animate={{
                width: ["0%", "100%", "0%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
            {/* Text glow effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                textShadow: `0 0 10px ${glowColor}80`,
                color: 'white'
              }}
              transition={{
                duration: 0.3
              }}
            >
              {title}
            </motion.div>
          </span>
          <motion.span 
            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs font-medium text-white shadow-lg group-hover:shadow-xl relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #ff6b35, #f7931e, #ffb347, #ff8c42, #ff7f50)",
              fontSize: "10px"
            }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            whileHover={{
              scale: 1.1,
              rotate: [0, -3, 3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                background: "linear-gradient(135deg, #ffb347, #ffd700, #ff8c42, #ffa500)"
              }}
              animate={{
                background: [
                  "linear-gradient(135deg, #ffb347, #ffd700, #ff8c42, #ffa500)",
                  "linear-gradient(135deg, #ff7f50, #ff6347, #ff4500, #ff8c00)",
                  "linear-gradient(135deg, #ffb347, #ffd700, #ff8c42, #ffa500)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)"
              }}
              animate={{
                x: ["-100%", "200%"]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut"
              }}
            />

            {/* Sparkle particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`sparkle-${i}`}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${20 + i * 20}%`,
                    top: `${30 + (i % 2) * 40}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.5, 0.5],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            {/* Enhanced sparkles icon */}
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="h-3 w-3 relative z-10" />
            </motion.div>
            
            <span className="relative z-10 font-semibold">Coming Soon</span>

            {/* Pulsing border */}
            <motion.div
              className="absolute inset-0 rounded-full border border-white/20"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.span>
        </div>
        <div className="text-xs text-text-tertiary group-hover:text-gray-200 transition-colors duration-500 mt-1">
          {description}
        </div>
      </div>

      {/* Enhanced arrow indicator */}
      <motion.div
        className="opacity-50 group-hover:opacity-100 transition-opacity duration-300"
        animate={{
          x: [0, 8, 0],
          y: [0, -3, 0],
        }}
        whileHover={{
          scale: 1.2,
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <Rocket className="h-4 w-4 text-text-secondary group-hover:text-white transition-colors duration-300" />
        
        {/* Rocket trail effect */}
        <motion.div
          className="absolute -left-8 top-1/2 w-6 h-0.5 opacity-0 group-hover:opacity-100"
          style={{
            background: `linear-gradient(to right, transparent, ${glowColor}60)`
          }}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
        />
      </motion.div>
    </motion.button>
  );
};

export const EnhancedSidebar = ({ isMobileOpen, setIsMobileOpen }: EnhancedSidebarProps) => {
  const { session, signOut } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleLogout = async () => {
    await signOut();
    setIsMobileOpen(false);
  };

  // Enhanced sidebar content
  const SidebarContent = () => (
    <motion.div
      initial={false}
      animate={{ opacity: 1 }}
      className="flex h-full flex-col glass-elevated border-r border-glass-border backdrop-blur-2xl bg-glass-bg-elevated/95"
    >
      {/* Enhanced header section with larger logos */}
      <div className="flex h-32 items-center justify-between px-4 border-b border-glass-border/50">
        <Link 
          to="/dashboard" 
          className="flex items-center gap-6 group hover:scale-[1.02] transition-transform duration-200 no-underline hover:no-underline decoration-none hover:decoration-none"
          onClick={() => setIsMobileOpen(false)}
        >
          <motion.div
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <MoonLogo 
              className="h-24 w-24 filter drop-shadow-[0_0_12px_rgba(124,58,237,0.8)]" 
              animated={true}
            />
          </motion.div>
          <AnimatedTextLogo 
            size="lg-plus"
            showSubtext={true}
            subtextContent="Dashboard"
            className="group"
          />
        </Link>

        {/* Mobile close button with enhanced styling */}
        <div className="md:hidden">
          <IconButton
            icon={<X className="h-5 w-5" />}
            variant="ghost"
            size="icon-sm"
            onClick={() => setIsMobileOpen(false)}
            aria-label="Close sidebar"
            className="hover:bg-glass-bg/50"
          />
        </div>
      </div>

      {/* Enhanced navigation section */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <NavigationItem
              key={item.href}
              item={item}
              onClick={() => setIsMobileOpen(false)}
            />
          ))}
        </div>

        {/* Special Coming Soon Features */}
        <div className="mt-8 space-y-3">
          <div className="px-3">
            <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">
              Next Generation Features
            </h3>
          </div>
          
          <ComingSoonButton
            title="MARS"
            description="MoonSet AI Research Suite"
            icon={Zap}
            gradient="bg-gradient-to-r from-blue-500 to-cyan-500"
            glowColor="rgb(59, 130, 246)"
            onClick={() => {
              // Future functionality - could show a preview modal
              console.log("MARS coming soon!");
            }}
          />
          
          <ComingSoonButton
            title="DEL"
            description="Decentralized Evidence Ledger"
            icon={Shield}
            gradient="bg-gradient-to-r from-red-500 to-pink-500"
            glowColor="rgb(239, 68, 68)"
            onClick={() => {
              // Future functionality - could show a preview modal
              console.log("DEL coming soon!");
            }}
          />
          
          <ComingSoonButton
            title="ADA"
            description="Apollo Data Archive"
            icon={Database}
            gradient="bg-gradient-to-r from-purple-500 to-indigo-500"
            glowColor="rgb(147, 51, 234)"
            onClick={() => {
              // Future functionality - could show a preview modal
              console.log("ADA coming soon!");
            }}
          />
        </div>
      </nav>

      {/* Enhanced footer section */}
      <div className="border-t border-glass-border/50 p-4 space-y-4">
        {/* Theme toggle with enhanced styling */}
        <div className="flex items-center justify-between glass bg-glass-bg/50 rounded-xl p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20">
              <Settings className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-medium text-text-primary">Theme</span>
          </div>
          <ThemeToggle />
        </div>

        {/* Enhanced user section */}
        {session.isLoggedIn && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass bg-glass-bg/50 rounded-xl p-3"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow-glass-glow">
                {session.user?.username?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-text-primary truncate">
                  {session.user?.username || 'User'}
                </div>
                <div className="text-xs text-text-tertiary">
                  {session.user?.email ? 'Premium' : 'Free Plan'}
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              leftIcon={<LogOut className="h-4 w-4" />}
              className="w-full text-xs hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50"
            >
              Sign Out
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-30">
        <SidebarContent />
      </div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
            className="fixed inset-y-0 left-0 z-50 w-72 md:hidden"
          >
            <SidebarContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <Button
          variant="glass"
          size="icon"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle sidebar"
          className="shadow-glass-glow"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </>
  );
}; 