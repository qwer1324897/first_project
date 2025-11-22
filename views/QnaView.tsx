import React, { useState } from 'react';
import { Search, Lock, MessageCircleQuestion, CheckCircle2 } from 'lucide-react';
import { QnaItem } from '../types';

const mockQna: QnaItem[] = [
  { id: 1, category: '시스템', type: '오류 신고', status: '답변완료', isSecret: true, title: '로그인 시 간헐적 오류 발생 문의', content: '오전에 로그인이 안되는 현상이 있습니다.', answer: '안녕하세요, 시스템 담당자입니다. 해당 시간대 서버 점검으로 인한 일시적 현상입니다.', author: '김태호', date: '2025-11-22' },
  { id: 2, category: '인사', type: '제도 문의', status: '처리중', isSecret: true, title: '연차 사용 규정 관련 문의', content: '반차 사용 시 시간 기준이 어떻게 되나요?', author: '연승민', date: '2025-11-21' },
  { id: 3, category: '총무', type: '비품 신청', status: '접수', isSecret: false, title: '모니터 받침대 신청합니다', content: '듀얼 모니터용 받침대 신청합니다.', author: '강동훈', date: '2025-11-21' },
  { id: 4, category: '시설', type: '수리 요청', status: '답변완료', isSecret: false, title: '3층 회의실 에어컨 점검 요청', content: '소음이 심합니다.', answer: '점검 접수되었습니다. 금일 오후 방문 예정입니다.', author: '남여원', date: '2025-11-20' },
  { id: 5, category: '보안', type: '권한 요청', status: '답변완료', isSecret: true, title: '외부망 접속 권한 신청', content: '프로젝트 수행을 위해 필요합니다.', answer: '보안 서약서 제출 확인 후 승인 처리되었습니다.', author: '김태호', date: '2025-11-19' },
];

const QnaView: React.FC = () => {
  const [selectedQna, setSelectedQna] = useState<QnaItem | null>(null);

  const getStatusStyle = (status: string) => {
      switch(status) {
          case '답변완료': return 'bg-blue-100 text-blue-700 border-blue-200';
          case '처리중': return 'bg-orange-100 text-orange-700 border-orange-200';
          default: return 'bg-gray-100 text-gray-700 border-gray-200';
      }
  };

  return (
    <div className="flex h-[calc(100vh-140px)] gap-6">
       
       <div className={`flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all ${selectedQna ? 'w-1/2' : 'w-full'}`}>
           <div className="p-8 border-b border-gray-100">
               <h2 className="text-2xl font-bold text-slate-800 mb-6">Q&A</h2>
               
               <div className="flex gap-4">
                   <div className="flex-1 relative">
                       <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                       <input type="text" placeholder="질문 검색" className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                   </div>
                   <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors whitespace-nowrap shadow-sm">
                       문의하기
                   </button>
               </div>
           </div>

           <div className="flex-1 overflow-y-auto">
               <table className="w-full text-sm text-left">
                   <thead className="bg-gray-50 text-slate-700 font-bold border-b border-gray-200">
                       <tr>
                           <th className="px-6 py-4 w-28 text-center">상태</th>
                           <th className="px-6 py-4 w-24 text-center">유형</th>
                           <th className="px-6 py-4">제목</th>
                           <th className="px-6 py-4 w-24 text-center">작성자</th>
                           <th className="px-6 py-4 w-28 text-center">날짜</th>
                       </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                       {mockQna.map(item => (
                           <tr 
                                key={item.id} 
                                onClick={() => setSelectedQna(item)}
                                className={`hover:bg-blue-50 cursor-pointer transition-colors ${selectedQna?.id === item.id ? 'bg-blue-50/50' : ''}`}
                            >
                               <td className="px-6 py-4 text-center">
                                   <span className={`text-xs px-2 py-1 rounded-full border font-bold whitespace-nowrap ${getStatusStyle(item.status)}`}>
                                       {item.status}
                                   </span>
                               </td>
                               <td className="px-6 py-4 text-center text-slate-500">{item.category}</td>
                               <td className="px-6 py-4">
                                   <div className="flex items-center gap-2 font-medium text-slate-800">
                                       {item.isSecret && <Lock size={14} className="text-slate-400" />}
                                       {item.title}
                                   </div>
                               </td>
                               <td className="px-6 py-4 text-center text-slate-600">{item.author}</td>
                               <td className="px-6 py-4 text-center text-slate-400">{item.date}</td>
                           </tr>
                       ))}
                   </tbody>
               </table>
           </div>
       </div>

       {selectedQna && (
           <div className="w-[500px] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col animate-fade-in z-10">
               <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-start">
                   <h3 className="text-lg font-bold text-slate-900 pr-8 leading-snug">{selectedQna.title}</h3>
                   <button onClick={() => setSelectedQna(null)} className="text-slate-400 hover:text-slate-600">✕</button>
               </div>
               
               <div className="flex-1 overflow-y-auto p-6 space-y-8">
                   <div className="flex gap-4">
                       <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                           <MessageCircleQuestion className="text-slate-500" size={20} />
                       </div>
                       <div className="flex-1">
                           <div className="flex items-baseline justify-between mb-2">
                               <span className="font-bold text-slate-800">{selectedQna.author}</span>
                               <span className="text-xs text-slate-400">{selectedQna.date}</span>
                           </div>
                           <div className="bg-slate-50 p-4 rounded-xl rounded-tl-none border border-slate-100 text-slate-700 leading-relaxed shadow-sm">
                               {selectedQna.content}
                           </div>
                       </div>
                   </div>

                   {selectedQna.answer ? (
                       <div className="flex gap-4">
                           <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 shadow-sm">
                               <CheckCircle2 className="text-blue-600" size={20} />
                           </div>
                           <div className="flex-1">
                               <div className="flex items-baseline justify-between mb-2">
                                   <span className="font-bold text-blue-700">관리자 답변</span>
                                   <span className="text-xs text-slate-400">{selectedQna.date}</span>
                               </div>
                               <div className="bg-blue-50 p-4 rounded-xl rounded-tl-none border border-blue-100 text-slate-800 leading-relaxed shadow-sm">
                                   {selectedQna.answer}
                               </div>
                           </div>
                       </div>
                   ) : (
                       <div className="text-center p-8 border-2 border-dashed border-gray-200 rounded-xl text-slate-400">
                           아직 등록된 답변이 없습니다.
                       </div>
                   )}
               </div>
           </div>
       )}

    </div>
  );
};

export default QnaView;