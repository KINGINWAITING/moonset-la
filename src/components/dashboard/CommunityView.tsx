
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Twitter, 
  MessageSquare, 
  Users, 
  Vote,
  Globe
} from "lucide-react";

export const CommunityView = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Community <span className="text-primary">Hub</span>
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-[#121212] border-gray-800">
          <CardHeader>
            <CardTitle>Social Channels</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <a href="#" className="flex items-center space-x-3 p-3 border border-gray-800 rounded-lg hover:bg-gray-900 transition-colors">
              <Twitter className="text-blue-400 h-5 w-5" />
              <span>Twitter</span>
            </a>
            <a href="#" className="flex items-center space-x-3 p-3 border border-gray-800 rounded-lg hover:bg-gray-900 transition-colors">
              <Globe className="text-purple-400 h-5 w-5" />
              <span>Discord</span>
            </a>
            <a href="#" className="flex items-center space-x-3 p-3 border border-gray-800 rounded-lg hover:bg-gray-900 transition-colors">
              <MessageSquare className="text-green-400 h-5 w-5" />
              <span>Telegram</span>
            </a>
          </CardContent>
        </Card>
        
        <Card className="bg-[#121212] border-gray-800">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border border-gray-800 rounded-lg p-4">
              <h3 className="font-semibold">AMA Session</h3>
              <p className="text-sm text-gray-400">May 25, 2023 • 2:00 PM UTC</p>
              <p className="mt-2 text-sm">Join our team for a live AMA session on Discord</p>
            </div>
            <div className="border border-gray-800 rounded-lg p-4">
              <h3 className="font-semibold">Community Call #12</h3>
              <p className="text-sm text-gray-400">June 1, 2023 • 3:00 PM UTC</p>
              <p className="mt-2 text-sm">Monthly update with the development team</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#121212] border-gray-800 md:col-span-2">
          <CardHeader>
            <CardTitle>Governance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border border-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">MIP-23: Treasury Diversification</h3>
                    <p className="text-sm text-gray-400">Voting ends in 3 days</p>
                  </div>
                  <div className="px-2 py-1 bg-green-900 text-green-400 text-xs rounded">Active</div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center gap-2 bg-[#1B1B1B] text-white px-3 py-2 rounded hover:bg-[#252525] transition-colors">
                    <Vote className="w-4 h-4" />
                    Vote For
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-[#1B1B1B] text-white px-3 py-2 rounded hover:bg-[#252525] transition-colors">
                    <Vote className="w-4 h-4" />
                    Vote Against
                  </button>
                </div>
              </div>
              
              <div className="border border-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">MIP-22: Staking Rewards Increase</h3>
                    <p className="text-sm text-gray-400">Voting ended May 10, 2023</p>
                  </div>
                  <div className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded">Passed</div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '73%' }}></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-400">
                    <span>73% For</span>
                    <span>27% Against</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#121212] border-gray-800 md:col-span-2">
          <CardHeader>
            <CardTitle>Community Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border border-gray-800 rounded-lg p-4 flex flex-col">
                <span className="text-gray-400 text-sm">Twitter Followers</span>
                <span className="text-2xl font-bold">26.5K</span>
                <span className="text-green-500 text-sm mt-2">+1.2K this month</span>
              </div>
              <div className="border border-gray-800 rounded-lg p-4 flex flex-col">
                <span className="text-gray-400 text-sm">Discord Members</span>
                <span className="text-2xl font-bold">12.8K</span>
                <span className="text-green-500 text-sm mt-2">+830 this month</span>
              </div>
              <div className="border border-gray-800 rounded-lg p-4 flex flex-col">
                <span className="text-gray-400 text-sm">Governance Participants</span>
                <span className="text-2xl font-bold">3.2K</span>
                <span className="text-green-500 text-sm mt-2">+18% this month</span>
              </div>
              <div className="border border-gray-800 rounded-lg p-4 flex flex-col">
                <span className="text-gray-400 text-sm">Community Contributors</span>
                <span className="text-2xl font-bold">154</span>
                <span className="text-green-500 text-sm mt-2">+12 this month</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
