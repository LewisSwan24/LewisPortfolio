import { useState, useCallback } from 'react';
import { Message } from '../types/chat';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    
    // Create the initial assistant message placeholder
    const aiId = (Date.now() + 1).toString();
    setMessages((prev) => [...prev, { id: aiId, role: 'assistant', content: '', timestamp: new Date() }]);
    
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content }),
      });

      if (!response.ok) throw new Error('Failed to send message');
      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastIdx = newMessages.length - 1;
          if (lastIdx < 0 || newMessages[lastIdx].role !== 'assistant') return prev;
          
          const updatedMessages = [...newMessages];
          updatedMessages[lastIdx] = { 
            ...updatedMessages[lastIdx], 
            content: updatedMessages[lastIdx].content + chunk 
          };
          return updatedMessages;
        });
      }
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { messages, sendMessage, isLoading };
}
