import React from 'react';

interface ActivitySidebarProps {
  totalValue: number;
  connected: boolean;
}

export const ActivitySidebar = ({ totalValue, connected }: ActivitySidebarProps) => {
  // All sections removed as requested

  return (
    <div className="space-y-6">
      {/* Sections removed as requested */}
      <div className="p-6 rounded-lg border border-border bg-card text-center">
        <p className="text-sm text-muted-foreground">
          Activity sidebar content has been removed as requested.
        </p>
      </div>
    </div>
  );
}; 