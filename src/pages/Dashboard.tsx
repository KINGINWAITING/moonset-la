
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { PortfolioView } from "@/components/dashboard/PortfolioView";
import { MoonsetTokenView } from "@/components/dashboard/MoonsetTokenView";
import { CommunityView } from "@/components/dashboard/CommunityView";
import { PostDetail } from "@/components/forum/PostDetail";
import { SettingsView } from "@/components/dashboard/SettingsView";
import { MoonChatView } from "@/components/dashboard/MoonChatView";

export const Dashboard = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar 
        isMobileOpen={isMobileSidebarOpen} 
        setIsMobileOpen={setIsMobileSidebarOpen} 
      />
      
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<PortfolioView />} />
          <Route path="/portfolio" element={<PortfolioView />} />
          <Route path="/moonset-token" element={<MoonsetTokenView />} />
          <Route path="/community" element={<CommunityView />} />
          <Route path="/community/post/:postId" element={<PostDetail />} />
          <Route path="/moonchat" element={<MoonChatView />} />
          <Route path="/settings" element={<SettingsView />} />
        </Routes>
      </div>
    </div>
  );
};
