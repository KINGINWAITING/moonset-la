import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, Clock, Pin, TrendingUp } from 'lucide-react';
import { ForumPostWithDetails } from '@/types/forum';
import { cn } from '@/lib/utils';

interface PostListTableProps {
  posts: ForumPostWithDetails[];
  isLoading: boolean;
  isLoggedIn: boolean;
}

export const PostListTable = ({ posts, isLoading, isLoggedIn }: PostListTableProps) => {
  if (isLoading) {
    return (
      <div className="space-y-1">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 animate-pulse">
            <div className="w-8 h-8 rounded-full bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 bg-muted rounded" />
              <div className="h-3 w-1/2 bg-muted rounded" />
            </div>
            <div className="w-16 h-4 bg-muted rounded" />
            <div className="w-12 h-4 bg-muted rounded" />
            <div className="w-20 h-4 bg-muted rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <MessageSquare className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No discussions yet</h3>
        <p className="text-muted-foreground mb-6">
          Be the first to start a conversation in this category
        </p>
        {isLoggedIn && (
          <Link
            to="#"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Start Discussion
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide border-b border-border bg-muted/30">
        <div className="col-span-6">Discussion</div>
        <div className="col-span-2 hidden md:block">Category</div>
        <div className="col-span-2 hidden sm:block text-center">Replies</div>
        <div className="col-span-2 text-right">Last Activity</div>
      </div>

      {/* Post Rows */}
      <div className="divide-y divide-border">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/dashboard/community/post/${post.id}`}
            className="group block hover:bg-muted/50 transition-colors"
          >
            <div className="grid grid-cols-12 gap-4 px-4 py-4 items-center">
              {/* Discussion Column */}
              <div className="col-span-6 flex items-start gap-3 min-w-0">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src={post.profiles?.avatar_url || ''} />
                  <AvatarFallback className="text-xs">
                    {post.profiles?.username?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {post.title}
                    </h3>
                    {/* Pin indicator for important posts */}
                    {post.id === '1' && (
                      <Pin className="h-3 w-3 text-muted-foreground" />
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {post.content}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-medium">
                      {post.profiles?.username || 'Anonymous'}
                    </span>
                    <span>•</span>
                    <span>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
                  </div>
                </div>
              </div>

              {/* Category Column */}
              <div className="col-span-2 hidden md:block">
                <Badge variant="secondary" className="text-xs">
                  {post.forum_categories?.name || 'General'}
                </Badge>
              </div>

              {/* Replies Column */}
              <div className="col-span-2 hidden sm:block text-center">
                <div className="flex items-center justify-center gap-1">
                  <MessageSquare className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {post.comments?.[0]?.count || 0}
                  </span>
                </div>
              </div>

              {/* Last Activity Column */}
              <div className="col-span-2 text-right">
                <div className="flex items-center justify-end gap-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(post.created_at), { addSuffix: false })}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}; 