
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import AuthModal from "./AuthModal";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show auth modal if user is not logged in (after loading completes)
    if (!session.isLoading && !session.isLoggedIn) {
      setIsAuthModalOpen(true);
    }
  }, [session.isLoading, session.isLoggedIn]);

  if (session.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      {session.isLoggedIn ? (
        children
      ) : (
        <Navigate to="/" replace />
      )}
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        defaultTab="login"
      />
    </>
  );
};
