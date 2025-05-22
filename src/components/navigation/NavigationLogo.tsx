
import { Link } from "react-router-dom";
import { MoonLogo } from "./MoonLogo";

interface NavigationLogoProps {
  className?: string;
}

export const NavigationLogo = ({ className = "" }: NavigationLogoProps) => {
  return (
    <Link to="/" className={`flex items-center gap-2 mr-6 ${className}`}>
      <MoonLogo className="w-6 h-6 filter drop-shadow-[0_0_3px_#4ADE80]" />
      <span className="font-bold text-base">MOONSET</span>
    </Link>
  );
};
