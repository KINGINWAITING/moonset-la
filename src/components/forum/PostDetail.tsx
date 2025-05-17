
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, MessageSquare } from "lucide-react";
import { formatDistanceToNow, format } from 'date-fns';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { ForumPostWithDetails, ForumCommentWithDetails } from "@/types/forum";

export const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<ForumPostWithDetails | null>(null);
  const [comments, setComments] = useState<ForumCommentWithDetails[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const { session } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (postId) {
      fetchPostAndComments();
    }
  }, [postId]);

  const fetchPostAndComments = async () => {
    setIsLoading(true);
    try {
      // Fetch post details
      const { data: postData, error: postError } = await supabase
        .from('forum_posts')
        .select(`
          *,
          profiles:user_id(username, avatar_url),
          forum_categories:category_id(name)
        `)
        .eq('id', postId)
        .single();

      if (postError) throw postError;
      setPost(postData);

      // Fetch comments
      const { data: commentsData, error: commentsError } = await supabase
        .from('forum_comments')
        .select(`
          *,
          profiles:user_id(username, avatar_url)
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (commentsError) throw commentsError;
      setComments(commentsData || []);
    } catch (error) {
      console.error('Error fetching post details:', error);
      toast({
        title: "Error",
        description: "Failed to load post details",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
      fetchPostAndComments();
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

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-1/4 bg-gray-800 rounded" />
          <div className="h-10 w-1/2 bg-gray-800 rounded" />
          <div className="h-4 w-1/4 bg-gray-800 rounded" />
          <div className="h-40 bg-gray-800 rounded" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="p-6">
        <Card className="bg-[#121212] border-gray-800">
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">Post not found</h3>
              <p className="text-gray-400 mb-6">The post you're looking for doesn't exist or has been removed</p>
              <Button asChild>
                <Link to="/dashboard/community">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back to Forum
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
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
                  <AvatarImage src={post.profiles?.avatar_url || ''} />
                  <AvatarFallback>
                    {post.profiles?.username?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <span className="font-medium">{post.profiles?.username || 'Anonymous'}</span>
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
          
          <CardContent>
            <div className="prose prose-invert max-w-none">
              {post.content.split('\n').map((paragraph: string, i: number) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Comments ({comments.length})
        </h3>
        
        <div className="space-y-4 mb-6">
          {comments.length === 0 ? (
            <div className="text-center py-8 bg-[#121212] border border-gray-800 rounded-lg">
              <p className="text-gray-400">No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            comments.map((comment, index) => (
              <Card key={comment.id} className="bg-[#121212] border-gray-800">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.profiles?.avatar_url || ''} />
                      <AvatarFallback>
                        {comment.profiles?.username?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{comment.profiles?.username || 'Anonymous'}</span>
                        <span className="text-xs text-gray-400">
                          {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        
        {session.isLoggedIn ? (
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
        ) : (
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
        )}
      </div>
    </div>
  );
};
