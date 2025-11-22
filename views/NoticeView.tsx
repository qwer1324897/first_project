import React, { useState } from 'react';
import { Search, Home, ChevronLeft, ChevronRight, Bell } from 'lucide-react';
import { NoticeItem } from '../types';

const mockNotices: NoticeItem[] = [
  { id: 1, title: '[중요] 4분기 전사 보안 점검 시행 안내', author: '김태호', date: '2025.11.22', views: 245, isImportant: true, content: '4분기 전사 보안 점검을 아래와 같이 시행하오니 임직원 여러분의 적극적인 협조 부탁드립니다.\n\n1. 기간: 11월 25일 ~ 11월 29일\n2. 대상: 전 임직원 PC 및 노트북\n3. 방법: 보안 프로그램 실행 후 자동 점검' },
  { id: 2, title: '[공지] 연말정산 시스템 오픈 일정', author: '연승민', date: '2025.11.21', views: 189, isImportant: true, content: '2024년 귀속 연말정산 일정을 안내드립니다.' },
  { id: 3, title: '사내 카페테리아 신메뉴 출시 이벤트', author: '강동훈', date: '2025.11.20', views: 312, content: '겨울 시즌을 맞아 따뜻한 신메뉴가 출시되었습니다.' },
  { id: 4, title: '2025년 다이어리/캘린더 배부 안내', author: '남여원', date: '2025.11.19', views: 405, content: '2025년 업무용 다이어리와 캘린더를 각 층 로비에서 배부합니다.' },
  { id: 5, title: '시스템 정기 점검 공지 (11/24)', author: '김태호', date: '2025.11.18', views: 156, content: '안정적인 서비스 제공을 위한 정기 점검이 진행됩니다.' },
  { id: 6, title: '동호회 신규 회원 모집: 테니스부', author: '연승민', date: '2025.11.17', views: 88, content: '건강과 친목을 도모할 테니스부 신규 회원을 모집합니다.' },
  { id: 7, title: '사내 주차장 이용 수칙 변경 안내', author: '강동훈', date: '2025.11.16', views: 201, content: '원활한 주차장 이용을 위해 일부 수칙이 변경되었습니다.' },
  { id: 8, title: '임직원 건강검진 미수검자 확인 요청', author: '남여원', date: '2025.11.15', views: 95, content: '아직 건강검진을 받지 않으신 분들은 12월 말까지 완료 부탁드립니다.' },
];

const NoticeView: React.FC = () => {
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);

  return (
    <div className="flex h-[calc(100vh-140px)] gap-6">
        <div className={`flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 ${selectedNotice ? 'w-1/2' : 'w-full'}`}>
             <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/30 sticky top-0 z-10 backdrop-blur-sm">
                 <div>
                     <div className="flex items-center text-xs text-slate-500 mb-2 font-medium">
                        <Home size={12} className="mr-1" /> 홈 &gt; 게시판 &gt; 공지사항
                     </div>
                     <h2 className="text-2xl font-bold text-slate-800">공지사항</h2>
                 </div>
                 <div className="relative group">
                     <input type="text" placeholder="제목 검색" className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm" />
                     <Search size={16} className="absolute left-3 top-3 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                 </div>
             </div>

             <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 content-start bg-gray-50/20">
                 {mockNotices.map(notice => (
                     <div 
                        key={notice.id} 
                        onClick={() => setSelectedNotice(notice)}
                        className={`p-6 border rounded-xl cursor-pointer transition-all flex flex-col justify-between h-48 bg-white group relative overflow-hidden
                            ${selectedNotice?.id === notice.id 
                                ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md' 
                                : 'border-gray-100 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1'
                            }
                        `}
                     >
                         {notice.isImportant && <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>}
                         
                         <div>
                             <div className="flex justify-between items-start mb-3">
                                 {notice.isImportant ? (
                                     <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-100 animate-pulse">중요</span>
                                 ) : (
                                     <span className="bg-gray-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-gray-200">일반</span>
                                 )}
                                 <span className="text-xs text-slate-400">{notice.date}</span>
                             </div>
                             <h3 className={`font-bold text-lg leading-snug transition-colors line-clamp-2 ${selectedNotice?.id === notice.id ? 'text-blue-700' : 'text-slate-800 group-hover:text-blue-600'}`}>
                                 {notice.title}
                             </h3>
                         </div>
                         <div className="flex justify-between items-center text-xs text-slate-500 border-t border-gray-50 pt-4 mt-2">
                             <span className="flex items-center gap-1 font-medium"><div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-[10px]">{notice.author[0]}</div> {notice.author}</span>
                             <span className="bg-gray-50 px-2 py-0.5 rounded text-slate-400">조회 {notice.views}</span>
                         </div>
                     </div>
                 ))}
             </div>
             
             <div className="p-4 border-t border-gray-100 flex justify-center items-center gap-2 bg-white">
                 <button className="p-2 hover:bg-gray-100 rounded text-slate-400 hover:text-slate-600 transition-colors"><ChevronLeft size={16} /></button>
                 <button className="w-8 h-8 bg-blue-600 text-white rounded font-bold text-sm shadow-md">1</button>
                 <button className="w-8 h-8 hover:bg-gray-100 rounded text-slate-600 text-sm transition-colors">2</button>
                 <button className="w-8 h-8 hover:bg-gray-100 rounded text-slate-600 text-sm transition-colors">3</button>
                 <button className="p-2 hover:bg-gray-100 rounded text-slate-400 hover:text-slate-600 transition-colors"><ChevronRight size={16} /></button>
             </div>
        </div>

        {selectedNotice && (
            <div className="w-[500px] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col animate-slide-in-right z-20">
                <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-blue-50/30 sticky top-0 backdrop-blur-sm">
                    <h2 className="text-xl font-bold text-slate-900 leading-snug pr-4">{selectedNotice.title}</h2>
                    <button onClick={() => setSelectedNotice(null)} className="text-slate-400 hover:text-slate-600 p-1 hover:bg-blue-100 rounded transition-colors">✕</button>
                </div>
                <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex justify-between text-sm text-slate-600">
                    <div className="flex items-center gap-2"><span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-700">{selectedNotice.author[0]}</span> <span className="font-bold text-slate-800">{selectedNotice.author}</span></div>
                    <div><span className="text-slate-400 mr-2">등록일</span> {selectedNotice.date}</div>
                </div>
                <div className="flex-1 p-8 overflow-y-auto">
                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap text-base font-normal">{selectedNotice.content}</p>
                </div>
                <div className="p-6 border-t border-gray-100 bg-gray-50/30">
                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:border-blue-300 transition-colors cursor-pointer">
                        <p className="text-xs font-bold text-slate-400 mb-2 uppercase flex items-center gap-2"><div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div> Attachment</p>
                        <div className="text-sm text-slate-500 italic flex items-center gap-2">
                             <Bell size={14} /> 첨부파일이 없습니다.
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default NoticeView;