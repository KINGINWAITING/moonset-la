import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Form validation schema
const passwordSchema = z.object({
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const UpdatePasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { updatePassword } = useAuth();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleUpdatePassword = async (data: z.infer<typeof passwordSchema>) => {
    setIsLoading(true);
    try {
      await updatePassword(data.password);
      form.reset();
    } catch (error) {
      // Error is handled in the auth context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-white/10">
      <CardHeader className="text-center">
        <div className="w-16 h-16 mx-auto mb-4">
          <img
            src="/moonset-logo.png"
            alt="Moonset Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
          Set New Password
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleUpdatePassword)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-black/50 border-white/10 focus:border-primary/50 pr-10"
                  {...form.register("password")}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.formState.errors.password && (
                <span className="text-xs text-red-500 mt-1">
                  {form.formState.errors.password.message}
                </span>
              )}

              {/* Password Requirements */}
              <AnimatePresence>
                {form.getValues("password") && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs space-y-1 mt-2"
                  >
                    <p className={cn(
                      "text-gray-400",
                      form.getValues("password").length >= 8 && "text-green-500"
                    )}>
                      • At least 8 characters
                    </p>
                    <p className={cn(
                      "text-gray-400",
                      /[A-Z]/.test(form.getValues("password")) && "text-green-500"
                    )}>
                      • One uppercase letter
                    </p>
                    <p className={cn(
                      "text-gray-400",
                      /[a-z]/.test(form.getValues("password")) && "text-green-500"
                    )}>
                      • One lowercase letter
                    </p>
                    <p className={cn(
                      "text-gray-400",
                      /[0-9]/.test(form.getValues("password")) && "text-green-500"
                    )}>
                      • One number
                    </p>
                    <p className={cn(
                      "text-gray-400",
                      /[^A-Za-z0-9]/.test(form.getValues("password")) && "text-green-500"
                    )}>
                      • One special character
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-black/50 border-white/10 focus:border-primary/50 pr-10"
                  {...form.register("confirmPassword")}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.formState.errors.confirmPassword && (
                <span className="text-xs text-red-500 mt-1">
                  {form.formState.errors.confirmPassword.message}
                </span>
              )}
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
                  Updating password...
                </motion.div>
              ) : (
                "Update Password"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdatePasswordForm; 