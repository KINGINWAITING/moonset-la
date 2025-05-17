
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
      // First fetch the comments
      const { data: commentsData, error: commentsError } = await supabase
        .from('forum_comments')
        .select('*')
        .eq('post_id', id)
        .order('created_at', { ascending: true });

      if (commentsError) throw commentsError;
      
      if (!commentsData || commentsData.length === 0) {
        setComments([]);
        return;
      }

      // Then fetch profiles for the user_ids in the comments
      const userIds = commentsData.map(comment => comment.user_id);
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, username, avatar_url')
        .in('id', userIds);

      // Create a map of user_id to profile data for quick lookup
      const profilesMap = new Map();
      if (profilesData && !profilesError) {
        profilesData.forEach(profile => {
          profilesMap.set(profile.id, profile);
        });
      }

      // Add profiles to comments
      const commentsWithProfiles = commentsData.map(comment => {
        const profile = profilesMap.get(comment.user_id);
        return {
          ...comment,
          profiles: profile || { error: true }
        };
      });

      console.log("Comments fetched:", commentsWithProfiles);
      setComments(commentsWithProfiles as ForumCommentWithDetails[]);
      
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
