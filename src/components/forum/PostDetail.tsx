import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Clock, MessageSquare, User } from "lucide-react";
import { format } from 'date-fns';
import { useAuth } from "@/context/AuthContext";
import { CommentList } from "@/components/forum/CommentList";
import { CommentForm } from "@/components/forum/CommentForm";
import { usePostDetails } from "@/hooks/forum/usePostDetails";
import { usePostComments } from "@/hooks/forum/usePostComments";

export const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const { post, isLoading } = usePostDetails(postId);
  const { comments, fetchComments } = usePostComments(postId);
  const { session } = useAuth();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-4 w-32 bg-muted rounded" />
          <div className="h-8 w-3/4 bg-muted rounded" />
          <div className="h-4 w-1/4 bg-muted rounded" />
          <div className="h-40 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">Post not found</h3>
          <p className="text-muted-foreground mb-6">
            The post you're looking for doesn't exist or has been removed
          </p>
          <Button asChild>
            <Link to="/dashboard/community">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Forum
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleCommentAdded = () => {
    if (postId) {
      fetchComments(postId);
    }
  };

  // Safe access of profile properties
  const hasProfileError = !post.profiles || (post.profiles && 'error' in post.profiles);
  const avatarUrl = !hasProfileError && post.profiles && 'avatar_url' in post.profiles 
    ? post.profiles.avatar_url || '' 
    : '';
  const username = !hasProfileError && post.profiles && 'username' in post.profiles 
    ? post.profiles.username || 'Anonymous' 
    : 'Anonymous';

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Navigation */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/dashboard/community">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Forum
          </Link>
        </Button>
        
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/dashboard/community" className="hover:text-foreground">
            Community
          </Link>
          <span>/</span>
          <span className="text-foreground">
            {post.forum_categories?.name || 'Discussion'}
          </span>
        </nav>
      </div>

      {/* Post Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={avatarUrl} />
                  <AvatarFallback className="text-xs">
                    {username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{username}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{format(new Date(post.created_at), 'PPp')}</span>
              </div>
              <Badge variant="secondary">
                {post.forum_categories?.name || 'General'}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <Card>
        <CardContent className="pt-6">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {post.content.split('\n').map((paragraph: string, i: number) => (
              <p key={i} className="mb-4 last:mb-0 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          <h2 className="text-xl font-semibold">
            {comments.length} {comments.length === 1 ? 'Reply' : 'Replies'}
          </h2>
        </div>

        <CommentList comments={comments} />
        
        {session.isLoggedIn && (
          <CommentForm 
            postId={postId || ''} 
            session={session} 
            onCommentAdded={handleCommentAdded} 
          />
        )}
      </div>
    </div>
  );
};

// For lazy loading
export default { PostDetail };
