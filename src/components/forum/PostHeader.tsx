
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { format } from 'date-fns';
import { ForumPostWithDetails } from "@/types/forum";

interface PostHeaderProps {
  post: ForumPostWithDetails;
}

export const PostHeader = ({ post }: PostHeaderProps) => {
  // Check if profiles has error property
  const hasProfileError = post.profiles && 'error' in post.profiles;
  const avatarUrl = hasProfileError ? '' : post.profiles?.avatar_url || '';
  const username = hasProfileError ? 'Anonymous' : post.profiles?.username || 'Anonymous';
  const usernameInitial = username.charAt(0).toUpperCase();

  return (
    <div className="mb-6">
      <Button variant="outline" asChild className="mb-4">
        <Link to="/dashboard/community">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Forum
        </Link>
      </Button>
      
      <Card className="bg-[#121212] border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback>
                  {usernameInitial || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <span className="font-medium">{username}</span>
                <div className="text-xs text-gray-400">
                  {format(new Date(post.created_at), 'PPp')}
                </div>
              </div>
            </div>
            
            <div className="px-2 py-1 bg-[#1A1A1A] text-xs rounded-full">
              {post.forum_categories?.name || 'Uncategorized'}
            </div>
          </div>
          <CardTitle className="text-2xl">{post.title}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};
