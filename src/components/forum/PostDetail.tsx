
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { PostHeader } from "@/components/forum/PostHeader";
import { PostContent } from "@/components/forum/PostContent";
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
              <p className="text-gray-400 mb-6">
                The post you're looking for doesn't exist or has been removed
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleCommentAdded = () => {
    if (postId) {
      fetchComments(postId);
    }
  };

  return (
    <div className="p-6">
      <PostHeader post={post} />
      
      <Card className="bg-[#121212] border-gray-800">
        <PostContent post={post} />
      </Card>
      
      <CommentList comments={comments} />
      
      <CommentForm 
        postId={postId || ''} 
        session={session} 
        onCommentAdded={handleCommentAdded} 
      />
    </div>
  );
};
