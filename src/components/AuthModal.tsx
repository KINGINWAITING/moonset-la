import { useState, useEffect } from "react";
import { X, Github, Apple, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { MoonLogo } from "@/components/navigation/MoonLogo";
import { useTheme } from "@/context/ThemeContext";

// Form validation schemas
const emailSchema = z.string().email("Please enter a valid email address");
const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().default(false),
});

const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  rememberMe: z.boolean().default(false),
});

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "signup";
}

const AuthModal = ({ isOpen, onClose, defaultTab = "login" }: AuthModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState<"login" | "signup">(defaultTab);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Initialize forms for both login and signup
  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const signupForm = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Reset forms when modal closes
  useEffect(() => {
    if (!isOpen) {
      loginForm.reset();
      signupForm.reset();
      setShowPassword(false);
    }
  }, [isOpen]);

  const handleAuth = async (type: "login" | "signup", data: any) => {
    setIsLoading(true);
    try {
      if (type === "login") {
        await signIn(data.email, data.password);
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
        onClose();
      } else {
        await signUp(data.email, data.password);
        try {
          await signIn(data.email, data.password);
          toast({
            title: "Account created successfully",
            description: "Welcome to MoonSet!",
          });
          onClose();
        } catch (error) {
          toast({
            title: "Sign in after signup failed",
            description: "Please check your email for verification instructions or try signing in manually.",
          });
        }
      }
    } catch (error: any) {
      toast({
        title: "Authentication failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = (provider: string) => {
    toast({
      title: "Coming Soon",
      description: `${provider} authentication will be available soon!`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0 bg-gradient-to-b from-black via-[#0a0a0a] to-[#111] border border-white/10 overflow-hidden backdrop-blur-xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Authentication</DialogTitle>
          <DialogDescription>Sign in or create an account to access Moonset</DialogDescription>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          {/* Decorative Elements */}
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/20 to-transparent" />
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-40" />
            <div className="absolute inset-0 w-full h-full bg-[url('/grid.svg')] opacity-20" />
          </div>

          {/* Logo Section */}
          <div className="relative pt-8 pb-4 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.5,
                delay: 0.1,
                type: "spring",
                stiffness: 200
              }}
              className="relative w-32 h-32 mx-auto mb-4 flex items-center justify-center"
            >
              {/* Enhanced glow effect */}
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-[32px]" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-[16px]" />
              
              {/* Logo container with neon effect */}
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-primary/50" />
                <div className="absolute inset-0 rounded-full border border-primary/20 blur-[2px]" />
                <MoonLogo 
                  className="w-24 h-24 filter drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]"
                  animated={true}
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-white">
                Welcome to Moonset
              </DialogTitle>
              <p className="mt-2 text-sm text-gray-400">
                Your gateway to evidence-based reasoning
              </p>
            </motion.div>
          </div>

          {/* Tabs Section */}
          <Tabs
            value={currentTab}
            onValueChange={(value) => setCurrentTab(value as "login" | "signup")}
            className="relative p-6"
          >
            <TabsList className="relative grid grid-cols-2 mb-6 bg-black/40 border border-white/10">
              <motion.div
                className="absolute inset-0 bg-primary/20"
                initial={false}
                animate={{
                  x: currentTab === "login" ? "0%" : "100%",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                style={{
                  width: "50%",
                }}
              />
              <TabsTrigger
                value="login"
                className={cn(
                  "relative z-10 transition-all duration-200",
                  "data-[state=active]:text-white",
                  "data-[state=active]:shadow-none",
                  "hover:text-white"
                )}
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className={cn(
                  "relative z-10 transition-all duration-200",
                  "data-[state=active]:text-white",
                  "data-[state=active]:shadow-none",
                  "hover:text-white"
                )}
              >
                Sign up
              </TabsTrigger>
          </TabsList>
          
            {/* Content Sections */}
            <div className="relative">
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-lg -m-2" />
              {/* Login Form */}
              <TabsContent value="login" className="relative space-y-4">
                <form onSubmit={loginForm.handleSubmit((data) => handleAuth("login", data))}>
                  <div className="space-y-4">
                    {/* Note: CAPTCHA should be disabled in Supabase for development.
                        For production, integrate hCaptcha here */}
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-sm font-medium text-gray-300">
                        Email
                      </Label>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-lg blur-sm group-focus-within:blur-md transition-all duration-300" />
              <Input
                          id="login-email"
                type="email"
                placeholder="name@example.com"
                          className="relative bg-black/50 border-white/10 focus:border-primary/50 rounded-lg pl-10 placeholder:text-gray-500"
                          {...loginForm.register("email")}
                          disabled={isLoading}
                        />
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        {loginForm.formState.errors.email && (
                          <motion.span
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-red-400 mt-1 flex items-center"
                          >
                            <svg
                              className="h-4 w-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                              />
                            </svg>
                            {loginForm.formState.errors.email.message}
                          </motion.span>
                        )}
                      </div>
            </div>

            <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-sm font-medium text-gray-300">
                        Password
                      </Label>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-lg blur-sm group-focus-within:blur-md transition-all duration-300" />
              <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                          className="relative bg-black/50 border-white/10 focus:border-primary/50 rounded-lg pl-10 pr-10"
                          {...loginForm.register("password")}
                          disabled={isLoading}
                        />
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white transition-colors"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <Checkbox
                            id="login-remember"
                            className="border-white/10 bg-black/50 data-[state=checked]:bg-primary/50 data-[state=checked]:border-primary"
                            {...loginForm.register("rememberMe")}
                            disabled={isLoading}
                          />
                          <div className="absolute inset-0 bg-primary/20 filter blur opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <Label
                          htmlFor="login-remember"
                          className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
                        >
                          Remember me
                        </Label>
                      </div>
                      <button
                        type="button"
                        className="text-sm text-primary/80 hover:text-primary transition-colors"
                        onClick={() => {/* Handle forgot password */}}
                      >
                        Forgot password?
                      </button>
            </div>

            <Button 
                      type="submit"
                      className="w-full relative group overflow-hidden bg-gradient-to-r from-primary/80 via-primary to-primary/80 hover:from-primary hover:to-primary transition-all duration-300"
              disabled={isLoading}
            >
                      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 group-hover:opacity-30 transition-opacity" />
                      <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-500" />
                      {isLoading ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center justify-center"
                        >
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          <span>Signing in...</span>
                        </motion.div>
                      ) : (
                        <span className="relative z-10">Sign in</span>
                      )}
            </Button>
                  </div>
                </form>
            
                <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#0a0a0a] px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            
                <div className="grid grid-cols-3 gap-3">
              <Button
                variant="outline"
                    className="relative group bg-black/50 border-white/10 hover:bg-white/5"
                onClick={() => handleSocialAuth("Google")}
                    disabled={isLoading}
              >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4285F4]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              </Button>
              <Button
                variant="outline"
                    className="relative group bg-black/50 border-white/10 hover:bg-white/5"
                onClick={() => handleSocialAuth("GitHub")}
                    disabled={isLoading}
              >
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-800/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Github className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                    className="relative group bg-black/50 border-white/10 hover:bg-white/5"
                onClick={() => handleSocialAuth("Apple")}
                    disabled={isLoading}
              >
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-100/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Apple className="h-5 w-5" />
              </Button>
            </div>
          </TabsContent>
          
              {/* Sign Up Form */}
          <TabsContent value="signup" className="space-y-4">
                <form onSubmit={signupForm.handleSubmit((data) => handleAuth("signup", data))}>
                  <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
                      <div className="relative">
              <Input
                id="signup-email"
                type="email"
                placeholder="name@example.com"
                          className="bg-black/50 border-white/10 focus:border-primary/50"
                          {...signupForm.register("email")}
                          disabled={isLoading}
                        />
                        {signupForm.formState.errors.email && (
                          <span className="text-xs text-red-500 mt-1">
                            {signupForm.formState.errors.email.message}
                          </span>
                        )}
                      </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
              <Input
                id="signup-password"
                          type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                          className="bg-black/50 border-white/10 focus:border-primary/50 pr-10"
                          {...signupForm.register("password")}
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        {signupForm.formState.errors.password && (
                          <span className="text-xs text-red-500 mt-1">
                            {signupForm.formState.errors.password.message}
                          </span>
                        )}
                      </div>
                      
                      {/* Password Requirements */}
                      <AnimatePresence>
                        {signupForm.getValues("password") && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-xs space-y-1 mt-2"
                          >
                            <p className={cn(
                              "text-gray-400",
                              signupForm.getValues("password").length >= 8 && "text-green-500"
                            )}>
                              • At least 8 characters
                            </p>
                            <p className={cn(
                              "text-gray-400",
                              /[A-Z]/.test(signupForm.getValues("password")) && "text-green-500"
                            )}>
                              • One uppercase letter
                            </p>
                            <p className={cn(
                              "text-gray-400",
                              /[a-z]/.test(signupForm.getValues("password")) && "text-green-500"
                            )}>
                              • One lowercase letter
                            </p>
                            <p className={cn(
                              "text-gray-400",
                              /[0-9]/.test(signupForm.getValues("password")) && "text-green-500"
                            )}>
                              • One number
                            </p>
                            <p className={cn(
                              "text-gray-400",
                              /[^A-Za-z0-9]/.test(signupForm.getValues("password")) && "text-green-500"
                            )}>
                              • One special character
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="signup-remember"
                        {...signupForm.register("rememberMe")}
                        disabled={isLoading}
                      />
                      <Label
                        htmlFor="signup-remember"
                        className="text-sm text-gray-400"
                      >
                        Remember me
                      </Label>
            </div>

            <Button 
                      type="submit"
                      className="w-full button-gradient"
              disabled={isLoading}
            >
                      {isLoading ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center"
                        >
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating account...
                        </motion.div>
                      ) : (
                        "Create account"
                      )}
            </Button>
                  </div>
                </form>
            
                <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#0a0a0a] px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            
                <div className="grid grid-cols-3 gap-3">
              <Button
                variant="outline"
                    className="bg-black/50 border-white/10 hover:bg-white/5"
                onClick={() => handleSocialAuth("Google")}
                    disabled={isLoading}
              >
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              </Button>
              <Button
                variant="outline"
                    className="bg-black/50 border-white/10 hover:bg-white/5"
                onClick={() => handleSocialAuth("GitHub")}
                    disabled={isLoading}
              >
                    <Github className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                    className="bg-black/50 border-white/10 hover:bg-white/5"
                onClick={() => handleSocialAuth("Apple")}
                    disabled={isLoading}
              >
                    <Apple className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
            </div>
        </Tabs>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
