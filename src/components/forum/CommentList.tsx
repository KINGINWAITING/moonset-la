import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, ThumbsUp, Reply } from 'lucide-react';
import { ForumCommentWithDetails } from "@/types/forum";

interface CommentListProps {
  comments: ForumCommentWithDetails[];
}

export const CommentList = ({ comments }: CommentListProps) => {
  if (comments.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <MessageSquare className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">No replies yet</h3>
        <p className="text-muted-foreground">
          Be the first to share your thoughts on this discussion
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => {
        // Safe access of profile properties
        const hasProfileError = !comment.profiles || (comment.profiles && 'error' in comment.profiles);
        const avatarUrl = !hasProfileError && comment.profiles && 'avatar_url' in comment.profiles 
          ? comment.profiles.avatar_url || '' 
          : '';
        const username = !hasProfileError && comment.profiles && 'username' in comment.profiles 
          ? comment.profiles.username || 'Anonymous' 
          : 'Anonymous';

        return (
          <div key={comment.id} className="flex gap-4">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback className="text-xs">
                {username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-sm">{username}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                  </span>
                </div>
                
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {comment.content.split('\n').map((paragraph: string, i: number) => (
                    <p key={i} className="mb-2 last:mb-0 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-2">
                <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                  <ThumbsUp className="h-3 w-3 mr-1" />
                  Like
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                  <Reply className="h-3 w-3 mr-1" />
                  Reply
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
