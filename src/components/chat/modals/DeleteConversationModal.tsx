/**
 * Delete Conversation Confirmation Modal
 * High-visibility modal for confirming conversation deletion
 * Features clear warnings, conversation details, and prominent action buttons
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, MessageSquare, Hash, Calendar, XCircle } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Conversation } from '@/types/chat';

interface DeleteConversationModalProps {
  isOpen: boolean;
  conversation: Conversation | null;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  isDeleting?: boolean;
}

export const DeleteConversationModal: React.FC<DeleteConversationModalProps> = ({
  isOpen,
  conversation,
  onConfirm,
  onCancel,
  isDeleting = false
}) => {
  const [error, setError] = useState<string | null>(null);
  const [localDeleting, setLocalDeleting] = useState(false);

  // Reset error when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setError(null);
      setLocalDeleting(false);
    }
  }, [isOpen]);

  if (!conversation) return null;

  const messageCount = conversation.messages.length - 1; // Exclude welcome message
  const lastActivity = formatLastActivity(conversation.updatedAt);
  const isInDeletingState = isDeleting || localDeleting;

  const handleConfirm = async () => {
    try {
      setError(null);
      setLocalDeleting(true);
      await onConfirm();
      // Success - modal will close and state will reset
    } catch (err) {
      setLocalDeleting(false);
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete conversation';
      setError(errorMessage);
      console.error('Error deleting conversation:', err);
    }
  };

  const handleCancel = () => {
    if (isInDeletingState) return; // Prevent cancel during deletion
    setError(null);
    onCancel();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      size="md"
      closeOnBackdropClick={!isInDeletingState}
      closeOnEscape={!isInDeletingState}
      showCloseButton={false}
      className="border-red-500/20"
    >
      <div className="text-center">
        {/* Warning Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 border-2 border-red-500/20"
        >
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="text-2xl font-bold text-text-primary mb-3"
        >
          Delete Conversation
        </motion.h2>

        {/* Warning Message */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="mb-6"
        >
          <p className="text-text-secondary mb-4 leading-relaxed">
            Are you sure you want to permanently delete this conversation?
          </p>
          <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-xl">
            <p className="text-sm text-red-700 dark:text-red-300 font-medium">
              ⚠️ This action cannot be undone. All messages and conversation history will be permanently lost.
            </p>
          </div>
        </motion.div>

        {/* Conversation Details */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="mb-8 p-4 bg-bg-secondary/50 border border-border rounded-xl text-left"
        >
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-text-primary truncate mb-1">
                "{conversation.title}"
              </h3>
              <p className="text-sm text-text-secondary">
                This conversation will be permanently deleted
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4" />
              <span>{messageCount} message{messageCount !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{lastActivity}</span>
            </div>
          </div>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-700 dark:text-red-300">
                  Deletion Failed
                </p>
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                  {error}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="flex gap-3"
        >
          <motion.button
            whileHover={!isInDeletingState ? { scale: 1.02 } : {}}
            whileTap={!isInDeletingState ? { scale: 0.98 } : {}}
            onClick={handleCancel}
            disabled={isInDeletingState}
            className="flex-1 px-6 py-3 bg-bg-secondary hover:bg-bg-tertiary border border-border rounded-xl text-text-secondary font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={!isInDeletingState ? { scale: 1.02 } : {}}
            whileTap={!isInDeletingState ? { scale: 0.98 } : {}}
            onClick={handleConfirm}
            disabled={isInDeletingState}
            className={`flex-1 px-6 py-3 rounded-xl font-medium transition-colors shadow-lg disabled:cursor-not-allowed ${
              error 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-red-500 hover:bg-red-600 text-white disabled:opacity-50'
            }`}
          >
            {isInDeletingState ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Deleting...
              </div>
            ) : error ? (
              'Try Again'
            ) : (
              'Delete Conversation'
            )}
          </motion.button>
        </motion.div>

        {/* Keyboard Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
          className="text-xs text-text-tertiary mt-4"
        >
          Press Escape to cancel
        </motion.p>
      </div>
    </Modal>
  );
};

// Utility function for formatting last activity
const formatLastActivity = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (minutes < 1) return 'Active now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString();
};

export default DeleteConversationModal; 