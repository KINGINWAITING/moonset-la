
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@/types/supabase";

interface CommentFormProps {
  postId: string;
  session: Session;
  onCommentAdded: () => void;
}

export const CommentForm = ({ postId, session, onCommentAdded }: CommentFormProps) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const { toast } = useToast();

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    if (!session.isLoggedIn || !session.user) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to comment",
        variant: "destructive",
      });
      return;
    }

    setIsSubmittingComment(true);
    try {
      const { error } = await supabase
        .from('forum_comments')
        .insert({
          content: newComment,
          post_id: postId,
          user_id: session.user.id
        });

      if (error) throw error;
      
      setNewComment('');
      onCommentAdded();
      toast({
        title: "Comment Added",
        description: "Your comment has been added successfully",
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error",
        description: "Failed to add your comment",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingComment(false);
    }
  };

  if (!session.isLoggedIn) {
    return (
      <Card className="bg-[#121212] border-gray-800">
        <CardContent className="py-4">
          <div className="text-center">
            <p className="mb-2">You need to be logged in to comment</p>
            <Button asChild>
              <Link to="/">
                Sign In
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[#121212] border-gray-800">
      <CardHeader>
        <CardTitle className="text-lg">Add a comment</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment..."
          className="min-h-[100px] bg-[#1A1A1A] border-gray-800"
        />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          onClick={handleSubmitComment}
          disabled={isSubmittingComment || !newComment.trim()}
        >
          {isSubmittingComment ? 'Submitting...' : 'Post Comment'}
        </Button>
      </CardFooter>
    </Card>
  );
};
