
import React from 'react';
import { CardContent } from "@/components/ui/card";
import { ForumPostWithDetails } from "@/types/forum";

interface PostContentProps {
  post: ForumPostWithDetails;
}

export const PostContent = ({ post }: PostContentProps) => {
  return (
    <CardContent>
      <div className="prose prose-invert max-w-none">
        {post.content.split('\n').map((paragraph: string, i: number) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </CardContent>
  );
};
