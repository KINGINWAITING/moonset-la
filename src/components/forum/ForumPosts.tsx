
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ForumPostsProps {
  posts: any[];
  isLoading: boolean;
  isLoggedIn: boolean;
}

export const ForumPosts = ({ posts, isLoading, isLoggedIn }: ForumPostsProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="border border-gray-800 rounded-lg p-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-800" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/4 bg-gray-800 rounded" />
                <div className="h-4 w-3/4 bg-gray-800 rounded" />
                <div className="h-4 w-1/2 bg-gray-800 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 border border-gray-800 rounded-lg">
        <MessageSquare className="mx-auto h-12 w-12 text-gray-500 mb-4" />
        <h3 className="text-xl font-medium mb-2">No discussions yet</h3>
        <p className="text-gray-400 mb-6">Be the first to start a discussion in this category</p>
        {isLoggedIn && (
          <Button>Start Discussion</Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <React.Fragment key={post.id}>
          <Link 
            to={`/dashboard/community/post/${post.id}`}
            className="block border border-gray-800 rounded-lg p-4 hover:bg-[#1A1A1A] transition-colors"
          >
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.profiles?.avatar_url || ''} />
                <AvatarFallback>
                  {post.profiles?.username?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-medium text-lg mb-1">{post.title}</h3>
                <p className="text-gray-400 line-clamp-2 text-sm mb-2">{post.content}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{post.profiles?.username || 'Anonymous'}</span>
                  <span>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" /> 
                    {post.comments?.[0]?.count || 0}
                  </span>
                </div>
              </div>
            </div>
          </Link>
          {index < posts.length - 1 && <Separator className="bg-gray-800" />}
        </React.Fragment>
      ))}
    </div>
  );
};
