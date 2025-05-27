/**
 * Chat Context Provider
 * Manages global chat state for the professional AI chatbot interface
 */

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { 
  ChatContextType, 
  Conversation, 
  Message, 
  ChatSettings, 
  ChatUIState 
} from '@/types/chat';

// Mock AI responses for demonstration
const mockResponses = [
  {
    content: "Based on current market analysis, ETH appears to be forming a bullish pattern. The recent price consolidation around $3,200 suggests accumulation before a potential breakout.",
    type: "analysis" as const
  },
  {
    content: "Looking at the latest network data, Bitcoin's hash rate has increased by 12% this month, indicating stronger mining activity and network security.",
    type: "analysis" as const
  },
  {
    content: "The integration of DeFi protocols with traditional finance is accelerating. Recent partnerships suggest we'll see more hybrid financial products by Q4.",
    type: "text" as const
  },
  {
    content: "Current market conditions show a decrease in volatility across major cryptocurrencies. This could be a sign of market maturity and increased institutional presence.",
    type: "chart" as const
  },
  {
    content: "MOONSET tokenomics analysis: With a total supply of 1B tokens and current burn rate, we project a 15% supply reduction over the next 24 months.",
    type: "analysis" as const
  }
];

// Default settings
const defaultSettings: ChatSettings = {
  model: "MoonChat AI",
  temperature: 0.7,
  maxTokens: 2048,
  systemPrompt: "You are MoonChat AI, a professional crypto trading assistant.",
  features: {
    autoScroll: true,
    timestamps: true,
    sounds: false,
    notifications: true,
    autoSaveConversations: true,
  },
  appearance: {
    messageSpacing: 'comfortable',
    fontFamily: 'system',
    fontSize: 'base',
  }
};

const defaultUIState: ChatUIState = {
  activeSidebarTab: 'conversations',
  isSettingsPanelOpen: false,
  selectedConversationId: null,
  searchQuery: '',
  isSearching: false,
  sidebarCollapsed: false,
};

// Initial state
interface ChatState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  settings: ChatSettings;
  uiState: ChatUIState;
  isLoading: boolean;
  deletingConversationId: string | null;
  error: string | null;
}

const initialState: ChatState = {
  conversations: [],
  currentConversation: null,
  settings: defaultSettings,
  uiState: defaultUIState,
  isLoading: false,
  deletingConversationId: null,
  error: null,
};

// Action types
type ChatAction =
  | { type: 'SET_CONVERSATIONS'; payload: Conversation[] }
  | { type: 'ADD_CONVERSATION'; payload: Conversation }
  | { type: 'UPDATE_CONVERSATION'; payload: { id: string; updates: Partial<Conversation> } }
  | { type: 'DELETE_CONVERSATION'; payload: string }
  | { type: 'DELETE_CONVERSATION_START'; payload: string }
  | { type: 'DELETE_CONVERSATION_SUCCESS'; payload: string }
  | { type: 'DELETE_CONVERSATION_ERROR'; payload: { id: string; error: string } }
  | { type: 'SELECT_CONVERSATION'; payload: string | null }
  | { type: 'ADD_MESSAGE'; payload: { conversationId: string; message: Message } }
  | { type: 'UPDATE_MESSAGE'; payload: { conversationId: string; messageId: string; updates: Partial<Message> } }
  | { type: 'DELETE_MESSAGE'; payload: { conversationId: string; messageId: string } }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<ChatSettings> }
  | { type: 'UPDATE_UI_STATE'; payload: Partial<ChatUIState> }
  | { type: 'SET_LOADING'; payload: boolean };

// Reducer
function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'SET_CONVERSATIONS':
      return {
        ...state,
        conversations: action.payload,
      };

    case 'ADD_CONVERSATION':
      return {
        ...state,
        conversations: [action.payload, ...state.conversations],
        currentConversation: action.payload,
        uiState: {
          ...state.uiState,
          selectedConversationId: action.payload.id,
        },
      };

    case 'UPDATE_CONVERSATION':
      const conversationsWithUpdates = state.conversations.map(conv =>
        conv.id === action.payload.id
          ? { ...conv, ...action.payload.updates, updatedAt: new Date() }
          : conv
      );
      
      return {
        ...state,
        conversations: conversationsWithUpdates,
        currentConversation: state.currentConversation?.id === action.payload.id
          ? { ...state.currentConversation, ...action.payload.updates, updatedAt: new Date() }
          : state.currentConversation,
      };

    case 'DELETE_CONVERSATION_START':
      return {
        ...state,
        deletingConversationId: action.payload,
        error: null,
      };

    case 'DELETE_CONVERSATION_SUCCESS':
      // Use enhanced indexing for robust conversation removal
      const conversationIndex = findConversationIndex(state.conversations, action.payload);
      
      if (conversationIndex === -1) {
        console.warn(`Cannot delete conversation ${action.payload}: not found`);
        return {
          ...state,
          deletingConversationId: null,
          error: 'Conversation not found',
        };
      }
      
      const updatedConversations = removeConversationById(state.conversations, action.payload);
      const nextConversation = selectNextAvailableConversation(
        updatedConversations, 
        action.payload, 
        state.currentConversation?.id || null
      );
      
      return {
        ...state,
        conversations: updatedConversations,
        currentConversation: nextConversation,
        uiState: {
          ...state.uiState,
          selectedConversationId: nextConversation?.id || null,
        },
        deletingConversationId: null,
        error: null,
      };

    case 'DELETE_CONVERSATION_ERROR':
      return {
        ...state,
        deletingConversationId: null,
        error: action.payload.error,
      };

    case 'DELETE_CONVERSATION':
      const filteredConversationsLegacy = state.conversations.filter(conv => conv.id !== action.payload);
      const isCurrentDeletedLegacy = state.currentConversation?.id === action.payload;
      
      return {
        ...state,
        conversations: filteredConversationsLegacy,
        currentConversation: isCurrentDeletedLegacy ? (filteredConversationsLegacy[0] || null) : state.currentConversation,
        uiState: {
          ...state.uiState,
          selectedConversationId: isCurrentDeletedLegacy 
            ? (filteredConversationsLegacy[0]?.id || null) 
            : state.uiState.selectedConversationId,
        },
      };

    case 'SELECT_CONVERSATION':
      const selectedConv = state.conversations.find(conv => conv.id === action.payload);
      return {
        ...state,
        currentConversation: selectedConv || null,
        uiState: {
          ...state.uiState,
          selectedConversationId: action.payload,
        },
      };

    case 'ADD_MESSAGE':
      const updatedConvsWithMessage = state.conversations.map(conv =>
        conv.id === action.payload.conversationId
          ? { ...conv, messages: [...conv.messages, action.payload.message], updatedAt: new Date() }
          : conv
      );
      
      return {
        ...state,
        conversations: updatedConvsWithMessage,
        currentConversation: state.currentConversation?.id === action.payload.conversationId
          ? { 
              ...state.currentConversation, 
              messages: [...state.currentConversation.messages, action.payload.message],
              updatedAt: new Date()
            }
          : state.currentConversation,
      };

    case 'UPDATE_MESSAGE':
      const updatedConvsWithUpdatedMessage = state.conversations.map(conv =>
        conv.id === action.payload.conversationId
          ? {
              ...conv,
              messages: conv.messages.map(msg =>
                msg.id === action.payload.messageId
                  ? { ...msg, ...action.payload.updates }
                  : msg
              ),
              updatedAt: new Date()
            }
          : conv
      );
      
      return {
        ...state,
        conversations: updatedConvsWithUpdatedMessage,
        currentConversation: state.currentConversation?.id === action.payload.conversationId
          ? {
              ...state.currentConversation,
              messages: state.currentConversation.messages.map(msg =>
                msg.id === action.payload.messageId
                  ? { ...msg, ...action.payload.updates }
                  : msg
              ),
              updatedAt: new Date()
            }
          : state.currentConversation,
      };

    case 'DELETE_MESSAGE':
      const updatedConvsWithDeletedMessage = state.conversations.map(conv =>
        conv.id === action.payload.conversationId
          ? {
              ...conv,
              messages: conv.messages.filter(msg => msg.id !== action.payload.messageId),
              updatedAt: new Date()
            }
          : conv
      );
      
      return {
        ...state,
        conversations: updatedConvsWithDeletedMessage,
        currentConversation: state.currentConversation?.id === action.payload.conversationId
          ? {
              ...state.currentConversation,
              messages: state.currentConversation.messages.filter(msg => msg.id !== action.payload.messageId),
              updatedAt: new Date()
            }
          : state.currentConversation,
      };

    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };

    case 'UPDATE_UI_STATE':
      return {
        ...state,
        uiState: { ...state.uiState, ...action.payload },
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
}

// Context
const ChatContext = createContext<ChatContextType | null>(null);

// Enhanced utility functions with proper indexing
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

const saveToLocalStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
};

const loadFromLocalStorage = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.warn('Failed to load from localStorage:', error);
    return null;
  }
};

// Enhanced indexing utilities
const findConversationIndex = (conversations: Conversation[], id: string): number => {
  return conversations.findIndex(conv => conv.id === id);
};

const removeConversationById = (conversations: Conversation[], id: string): Conversation[] => {
  const index = findConversationIndex(conversations, id);
  if (index === -1) {
    console.warn(`Conversation with id ${id} not found`);
    return conversations;
  }
  
  // Create new array without the conversation
  return conversations.filter(conv => conv.id !== id);
};

const selectNextAvailableConversation = (
  conversations: Conversation[], 
  deletedId: string, 
  currentId: string | null
): Conversation | null => {
  if (conversations.length === 0) return null;
  
  // If we're deleting the current conversation, select the next one
  if (currentId === deletedId) {
    // Try to select the first available conversation
    return conversations.find(conv => conv.id !== deletedId) || null;
  }
  
  // If we're not deleting the current conversation, keep it selected
  return conversations.find(conv => conv.id === currentId) || conversations[0] || null;
};

// Provider component
export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedConversations = loadFromLocalStorage('chat-conversations');
    const savedSettings = loadFromLocalStorage('chat-settings');
    
    if (savedConversations) {
      // Convert date strings back to Date objects
      const conversations = savedConversations.map((conv: any) => ({
        ...conv,
        createdAt: new Date(conv.createdAt),
        updatedAt: new Date(conv.updatedAt),
        messages: conv.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })),
      }));
      dispatch({ type: 'SET_CONVERSATIONS', payload: conversations });
    } else {
      // Create default conversation
      const welcomeConversation = createDefaultConversation();
      dispatch({ type: 'ADD_CONVERSATION', payload: welcomeConversation });
    }
    
    if (savedSettings) {
      dispatch({ type: 'UPDATE_SETTINGS', payload: savedSettings });
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (state.conversations.length > 0) {
      saveToLocalStorage('chat-conversations', state.conversations);
    }
  }, [state.conversations]);

  useEffect(() => {
    saveToLocalStorage('chat-settings', state.settings);
  }, [state.settings]);

  // Create default conversation
  const createDefaultConversation = (): Conversation => {
    const now = new Date();
    return {
      id: generateId(),
      title: 'New Conversation',
      messages: [
        {
          id: 'welcome',
          content: "Hello! I'm MoonChat AI, your advanced crypto trading assistant. I can help you with market analysis, trading strategies, DeFi insights, and MOONSET token information. How can I assist you today?",
          role: 'assistant',
          type: 'text',
          timestamp: now,
          canRegenerate: false,
        }
      ],
      createdAt: now,
      updatedAt: now,
      model: state.settings.model,
    };
  };

  // Context methods
  const createConversation = useCallback((title?: string): string => {
    const newConversation = createDefaultConversation();
    if (title) {
      newConversation.title = title;
    }
    dispatch({ type: 'ADD_CONVERSATION', payload: newConversation });
    return newConversation.id;
  }, [state.settings.model]);

  const selectConversation = useCallback((id: string) => {
    dispatch({ type: 'SELECT_CONVERSATION', payload: id });
  }, []);

  const deleteConversation = useCallback(async (id: string) => {
    // Validate conversation exists before attempting deletion
    const conversationExists = state.conversations.some(conv => conv.id === id);
    if (!conversationExists) {
      console.warn(`Cannot delete conversation ${id}: not found in current state`);
      throw new Error('Conversation not found');
    }
    
    // Prevent deletion if it's the only conversation
    if (state.conversations.length === 1) {
      console.warn('Cannot delete the last conversation');
      throw new Error('Cannot delete the last conversation');
    }
    
    try {
      // Start deletion with loading state
      dispatch({ type: 'DELETE_CONVERSATION_START', payload: id });
      
      // Immediate localStorage update for instant feedback
      const currentConversations = loadFromLocalStorage('chat-conversations') || [];
      const filteredConversations = currentConversations.filter((conv: any) => conv.id !== id);
      saveToLocalStorage('chat-conversations', filteredConversations);
      
      // Simulate async operation (API call, etc.)
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Success - update state
      dispatch({ type: 'DELETE_CONVERSATION_SUCCESS', payload: id });
      
      console.log(`Successfully deleted conversation: ${id}`);
      
    } catch (error) {
      console.error('Failed to delete conversation:', error);
      
      // Rollback localStorage on error
      try {
        const rollbackConversations = loadFromLocalStorage('chat-conversations') || [];
        const originalConversation = state.conversations.find(conv => conv.id === id);
        if (originalConversation) {
          const restoredConversations = [...rollbackConversations, originalConversation];
          saveToLocalStorage('chat-conversations', restoredConversations);
        }
      } catch (rollbackError) {
        console.error('Failed to rollback localStorage:', rollbackError);
      }
      
      dispatch({ 
        type: 'DELETE_CONVERSATION_ERROR', 
        payload: { 
          id, 
          error: error instanceof Error ? error.message : 'Failed to delete conversation' 
        } 
      });
      
      throw error;
    }
  }, [state.conversations]);

  const updateConversation = useCallback((id: string, updates: Partial<Conversation>) => {
    dispatch({ type: 'UPDATE_CONVERSATION', payload: { id, updates } });
  }, []);

  const sendMessage = useCallback(async (content: string, conversationId?: string) => {
    const targetConversationId = conversationId || state.currentConversation?.id;
    if (!targetConversationId) return;

    const userMessage: Message = {
      id: generateId(),
      content: content.trim(),
      role: 'user',
      timestamp: new Date(),
      type: 'text',
    };

    // Add user message
    dispatch({ 
      type: 'ADD_MESSAGE', 
      payload: { conversationId: targetConversationId, message: userMessage }
    });

    // Update conversation title if it's the first user message
    const conversation = state.conversations.find(c => c.id === targetConversationId);
    if (conversation && conversation.messages.length === 1) {
      const title = content.slice(0, 50) + (content.length > 50 ? '...' : '');
      updateConversation(targetConversationId, { title });
    }

    // Add loading message
    const loadingMessage: Message = {
      id: generateId(),
      content: '',
      role: 'assistant',
      timestamp: new Date(),
      type: 'text',
      isLoading: true,
    };

    dispatch({ 
      type: 'ADD_MESSAGE', 
      payload: { conversationId: targetConversationId, message: loadingMessage }
    });

    // Simulate AI response
    setTimeout(() => {
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      const assistantMessage: Message = {
        id: loadingMessage.id,
        content: randomResponse.content,
        role: 'assistant',
        type: randomResponse.type,
        timestamp: new Date(),
        canRegenerate: true,
        isLoading: false,
        metadata: {
          model: state.settings.model,
          tokenCount: Math.floor(Math.random() * 200) + 50,
          processingTime: Math.floor(Math.random() * 1000) + 500,
        },
      };

      dispatch({
        type: 'UPDATE_MESSAGE',
        payload: {
          conversationId: targetConversationId,
          messageId: loadingMessage.id,
          updates: assistantMessage,
        },
      });
    }, 1500 + Math.random() * 1000);
  }, [state.currentConversation, state.conversations, state.settings.model, updateConversation]);

  const regenerateMessage = useCallback(async (messageId: string) => {
    if (!state.currentConversation) return;

    // Set message to loading state
    dispatch({
      type: 'UPDATE_MESSAGE',
      payload: {
        conversationId: state.currentConversation.id,
        messageId,
        updates: { isLoading: true, content: '' },
      },
    });

    // Simulate regeneration
    setTimeout(() => {
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      dispatch({
        type: 'UPDATE_MESSAGE',
        payload: {
          conversationId: state.currentConversation!.id,
          messageId,
          updates: {
            content: randomResponse.content,
            type: randomResponse.type,
            timestamp: new Date(),
            isLoading: false,
            metadata: {
              model: state.settings.model,
              tokenCount: Math.floor(Math.random() * 200) + 50,
              processingTime: Math.floor(Math.random() * 1000) + 500,
            },
          },
        },
      });
    }, 1000 + Math.random() * 500);
  }, [state.currentConversation, state.settings.model]);

  const deleteMessage = useCallback((messageId: string) => {
    if (!state.currentConversation) return;
    dispatch({
      type: 'DELETE_MESSAGE',
      payload: {
        conversationId: state.currentConversation.id,
        messageId,
      },
    });
  }, [state.currentConversation]);

  const updateSettings = useCallback((updates: Partial<ChatSettings>) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: updates });
  }, []);

  const updateUIState = useCallback((updates: Partial<ChatUIState>) => {
    dispatch({ type: 'UPDATE_UI_STATE', payload: updates });
  }, []);

  const searchConversations = useCallback((query: string): Conversation[] => {
    if (!query.trim()) return state.conversations;
    
    const lowercaseQuery = query.toLowerCase();
    return state.conversations.filter(conv =>
      conv.title.toLowerCase().includes(lowercaseQuery) ||
      conv.messages.some(msg => 
        msg.content.toLowerCase().includes(lowercaseQuery)
      )
    );
  }, [state.conversations]);

  const exportConversation = useCallback((id: string, format: 'json' | 'txt' | 'md') => {
    const conversation = state.conversations.find(conv => conv.id === id);
    if (!conversation) return;

    let content: string;
    let filename: string;
    let mimeType: string;

    switch (format) {
      case 'json':
        content = JSON.stringify(conversation, null, 2);
        filename = `${conversation.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
        mimeType = 'application/json';
        break;
      
      case 'md':
        content = `# ${conversation.title}\n\n`;
        content += conversation.messages
          .map(msg => `## ${msg.role === 'user' ? 'You' : 'MoonChat AI'}\n\n${msg.content}\n\n`)
          .join('');
        filename = `${conversation.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
        mimeType = 'text/markdown';
        break;
      
      default: // txt
        content = conversation.messages
          .map(msg => `[${msg.timestamp.toLocaleTimeString()}] ${msg.role.toUpperCase()}: ${msg.content}`)
          .join('\n\n');
        filename = `${conversation.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
        mimeType = 'text/plain';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [state.conversations]);

  const importConversations = useCallback((data: any) => {
    try {
      if (Array.isArray(data)) {
        // Import multiple conversations
        const conversations = data.map((conv: any) => ({
          ...conv,
          id: generateId(), // Generate new IDs to avoid conflicts
          createdAt: new Date(conv.createdAt || Date.now()),
          updatedAt: new Date(conv.updatedAt || Date.now()),
          messages: conv.messages.map((msg: any) => ({
            ...msg,
            id: generateId(),
            timestamp: new Date(msg.timestamp || Date.now()),
          })),
        }));
        
        dispatch({ type: 'SET_CONVERSATIONS', payload: [...conversations, ...state.conversations] });
      } else if (data.messages) {
        // Import single conversation
        const conversation = {
          ...data,
          id: generateId(),
          createdAt: new Date(data.createdAt || Date.now()),
          updatedAt: new Date(data.updatedAt || Date.now()),
          messages: data.messages.map((msg: any) => ({
            ...msg,
            id: generateId(),
            timestamp: new Date(msg.timestamp || Date.now()),
          })),
        };
        
        dispatch({ type: 'ADD_CONVERSATION', payload: conversation });
      }
    } catch (error) {
      console.error('Failed to import conversations:', error);
    }
  }, [state.conversations]);

  const contextValue: ChatContextType = {
    // State
    conversations: state.conversations,
    currentConversation: state.currentConversation,
    settings: state.settings,
    uiState: state.uiState,
    deletingConversationId: state.deletingConversationId,
    error: state.error,
    
    // Actions
    createConversation,
    selectConversation,
    deleteConversation,
    updateConversation,
    
    // Messages
    sendMessage,
    regenerateMessage,
    deleteMessage,
    
    // Settings
    updateSettings,
    updateUIState,
    
    // Utility
    searchConversations,
    exportConversation,
    importConversations,
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export default ChatContext; 