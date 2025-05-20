
import React from 'react';
import { MessageSquare } from "lucide-react";
import { Comment } from "@/components/forum/Comment";
import { ForumCommentWithDetails } from "@/types/forum";
import { useTheme } from "@/context/ThemeContext";

interface CommentListProps {
  comments: ForumCommentWithDetails[];
}

export const CommentList = ({ comments }: CommentListProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <MessageSquare className="h-5 w-5" />
        Comments ({comments.length})
      </h3>
      
      <div className="space-y-4 mb-6">
        {comments.length === 0 ? (
          <div className={`text-center py-8 ${
            isDark 
              ? "bg-[#121212] border border-gray-800 text-gray-400" 
              : "bg-gray-50 border border-gray-200 text-gray-500"
          } rounded-lg transition-colors`}>
            <p>
              No comments yet. Be the first to comment!
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
};
