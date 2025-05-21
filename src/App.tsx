
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Web3Provider } from "./context/Web3Context";
import { ThemeProvider } from "./context/ThemeContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Lazy loaded components for better performance
const Index = lazy(() => import("./pages/Index"));
const Dashboard = lazy(() => import("./pages/Dashboard").then(module => ({ default: module.Dashboard })));
const Contact = lazy(() => import("./pages/Contact"));
const Whitepaper = lazy(() => import("./pages/Whitepaper"));

// Loading indicator
const PageLoading = () => (
  <div className="flex items-center justify-center h-screen w-full">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Configure React Query for optimal performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Web3Provider>
        <ThemeProvider>
          <TooltipProvider>
            <div className="min-h-screen bg-background theme-transition">
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Suspense fallback={<PageLoading />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/whitepaper" element={<Whitepaper />} />
                    <Route 
                      path="/dashboard/*" 
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      } 
                    />
                    {/* Redirect any other routes to home */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </Web3Provider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
