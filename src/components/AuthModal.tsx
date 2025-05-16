
import React from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#1B1B1B] border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Authentication Required</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            You need to sign in to access the dashboard.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-4">
          <p className="text-sm text-muted-foreground">
            Please sign in to your account or create a new one to continue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Link to="/auth" className="w-full">
              <Button 
                variant="default" 
                className="w-full" 
                onClick={onClose}
              >
                Sign In
              </Button>
            </Link>
            <Link to="/auth?tab=signup" className="w-full">
              <Button 
                className="w-full button-gradient"
                onClick={onClose}
              >
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
