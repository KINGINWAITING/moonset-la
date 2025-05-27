import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Web3Provider } from "./context/WagmiProvider";
import { ThemeProvider } from "./context/ThemeContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { GlobalPerformanceOptimizer } from "./components/ui/perf-optimizer";
import { SharedBackground } from "./components/ui/shared-background";

// Lazy loaded components for better performance
const Index = lazy(() => import("./pages/Index"));
const Dashboard = lazy(() => import("./pages/Dashboard").then(module => ({ default: module.Dashboard })));
const Contact = lazy(() => import("./pages/Contact"));
const Whitepaper = lazy(() => import("./pages/Whitepaper"));
const PreviewPage = lazy(() => import("./pages/PreviewPage"));
const AuthPage = lazy(() => import("./pages/AuthPage").then(module => ({ default: module.AuthPage })));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const DebugAuth = lazy(() => import("./pages/DebugAuth"));

// Loading indicator
const PageLoading = () => (
  <div className="flex items-center justify-center h-screen w-full bg-transparent">
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
            {/* Global shared background */}
            <SharedBackground />
            
            <div className="relative min-h-screen z-0">
              {/* Global performance optimizer that enhances scrolling */}
              <GlobalPerformanceOptimizer />
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Suspense fallback={<PageLoading />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/whitepaper" element={<Whitepaper />} />
                    <Route path="/preview" element={<PreviewPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                    <Route path="/debug-auth" element={<DebugAuth />} />
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
