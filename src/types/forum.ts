
import { Tables } from "./supabase";

// Forum related types
export type ForumCategory = Tables['forum_categories']['Row'];
export type ForumCategoryInsert = Tables['forum_categories']['Insert'];
export type ForumCategoryUpdate = Tables['forum_categories']['Update'];

export type ForumPost = Tables['forum_posts']['Row'];
export type ForumPostInsert = Tables['forum_posts']['Insert'];
export type ForumPostUpdate = Tables['forum_posts']['Update'];

export type ForumComment = Tables['forum_comments']['Row'];
export type ForumCommentInsert = Tables['forum_comments']['Insert'];
export type ForumCommentUpdate = Tables['forum_comments']['Update'];

// Extended types with joined data
export interface ForumPostWithDetails extends ForumPost {
  profiles?: {
    username: string | null;
    avatar_url: string | null;
  };
  comments?: {
    count: number;
  }[];
  forum_categories?: {
    name: string;
  };
}

export interface ForumCommentWithDetails extends ForumComment {
  profiles?: {
    username: string | null;
    avatar_url: string | null;
  };
}
