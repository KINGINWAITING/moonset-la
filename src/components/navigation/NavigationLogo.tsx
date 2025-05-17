
import { Link } from "react-router-dom";
import { Command } from "lucide-react";

export const NavigationLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <Command className="w-5 h-5 text-primary" />
      <span className="font-bold text-base">MOONSET</span>
    </Link>
  );
};
