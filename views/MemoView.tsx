import React, { useState } from 'react';
import { Search, Plus, StickyNote, PenSquare, Trash2, Calendar, Save } from 'lucide-react';
import { MemoItem } from '../types';

const mockMemos: MemoItem[] = [
  { id: 1, title: '회의 아이디어 메모', content: '1. AI 챗봇 도입 시나리오\n2. 모바일 앱 UX 개선안\n- 네비게이션 바 위치 조정\n- 다크모드 지원', date: '2025-11-22 10:00', group: '기본 그룹' },
  { id: 2, title: '점심 메뉴 추천', content: '회사 근처 맛집 리스트\n- 김가네 (분식)\n- 스시로 (초밥)\n- 스타벅스 (카페)', date: '2025-11-21 12:30', group: '개인' },
  { id: 3, title: '프로젝트 TODO', content: '- 기획안 리뷰 완료\n- 디자인 시안 컨펌\n- 개발 착수 미팅 일정 조율', date: '2025-11-20 09:00', group: '업무' },
  { id: 4, title: '연말 회식 장소 후보', content: '1. 강남역 고기집\n2. 역삼역 횟집\n3. 삼성역 호텔 뷔페\n\n예산 인당 5만원 책정 필요', date: '2025-11-18 15:20', group: '팀' },
  { id: 5, title: '아이디어 스케치', content: '새로운 대시보드 위젯 구성안\n- 날씨 정보 연동\n- 실시간 뉴스 피드', date: '2025-11-15 11:00', group: '개인' },
];

const MemoView: React.FC = () => {
  const [selectedMemo, setSelectedMemo] = useState<MemoItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const handleNewMemo = () => {
      setSelectedMemo(null);
      setIsCreating(true);
      setNewTitle('');
      setNewContent('');
  };

  const handleSave = () => {
      alert('메모가 저장되었습니다.');
      setIsCreating(false);
  };

  return (
    <div className="flex h-[calc(100vh-140px)] bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
       
       <div className="w-80 border-r border-gray-200 flex flex-col bg-gray-50/50">
          <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-white sticky top-0 z-10">
              <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                  <StickyNote className="text-yellow-500" /> 메모
              </h2>
              <button 
                onClick={handleNewMemo}
                className="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-all shadow-sm active:scale-95 transform hover:-translate-y-0.5 border border-yellow-200"
              >
                  <Plus size={20} />
              </button>
          </div>
          <div className="p-4">
              <div className="relative group">
                  <Search className="absolute left-3 top-2.5 text-gray-400 group-focus-within:text-yellow-500 transition-colors" size={16} />
                  <input type="text" placeholder="메모 검색" className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-shadow" />
              </div>
          </div>
          <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-3">
              {mockMemos.map(memo => (
                  <div 
                    key={memo.id} 
                    onClick={() => { setSelectedMemo(memo); setIsCreating(false); }}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border relative overflow-hidden group
                        ${selectedMemo?.id === memo.id 
                            ? 'bg-yellow-50 border-yellow-300 shadow-md transform -translate-y-0.5' 
                            : 'bg-white border-gray-100 hover:border-yellow-200 hover:shadow-md hover:-translate-y-0.5'
                        }
                    `}
                  >
                      {selectedMemo?.id === memo.id && <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400"></div>}
                      <h4 className={`font-bold text-sm mb-1 truncate transition-colors ${selectedMemo?.id === memo.id ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'}`}>{memo.title}</h4>
                      <p className="text-xs text-slate-500 truncate mb-3">{memo.content}</p>
                      <div className="flex justify-between items-center text-[10px] text-slate-400">
                          <span className="flex items-center gap-1"><Calendar size={10} /> {memo.date.split(' ')[0]}</span>
                          <span className="bg-gray-100 px-1.5 py-0.5 rounded text-slate-600 group-hover:bg-yellow-100 transition-colors">{memo.group}</span>
                      </div>
                  </div>
              ))}
          </div>
       </div>

       <div className="flex-1 flex flex-col bg-white relative">
           <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none"></div>

           {isCreating ? (
               <div className="flex flex-col h-full animate-fade-in relative z-10">
                   <div className="h-16 border-b border-gray-200 px-8 flex items-center justify-between bg-yellow-50/30 backdrop-blur-sm">
                       <span className="text-sm font-bold text-slate-500 flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div> 새 메모 작성 중...
                       </span>
                       <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-yellow-500 text-white rounded-lg font-bold hover:bg-yellow-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                           <Save size={18} /> 저장
                       </button>
                   </div>
                   <div className="flex-1 p-8 overflow-y-auto">
                       <input 
                            type="text" 
                            placeholder="제목을 입력하세요"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="w-full text-4xl font-bold text-slate-900 border-none focus:ring-0 placeholder-gray-300 mb-6 bg-transparent outline-none tracking-tight"
                            autoFocus
                       />
                       <textarea 
                            className="w-full h-full resize-none border-none focus:ring-0 text-slate-700 text-lg leading-relaxed bg-transparent outline-none placeholder-gray-300 font-medium"
                            placeholder="내용을 자유롭게 작성하세요..."
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                       ></textarea>
                   </div>
               </div>
           ) : selectedMemo ? (
               <div className="flex flex-col h-full animate-fade-in relative z-10">
                   <div className="h-16 border-b border-gray-200 px-8 flex items-center justify-between bg-white/80 backdrop-blur-sm">
                       <span className="text-sm text-slate-400 flex items-center gap-2 font-medium bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                           <Calendar size={14} /> {selectedMemo.date}
                       </span>
                       <div className="flex gap-2">
                           <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                       </div>
                   </div>
                   <div className="flex-1 p-8 overflow-y-auto">
                       <input 
                            type="text" 
                            value={selectedMemo.title} 
                            readOnly
                            className="w-full text-4xl font-bold text-slate-900 border-none focus:ring-0 placeholder-gray-300 mb-6 bg-transparent outline-none tracking-tight"
                       />
                       <textarea 
                            className="w-full h-full resize-none border-none focus:ring-0 text-slate-700 text-lg leading-relaxed bg-transparent outline-none font-medium"
                            value={selectedMemo.content}
                            readOnly
                       ></textarea>
                   </div>
               </div>
           ) : (
               <div className="flex-1 flex flex-col items-center justify-center bg-gray-50/20 relative z-10">
                   <div className="w-24 h-24 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-yellow-100/50 rotate-3 border border-white">
                       <StickyNote size={48} className="text-yellow-600 drop-shadow-sm" />
                   </div>
                   <h3 className="text-2xl font-bold text-slate-800 mb-3">메모를 선택하세요</h3>
                   <p className="text-slate-500 mb-8 max-w-xs text-center leading-relaxed">
                       중요한 아이디어나 할 일을<br/>빠르게 기록하고 관리해보세요.
                   </p>
                   <button onClick={handleNewMemo} className="px-8 py-3.5 bg-yellow-500 text-white font-bold rounded-xl shadow-lg shadow-yellow-500/30 hover:bg-yellow-600 transition-all hover:-translate-y-1 hover:shadow-xl flex items-center gap-2">
                       <PenSquare size={18} /> 새 메모 작성하기
                   </button>
               </div>
           )}
       </div>
    </div>
  );
};

export default MemoView;