
import { Database } from "@/integrations/supabase/types";

// Define types based on the generated Database type
export type Tables = Database['public']['Tables'];

// Profile related types
export type Profile = Tables['profiles']['Row'];
export type ProfileInsert = Tables['profiles']['Insert'];
export type ProfileUpdate = Tables['profiles']['Update'];

// Crypto portfolio related types
export type CryptoPortfolio = Tables['crypto_portfolio']['Row'];
export type CryptoPortfolioInsert = Tables['crypto_portfolio']['Insert'];
export type CryptoPortfolioUpdate = Tables['crypto_portfolio']['Update'];

// Auth types
export type User = {
  id: string;
  email?: string;
  username?: string;
  avatarUrl?: string;
};

// Session type
export type Session = {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
};
