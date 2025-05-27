/**
 * Chat System Type Definitions
 * Professional AI Chatbot Interface
 */

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  type?: "text" | "analysis" | "chart" | "code" | "error";
  isLoading?: boolean;
  canRegenerate?: boolean;
  metadata?: {
    model?: string;
    tokenCount?: number;
    processingTime?: number;
  };
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  isPinned?: boolean;
  tags?: string[];
  model?: string;
}

export interface ChatSettings {
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt?: string;
  features: {
    autoScroll: boolean;
    timestamps: boolean;
    sounds: boolean;
    notifications: boolean;
    autoSaveConversations: boolean;
  };
  appearance: {
    messageSpacing: 'compact' | 'comfortable' | 'spacious';
    fontFamily: 'system' | 'mono' | 'serif';
    fontSize: 'sm' | 'base' | 'lg';
  };
}

export interface ChatUIState {
  activeSidebarTab: 'conversations' | 'settings';
  isSettingsPanelOpen: boolean;
  selectedConversationId: string | null;
  searchQuery: string;
  isSearching: boolean;
  sidebarCollapsed: boolean;
}

export interface MessageAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: (message: Message) => void;
  visible?: (message: Message) => boolean;
  disabled?: (message: Message) => boolean;
}

export interface ConversationFilters {
  dateRange?: {
    start: Date;
    end: Date;
  };
  tags?: string[];
  searchQuery?: string;
  model?: string;
  sortBy: 'date' | 'title' | 'messageCount';
  sortOrder: 'asc' | 'desc';
}

export interface ChatContextType {
  // State
  conversations: Conversation[];
  currentConversation: Conversation | null;
  settings: ChatSettings;
  uiState: ChatUIState;
  deletingConversationId: string | null;
  error: string | null;
  
  // Actions
  createConversation: (title?: string) => string;
  selectConversation: (id: string) => void;
  deleteConversation: (id: string) => Promise<void>;
  updateConversation: (id: string, updates: Partial<Conversation>) => void;
  
  // Messages
  sendMessage: (content: string, conversationId?: string) => Promise<void>;
  regenerateMessage: (messageId: string) => Promise<void>;
  deleteMessage: (messageId: string) => void;
  
  // Settings
  updateSettings: (updates: Partial<ChatSettings>) => void;
  updateUIState: (updates: Partial<ChatUIState>) => void;
  
  // Utility
  searchConversations: (query: string) => Conversation[];
  exportConversation: (id: string, format: 'json' | 'txt' | 'md') => void;
  importConversations: (data: any) => void;
} 