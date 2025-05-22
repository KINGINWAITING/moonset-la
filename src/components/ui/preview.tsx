
import React from 'react';
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PreviewProps {
  title?: string;
  children: React.ReactNode;
  onToggle?: () => void;
  isOpen?: boolean;
  className?: string;
  contentClassName?: string;
  showToggle?: boolean;
}

export const Preview = ({
  title,
  children,
  onToggle,
  isOpen = false,
  className,
  contentClassName,
  showToggle = true,
}: PreviewProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = React.useState<boolean>(isOpen);
  
  const handleToggle = () => {
    const newState = !isPreviewOpen;
    setIsPreviewOpen(newState);
    if (onToggle) {
      onToggle();
    }
  };
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      {title && (
        <div className="px-4 py-3 flex items-center justify-between border-b">
          <h3 className="text-sm font-medium">{title}</h3>
          {showToggle && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2" 
              onClick={handleToggle}
            >
              <Eye className="h-4 w-4 mr-2" />
              {isPreviewOpen ? "Hide Preview" : "Show Preview"}
            </Button>
          )}
        </div>
      )}
      
      {(!title && showToggle) && (
        <div className="flex justify-end p-2 border-b">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-2" 
            onClick={handleToggle}
          >
            <Eye className="h-4 w-4 mr-2" />
            {isPreviewOpen ? "Hide Preview" : "Show Preview"}
          </Button>
        </div>
      )}
      
      {isPreviewOpen && (
        <CardContent className={cn("p-4", contentClassName)}>
          {children}
        </CardContent>
      )}
    </Card>
  );
};
