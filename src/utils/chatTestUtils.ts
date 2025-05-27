/**
 * Chat Testing Utilities
 * Helper functions to test and verify conversation management functionality
 */

import { Conversation } from '@/types/chat';

/**
 * Test conversation indexing system
 * Verifies that conversations are properly identified and removed by ID
 */
export const testConversationIndexing = (conversations: Conversation[], targetId: string) => {
  console.group('🧪 Testing Conversation Indexing System');
  
  // Test 1: Find conversation index
  const index = conversations.findIndex(conv => conv.id === targetId);
  console.log(`📍 Target conversation "${targetId}" found at index:`, index);
  
  if (index === -1) {
    console.warn('❌ Conversation not found - deletion will fail');
    console.groupEnd();
    return { success: false, error: 'Conversation not found' };
  }
  
  // Test 2: Verify conversation details
  const targetConv = conversations[index];
  console.log(`📋 Conversation details:`, {
    id: targetConv.id,
    title: targetConv.title,
    messageCount: targetConv.messages.length,
    createdAt: targetConv.createdAt
  });
  
  // Test 3: Simulate removal
  const beforeCount = conversations.length;
  const afterRemoval = conversations.filter(conv => conv.id !== targetId);
  const afterCount = afterRemoval.length;
  
  console.log(`🔢 Conversation count: ${beforeCount} → ${afterCount}`);
  console.log(`✅ Deletion would be successful: ${beforeCount - afterCount === 1}`);
  
  // Test 4: Check remaining conversations have unique IDs
  const remainingIds = afterRemoval.map(conv => conv.id);
  const uniqueIds = new Set(remainingIds);
  const hasUniqueIds = remainingIds.length === uniqueIds.size;
  
  console.log(`🆔 All remaining conversations have unique IDs: ${hasUniqueIds}`);
  
  if (!hasUniqueIds) {
    console.error('❌ Duplicate conversation IDs detected:', remainingIds);
  }
  
  console.groupEnd();
  
  return {
    success: true,
    beforeCount,
    afterCount,
    hasUniqueIds,
    targetConversation: targetConv,
    remainingConversations: afterRemoval
  };
};

/**
 * Validate conversation ID format
 * Ensures conversation IDs follow expected format
 */
export const validateConversationId = (id: string): boolean => {
  // Expected format: timestamp + underscore + random string
  const idPattern = /^[a-z0-9]+$/;
  const isValid = typeof id === 'string' && id.length > 5 && idPattern.test(id);
  
  if (!isValid) {
    console.warn(`❌ Invalid conversation ID format: "${id}"`);
  }
  
  return isValid;
};

/**
 * Analyze conversation deletion safety
 * Checks if deletion is safe (won't leave empty state)
 */
export const analyzeDeletionSafety = (conversations: Conversation[], targetId: string) => {
  const remainingAfterDeletion = conversations.filter(conv => conv.id !== targetId);
  const isSafe = remainingAfterDeletion.length > 0;
  
  console.log(`🛡️ Deletion safety check for "${targetId}":`, {
    currentCount: conversations.length,
    remainingAfterDeletion: remainingAfterDeletion.length,
    isSafe,
    warning: isSafe ? null : 'Would leave no conversations - not recommended'
  });
  
  return {
    isSafe,
    remainingCount: remainingAfterDeletion.length,
    remainingConversations: remainingAfterDeletion
  };
};

/**
 * Debug conversation state
 * Provides detailed information about conversation collection
 */
export const debugConversationState = (conversations: Conversation[]) => {
  console.group('🔍 Conversation State Debug');
  
  console.log(`📊 Total conversations: ${conversations.length}`);
  
  conversations.forEach((conv, index) => {
    console.log(`${index + 1}. "${conv.title}" (${conv.id})`);
    console.log(`   Messages: ${conv.messages.length}`);
    console.log(`   Created: ${conv.createdAt.toLocaleString()}`);
    console.log(`   Updated: ${conv.updatedAt.toLocaleString()}`);
    console.log('   ---');
  });
  
  // Check for duplicate IDs
  const ids = conversations.map(conv => conv.id);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  
  if (duplicates.length > 0) {
    console.error('❌ Duplicate conversation IDs found:', duplicates);
  } else {
    console.log('✅ All conversation IDs are unique');
  }
  
  console.groupEnd();
};

/**
 * Simulate conversation deletion flow
 * Tests the complete deletion process without actually deleting
 */
export const simulateDeletionFlow = (
  conversations: Conversation[], 
  targetId: string,
  currentConversationId: string | null
) => {
  console.group('🎬 Simulating Deletion Flow');
  
  // Step 1: Validate target exists
  const targetExists = conversations.some(conv => conv.id === targetId);
  if (!targetExists) {
    console.error('❌ Target conversation does not exist');
    console.groupEnd();
    return { success: false, error: 'Conversation not found' };
  }
  
  // Step 2: Check deletion safety
  const safetyCheck = analyzeDeletionSafety(conversations, targetId);
  if (!safetyCheck.isSafe) {
    console.warn('⚠️ Deletion would leave no conversations');
  }
  
  // Step 3: Determine next selected conversation
  const remainingConversations = conversations.filter(conv => conv.id !== targetId);
  let nextSelected: Conversation | null = null;
  
  if (currentConversationId === targetId) {
    // Deleting current conversation - select next available
    nextSelected = remainingConversations[0] || null;
    console.log(`🔄 Current conversation being deleted, next selected: ${nextSelected?.title || 'None'}`);
  } else {
    // Not deleting current - keep current selection
    nextSelected = remainingConversations.find(conv => conv.id === currentConversationId) || null;
    console.log(`📌 Keeping current selection: ${nextSelected?.title || 'None'}`);
  }
  
  // Step 4: Summary
  console.log('📋 Deletion Summary:', {
    targetTitle: conversations.find(conv => conv.id === targetId)?.title,
    beforeCount: conversations.length,
    afterCount: remainingConversations.length,
    nextSelectedTitle: nextSelected?.title || 'None',
    willChangeSelection: currentConversationId === targetId
  });
  
  console.groupEnd();
  
  return {
    success: true,
    remainingConversations,
    nextSelected,
    willChangeSelection: currentConversationId === targetId,
    safetyCheck
  };
}; 