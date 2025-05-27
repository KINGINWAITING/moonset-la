/**
 * Chat Debug Utilities
 * Helper functions for debugging chat interface issues
 */

export const debugChatLayout = () => {
  console.group('🔍 Chat Layout Debug');
  
  // Check viewport dimensions
  console.log('Viewport:', {
    width: window.innerWidth,
    height: window.innerHeight,
    scrollY: window.scrollY
  });

  // Check root element
  const root = document.getElementById('root');
  if (root) {
    const rootRect = root.getBoundingClientRect();
    console.log('Root element:', {
      height: rootRect.height,
      width: rootRect.width,
      top: rootRect.top,
      computedHeight: window.getComputedStyle(root).height
    });
  }

  // Check dashboard content area
  const dashboardContent = document.querySelector('.md\\:ml-72');
  if (dashboardContent) {
    const rect = dashboardContent.getBoundingClientRect();
    console.log('Dashboard content:', {
      height: rect.height,
      width: rect.width,
      computedHeight: window.getComputedStyle(dashboardContent as HTMLElement).height
    });
  }

  // Check chat containers
  const chatContainers = document.querySelectorAll('[class*="h-full"], [class*="h-screen"], [class*="flex-col"]');
  console.log(`Found ${chatContainers.length} potential chat containers`);

  // Check message list
  const messageList = document.querySelector('[class*="overflow-y-auto"]');
  if (messageList) {
    const rect = messageList.getBoundingClientRect();
    const computed = window.getComputedStyle(messageList as HTMLElement);
    console.log('Message list:', {
      height: rect.height,
      scrollHeight: (messageList as HTMLElement).scrollHeight,
      clientHeight: (messageList as HTMLElement).clientHeight,
      overflow: computed.overflow,
      overflowY: computed.overflowY
    });
  }

  console.groupEnd();
};

export const monitorChatScroll = () => {
  const messageList = document.querySelector('[class*="overflow-y-auto"]');
  if (!messageList) {
    console.warn('Message list not found');
    return;
  }

  let scrollCount = 0;
  const handleScroll = () => {
    scrollCount++;
    const el = messageList as HTMLElement;
    console.log(`Scroll event #${scrollCount}:`, {
      scrollTop: el.scrollTop,
      scrollHeight: el.scrollHeight,
      clientHeight: el.clientHeight,
      distanceFromBottom: el.scrollHeight - el.scrollTop - el.clientHeight
    });
  };

  messageList.addEventListener('scroll', handleScroll);
  console.log('✅ Scroll monitoring started. Scroll the chat to see events.');

  // Return cleanup function
  return () => {
    messageList.removeEventListener('scroll', handleScroll);
    console.log('❌ Scroll monitoring stopped');
  };
};

// Auto-run debug on module load if in development
if (import.meta.env.DEV) {
  window.addEventListener('load', () => {
    console.log('🚀 Chat debug utilities loaded. Available functions:');
    console.log('- debugChatLayout(): Inspect layout hierarchy');
    console.log('- monitorChatScroll(): Monitor scroll events');
    
    // Expose to window for easy console access
    (window as any).chatDebug = {
      layout: debugChatLayout,
      scroll: monitorChatScroll
    };
  });
} 