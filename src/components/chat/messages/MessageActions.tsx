/**
 * MessageActions Component
 * Hover actions for messages including copy, regenerate, delete
 * Features clean, professional action buttons
 */

import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Message } from '@/types/chat';
import { useChat } from '@/contexts/ChatContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Copy, 
  RefreshCw, 
  Trash2, 
  Share,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

interface MessageActionsProps {
  message: Message;
  className?: string;
}

export const MessageActions: React.FC<MessageActionsProps> = ({
  message,
  className
}) => {
  const { regenerateMessage, deleteMessage } = useChat();
  const { toast } = useToast();
  const isUser = message.role === 'user';
  const canRegenerate = message.canRegenerate && !isUser;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      toast({
        title: "Copied",
        description: "Message copied to clipboard",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy message to clipboard",
        variant: "destructive",
        duration: 2000,
      });
    }
  }, [message.content, toast]);

  const handleRegenerate = useCallback(() => {
    if (canRegenerate) {
      regenerateMessage(message.id);
      toast({
        title: "Regenerating",
        description: "Generating a new response...",
        duration: 2000,
      });
    }
  }, [canRegenerate, regenerateMessage, message.id, toast]);

  const handleDelete = useCallback(() => {
    if (confirm('Are you sure you want to delete this message?')) {
      deleteMessage(message.id);
      toast({
        title: "Message deleted",
        description: "The message has been removed",
        duration: 2000,
      });
    }
  }, [deleteMessage, message.id, toast]);

  const handleShare = useCallback(() => {
    // Implement share functionality
    toast({
      title: "Share",
      description: "Share functionality coming soon",
      duration: 2000,
    });
  }, [toast]);

  const handleFeedback = useCallback((type: 'positive' | 'negative') => {
    // Implement feedback functionality
    toast({
      title: "Feedback",
      description: `${type === 'positive' ? 'Positive' : 'Negative'} feedback recorded`,
      duration: 2000,
    });
  }, [toast]);

  const actions = [
    {
      id: 'copy',
      icon: Copy,
      label: 'Copy',
      onClick: handleCopy,
      visible: true,
    },
    {
      id: 'regenerate',
      icon: RefreshCw,
      label: 'Regenerate',
      onClick: handleRegenerate,
      visible: canRegenerate,
    },
    {
      id: 'share',
      icon: Share,
      label: 'Share',
      onClick: handleShare,
      visible: true,
    },
    {
      id: 'thumbs-up',
      icon: ThumbsUp,
      label: 'Good response',
      onClick: () => handleFeedback('positive'),
      visible: !isUser,
    },
    {
      id: 'thumbs-down',
      icon: ThumbsDown,
      label: 'Poor response',
      onClick: () => handleFeedback('negative'),
      visible: !isUser,
    },
    {
      id: 'delete',
      icon: Trash2,
      label: 'Delete',
      onClick: handleDelete,
      visible: true,
      destructive: true,
    },
  ];

  const visibleActions = actions.filter(action => action.visible);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -5 }}
      transition={{ duration: 0.15 }}
      className={cn(
        'absolute flex items-center gap-1 p-1 bg-background border border-border rounded-lg shadow-lg z-20',
        isUser 
          ? 'top-0 left-0 -translate-x-full -translate-y-2'
          : 'top-0 right-0 translate-x-full -translate-y-2',
        className
      )}
    >
      {visibleActions.map((action) => (
        <ActionButton
          key={action.id}
          icon={action.icon}
          label={action.label}
          onClick={action.onClick}
          destructive={action.destructive}
        />
      ))}
    </motion.div>
  );
};

interface ActionButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  destructive?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon: Icon,
  label,
  onClick,
  destructive = false
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'p-1.5 rounded-md transition-colors text-xs',
        'hover:bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/20',
        destructive 
          ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600'
          : 'text-text-secondary hover:text-text-primary'
      )}
      title={label}
      aria-label={label}
    >
      <Icon className="w-3.5 h-3.5" />
    </motion.button>
  );
};

export default MessageActions; 