
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
      
      // First fetch the post
      const { data: postData, error: postError } = await supabase
        .from('forum_posts')
        .select(`
          *,
          forum_categories:category_id(name)
        `)
        .eq('id', id)
        .single();

      if (postError) throw postError;
      
      if (!postData) {
        setPost(null);
        return;
      }

      // Then fetch the profile for this post
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', postData.user_id)
        .single();

      // Combine the post with profile data
      const postWithProfile = {
        ...postData,
        profiles: profileError || !profileData 
          ? { error: true } 
          : profileData
      };
      
      console.log("Post details fetched:", postWithProfile);
      setPost(postWithProfile as ForumPostWithDetails);
      
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
