/**
 * AIChat Component
 *
 * Floating AI assistant chat widget that answers questions about Aaron's
 * portfolio, skills, projects, and experience. Features:
 * - Mobile-first responsive design (full-screen on mobile, floating on desktop)
 * - WCAG compliant with minimum 44px touch targets
 * - Keyboard navigation support
 * - Smooth animations with reduced motion support
 * - Suggested questions for quick interaction
 */

'use client';

import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { FiSend, FiX, FiMessageCircle, FiCpu, FiChevronDown } from 'react-icons/fi';

// Message interface for chat history
interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Memoized message bubble component for performance
const MessageBubble = memo(function MessageBubble({
  message,
  index
}: {
  message: Message;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.2 }}
      className={cn(
        "flex",
        message.role === 'user' ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          // Base styles - mobile optimized
          "max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-3",
          "text-sm sm:text-base leading-relaxed",
          // Role-specific styling
          message.role === 'user'
            ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white'
            : 'bg-white/5 text-gray-200 border border-white/10'
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
        <p className="text-xs opacity-50 mt-2">
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>
    </motion.div>
  );
});

// Memoized suggested question button
const SuggestedQuestion = memo(function SuggestedQuestion({
  question,
  onClick
}: {
  question: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        // Touch-friendly size (min 44px)
        "min-h-[44px] px-4 py-2.5 rounded-full",
        "text-sm text-left",
        // Styling
        "bg-white/5 hover:bg-white/10 active:bg-white/15",
        "border border-white/10 hover:border-white/20",
        "text-gray-300 hover:text-white",
        "transition-all duration-200",
        // Focus states for keyboard navigation
        "focus:outline-none focus:ring-2 focus:ring-blue-500/50",
        // Touch feedback
        "touch-manipulation"
      )}
    >
      {question}
    </button>
  );
});

// Loading indicator component
const LoadingIndicator = memo(function LoadingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-start"
    >
      <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
        <div className="flex gap-1.5" role="status" aria-label="Assistant is typing">
          <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce"
                style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce"
                style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce"
                style={{ animationDelay: '300ms' }} />
          <span className="sr-only">Loading response...</span>
        </div>
      </div>
    </motion.div>
  );
});

export const AIChat = () => {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Aaron's AI Assistant. Ask me about his skills, projects, experience, or how to get in touch. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Small delay to ensure animation completes
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle escape key to close chat
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Prevent body scroll when chat is open on mobile
  useEffect(() => {
    if (isOpen && window.innerWidth < 640) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Send message handler
  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input.trim(), history: messages }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again or use the contact section to reach Aaron directly!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages]);

  // Handle keyboard input
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  // Suggested questions for quick interactions
  const suggestedQuestions = [
    "What are Aaron's technical skills?",
    "Tell me about his projects",
    "What's his experience with AWS?",
    "How can I contact Aaron?",
  ];

  return (
    <>
      {/* Floating Action Button - Always visible when chat is closed */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className={cn(
              // Position - adjusted for mobile
              "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50",
              // Size - 56px minimum for touch targets, 64px on desktop
              "w-14 h-14 sm:w-16 sm:h-16 rounded-full",
              // Styling
              "bg-gradient-to-r from-blue-500 to-violet-500",
              "flex items-center justify-center",
              "shadow-lg hover:shadow-xl hover:shadow-blue-500/25",
              "transition-shadow duration-300",
              // Focus states
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900",
              // Touch optimization
              "touch-manipulation",
              // Reduced motion support
              "motion-reduce:transform-none"
            )}
            aria-label="Open AI Assistant chat"
          >
            <FiMessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            {/* Online indicator */}
            <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-gray-900 motion-reduce:animate-none animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window - Full screen on mobile, floating on desktop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatContainerRef}
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300,
              // Respect reduced motion preference
              duration: 0.3
            }}
            className={cn(
              // Position - full screen on mobile, floating on desktop
              "fixed z-50",
              "inset-0 sm:inset-auto",
              "sm:bottom-6 sm:right-6",
              // Size - responsive
              "w-full h-full",
              "sm:w-[400px] sm:h-[600px] sm:max-h-[85vh]",
              // Styling
              "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900",
              "sm:border sm:border-white/10",
              "sm:rounded-2xl sm:shadow-2xl",
              // Layout
              "flex flex-col overflow-hidden",
              "backdrop-blur-xl"
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-title"
          >
            {/* Header */}
            <div className={cn(
              "relative px-4 sm:px-6 py-4",
              "bg-gradient-to-r from-blue-500/10 to-violet-500/10",
              "border-b border-white/10",
              "flex items-center justify-between",
              // Safe area for mobile notches
              "pt-[max(1rem,env(safe-area-inset-top))]"
            )}>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center">
                    <FiCpu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900" />
                </div>
                <div>
                  <h3 id="chat-title" className="text-white font-semibold text-base">
                    AI Assistant
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Ask me about Aaron's work
                  </p>
                </div>
              </div>

              {/* Close button - touch friendly */}
              <button
                onClick={() => setIsOpen(false)}
                className={cn(
                  // Touch-friendly size (min 44px)
                  "w-11 h-11 flex items-center justify-center",
                  "text-gray-400 hover:text-white",
                  "hover:bg-white/5 active:bg-white/10 rounded-lg",
                  "transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500/50",
                  "touch-manipulation"
                )}
                aria-label="Close chat"
              >
                <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Messages Area */}
            <div
              className={cn(
                "flex-1 overflow-y-auto p-4 space-y-4",
                "scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent",
                // Smooth scrolling
                "scroll-smooth"
              )}
              role="log"
              aria-live="polite"
              aria-label="Chat messages"
            >
              {messages.map((message, index) => (
                <MessageBubble key={index} message={message} index={index} />
              ))}

              {isLoading && <LoadingIndicator />}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions - shown when only initial message exists */}
            {messages.length === 1 && (
              <div className="px-4 pb-3 border-t border-white/5">
                <p className="text-xs text-gray-400 mb-2 pt-3">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <SuggestedQuestion
                      key={index}
                      question={question}
                      onClick={() => setInput(question)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Scroll to bottom button - shown when not at bottom */}
            <AnimatePresence>
              {messages.length > 3 && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  onClick={scrollToBottom}
                  className={cn(
                    "absolute bottom-28 sm:bottom-24 right-4",
                    "w-10 h-10 rounded-full",
                    "bg-white/10 hover:bg-white/20 backdrop-blur-sm",
                    "flex items-center justify-center",
                    "text-white/70 hover:text-white",
                    "transition-colors",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  )}
                  aria-label="Scroll to latest messages"
                >
                  <FiChevronDown className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Input Area */}
            <div className={cn(
              "p-4 border-t border-white/10 bg-black/20",
              // Safe area for mobile home indicator
              "pb-[max(1rem,env(safe-area-inset-bottom))]"
            )}>
              <div className="flex gap-2 items-end">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  className={cn(
                    "flex-1 bg-white/5 border border-white/10",
                    "rounded-xl px-4 py-3",
                    "text-sm sm:text-base text-white",
                    "placeholder:text-gray-500",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50",
                    "resize-none",
                    // Dynamic height
                    "min-h-[48px] max-h-[120px]",
                    "scrollbar-thin scrollbar-thumb-white/10",
                    // Disabled state
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                  rows={1}
                  disabled={isLoading}
                  aria-label="Type your message"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className={cn(
                    // Touch-friendly size (min 48px)
                    "w-12 h-12 flex-shrink-0",
                    "bg-gradient-to-r from-blue-500 to-violet-500",
                    "text-white rounded-xl",
                    "hover:shadow-lg hover:shadow-blue-500/25",
                    "transition-all duration-200",
                    "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none",
                    "flex items-center justify-center",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900",
                    "touch-manipulation",
                    // Active state
                    "active:scale-95"
                  )}
                  aria-label="Send message"
                >
                  <FiSend className="w-5 h-5" />
                </button>
              </div>

              {/* Helper text */}
              <p className="text-xs text-gray-500 mt-2 text-center">
                Press Enter to send · Shift+Enter for new line
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;
