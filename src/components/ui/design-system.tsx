import { motion, HTMLMotionProps } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

// Design Tokens
export const designTokens = {
  spacing: {
    xs: "0.5rem",   // 8px
    sm: "1rem",     // 16px
    md: "1.5rem",   // 24px
    lg: "2rem",     // 32px
    xl: "3rem",     // 48px
    "2xl": "4rem",  // 64px
    "3xl": "6rem",  // 96px
  },
  borderRadius: {
    sm: "0.5rem",
    md: "0.75rem", 
    lg: "1rem",
    xl: "1.5rem",
  },
  shadows: {
    glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    glow: "0 0 20px rgba(34, 197, 94, 0.3)",
    soft: "0 4px 20px rgba(0, 0, 0, 0.1)",
  },
};

// Card Variants
interface CardProps extends HTMLMotionProps<"div"> {
  variant?: "glass" | "solid" | "gradient" | "minimal";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
  children: ReactNode;
  className?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "glass", size = "md", glow = false, children, className, ...props }, ref) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const sizeClasses = {
      sm: "p-4",
      md: "p-6", 
      lg: "p-8",
    };

    const variantClasses = {
      glass: isDark
        ? "bg-white/5 backdrop-blur-md border border-white/10"
        : "bg-white/60 backdrop-blur-md border border-gray-200/50",
      solid: isDark
        ? "bg-gray-900/80 border border-gray-700/50"
        : "bg-white border border-gray-200",
      gradient: isDark
        ? "bg-gradient-to-br from-green-900/20 via-emerald-900/10 to-lime-900/20 backdrop-blur-md border border-green-500/20"
        : "bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 border border-green-200/50",
      minimal: "bg-transparent",
    };

    const glowClass = glow 
      ? isDark
        ? "shadow-[0_0_20px_rgba(34,197,94,0.3)]"
        : "shadow-[0_0_20px_rgba(34,197,94,0.2)]"
      : "";

    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-xl transition-all duration-300",
          variantClasses[variant],
          sizeClasses[size],
          glowClass,
          className
        )}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

// Section Container
interface SectionContainerProps {
  children: ReactNode;
  background?: "transparent" | "subtle" | "gradient";
  padding?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const SectionContainer = ({ 
  children, 
  background = "transparent", 
  padding = "lg", 
  className 
}: SectionContainerProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const paddingClasses = {
    sm: "py-12",
    md: "py-16", 
    lg: "py-20",
    xl: "py-24",
  };

  const backgroundClasses = {
    transparent: "bg-transparent",
    subtle: isDark 
      ? "bg-gradient-to-b from-transparent via-gray-900/5 to-transparent"
      : "bg-gradient-to-b from-transparent via-gray-100/30 to-transparent",
    gradient: isDark
      ? "bg-gradient-to-br from-green-900/10 via-transparent to-emerald-900/10"
      : "bg-gradient-to-br from-green-50/50 via-transparent to-emerald-50/50",
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={cn(
        "relative z-10",
        backgroundClasses[background],
        paddingClasses[padding],
        className
      )}
    >
      <div className="container mx-auto px-4">
        {children}
      </div>
    </motion.section>
  );
};

// Typography Components
interface HeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4;
  gradient?: boolean;
  className?: string;
}

export const Heading = ({ children, level = 2, gradient = false, className }: HeadingProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const sizeClasses = {
    1: "text-5xl md:text-6xl lg:text-7xl",
    2: "text-3xl md:text-4xl lg:text-5xl", 
    3: "text-2xl md:text-3xl",
    4: "text-xl md:text-2xl",
  };

  const gradientClass = gradient && isDark
    ? "text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-lime-400"
    : "";

  return (
    <Tag className={cn(
      "font-bold tracking-tight leading-tight mb-6",
      sizeClasses[level],
      gradientClass,
      !gradient && (isDark ? "text-white" : "text-gray-900"),
      className
    )}>
      {children}
    </Tag>
  );
};

// Button Enhancements
interface ButtonVariant {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const DesignButton = ({ 
  variant = "primary", 
  size = "md", 
  glow = false, 
  children, 
  className,
  onClick 
}: ButtonVariant) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary: isDark
      ? "bg-green-600 hover:bg-green-700 text-white"
      : "bg-green-600 hover:bg-green-700 text-white",
    secondary: isDark
      ? "bg-gray-700 hover:bg-gray-600 text-white"
      : "bg-gray-200 hover:bg-gray-300 text-gray-900",
    outline: isDark
      ? "border border-green-500 text-green-400 hover:bg-green-500/10"
      : "border border-green-500 text-green-600 hover:bg-green-50",
    ghost: isDark
      ? "text-gray-300 hover:bg-white/5"
      : "text-gray-700 hover:bg-gray-100",
    gradient: "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white",
  };

  const glowClass = glow
    ? "shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)]"
    : "";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={cn(
        "rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2",
        sizeClasses[size],
        variantClasses[variant],
        glowClass,
        className
      )}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

// Grid System
interface GridProps {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4 | 6;
  gap?: "sm" | "md" | "lg";
  className?: string;
}

export const Grid = ({ children, cols = 3, gap = "md", className }: GridProps) => {
  const gapClasses = {
    sm: "gap-4",
    md: "gap-6", 
    lg: "gap-8",
  };

  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    6: "grid-cols-1 md:grid-cols-3 lg:grid-cols-6",
  };

  return (
    <div className={cn(
      "grid",
      colClasses[cols],
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  );
};

// Animated Icon Wrapper
interface AnimatedIconProps {
  children: ReactNode;
  color?: "primary" | "secondary" | "accent";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
  className?: string;
}

export const AnimatedIcon = ({ 
  children, 
  color = "primary", 
  size = "md", 
  glow = false, 
  className 
}: AnimatedIconProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const sizeClasses = {
    sm: "w-8 h-8 p-2",
    md: "w-12 h-12 p-3",
    lg: "w-16 h-16 p-4",
  };

  const colorClasses = {
    primary: isDark ? "text-green-400" : "text-green-600",
    secondary: isDark ? "text-emerald-400" : "text-emerald-600", 
    accent: isDark ? "text-lime-400" : "text-lime-600",
  };

  const glowClass = glow
    ? "shadow-[0_0_20px_currentColor] opacity-80"
    : "";

  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={cn(
        "rounded-full flex items-center justify-center",
        sizeClasses[size],
        colorClasses[color],
        glowClass,
        isDark ? "bg-white/5" : "bg-gray-100",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

// Loading States
export const SkeletonLoader = ({ className }: { className?: string }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
      className={cn(
        "rounded-lg",
        isDark ? "bg-gray-700" : "bg-gray-200",
        className
      )}
    />
  );
}; 