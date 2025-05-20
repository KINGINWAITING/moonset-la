
import React from 'react';
import { CardContent } from "@/components/ui/card";
import { ForumPostWithDetails } from "@/types/forum";
import { useTheme } from "@/context/ThemeContext";

interface PostContentProps {
  post: ForumPostWithDetails;
}

export const PostContent = ({ post }: PostContentProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <CardContent>
      <div className={`${isDark ? "prose-invert" : "prose"} max-w-none`}>
        {post.content.split('\n').map((paragraph: string, i: number) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </CardContent>
  );
};
