
import { Link } from "react-router-dom";
import { Command } from "lucide-react";

interface NavigationLogoProps {
  className?: string;
}

export const NavigationLogo = ({ className = "" }: NavigationLogoProps) => {
  return (
    <Link to="/" className={`flex items-center gap-2 mr-6 ${className}`}>
      <Command className="w-5 h-5 text-primary" />
      <span className="font-bold text-base">MOONSET</span>
    </Link>
  );
};
