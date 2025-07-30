
'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { continueConversation } from '@/app/actions';
import type { ChatHistory } from '@/ai/flows/chat-flow';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot, Send, User, PlusCircle, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";


export default function ChatPage() {
  const [history, setHistory] = useState<ChatHistory>([]);
  const [streaming, setStreaming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleNewChat = () => {
    setHistory([]);
  };

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, streaming]);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setLoading(true);
    const newHistory: ChatHistory = [...history, { role: 'user', content: input }];
    setHistory(newHistory);
    setInput('');

    try {
      const stream = await continueConversation(newHistory);
      setStreaming(true);
      setHistory(prev => [...prev, { role: 'model', content: '' }]);
      
      const reader = stream.getReader();
      const decoder = new TextDecoder();
      
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        
        setHistory(prev => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage.role === 'model') {
            lastMessage.content += chunk;
            return [...prev.slice(0, -1), lastMessage];
          }
          return prev;
        });
      }

    } catch (error) {
      console.error(error);
       toast({
        title: "Error",
        description: "Failed to get response from AI. Please try again.",
        variant: "destructive",
      });
    } finally {
      setStreaming(false);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold tracking-tight">Chat with AyurBot</h2>
            <Button variant="outline" onClick={handleNewChat}>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Chat
            </Button>
        </div>
      <Card className="flex-grow flex flex-col shadow-lg border-primary/20">
        <CardContent className="flex-grow p-4 md:p-6 flex flex-col">
          <ScrollArea className="flex-grow pr-4" ref={scrollAreaRef}>
            {history.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                    <Bot className="w-16 h-16 mb-4"/>
                    <p className="text-lg">Start a conversation with AyurBot</p>
                    <p className="text-sm">Ask anything about Ayurveda, symptoms, or treatments.</p>
                </div>
            ) : (
                <div className="space-y-6">
                {history.map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-4 ${
                      message.role === 'user' ? 'justify-end' : ''
                    }`}
                  >
                    {message.role === 'model' && (
                      <Avatar className="w-8 h-8 border-2 border-primary">
                        <AvatarFallback>
                           <Bot />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-md rounded-xl px-4 py-3 text-sm whitespace-pre-wrap ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {message.content}
                      {streaming && index === history.length - 1 && (
                         <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1" />
                      )}
                    </div>
                     {message.role === 'user' && (
                       <Avatar className="w-8 h-8 border-2 border-muted-foreground">
                         <AvatarFallback>
                           <User />
                         </AvatarFallback>
                       </Avatar>
                    )}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
        <div className="p-4 border-t">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask AyurBot a question..."
                className="flex-grow"
                disabled={loading}
                />
                <Button type="submit" disabled={loading || !input.trim()}>
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Send className="w-5 h-5" />
                    )}
                    <span className="sr-only">Send</span>
                </Button>
            </form>
        </div>
      </Card>
    </div>
  );
}
