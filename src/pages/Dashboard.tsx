
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { PortfolioView } from "@/components/dashboard/PortfolioView";
import { MoonsetTokenView } from "@/components/dashboard/MoonsetTokenView";
import { CommunityView } from "@/components/dashboard/CommunityView";

export const Dashboard = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar 
        isMobileOpen={isMobileSidebarOpen} 
        setIsMobileOpen={setIsMobileSidebarOpen} 
      />
      
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<PortfolioView />} />
          <Route path="/portfolio" element={<PortfolioView />} />
          <Route path="/moonset-token" element={<MoonsetTokenView />} />
          <Route path="/community" element={<CommunityView />} />
        </Routes>
      </div>
    </div>
  );
};
