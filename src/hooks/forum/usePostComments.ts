
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { ForumCommentWithDetails } from "@/types/forum";
import { useToast } from "@/hooks/use-toast";

export const usePostComments = (postId: string | undefined) => {
  const [comments, setComments] = useState<ForumCommentWithDetails[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (postId) {
      fetchComments(postId);
    }
  }, [postId]);

  const fetchComments = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('forum_comments')
        .select(`
          *,
          profiles(username, avatar_url)
        `)
        .eq('post_id', id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      
      // Cast to make TypeScript happy - we ensure the structure matches ForumCommentWithDetails[]
      setComments(data as unknown as ForumCommentWithDetails[]);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast({
        title: "Error",
        description: "Failed to load comments",
        variant: "destructive",
      });
    }
  };

  return { comments, fetchComments };
};
