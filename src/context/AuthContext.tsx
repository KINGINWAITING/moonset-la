import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@/types/supabase";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  session: Session;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  isResettingPassword: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to clean up auth state
const cleanupAuthState = () => {
  // Remove standard auth tokens
  localStorage.removeItem('supabase.auth.token');
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  // Also clean sessionStorage if used
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session>({
    user: null,
    isLoggedIn: false,
    isLoading: true,
  });
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // First, set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, supabaseSession) => {
        if (supabaseSession) {
          const user: User = {
            id: supabaseSession.user.id,
            email: supabaseSession.user.email,
            username: supabaseSession.user.email,
          };
          setSession({
            user,
            isLoggedIn: true,
            isLoading: false,
          });
          
          // Handle password reset completion
          if (event === 'PASSWORD_RECOVERY') {
            setIsResettingPassword(true);
          }

          // Defer data fetching to prevent deadlocks
          if (event === 'SIGNED_IN') {
            setTimeout(async () => {
              try {
                // Fetch user profile
                const { data: profile, error: profileError } = await supabase
                  .from('profiles')
                  .select('*')
                  .eq('id', user.id)
                  .single();

                if (profileError) throw profileError;

                // Update session with profile data
                if (profile) {
                  setSession(prev => ({
                    ...prev,
                    user: {
                      ...prev.user!,
                      username: profile.username || prev.user!.email,
                      avatarUrl: profile.avatar_url,
                    }
                  }));
                } else {
                  // Create profile if it doesn't exist
                  const { error: insertError } = await supabase
                    .from('profiles')
                    .insert([
                      {
                        id: user.id,
                        username: user.email,
                        created_at: new Date().toISOString(),
                      }
                    ]);

                  if (insertError) throw insertError;
                }
              } catch (error) {
                console.error('Error fetching/creating user profile:', error);
              }
            }, 0);
          }
        } else {
          setSession({
            user: null,
            isLoggedIn: false,
            isLoading: false,
          });
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: supabaseSession } }) => {
      if (supabaseSession) {
        const user: User = {
          id: supabaseSession.user.id,
          email: supabaseSession.user.email,
          username: supabaseSession.user.email,
        };
        setSession({
          user,
          isLoggedIn: true,
          isLoading: false,
        });
      } else {
        setSession({
          user: null,
          isLoggedIn: false,
          isLoading: false,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      // Clean up existing auth state
      cleanupAuthState();
      
      // Attempt to sign out globally first
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (error) {
        console.log('Pre-signout failed (non-critical):', error);
      }
      
      console.log('Attempting sign up with email:', email);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
        }
      });
      
      if (error) {
        console.error('Sign up error:', error);
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      console.log('Sign up response:', data);
      
      // Check if email confirmation is required
      if (data.session === null && data.user?.identities?.length === 0) {
        toast({
          title: "Email verification required",
          description: "Please check your email for verification instructions.",
        });
      } else {
        toast({
          title: "Sign up successful",
          description: "Your account has been created successfully.",
        });
      }
    } catch (error: any) {
      console.error("Sign up error details:", {
        message: error.message,
        status: error.status,
        stack: error.stack,
      });
      throw error;
    }
  };

  const signIn = async (email: string, password: string, rememberMe: boolean = false) => {
    try {
      // Clean up existing auth state
      cleanupAuthState();
      
      // Attempt to sign out globally first
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (error) {
        console.log('Pre-signout failed (non-critical):', error);
      }
      
      console.log('Attempting sign in with email:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          // Set session duration based on remember me
          // 1 hour if not remembered, 30 days if remembered
          persistSession: rememberMe,
        }
      });
      
      if (error) {
        console.error('Sign in error:', error);
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      console.log('Sign in successful, session:', data.session);
      
      // Update local session immediately
      if (data.session) {
        const user: User = {
          id: data.session.user.id,
          email: data.session.user.email,
          username: data.session.user.email,
        };
        setSession({
          user,
          isLoggedIn: true,
          isLoading: false,
        });
      }
    } catch (error: any) {
      console.error("Sign in error details:", {
        message: error.message,
        status: error.status,
        stack: error.stack,
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // Clean up auth state
      cleanupAuthState();
      
      // Attempt global sign out
      await supabase.auth.signOut({ scope: 'global' });
      
      toast({
        title: "Signed out",
        description: "You've been successfully signed out.",
      });
    } catch (error: any) {
      console.error("Sign out error:", error);
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast({
          title: "Password reset failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      toast({
        title: "Password reset email sent",
        description: "Please check your email for password reset instructions.",
      });
    } catch (error: any) {
      console.error("Password reset error:", error);
      throw error;
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        toast({
          title: "Password update failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      setIsResettingPassword(false);
      toast({
        title: "Password updated",
        description: "Your password has been successfully updated.",
      });
    } catch (error: any) {
      console.error("Password update error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        session, 
        signUp, 
        signIn, 
        signOut,
        resetPassword,
        updatePassword,
        isResettingPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
