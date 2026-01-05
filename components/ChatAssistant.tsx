import React, { useState, useRef, useEffect } from 'react';
import { chatWithQuillbot } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am Quillbot. Need help crafting a vision for Sora 2?' }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const newMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setLoading(true);

    const response = await chatWithQuillbot(messages, input);
    
    setMessages(prev => [...prev, { role: 'model', text: response || "Error." }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 h-96 bg-black/80 backdrop-blur-xl border border-luxury-border rounded-2xl shadow-3d flex flex-col overflow-hidden transition-all animate-float">
          <div className="bg-luxury-accent/10 p-3 border-b border-white/10 flex justify-between items-center">
            <span className="font-bold text-luxury-accent tracking-wider">QUILLBOT AI</span>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">✕</button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  m.role === 'user' 
                    ? 'bg-luxury-accent text-white rounded-br-none' 
                    : 'bg-white/10 text-gray-200 rounded-bl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-xs text-gray-500 italic ml-2">Quillbot is thinking...</div>}
          </div>

          <div className="p-3 bg-black/40 border-t border-white/10 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask for advice..."
              className="flex-1 bg-transparent border border-white/20 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-luxury-accent"
            />
            <button 
              onClick={handleSend}
              className="bg-luxury-accent hover:bg-indigo-500 text-white rounded-lg px-3 transition-colors"
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-luxury-accent to-purple-600 shadow-glow flex items-center justify-center text-white text-2xl font-bold hover:scale-110 transition-transform active:scale-95"
      >
        {isOpen ? '✕' : 'Q'}
      </button>
    </div>
  );
};

export default ChatAssistant;