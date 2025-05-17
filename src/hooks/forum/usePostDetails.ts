
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { ForumPostWithDetails } from "@/types/forum";
import { useToast } from "@/hooks/use-toast";

export const usePostDetails = (postId: string | undefined) => {
  const [post, setPost] = useState<ForumPostWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (postId) {
      fetchPostDetails(postId);
    }
  }, [postId]);

  const fetchPostDetails = async (id: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('forum_posts')
        .select(`
          *,
          profiles(username, avatar_url),
          forum_categories:category_id(name)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      
      // Cast to make TypeScript happy - we ensure the structure matches ForumPostWithDetails
      setPost(data as unknown as ForumPostWithDetails);
    } catch (error) {
      console.error('Error fetching post details:', error);
      toast({
        title: "Error",
        description: "Failed to load post details",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { post, isLoading, fetchPostDetails };
};
