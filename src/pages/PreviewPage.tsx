
import { PreviewDemo } from "@/components/PreviewDemo";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useTheme } from "@/context/ThemeContext";

const PreviewPage = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <div className={`min-h-screen ${isDark ? "bg-black" : "bg-white"} transition-colors`}>
      <Navigation />
      
      <div className="container px-4 py-16 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Preview Component Demo</h1>
        <p className="text-muted-foreground mb-8">
          This page demonstrates the usage of the custom Preview component which allows
          toggling visibility of content blocks.
        </p>
        
        <PreviewDemo />
      </div>
      
      <Footer />
    </div>
  );
};

export default PreviewPage;
