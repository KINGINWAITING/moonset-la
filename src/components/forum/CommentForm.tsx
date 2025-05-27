import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AuthSession } from "@/types/auth";

interface CommentFormProps {
  postId: string;
  session: AuthSession;
  onCommentAdded: () => void;
}

export const CommentForm = ({ postId, session, onCommentAdded }: CommentFormProps) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!content.trim()) {
      setError('Please enter a comment');
      return;
    }

    if (!session.isLoggedIn || !session.user) {
      setError('You must be logged in to comment');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error: insertError } = await supabase
        .from('forum_comments')
        .insert({
          content: content.trim(),
          post_id: postId,
          user_id: session.user.id
        });

      if (insertError) throw insertError;
      
      setContent('');
      onCommentAdded();
    } catch (err: any) {
      console.error('Error creating comment:', err);
      setError(err.message || 'Failed to post comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session.isLoggedIn) {
    return (
      <div className="text-center py-6 border border-border rounded-lg bg-muted/30">
        <p className="text-muted-foreground mb-4">
          Please log in to join the discussion
        </p>
        <Button variant="outline" size="sm">
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-lg p-4 bg-background">
      <div className="flex gap-4">
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={session.user?.avatarUrl || ''} />
          <AvatarFallback className="text-xs">
            {session.user?.username?.charAt(0).toUpperCase() || 
             session.user?.email?.charAt(0).toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
        
        <form onSubmit={handleSubmit} className="flex-1 space-y-3">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <Textarea
            placeholder="Share your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isSubmitting}
            rows={3}
            className="resize-none border-muted-foreground/20 focus:border-primary/50"
          />
          
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {content.length}/1000 characters
            </p>
            
            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting || !content.trim()}
              className="gap-2"
            >
              {isSubmitting && <Loader2 className="h-3 w-3 animate-spin" />}
              {!isSubmitting && <Send className="h-3 w-3" />}
              {isSubmitting ? 'Posting...' : 'Reply'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
