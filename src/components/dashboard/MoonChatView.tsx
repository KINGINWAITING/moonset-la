/**
 * Professional MoonChat AI View
 * 
 * Features:
 * - Clean, minimalistic design without cards
 * - Professional AI chatbot interface
 * - Advanced conversation management
 * - Full-screen chat experience with enhanced scrolling
 * - Modern layout with sidebar and main chat area
 * - Enhanced accessibility and performance
 * - Fixed viewport height to prevent page expansion
 */

import React from "react";
import { ChatProvider } from "@/contexts/ChatContext";
import { ChatLayout } from "@/components/chat/layout/ChatLayout";

export const MoonChatView: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-background overflow-hidden">
      <ChatProvider>
        <ChatLayout className="flex-1" />
      </ChatProvider>
    </div>
  );
};

// For lazy loading
export default MoonChatView;
