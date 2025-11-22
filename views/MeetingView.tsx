import React, { useState } from 'react';
import { RefreshCw, ArrowRight, Lock, Calendar, Video, Mic, X, Clock, Users, Link } from 'lucide-react';

const MeetingView: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'schedule' | 'instant' | 'join' | null>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <div className="relative h-[calc(100vh-100px)] bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl">
       <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 z-0"></div>
       <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay z-0 animate-pulse"></div>

       <div className="absolute bottom-8 right-8 z-20">
             <button 
                onClick={() => alert('회의 목록이 갱신되었습니다.')}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-sm hover:bg-white/20 hover:border-white transition-all backdrop-blur-md shadow-lg"
             >
                 <RefreshCw size={14} /> 새로고침
             </button>
       </div>

       <div className="z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between px-12 gap-16">
           
           <div className="text-white lg:w-1/2">
                <div className="inline-block px-3 py-1 bg-indigo-500/30 border border-indigo-400/50 rounded-full text-indigo-200 text-xs font-bold mb-6">
                    기업용 화상회의 솔루션
                </div>
                <h1 className="text-5xl font-bold mb-6 leading-tight tracking-tight">
                    언제 어디서나<br/>
                    끊김 없는 협업
                </h1>
                <p className="text-slate-300 text-lg mb-10 leading-relaxed">
                    고화질 화상회의와 실시간 협업 도구를 통해<br/>팀의 생산성을 극대화하세요.
                </p>
                
                <div className="flex gap-4 mb-12">
                    <button onClick={() => setActiveModal('schedule')} className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/50 flex items-center gap-2 transform hover:-translate-y-1">
                        <Calendar size={20} /> 회의 예약하기
                    </button>
                    <button onClick={() => setActiveModal('instant')} className="px-8 py-4 bg-white hover:bg-gray-100 text-slate-900 font-bold rounded-xl transition-all shadow-lg flex items-center gap-2 transform hover:-translate-y-1">
                        <Video size={20} /> 즉시 회의 시작
                    </button>
                </div>

                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md max-w-md">
                    <p className="text-slate-300 text-sm mb-3 pl-1 font-medium">참여 코드로 입장</p>
                    <div className="relative">
                        <div className="absolute left-4 top-3.5 text-slate-400"><Lock size={18} /></div>
                        <input 
                            type="text" 
                            placeholder="회의 코드 입력 (예: 123-456)" 
                            className="w-full pl-11 pr-12 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                        <button onClick={() => setActiveModal('join')} className="absolute right-2 top-2 w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
           </div>

           <div className="bg-white rounded-2xl w-full max-w-md h-[600px] shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="font-bold text-lg text-slate-800">오늘의 회의</h3>
                    <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">3건 예정</span>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                     <div onClick={() => setActiveModal('join')} className="p-4 rounded-xl border border-gray-100 bg-white hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group">
                         <div className="flex justify-between items-start mb-3">
                             <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold">10:00 - 11:00</div>
                             <Video size={16} className="text-gray-300 group-hover:text-blue-500" />
                         </div>
                         <h4 className="font-bold text-slate-800 mb-1 group-hover:text-blue-600">주간 업무 보고</h4>
                         <p className="text-xs text-slate-500">참여자: 김태호, 연승민 외 3명</p>
                         <div className="mt-3 pt-3 border-t border-gray-50 flex justify-end">
                             <span className="text-xs font-bold text-blue-600 group-hover:underline">참여하기 &gt;</span>
                         </div>
                     </div>

                     <div onClick={() => setActiveModal('join')} className="p-4 rounded-xl border border-gray-100 bg-white hover:shadow-md hover:border-purple-200 transition-all cursor-pointer group">
                         <div className="flex justify-between items-start mb-3">
                             <div className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs font-bold">14:00 - 15:30</div>
                             <Video size={16} className="text-gray-300 group-hover:text-purple-500" />
                         </div>
                         <h4 className="font-bold text-slate-800 mb-1 group-hover:text-purple-600">디자인 리뷰 미팅</h4>
                         <p className="text-xs text-slate-500">참여자: 디자인팀 전원</p>
                         <div className="mt-3 pt-3 border-t border-gray-50 flex justify-end">
                             <span className="text-xs font-bold text-purple-600 group-hover:underline">참여하기 &gt;</span>
                         </div>
                     </div>

                     <div onClick={() => setActiveModal('join')} className="p-4 rounded-xl border border-gray-100 bg-white hover:shadow-md hover:border-orange-200 transition-all cursor-pointer group">
                         <div className="flex justify-between items-start mb-3">
                             <div className="bg-orange-50 text-orange-700 px-2 py-1 rounded text-xs font-bold">16:00 - 17:00</div>
                             <Mic size={16} className="text-gray-300 group-hover:text-orange-500" />
                         </div>
                         <h4 className="font-bold text-slate-800 mb-1 group-hover:text-orange-600">타운홀 미팅 (Audio Only)</h4>
                         <p className="text-xs text-slate-500">참여자: 전사 임직원</p>
                         <div className="mt-3 pt-3 border-t border-gray-50 flex justify-end">
                             <span className="text-xs font-bold text-orange-600 group-hover:underline">청취하기 &gt;</span>
                         </div>
                     </div>
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
                     <button className="text-sm font-medium text-slate-500 hover:text-slate-800">전체 일정 보기</button>
                </div>
           </div>
       </div>

       {/* Schedule Modal */}
       {activeModal === 'schedule' && (
           <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4">
               <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in-up overflow-hidden">
                   <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-blue-600 text-white">
                       <h3 className="font-bold text-lg flex items-center gap-2"><Calendar size={20} /> 새 회의 예약</h3>
                       <button onClick={closeModal} className="hover:bg-white/20 rounded-full p-1 transition-colors"><X size={20} /></button>
                   </div>
                   <div className="p-8 space-y-6">
                       <div>
                           <label className="block text-xs font-bold text-slate-500 uppercase mb-2">회의 제목</label>
                           <input type="text" placeholder="회의 제목을 입력하세요" className="w-full text-lg font-bold border-b border-gray-200 py-2 focus:border-blue-600 outline-none transition-colors" />
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                           <div>
                               <label className="block text-xs font-bold text-slate-500 uppercase mb-2">시작 시간</label>
                               <input type="datetime-local" className="w-full bg-gray-50 rounded-lg px-3 py-2 text-sm outline-none border border-gray-200 focus:ring-2 focus:ring-blue-500" />
                           </div>
                           <div>
                               <label className="block text-xs font-bold text-slate-500 uppercase mb-2">종료 시간</label>
                               <input type="datetime-local" className="w-full bg-gray-50 rounded-lg px-3 py-2 text-sm outline-none border border-gray-200 focus:ring-2 focus:ring-blue-500" />
                           </div>
                       </div>
                       <div>
                           <label className="block text-xs font-bold text-slate-500 uppercase mb-2">참석자 초대</label>
                           <div className="relative">
                               <Users className="absolute left-3 top-2.5 text-slate-400" size={16} />
                               <input type="text" placeholder="이메일 또는 이름으로 초대" className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                           </div>
                       </div>
                   </div>
                   <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                       <button onClick={closeModal} className="px-5 py-2.5 font-bold text-slate-500 hover:bg-gray-200 rounded-xl transition-colors">취소</button>
                       <button onClick={() => { alert('회의가 예약되었습니다.'); closeModal(); }} className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg transition-all transform hover:-translate-y-0.5">예약 완료</button>
                   </div>
               </div>
           </div>
       )}

       {/* Instant Meeting Modal */}
       {activeModal === 'instant' && (
           <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4">
               <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in-up overflow-hidden text-center p-10">
                   <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                       <Video size={40} className="text-blue-600" />
                   </div>
                   <h3 className="text-2xl font-bold text-slate-900 mb-2">즉시 회의 시작</h3>
                   <p className="text-slate-500 mb-8">새로운 회의실을 생성하고 있습니다...</p>
                   
                   <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-8 flex items-center justify-between">
                       <span className="text-sm font-bold text-slate-700">b2b.meet/x9z-2k3-p1o</span>
                       <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"><Link size={16} /></button>
                   </div>

                   <div className="flex flex-col gap-3">
                       <button onClick={() => { closeModal(); }} className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-md transition-all">회의실 입장</button>
                       <button onClick={closeModal} className="w-full py-3 text-slate-500 font-bold hover:bg-gray-100 rounded-xl transition-colors">취소</button>
                   </div>
               </div>
           </div>
       )}

        {/* Join Meeting Modal */}
        {activeModal === 'join' && (
           <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4">
               <div className="bg-slate-900 rounded-2xl shadow-2xl w-full max-w-3xl h-[500px] animate-fade-in-up overflow-hidden flex relative">
                   <div className="flex-1 bg-black relative">
                       {/* Camera Preview Mock */}
                       <div className="absolute inset-0 flex items-center justify-center">
                           <div className="w-32 h-32 rounded-full bg-gray-800 flex items-center justify-center border-2 border-gray-700">
                               <span className="text-white font-bold text-2xl">김태호</span>
                           </div>
                       </div>
                       <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4">
                           <button className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-colors"><Mic size={20} /></button>
                           <button className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center transition-colors"><Video size={20} /></button>
                       </div>
                   </div>
                   <div className="w-80 bg-slate-800 p-8 flex flex-col justify-between">
                       <div>
                           <h3 className="text-white font-bold text-xl mb-2">주간 업무 보고</h3>
                           <p className="text-slate-400 text-sm flex items-center gap-2 mb-8"><Clock size={14} /> 10:00 - 11:00</p>
                           
                           <div className="space-y-4">
                               <div className="flex items-center gap-3 text-slate-300 text-sm">
                                   <div className="w-2 h-2 rounded-full bg-green-500"></div> 마이크 정상 작동
                               </div>
                               <div className="flex items-center gap-3 text-slate-300 text-sm">
                                   <div className="w-2 h-2 rounded-full bg-green-500"></div> 스피커 정상 작동
                               </div>
                           </div>
                       </div>
                       
                       <div className="space-y-3">
                           <button onClick={() => { alert('회의에 입장했습니다.'); closeModal(); }} className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 shadow-lg transition-all">지금 참여</button>
                           <button onClick={closeModal} className="w-full py-3 bg-slate-700 text-white font-bold rounded-xl hover:bg-slate-600 transition-all">취소</button>
                       </div>
                   </div>
               </div>
           </div>
       )}
    </div>
  );
};

export default MeetingView;