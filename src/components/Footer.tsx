import { Github, Twitter } from "lucide-react";
import { Button } from "./ui/button";
import { MoonLogo } from "./navigation/MoonLogo";
import { useTheme } from "@/context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer className="w-full py-12 mt-20">
      <div className="container px-4">
        <div className="glass glass-hover rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 group">
                <MoonLogo 
                  className="w-7 h-7 filter drop-shadow-[0_0_4px_rgba(139,69,255,0.3)] transition-all duration-300 group-hover:scale-110" 
                  animated={true}
                />
                <h3 className="font-medium text-lg flex items-center">
                  <span className={`font-semibold bg-clip-text text-transparent bg-gradient-to-r transition-all duration-300 ${
                    isDark 
                      ? "from-purple-400 via-cyan-400 to-blue-400 group-hover:from-purple-300 group-hover:via-cyan-300 group-hover:to-blue-300" 
                      : "from-blue-600 via-purple-600 to-indigo-600 group-hover:from-blue-500 group-hover:via-purple-500 group-hover:to-indigo-500"
                  }`}>
                    MOON
                  </span>
                  <span className={`font-light transition-colors duration-300 ${
                    isDark 
                      ? "text-gray-300 group-hover:text-white" 
                      : "text-gray-700 group-hover:text-gray-900"
                  }`}>
                    SET
                  </span>
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                A tech-driven space for collaborative truth discovery. 
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Github className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Trading</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Markets
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Trading Fees
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Trading Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Market Analysis
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} MOONSET. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
