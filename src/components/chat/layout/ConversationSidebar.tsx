/**
 * ConversationSidebar Component
 * Left sidebar for conversation management, search, and navigation
 * Features direct deletion without confirmation modal
 */

import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useChat } from '@/contexts/ChatContext';
import { Conversation } from '@/types/chat';
import { 
  Search, 
  Plus, 
  MessageSquare, 
  Trash2, 
  Edit3,
  Calendar,
  Hash
} from 'lucide-react';

export const ConversationSidebar: React.FC = () => {
  const { 
    conversations, 
    currentConversation, 
    uiState, 
    deletingConversationId,
    error,
    createConversation, 
    selectConversation, 
    deleteConversation,
    updateConversation,
    updateUIState,
    searchConversations,
    exportConversation
  } = useChat();

  const [searchQuery, setSearchQuery] = useState('');
  const [editingConversationId, setEditingConversationId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  // Filter conversations based on search
  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;
    return searchConversations(searchQuery);
  }, [conversations, searchQuery, searchConversations]);

  const handleNewConversation = useCallback(() => {
    createConversation();
  }, [createConversation]);

  const handleSelectConversation = useCallback((id: string) => {
    selectConversation(id);
  }, [selectConversation]);

  // Direct deletion without confirmation
  const handleDeleteClick = useCallback(async (conversation: Conversation) => {
    try {
      await deleteConversation(conversation.id);
    } catch (error) {
      console.error('Failed to delete conversation:', error);
    }
  }, [deleteConversation]);

  const startEditing = useCallback((conversation: Conversation) => {
    setEditingConversationId(conversation.id);
    setEditingTitle(conversation.title);
  }, []);

  const saveEdit = useCallback(() => {
    if (editingConversationId && editingTitle.trim()) {
      updateConversation(editingConversationId, { title: editingTitle.trim() });
      setEditingConversationId(null);
      setEditingTitle('');
    }
  }, [editingConversationId, editingTitle, updateConversation]);

  const cancelEdit = useCallback(() => {
    setEditingConversationId(null);
    setEditingTitle('');
  }, []);

  const handleExport = useCallback((conversation: Conversation, format: 'txt' | 'md' | 'json') => {
    exportConversation(conversation.id, format);
  }, [exportConversation]);

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback((event: React.KeyboardEvent, conversation: Conversation) => {
    if (event.key === 'Delete' && !editingConversationId) {
      event.preventDefault();
      handleDeleteClick(conversation);
    }
  }, [editingConversationId, handleDeleteClick]);

  // Don't render if sidebar is collapsed
  if (uiState.sidebarCollapsed) {
    return null;
  }

  return (
    <motion.div
      initial={{ x: -320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -320, opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="h-full border-r border-border bg-bg-secondary/30 flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        {/* New Chat Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNewConversation}
          className="w-full flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Conversation
        </motion.button>

        {/* Search */}
        <div className="mt-3 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {filteredConversations.length > 0 ? (
            <AnimatePresence>
              {filteredConversations.map((conversation, index) => (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                  isActive={currentConversation?.id === conversation.id}
                  isEditing={editingConversationId === conversation.id}
                  editingTitle={editingTitle}
                  isDeleting={deletingConversationId === conversation.id}
                  onSelect={() => handleSelectConversation(conversation.id)}
                  onDelete={() => handleDeleteClick(conversation)}
                  onStartEdit={() => startEditing(conversation)}
                  onSaveEdit={saveEdit}
                  onCancelEdit={cancelEdit}
                  onEditTitleChange={setEditingTitle}
                  onExport={handleExport}
                  onKeyDown={(e) => handleKeyDown(e, conversation)}
                  index={index}
                />
              ))}
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 text-center"
            >
              <MessageSquare className="w-12 h-12 text-text-tertiary mx-auto mb-3" />
              <p className="text-text-secondary text-sm">
                {searchQuery ? 'No conversations found' : 'No conversations yet'}
              </p>
              <p className="text-text-tertiary text-xs mt-1">
                {searchQuery ? 'Try a different search term' : 'Start a new conversation to begin'}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-text-tertiary">
          <span>{conversations.length} conversation{conversations.length !== 1 ? 's' : ''}</span>
          <span>MoonChat AI</span>
        </div>
        
        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 p-2 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg"
          >
            <p className="text-xs text-red-700 dark:text-red-300">{error}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  isEditing: boolean;
  editingTitle: string;
  isDeleting: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onStartEdit: () => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onEditTitleChange: (title: string) => void;
  onExport: (conversation: Conversation, format: 'txt' | 'md' | 'json') => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  index: number;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  isActive,
  isEditing,
  editingTitle,
  isDeleting,
  onSelect,
  onDelete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onEditTitleChange,
  onExport,
  onKeyDown,
  index
}) => {
  const lastMessage = conversation.messages[conversation.messages.length - 1];
  const messageCount = conversation.messages.length - 1; // Exclude welcome message

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onStartEdit();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className={cn(
        'group relative rounded-lg border mb-2 transition-all duration-200 cursor-pointer',
        'focus-within:ring-2 focus-within:ring-primary/20',
        isActive 
          ? 'bg-primary/10 border-primary/30 shadow-sm' 
          : 'bg-background/50 border-border hover:bg-background hover:border-border-secondary',
        isDeleting && 'opacity-50 pointer-events-none'
      )}
      onClick={!isEditing && !isDeleting ? onSelect : undefined}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <div className="p-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          {isEditing ? (
            <input
              type="text"
              value={editingTitle}
              onChange={(e) => onEditTitleChange(e.target.value)}
              onBlur={onSaveEdit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSaveEdit();
                if (e.key === 'Escape') onCancelEdit();
                e.stopPropagation();
              }}
              className="flex-1 text-sm font-medium bg-transparent border-none outline-none focus:ring-0 p-0"
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <h3 className={cn(
              'flex-1 text-sm font-medium truncate leading-tight',
              isActive ? 'text-primary' : 'text-text-primary'
            )}>
              {conversation.title}
            </h3>
          )}

          {/* Simple Action Buttons - Only visible on hover */}
          {!isDeleting && !isEditing && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {/* Edit Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleEditClick}
                className={cn(
                  'p-1.5 rounded-md transition-colors',
                  isActive 
                    ? 'hover:bg-primary/20 text-primary/70 hover:text-primary' 
                    : 'hover:bg-bg-secondary text-text-tertiary hover:text-text-secondary'
                )}
                title="Rename conversation"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </motion.button>

              {/* Delete Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDeleteClick}
                className="p-1.5 rounded-md transition-colors hover:bg-red-50 dark:hover:bg-red-950/20 text-text-tertiary hover:text-red-600 dark:hover:text-red-400"
                title="Delete conversation"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          )}

          {/* Loading indicator for deletion */}
          {isDeleting && (
            <div className="w-5 h-5 border-2 border-text-tertiary/30 border-t-text-tertiary rounded-full animate-spin" />
          )}
        </div>

        {/* Last Message Preview */}
        {lastMessage && (
          <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed mb-2">
            {lastMessage.role === 'user' ? 'You: ' : 'AI: '}
            {lastMessage.content}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-text-tertiary">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Hash className="w-3 h-3" />
              {messageCount}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(conversation.updatedAt)}
            </div>
          </div>
          
          {conversation.isPinned && (
            <div className="w-2 h-2 rounded-full bg-primary" />
          )}
        </div>
      </div>

      {/* Click overlay when editing */}
      {isEditing && (
        <div
          className="absolute inset-0 z-10"
          onClick={(e) => {
            e.stopPropagation();
            onCancelEdit();
          }}
        />
      )}
    </motion.div>
  );
};

export default ConversationSidebar; 