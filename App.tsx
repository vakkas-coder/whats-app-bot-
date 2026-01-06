
import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Mic,
  Paperclip,
  MoreVertical,
  ChevronLeft,
  Phone,
  Video,
  Smile,
  Check,
  CheckCheck
} from 'lucide-react';
import { Message } from './types';
import { geminiService } from './services/gemini';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initial Greeting from the Assistant
  useEffect(() => {
    const initGreeting = async () => {
      setIsTyping(true);
      try {
        const greeting = await geminiService.sendMessage(
          'START_CONVERSATION: Greet the customer Ahmed Ali warmly and professionally. Present yourself as the Royal Dine Assistant.'
        );
        setMessages([
          {
            id: '1',
            role: 'assistant',
            text: greeting,
            timestamp: new Date()
          }
        ]);
      } catch (err) {
        console.error("Failed to fetch initial greeting", err);
      } finally {
        setIsTyping(false);
      }
    };
    initGreeting();
  }, []);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    const assistantId = (Date.now() + 1).toString();
    setMessages(prev => [
      ...prev,
      {
        id: assistantId,
        role: 'assistant',
        text: '',
        timestamp: new Date(),
        isPending: true
      }
    ]);

    let fullResponse = '';
    try {
      const stream = geminiService.sendMessageStream(text);
      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev =>
          prev.map(m =>
            m.id === assistantId
              ? { ...m, text: fullResponse, isPending: false }
              : m
          )
        );
      }
    } catch (error) {
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? {
                ...m,
                text: 'Mafi chahtay hain, kuch takneeki masla hua hai. Dobara koshish karein. (Sorry, there was a technical issue. Please try again.)',
                isPending: false
              }
            : m
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto bg-[#e5ddd5] shadow-2xl relative overflow-hidden">
      {/* WhatsApp Header */}
      <div className="bg-[#075e54] text-white px-3 py-2 flex items-center justify-between shadow-md z-10">
        <div className="flex items-center gap-2">
          <ChevronLeft className="w-6 h-6 cursor-pointer" />
          <div className="relative">
            <img
              src="https://api.dicebear.com/7.x/initials/svg?seed=RD&backgroundColor=b91c1c"
              alt="Royal Dine"
              className="w-10 h-10 rounded-full border border-gray-200 bg-white p-0.5"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#075e54] rounded-full"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">Royal Dine Assistant 🍽️</span>
            <span className="text-[10px] opacity-90 leading-tight">Typically replies instantly</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Video className="w-5 h-5 cursor-pointer opacity-90 hover:opacity-100" />
          <Phone className="w-5 h-5 cursor-pointer opacity-90 hover:opacity-100" />
          <MoreVertical className="w-5 h-5 cursor-pointer opacity-90 hover:opacity-100" />
        </div>
      </div>

      {/* Chat Area with WhatsApp Wallpaper */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 whatsapp-bg bg-opacity-10"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="flex justify-center mb-4">
          <span className="bg-[#dcf8c6] text-[10px] px-2 py-1 rounded shadow-sm uppercase font-medium text-gray-600">
            Today
          </span>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`relative max-w-[85%] px-3 py-1.5 rounded-lg text-[13.5px] shadow-sm leading-relaxed
                ${
                  msg.role === 'user'
                    ? 'bg-[#dcf8c6] rounded-tr-none text-gray-800'
                    : 'bg-white rounded-tl-none text-gray-800'
                }
              `}
            >
              {/* Message text with newline support */}
              <div className="whitespace-pre-wrap break-words">
                {msg.text || (msg.isPending ? '...' : '')}
              </div>

              {/* Time and Ticks */}
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-[9px] text-gray-500 uppercase">
                  {formatTime(msg.timestamp)}
                </span>
                {msg.role === 'user' && (
                  <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                )}
              </div>

              {/* Bubble Tail */}
              <div
                className={`absolute top-0 w-0 h-0 border-t-[10px] border-t-transparent ${
                  msg.role === 'user'
                    ? '-right-2 border-l-[10px] border-l-[#dcf8c6]'
                    : '-left-2 border-r-[10px] border-r-white'
                }`}
              />
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-2 rounded-full text-xs text-gray-500 flex items-center gap-2 shadow-sm italic">
              <span className="flex gap-1">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce delay-100">.</span>
                <span className="animate-bounce delay-200">.</span>
              </span>
              Royal Dine is typing
            </div>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="p-2 bg-[#f0f2f5] flex items-end gap-2 border-t border-gray-200">
        <div className="flex-1 bg-white rounded-full flex items-center px-3 py-1 shadow-sm min-h-[44px]">
          <Smile className="w-6 h-6 text-gray-500 mr-2 cursor-pointer" />
          <textarea
            rows={1}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type a message"
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 resize-none max-h-32"
          />
          <Paperclip className="w-5 h-5 text-gray-500 ml-2 cursor-pointer -rotate-45" />
        </div>
        
        <button
          onClick={() => handleSend()}
          disabled={isTyping}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
            inputValue.trim() ? 'bg-[#00a884] text-white rotate-0' : 'bg-[#00a884] text-white'
          }`}
        >
          {inputValue.trim() ? (
            <Send className="w-5 h-5 ml-1" />
          ) : (
            <Mic className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Disclaimer / Branding footer */}
      <div className="bg-white text-center py-1 text-[10px] text-gray-400 border-t border-gray-100">
        End-to-end encrypted | Royal Dine 5-Star Experience
      </div>
    </div>
  );
};

export default App;
