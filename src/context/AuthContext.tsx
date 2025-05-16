
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@/types/supabase";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  session: Session;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session>({
    user: null,
    isLoggedIn: false,
    isLoading: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    // First, set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, supabaseSession) => {
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
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Sign up successful",
        description: "Please check your email for verification instructions.",
      });
    } catch (error: any) {
      console.error("Sign up error:", error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      });
    } catch (error: any) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
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

  return (
    <AuthContext.Provider value={{ session, signUp, signIn, signOut }}>
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
