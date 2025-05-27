import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, RefreshCw, Download, Settings, Rocket } from 'lucide-react';
import { Button } from '@/design-system/components/base';
import { useAuth } from '@/context/AuthContext';
import { WalletConnectButton } from '../WalletConnectButton';

interface IDOHeaderProps {
  title?: string;
  subtitle?: string;
}

export const IDOHeader = ({ 
  title = "MOONSET IDO", 
  subtitle = "Participate in the Initial Decentralized Exchange Offering" 
}: IDOHeaderProps) => {
  const { session } = useAuth();

  return (
    <div className="px-6 py-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between">
          {/* Left: Breadcrumbs and Title */}
          <div className="flex items-center gap-4">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link 
                to="/dashboard" 
                className="hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link 
                to="/dashboard/moonset-token" 
                className="hover:text-foreground transition-colors"
              >
                MOONSET Token
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">IDO</span>
            </nav>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.reload()}
              className="text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <Download className="h-4 w-4 mr-2" />
              Whitepaper
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>

            <div className="h-4 w-px bg-border" />
            
            <WalletConnectButton />
          </div>
        </div>

        {/* Title and Subtitle */}
        <div className="mt-4">
          <div className="flex items-center gap-3">
            <Rocket className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}; 