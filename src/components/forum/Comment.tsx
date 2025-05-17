
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from 'date-fns';
import { ForumCommentWithDetails } from "@/types/forum";

interface CommentProps {
  comment: ForumCommentWithDetails;
}

export const Comment = ({ comment }: CommentProps) => {
  // Check if profiles has error property
  const hasProfileError = comment.profiles && 'error' in comment.profiles;
  const avatarUrl = hasProfileError ? '' : comment.profiles?.avatar_url || '';
  const username = hasProfileError ? 'Anonymous' : comment.profiles?.username || 'Anonymous';
  const usernameInitial = username.charAt(0).toUpperCase();

  return (
    <Card className="bg-[#121212] border-gray-800">
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>
              {usernameInitial || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium">{username}</span>
              <span className="text-xs text-gray-400">
                {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
              </span>
            </div>
            <p className="text-sm">{comment.content}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
