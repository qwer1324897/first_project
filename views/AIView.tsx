import React, { useState, useRef, useEffect } from 'react';
import { Bot, User as UserIcon, Loader2, Paperclip, ArrowUp } from 'lucide-react';
import { generateAIResponse } from '../services/geminiService';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

const AIView: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    try {
      const aiText = await generateAIResponse(userMessage.text, history);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: aiText || "죄송합니다. 응답을 생성하지 못했습니다.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col items-center bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      
      <div className="flex-1 w-full max-w-4xl flex flex-col items-center p-4">
          
          {messages.length === 0 ? (
             <div className="flex-1 flex flex-col items-center justify-center w-full">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8 max-w-2xl w-full mb-12 relative shadow-sm text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6 transform -rotate-3">
                        <Bot className="text-white w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                        <p className="font-bold text-slate-800 text-lg">사내 데이터 기반의 스마트 AI 비서입니다.</p>
                        <p className="text-slate-600">업무 규정, 복지 제도, 프로젝트 이력 등 궁금한 점을 자유롭게 물어보세요.</p>
                    </div>
                </div>
             </div>
          ) : (
             <div className="w-full flex-1 overflow-y-auto p-4 space-y-6 mb-4 custom-scrollbar">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-fade-in-up`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-1 ${msg.role === 'user' ? 'bg-slate-800' : 'bg-blue-600 shadow-md'}`}>
                      {msg.role === 'user' ? <UserIcon size={16} className="text-white" /> : <Bot size={18} className="text-white" />}
                    </div>
                    <div className={`max-w-[75%] p-5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-slate-800 text-white rounded-tr-none' 
                        : 'bg-white text-slate-800 border border-gray-200 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                   <div className="flex gap-4 animate-pulse">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mt-1 shadow-md">
                            <Loader2 size={18} className="text-white animate-spin" />
                        </div>
                        <div className="bg-white text-slate-500 border border-gray-200 rounded-2xl rounded-tl-none p-5 text-sm shadow-sm">
                            답변을 생성하고 있습니다...
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
             </div>
          )}

          <div className="w-full max-w-3xl mb-6">
               <div className="relative">
                   <div className="absolute left-6 top-5 text-slate-400 cursor-pointer hover:text-slate-600">
                        <Paperclip size={20} />
                   </div>
                   <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !e.nativeEvent.isComposing && handleSend()}
                        placeholder="무엇이든 물어보세요..." 
                        className="w-full pl-16 pr-16 py-5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-lg transition-all"
                        disabled={isLoading}
                   />
                   <button 
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="absolute right-3 top-3 w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                   >
                        <ArrowUp size={20} />
                   </button>
               </div>

               {messages.length === 0 && (
                    <div className="flex flex-wrap gap-3 justify-center mt-8">
                        {['연차 사용 규정 알려줘', '최근 공지사항 요약해줘', '회의실 예약 방법', 'IT 지원팀 연락처'].map(suggestion => (
                            <button 
                                key={suggestion}
                                onClick={() => setInput(suggestion)} 
                                className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-slate-600 text-sm hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-colors shadow-sm"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
               )}
          </div>
      </div>
    </div>
  );
};

export default AIView;