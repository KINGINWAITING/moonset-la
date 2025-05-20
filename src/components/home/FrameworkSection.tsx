
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export const FrameworkSection = () => {
  const { session } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <div className={`${isDark ? "bg-transparent" : "bg-transparent"} relative z-10`}>
      <section className="container px-4 py-20">
        <div className="max-w-3xl mx-auto text-center glass rounded-xl p-8">
          <h2 className="text-3xl md:text-4xl font-medium mb-8">A Framework for Investigation, Not Pre-Determined Conclusions</h2>
          <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-700"} mb-6`}>
            MoonSet provides powerful tools and a transparent protocol for investigation. Our platform welcomes evidence supporting all perspectives, emphasizing the scientific method and rigorous peer review.
          </p>
          
          <div className="flex justify-center mb-8">
            <img
              src={isDark 
                ? "/lovable-uploads/0dbe1b75-2c74-4ff8-ba55-4be4d74abe72.png"
                : "/lovable-uploads/7335619d-58a9-41ad-a233-f7826f56f3e9.png"
              }
              alt="Evidence framework"
              className="w-full max-w-2xl h-auto rounded-lg"
            />
          </div>
          
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
