import { useState, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { EnhancedSidebar } from "@/components/dashboard/EnhancedSidebar";
import { PortfolioView } from "@/components/dashboard/PortfolioView";
import { useTheme } from "@/context/ThemeContext";

// Lazy load components for better performance
const MoonsetTokenView = lazy(() => import("@/components/dashboard/moonset-token"));
const CommunityView = lazy(() => import("@/components/dashboard/CommunityView").then(module => ({ default: module.CommunityView })));
const PostDetail = lazy(() => import("@/components/forum/PostDetail").then(module => ({ default: module.PostDetail })));
const SettingsView = lazy(() => import("@/components/dashboard/SettingsView").then(module => ({ default: module.SettingsView })));
const MoonChatView = lazy(() => import("@/components/dashboard/MoonChatView").then(module => ({ default: module.MoonChatView })));

// Loading fallback
const PageLoading = () => (
  <div className="flex items-center justify-center h-full w-full bg-transparent">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

export const Dashboard = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <div className="flex h-screen bg-transparent transition-colors duration-300 overflow-hidden">
      <EnhancedSidebar 
        isMobileOpen={isMobileSidebarOpen} 
        setIsMobileOpen={setIsMobileSidebarOpen} 
      />
      
      <div className="flex-1 flex flex-col h-full bg-transparent transition-colors duration-300 md:ml-72 overflow-y-auto">
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route index element={<PortfolioView />} />
            <Route path="portfolio" element={<PortfolioView />} />
            <Route path="moonset-token" element={<MoonsetTokenView />} />
            <Route path="community" element={<CommunityView />} />
            <Route path="community/post/:postId" element={<PostDetail />} />
            <Route path="moonchat" element={<MoonChatView />} />
            <Route path="settings" element={<SettingsView />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};
