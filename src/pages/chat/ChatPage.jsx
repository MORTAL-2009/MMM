import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Send, Users, Sparkles, MessageSquare } from 'lucide-react';

export function ChatPage() {
  const { user, familySide } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender_name: 'Rajesh Sharma',
      family_side: 'bride',
      message_text: 'Namaste everyone! Welcome to the official wedding planning lounge for Kavya & Rohan!',
      created_at: '2026-03-01T10:15:00Z',
    },
    {
      id: '2',
      sender_name: 'Vikram Verma',
      family_side: 'groom',
      message_text: 'Delighted to be here. We have already initiated talks with the royal vintage car vendor for the groom baraat.',
      created_at: '2026-03-01T10:22:00Z',
    },
    {
      id: '3',
      sender_name: 'Meena Sharma',
      family_side: 'bride',
      message_text: 'Wonderful! The Mehendi artist catalog has been uploaded for the family ladies to pick designs.',
      created_at: '2026-03-01T11:05:00Z',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      sender_name: user?.displayName || 'Family Member',
      family_side: familySide || 'bride',
      message_text: inputText.trim(),
      created_at: new Date().toISOString(),
    };

    setMessages([...messages, newMsg]);
    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-8.5rem)] flex flex-col space-y-4">
      {/* Chat Room Banner */}
      <div className="flex items-center justify-between p-4 rounded-xl border border-surface-border bg-surface-card">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/30 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-primary-400" />
          </div>
          <div>
            <h2 className="font-serif text-base font-bold text-gray-100 flex items-center gap-2">
              Family Real-Time Lounge
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            </h2>
            <p className="text-xs text-gray-400">
              Shared communication channel for Bride & Groom family members
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Users className="w-4 h-4 text-primary-400" />
          <span className="hidden sm:inline">Active Members: 6</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <Card className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="text-center py-2">
            <span className="text-[11px] px-3 py-1 rounded-full bg-surface-muted text-gray-400 border border-surface-border">
              End-to-End Workspace Isolation • Protected by Supabase Realtime & RLS
            </span>
          </div>

          {messages.map((msg) => {
            const isMe = msg.sender_name === user?.displayName;
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-2 mb-1 px-1">
                  <span className="text-xs font-semibold text-gray-300">{msg.sender_name}</span>
                  <Badge variant={msg.family_side === 'bride' ? 'bride' : 'groom'} className="text-[9px] py-0 px-1.5">
                    {msg.family_side === 'bride' ? "Bride's Side" : "Groom's Side"}
                  </Badge>
                  <span className="text-[10px] text-gray-500">
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div
                  className={`max-w-md md:max-w-lg rounded-2xl px-4 py-2.5 text-xs md:text-sm leading-relaxed shadow-sm ${
                    isMe
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-black font-medium rounded-tr-none'
                      : 'bg-surface-muted border border-surface-border text-gray-100 rounded-tl-none'
                  }`}
                >
                  {msg.message_text}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="pt-4 border-t border-surface-border/60">
          <div className="flex items-end gap-2 bg-surface-muted border border-surface-border rounded-xl p-2 focus-within:border-primary-500/60 transition-colors">
            <textarea
              rows="2"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a family message... (Enter to send, Shift+Enter for new line)"
              className="flex-1 bg-transparent border-0 resize-none text-xs md:text-sm text-gray-100 placeholder-gray-400 focus:outline-none px-2"
            />
            <Button type="submit" variant="primary" size="sm" disabled={!inputText.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
