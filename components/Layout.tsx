import React from 'react';
import { ViewState, User } from '../types';
import { 
  Mail, Calendar, CheckSquare, HardDrive, 
  Bell, MessageCircleQuestion, Bot, StickyNote, 
  MapPin, Contact, Video, Layers, Search, Home
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  user: User;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate, user }) => {
  
  const navItems = [
    { id: ViewState.MAIN, label: '홈', icon: Home },
    { id: ViewState.MAIL, label: '메일', icon: Mail },
    { id: ViewState.CALENDAR, label: '일정', icon: Calendar },
    { id: ViewState.TODO, label: '할 일', icon: CheckSquare },
    { id: ViewState.MEMO, label: '메모', icon: StickyNote },
    { id: ViewState.MEETING_ROOM, label: '회의실', icon: MapPin },
    { id: ViewState.CONTACTS, label: '연락처', icon: Contact },
    { id: ViewState.MEETING, label: 'Meeting', icon: Video },
    { id: ViewState.DRIVE, label: 'Drive', icon: HardDrive },
    { id: ViewState.NOTICE, label: '공지사항', icon: Bell },
    { id: ViewState.QNA, label: 'Q&A', icon: MessageCircleQuestion },
    { id: ViewState.AI, label: 'AI', icon: Bot },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-slate-800 selection:bg-blue-100">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-[1920px] mx-auto">
          <div className="h-16 px-6 flex items-center justify-between">
            <div 
              className="flex items-center space-x-3 cursor-pointer group" 
              onClick={() => onNavigate(ViewState.MAIN)}
            >
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-2 rounded-xl shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform duration-300">
                <Layers size={22} />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                비즈니스 업무 협업 플랫폼
              </span>
            </div>

            <div className="hidden lg:flex items-center flex-1 max-w-lg mx-12">
               <div className="relative w-full group">
                  <Search className="absolute left-3 top-2.5 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                  <input 
                    type="text" 
                    placeholder="임직원, 메뉴, 파일 검색" 
                    className="w-full bg-gray-100/80 border border-transparent focus:bg-white rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-inner hover:bg-gray-100"
                  />
               </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                 <div className="text-right hidden md:block">
                    <p className="text-sm font-bold text-slate-800">{user.name} {user.position}</p>
                    <p className="text-xs text-slate-500 font-medium">{user.department}</p>
                 </div>
                 <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center text-blue-700 font-bold border border-blue-200 shadow-sm ring-2 ring-white">
                    {user.name[0]}
                 </div>
              </div>
            </div>
          </div>

          <div className="px-6 pb-0 overflow-x-auto no-scrollbar">
            <div className="flex space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`
                    px-4 py-3 flex items-center space-x-2 text-sm font-medium transition-all relative whitespace-nowrap rounded-t-lg
                    group
                    ${currentView === item.id 
                      ? 'text-blue-600 bg-blue-50/50' 
                      : 'text-slate-500 hover:text-slate-800 hover:bg-gray-50/80'}
                  `}
                >
                  <item.icon 
                    size={18} 
                    className={`transition-transform duration-300 ${currentView === item.id ? 'scale-110' : 'group-hover:scale-110'}`}
                    strokeWidth={currentView === item.id ? 2.5 : 2} 
                  />
                  <span>{item.label}</span>
                  {currentView === item.id && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full shadow-[0_-2px_6px_rgba(37,99,235,0.4)] animate-fade-in" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1920px] w-full mx-auto p-6 animate-fade-in">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
        <div className="max-w-[1920px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
          <div className="flex gap-6 mb-4 md:mb-0 font-medium">
            <span className="hover:text-slate-600 cursor-pointer transition-colors">이용약관</span>
            <span className="hover:text-slate-600 cursor-pointer transition-colors">개인정보처리방침</span>
            <span className="hover:text-slate-600 cursor-pointer transition-colors">운영정책</span>
          </div>
          <p>Copyright 2025 Business Collaboration Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;