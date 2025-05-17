
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export const FrameworkSection = () => {
  const { session } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <div className={isDark ? "bg-black" : "bg-white"}>
      <section className="container px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-8">A Framework for Investigation, Not Pre-Determined Conclusions</h2>
          <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-700"} mb-6`}>
            MoonSet provides powerful tools and a transparent protocol for investigation. Our platform welcomes evidence supporting all perspectives, emphasizing the scientific method and rigorous peer review.
          </p>
          <div className="flex justify-center mt-8">
            {session.isLoggedIn ? (
              <Link to="/dashboard">
                <Button size="lg" className="button-gradient">
                  Explore Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button size="lg" className="button-gradient">
                  Join The Community
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
