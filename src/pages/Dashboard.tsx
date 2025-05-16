
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { PortfolioView } from "@/components/dashboard/PortfolioView";

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
          {/* Add more dashboard routes as needed */}
        </Routes>
      </div>
    </div>
  );
};
