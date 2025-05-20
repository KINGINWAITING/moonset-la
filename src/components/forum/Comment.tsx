
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from 'date-fns';
import { ForumCommentWithDetails } from "@/types/forum";
import { useTheme } from "@/context/ThemeContext";

interface CommentProps {
  comment: ForumCommentWithDetails;
}

export const Comment = ({ comment }: CommentProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  // Check if profiles exists and has an error property
  const hasProfileError = !comment.profiles || (comment.profiles && 'error' in comment.profiles);
  
  // Safe access of properties with proper type checking
  const avatarUrl = !hasProfileError && comment.profiles && 'avatar_url' in comment.profiles 
    ? comment.profiles.avatar_url || '' 
    : '';
    
  const username = !hasProfileError && comment.profiles && 'username' in comment.profiles 
    ? comment.profiles.username || 'Anonymous' 
    : 'Anonymous';
    
  const usernameInitial = username.charAt(0).toUpperCase();

  return (
    <Card className={isDark ? "bg-[#121212] border-gray-800 text-white" : "bg-white border-gray-200 text-black"}>
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
              <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
              </span>
            </div>
            <p className={`text-sm ${isDark ? "text-gray-200" : "text-gray-800"}`}>{comment.content}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
