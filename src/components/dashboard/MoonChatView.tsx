
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

const mockAssistantResponses = [
  "Based on current market analysis, ETH appears to be forming a bullish pattern. The recent price consolidation around $3,200 suggests accumulation before a potential breakout.",
  "Looking at the latest network data, Bitcoin's hash rate has increased by 12% this month, indicating stronger mining activity and network security.",
  "The integration of DeFi protocols with traditional finance is accelerating. Recent partnerships suggest we'll see more hybrid financial products by Q4.",
  "Current market conditions show a decrease in volatility across major cryptocurrencies. This could be a sign of market maturity and increased institutional presence."
];

export const MoonChatView = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm MoonChat AI, your crypto trading assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date()
    }
  ]);
  
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: generateUniqueId(),
      content: input,
      role: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const randomResponse = mockAssistantResponses[Math.floor(Math.random() * mockAssistantResponses.length)];
      
      const assistantMessage: Message = {
        id: generateUniqueId(),
        content: randomResponse,
        role: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };
  
  const resetConversation = () => {
    setMessages([
      {
        id: "welcome",
        content: "Hello! I'm MoonChat AI, your crypto trading assistant. How can I help you today?",
        role: "assistant",
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between mb-4">
          <motion.h1 
            className="text-2xl font-bold flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Bot className="text-primary h-6 w-6" />
            MoonChat AI
          </motion.h1>
          
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={resetConversation}
          >
            <RefreshCw className="h-4 w-4" />
            New Chat
          </Button>
        </div>
        
        <Card className="bg-[#0A0A0A] border border-gray-800">
          <CardContent className="p-0">
            <div className="h-[60vh] overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${
                    message.role === "assistant" ? "justify-start" : "justify-end"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === "assistant"
                        ? "bg-gray-800 text-white"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.role === "assistant" ? (
                        <>
                          <Bot className="h-4 w-4" />
                          <span className="font-medium">MoonChat AI</span>
                        </>
                      ) : (
                        <>
                          <User className="h-4 w-4" />
                          <span className="font-medium">You</span>
                        </>
                      )}
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-gray-800 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <Bot className="h-4 w-4" />
                      <span className="font-medium">MoonChat AI</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150"></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-300"></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSubmit} className="border-t border-gray-800 p-4">
              <div className="flex gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about crypto markets, trading strategies, or technical analysis..."
                  className="min-h-[60px] resize-none bg-transparent"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                <Button 
                  type="submit" 
                  className="h-[60px] aspect-square"
                  disabled={isLoading || !input.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                MoonChat AI provides market insights with professional crypto analysis.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
