import React, { useState } from 'react';
import { Search, Plus, CheckCircle2, Circle, Clock, Tag, User, ChevronRight, X, Calendar } from 'lucide-react';
import { TodoItem } from '../types';

const mockTodos: TodoItem[] = [
  { id: 1, title: '4분기 마케팅 기획안 작성', project: '마케팅', dueDate: '2025-11-25', status: '진행중', priority: '상', assignee: '김태호', description: '4분기 예산안 포함하여 기획안 초안 작성 필요' },
  { id: 2, title: '디자인 리소스 공유', project: '웹사이트 개편', dueDate: '2025-11-22', status: '완료', priority: '중', assignee: '김태호', description: '메인 페이지 시안 리소스 공유 완료' },
  { id: 3, title: '개발 서버 점검', project: '인프라', dueDate: '2025-11-30', status: '대기', priority: '상', assignee: '강동훈', description: '주말 정기 점검 진행' },
  { id: 4, title: '제휴 업체 미팅 준비', project: '사업개발', dueDate: '2025-11-28', status: '진행중', priority: '중', assignee: '남여원', description: '제안서 출력 및 미팅룸 예약' },
  { id: 5, title: '주간 업무 보고서 취합', project: '운영', dueDate: '2025-11-21', status: '완료', priority: '하', assignee: '연승민', description: '팀원별 보고서 취합 후 팀장 보고' },
  { id: 6, title: '신규 입사자 OJT 자료 업데이트', project: '인사', dueDate: '2025-12-05', status: '대기', priority: '하', assignee: '김태호', description: '2025년 기준 변경된 복지 제도 반영' },
];

const TodoView: React.FC = () => {
  const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [projectFilter, setProjectFilter] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredTodos = mockTodos.filter(todo => {
      if (projectFilter && todo.project !== projectFilter) return false;
      if (filter === 'all') return true;
      if (filter === 'pending') return todo.status !== '완료';
      if (filter === 'completed') return todo.status === '완료';
      return true;
  });

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case '상': return 'border-l-red-500';
      case '중': return 'border-l-orange-500';
      case '하': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  return (
    <div className="flex h-[calc(100vh-140px)] bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 relative">
      
      <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col p-4">
         <button 
            onClick={() => setShowAddModal(true)}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all mb-6 flex items-center justify-center gap-2 transform active:scale-95 duration-150 hover:shadow-lg"
        >
            <Plus size={18} /> 할 일 추가
         </button>
         
         <div className="space-y-1">
             <button onClick={() => { setFilter('all'); setProjectFilter(null); }} className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold flex justify-between transition-colors ${filter === 'all' && !projectFilter ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5' : 'text-slate-600 hover:bg-gray-200/50'}`}>
                 <span>전체 할 일</span>
                 <span className="bg-gray-100 text-gray-600 px-2 rounded-full text-xs flex items-center">{mockTodos.length}</span>
             </button>
             <button onClick={() => { setFilter('pending'); setProjectFilter(null); }} className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold flex justify-between transition-colors ${filter === 'pending' && !projectFilter ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5' : 'text-slate-600 hover:bg-gray-200/50'}`}>
                 <span>진행 중</span>
                 <span className="bg-blue-100 text-blue-600 px-2 rounded-full text-xs flex items-center">{mockTodos.filter(t => t.status !== '완료').length}</span>
             </button>
             <button onClick={() => { setFilter('completed'); setProjectFilter(null); }} className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold flex justify-between transition-colors ${filter === 'completed' && !projectFilter ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5' : 'text-slate-600 hover:bg-gray-200/50'}`}>
                 <span>완료됨</span>
                 <span className="bg-green-100 text-green-600 px-2 rounded-full text-xs flex items-center">{mockTodos.filter(t => t.status === '완료').length}</span>
             </button>
         </div>

         <div className="mt-8">
             <h5 className="px-4 text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
                Projects <span className="h-px bg-gray-200 flex-1"></span>
             </h5>
             <div className="space-y-1">
                 {['마케팅', '웹사이트 개편', '인프라', '사업개발', '운영', '인사'].map(proj => (
                     <div 
                        key={proj} 
                        onClick={() => setProjectFilter(proj)}
                        className={`px-4 py-2 text-sm flex items-center gap-2 cursor-pointer rounded-lg transition-all
                            ${projectFilter === proj ? 'bg-indigo-50 text-indigo-700 font-bold shadow-sm' : 'text-slate-600 hover:bg-gray-200/50 hover:translate-x-1'}
                        `}
                     >
                         <div className={`w-2 h-2 rounded-full ${projectFilter === proj ? 'bg-indigo-500 ring-2 ring-indigo-200' : 'bg-slate-300'}`}></div> {proj}
                     </div>
                 ))}
             </div>
         </div>
      </div>

      <div className={`flex-1 bg-white flex flex-col min-w-0 transition-all ${selectedTodo ? 'border-r border-gray-200' : ''}`}>
          <div className="h-16 border-b border-gray-200 flex items-center justify-between px-8 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
             <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                 {projectFilter ? projectFilter : '나의 할 일'}
                 {projectFilter && <button className="text-xs font-normal text-white bg-slate-400 hover:bg-red-500 rounded-full px-2 py-0.5 transition-colors" onClick={() => setProjectFilter(null)}>필터 해제 ✕</button>}
             </h2>
             <div className="relative group">
                 <Search className="absolute left-3 top-2.5 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                 <input type="text" placeholder="할 일 검색" className="pl-9 pr-4 py-2 bg-gray-50 border border-transparent rounded-lg text-sm w-64 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all shadow-inner" />
             </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-gray-50/30">
             {filteredTodos.map(todo => (
                 <div 
                    key={todo.id} 
                    onClick={() => setSelectedTodo(todo)}
                    className={`group flex items-center p-4 bg-white border border-gray-100 rounded-xl cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/5 border-l-4
                        ${getPriorityColor(todo.priority)}
                        ${selectedTodo?.id === todo.id ? 'ring-2 ring-blue-500 border-l-blue-600 shadow-md z-10' : ''}
                    `}
                 >
                     <button className="mr-4 text-slate-300 hover:text-blue-600 transition-colors transform hover:scale-110 active:scale-95">
                         {todo.status === '완료' ? <CheckCircle2 size={24} className="text-green-500" /> : <Circle size={24} />}
                     </button>
                     <div className="flex-1">
                         <h4 className={`text-base font-bold mb-1 transition-colors ${todo.status === '완료' ? 'text-slate-400 line-through' : 'text-slate-800 group-hover:text-blue-700'}`}>{todo.title}</h4>
                         <div className="flex items-center gap-4 text-xs text-slate-500">
                             <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded text-gray-600"><Tag size={12} /> {todo.project}</span>
                             <span className={`flex items-center gap-1 ${todo.dueDate < '2025-11-23' ? 'text-red-500 font-bold bg-red-50 px-2 py-0.5 rounded' : ''}`}><Clock size={12} /> {todo.dueDate}</span>
                             <span className="flex items-center gap-1"><User size={12} /> {todo.assignee}</span>
                         </div>
                     </div>
                     <div className="flex items-center gap-2">
                         <span className={`px-2 py-1 rounded text-xs font-bold ${
                             todo.priority === '상' ? 'bg-red-50 text-red-600' :
                             todo.priority === '중' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                         }`}>
                             {todo.priority}
                         </span>
                         <div className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                            <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500" />
                         </div>
                     </div>
                 </div>
             ))}
          </div>
      </div>

      {selectedTodo && (
          <div className="w-[400px] bg-white flex flex-col animate-slide-in-right border-l border-gray-200 shadow-2xl z-20">
              <div className="h-16 border-b border-gray-200 px-6 flex items-center justify-between bg-white/80 backdrop-blur-sm sticky top-0">
                  <span className="font-bold text-slate-500 text-sm flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div> 상세 정보</span>
                  <button onClick={() => setSelectedTodo(null)} className="text-slate-400 hover:text-slate-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"><X size={20} /></button>
              </div>
              <div className="p-8 flex-1 overflow-y-auto">
                  <div className="mb-6">
                      <h2 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">{selectedTodo.title}</h2>
                      <div className="flex items-center gap-3 mb-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                              selectedTodo.status === '완료' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-blue-50 text-blue-700 border-blue-200'
                          }`}>
                              {selectedTodo.status}
                          </span>
                          <span className="text-slate-300 text-sm">|</span>
                          <span className="text-sm font-medium text-slate-600 bg-gray-100 px-2 py-0.5 rounded">{selectedTodo.project}</span>
                      </div>
                      
                      <div className="space-y-6">
                          <div>
                              <label className="text-xs font-bold text-slate-400 uppercase block mb-2">담당자</label>
                              <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group">
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-bold text-sm shadow-sm group-hover:scale-110 transition-transform">
                                      {selectedTodo.assignee[0]}
                                  </div>
                                  <span className="text-sm font-bold text-slate-800">{selectedTodo.assignee}</span>
                              </div>
                          </div>

                          <div>
                              <label className="text-xs font-bold text-slate-400 uppercase block mb-2">마감일</label>
                              <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-200 hover:border-red-400 hover:shadow-md transition-all cursor-pointer group">
                                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 shadow-sm group-hover:scale-110 transition-transform">
                                     <Clock size={18} />
                                  </div>
                                  <span className="text-sm font-bold text-slate-800">{selectedTodo.dueDate}</span>
                              </div>
                          </div>

                          <div>
                              <label className="text-xs font-bold text-slate-400 uppercase block mb-2">설명</label>
                              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm text-slate-700 leading-relaxed min-h-[120px] shadow-inner focus-within:ring-2 focus-within:ring-blue-200 transition-shadow">
                                  {selectedTodo.description}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="p-4 border-t border-gray-200 bg-gray-50/50 backdrop-blur-sm">
                  <button className={`w-full font-bold py-3 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95 text-white ${selectedTodo.status === '완료' ? 'bg-slate-600 hover:bg-slate-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
                      {selectedTodo.status === '완료' ? '다시 열기' : '완료 처리'}
                  </button>
              </div>
          </div>
      )}

      {showAddModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-[500px] overflow-hidden transform transition-all scale-100">
                <div className="h-16 bg-gradient-to-r from-green-600 to-teal-600 flex items-center justify-between px-8 relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/10 opacity-50 skew-x-12"></div>
                      <h3 className="text-white font-bold text-lg relative z-10 flex items-center gap-2"><Plus className="bg-white/20 rounded-full p-1" size={24} /> 새 할 일 추가</h3>
                      <button onClick={() => setShowAddModal(false)} className="text-white/80 hover:text-white relative z-10 bg-white/10 hover:bg-white/20 rounded-full p-1 transition-colors"><X size={20} /></button>
                </div>
                <div className="p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">할 일 내용</label>
                        <input type="text" placeholder="무엇을 해야 하나요?" className="w-full border-b-2 border-gray-200 focus:border-green-600 py-3 text-xl font-bold outline-none bg-transparent placeholder-gray-300 transition-colors" autoFocus />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">마감일</label>
                            <div className="relative group">
                                <Calendar className="absolute left-0 top-2.5 text-slate-400 group-focus-within:text-green-600 transition-colors" size={18} />
                                <input type="date" className="w-full pl-8 py-2 border-b border-gray-200 outline-none font-medium text-slate-700 focus:border-green-600 transition-colors" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">우선순위</label>
                            <select className="w-full py-2 border-b border-gray-200 outline-none font-medium text-slate-700 bg-transparent focus:border-green-600 transition-colors">
                                <option>상</option>
                                <option>중</option>
                                <option>하</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">프로젝트</label>
                        <select className="w-full py-2 border-b border-gray-200 outline-none font-medium text-slate-700 bg-transparent focus:border-green-600 transition-colors">
                            <option>마케팅</option>
                            <option>웹사이트 개편</option>
                            <option>인프라</option>
                            <option>사업개발</option>
                        </select>
                    </div>
                </div>
                <div className="p-6 bg-gray-50 flex justify-end gap-3 border-t border-gray-100">
                    <button onClick={() => setShowAddModal(false)} className="px-5 py-2.5 text-slate-500 font-bold hover:bg-gray-200 rounded-xl transition-colors">취소</button>
                    <button onClick={() => { setShowAddModal(false); alert('할 일이 추가되었습니다.'); }} className="px-6 py-2.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">추가하기</button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default TodoView;