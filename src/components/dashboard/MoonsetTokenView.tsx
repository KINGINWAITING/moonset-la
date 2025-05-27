import { useState } from "react";
import { motion } from "framer-motion";
import { tokenConfig } from "@/config/tokenConfig";
import { TokenStats } from "./moonset-token/TokenStats";
import { PriceChart } from "./moonset-token/PriceChart";
import { SwapWidget } from "./moonset-token/SwapWidget";
import { usePriceData } from "@/hooks/usePriceData";
import { 
  Search, 
  Plus, 
  Bell, 
  Filter,
  Rocket, 
  Users, 
  Shield, 
  ExternalLink, 
  TrendingUp, 
  Globe, 
  Twitter, 
  Copy,
  Zap,
  Lock,
  Coins,
  BarChart3,
  Star,
  ArrowUpRight,
  CheckCircle2,
  Hash,
  Clock,
  DollarSign
} from "lucide-react";
import { MoonLogo } from "@/components/navigation/MoonLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { DashboardFooter } from "./DashboardFooter";

export const MoonsetTokenView = () => {
  const [timeframe, setTimeframe] = useState("24h");
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { priceData, tokenStats } = usePriceData(timeframe);

  const handleCopyAddress = () => {
    if (tokenConfig.address !== "0x0000000000000000000000000000000000000000") {
      navigator.clipboard.writeText(tokenConfig.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const tokenQuickStats = [
    { label: 'Total Supply', value: `${parseInt(tokenConfig.totalSupply).toLocaleString()}`, icon: Hash },
    { label: 'Circulating', value: `${parseInt(tokenConfig.circulatingSupply).toLocaleString()}`, icon: TrendingUp },
    { label: 'Network', value: 'Ethereum', icon: Globe },
  ];

  const navigationItems = [
    { label: 'Overview', active: true },
    { label: 'Trading', active: false },
    { label: 'Staking', active: false },
    { label: 'Governance', active: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background"
    >
      {/* Token Header - Forum Style */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-6 py-4">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center justify-between">
              
              {/* Left: Token Branding & Navigation */}
              <div className="flex items-center gap-6">
                {/* Token Logo & Name */}
                <div className="flex items-center gap-3">
                  <MoonLogo className="w-8 h-8" animated={false} />
                  <div>
                    <h1 className="text-lg font-semibold">MOONSET</h1>
                    <p className="text-xs text-muted-foreground">Native Utility Token</p>
                  </div>
                </div>

                {/* Navigation Pills */}
                <nav className="hidden md:flex items-center gap-1 bg-muted rounded-lg p-1">
                  {navigationItems.map((item) => (
                    <Button
                      key={item.label}
                      variant={item.active ? "default" : "ghost"}
                      size="sm"
                      className={cn(
                        "text-xs font-medium",
                        item.active 
                          ? "bg-background shadow-sm" 
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </Button>
                  ))}
                </nav>
              </div>

              {/* Center: Price Display */}
              <div className="flex-1 max-w-md mx-6">
                <div className="text-center">
                  {tokenConfig.isLaunched ? (
                    <div>
                      <div className="text-2xl font-bold">$0.0842</div>
                      <div className="flex items-center justify-center gap-1 text-sm text-green-600">
                        <TrendingUp className="w-3 h-3" />
                        +12.4% (24h)
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Badge variant="outline" className="bg-muted/50">
                        <Rocket className="w-3 h-3 mr-1" />
                        Launching Soon
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleCopyAddress}
                  disabled={tokenConfig.address === "0x0000000000000000000000000000000000000000"}
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 mr-1" />
                      Contract
                    </>
                  )}
                </Button>

                <Button 
                  size="sm" 
                  disabled={!tokenConfig.isLaunched}
                  className="gap-1"
                >
                  {tokenConfig.isLaunched ? "Buy MOONSET" : "Get Notified"}
                  <ArrowUpRight className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Token Layout - Forum Grid Style */}
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-12 gap-6 p-6">
          
          {/* Left Sidebar - Token Info */}
          <aside className="col-span-12 lg:col-span-3 xl:col-span-2">
            <div className="sticky top-24 space-y-6">
              
              {/* Token Quick Stats */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Token Overview
                </h3>
                <div className="space-y-2">
                  {tokenQuickStats.map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{stat.label}</span>
                      </div>
                      <span className="text-sm font-medium">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border" />

              {/* Token Status */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Status
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${tokenConfig.isLaunched ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`} />
                    <span className="text-sm">{tokenConfig.isLaunched ? 'Live on Uniswap' : 'Pre-Launch'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Smart Contract Verified</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-border" />

              {/* Quick Actions */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Quick Links
                </h3>
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-muted-foreground hover:text-foreground"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    Website
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-muted-foreground hover:text-foreground"
                  >
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-muted-foreground hover:text-foreground"
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analytics
                  </Button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="col-span-12 lg:col-span-6 xl:col-span-7">
            <div className="space-y-6">
              
              {/* Price Chart Section */}
              <div className="bg-background border border-border rounded-lg">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-muted-foreground" />
                      <h2 className="text-lg font-semibold">Price Chart</h2>
                    </div>
                    {!tokenConfig.isLaunched && (
                      <Badge variant="outline" className="text-xs">
                        Pre-Launch
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  {tokenConfig.isLaunched ? (
                    <PriceChart 
                      priceData={priceData} 
                      loading={tokenStats.loading}
                      onTimeframeChange={setTimeframe}
                      height={400}
                    />
                  ) : (
                    <div className="h-[400px] flex items-center justify-center">
                      <div className="text-center space-y-3">
                        <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto" />
                        <div>
                          <h3 className="font-medium text-foreground">Chart Coming Soon</h3>
                          <p className="text-sm text-muted-foreground">
                            Live price data will be available when MOONSET launches
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Token Statistics */}
              <div className="bg-background border border-border rounded-lg">
                <div className="p-6 border-b border-border">
                  <h2 className="text-lg font-semibold">Market Statistics</h2>
                </div>
                <div className="p-6">
                  <TokenStats tokenStats={tokenStats} />
                </div>
              </div>

              {/* About Section */}
              <div className="bg-background border border-border rounded-lg">
                <div className="p-6 border-b border-border">
                  <h2 className="text-lg font-semibold">About MOONSET</h2>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {tokenConfig.description}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Key Features:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {tokenConfig.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Right Sidebar - Trading & Staking */}
          <aside className="col-span-12 lg:col-span-3 xl:col-span-3">
            <div className="sticky top-24 space-y-6">
              
              {/* Trading Widget */}
              <div className="bg-background border border-border rounded-lg">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-muted-foreground" />
                    <h3 className="font-semibold">Trade MOONSET</h3>
                  </div>
                </div>
                <div className="p-4">
                  <SwapWidget tokenAddress={tokenConfig.address} />
                </div>
              </div>

              {/* Staking Section */}
              <div className="bg-background border border-border rounded-lg">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-muted-foreground" />
                      <h3 className="font-semibold">Staking</h3>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Coming Soon
                    </Badge>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  <div className="text-center py-6 space-y-3">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto">
                      <Lock className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium">Staking Rewards</h4>
                      <p className="text-sm text-muted-foreground">
                        Earn passive income by staking MOONSET
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Est. APY</span>
                      <span className="font-medium">12-18%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Min. Stake</span>
                      <span className="font-medium">100 MOONSET</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Lock Period</span>
                      <span className="font-medium">Flexible</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <Input 
                      placeholder="Enter your email"
                      className="text-sm"
                    />
                    <Button size="sm" className="w-full">
                      Get Notified
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Be the first to know when staking goes live
                    </p>
                  </div>
                </div>
              </div>

              {/* Roadmap Preview */}
              <div className="bg-background border border-border rounded-lg">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold">Roadmap</h3>
                </div>
                <div className="p-4 space-y-3">
                  {tokenConfig.roadmap.slice(0, 3).map((phase, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        phase.status === 'upcoming' 
                          ? 'bg-yellow-500 animate-pulse' 
                          : 'bg-muted-foreground'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium">{phase.title}</h4>
                          <Badge 
                            variant="outline" 
                            className="text-xs px-1 py-0"
                          >
                            {phase.phase}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {phase.items[0]}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="ghost" size="sm" className="w-full mt-3">
                    View Full Roadmap
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      
      <DashboardFooter />
    </motion.div>
  );
};

// For lazy loading
export default MoonsetTokenView;
