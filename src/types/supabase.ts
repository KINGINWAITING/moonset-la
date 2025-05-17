
import { Database } from "@/integrations/supabase/types";

// Define types based on the generated Database type
export type Tables = Database['public']['Tables'];

// Profile related types
export type Profile = Tables['profiles']['Row'];
export type ProfileInsert = Tables['profiles']['Insert'];
export type ProfileUpdate = Tables['profiles']['Update'];

// Crypto portfolio related types
export type CryptoPortfolioRow = Tables['crypto_portfolio']['Row'];
export type CryptoPortfolioInsert = Tables['crypto_portfolio']['Insert'];
export type CryptoPortfolioUpdate = Tables['crypto_portfolio']['Update'];

// Forum related types
export type ForumCategory = Tables['forum_categories']['Row'];
export type ForumPost = Tables['forum_posts']['Row'];
export type ForumComment = Tables['forum_comments']['Row'];

// Auth types
export type User = {
  id: string;
  email?: string;
  username?: string;
  avatarUrl?: string;
  avatar_url?: string; // Added for compatibility
};

// Session type
export type Session = {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
};

// Extended CryptoPortfolio interface for both database and wallet data
export interface CryptoPortfolio {
  id: string | number;
  cryptocurrency: string;
  amount: string | number;
  purchase_price: string | number;
  user_id: string;
  purchase_date?: string;
}
