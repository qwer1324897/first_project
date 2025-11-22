
import React, { useState, useMemo } from 'react';
import { Search, Star, Paperclip, Inbox, Send, File, AlertCircle, Trash2, Mail, Plus, Filter, MoreVertical, RefreshCw, X, Reply, Forward, Archive, CornerUpLeft } from 'lucide-react';
import { MailItem } from '../types';

const mockMails: MailItem[] = [
  { id: 1, folder: 'inbox', sender: '김태호', senderEmail: 'th.kim@b2b.com', title: '4분기 프로젝트 회고 일정 조율', preview: '안녕하세요, 4분기 프로젝트 마무리를 위한 회고...', content: '안녕하세요,\n\n4분기 프로젝트 마무리를 위한 회고 미팅 일정을 잡고자 합니다.\n모두 가능한 시간을 공유해주시면 감사하겠습니다.\n\n감사합니다.\n김태호 드림', date: '11:30', isRead: false, tag: '업무', isImportant: true },
  { id: 2, folder: 'inbox', sender: '연승민', senderEmail: 'sm.yeon@b2b.com', title: '[요청] 디자인 리소스 전달', preview: '지난주 논의했던 메인 페이지 시안 리소스입니다...', content: '지난주 논의했던 메인 페이지 시안 리소스를 첨부하여 전달드립니다.\n확인 후 피드백 부탁드립니다.', date: '10:15', isRead: false, hasAttachment: true, isMentioned: true },
  { id: 3, folder: 'inbox', sender: '강동훈', senderEmail: 'dh.kang@b2b.com', title: '서버 점검 관련 공지사항 공유', preview: '이번 주말 예정된 정기 서버 점검 일정입니다...', content: '이번 주말 예정된 정기 서버 점검 일정 공유드립니다.\n서비스 중단 예상 시간은 일요일 새벽 2시부터 4시까지입니다.\n\n참고 부탁드립니다.', date: '09:00', isRead: true, tag: '공지' },
  { id: 4, folder: 'inbox', sender: '남여원', senderEmail: 'yw.nam@b2b.com', title: '마케팅 예산안 승인 요청', preview: '2025년 1분기 마케팅 예산안 결재 부탁드립니다.', content: '안녕하세요 팀장님,\n\n2025년 1분기 마케팅 집행 예산안을 작성하여 송부드립니다.\n검토 후 승인 부탁드립니다.', date: '어제', isRead: true, isVip: true },
  { id: 5, folder: 'spam', sender: 'Advertisement', senderEmail: 'ad@marketing.com', title: '(광고) 최저가 항공권 특가', preview: '지금 예매하시면 50% 할인 혜택을 드립니다.', content: '광고 내용입니다.', date: '어제', isRead: true },
  { id: 6, folder: 'sent', sender: '나 (김태호)', senderEmail: 'me@b2b.com', title: 'Re: 4분기 프로젝트 회고', preview: '네, 알겠습니다. 저는 수요일 오후가 좋습니다.', content: '네, 알겠습니다. 저는 수요일 오후가 좋습니다.\n일정 잡아주세요.', date: '11:45', isRead: true },
  { id: 7, folder: 'trash', sender: '시스템관리자', senderEmail: 'admin@b2b.com', title: '비밀번호 변경 알림 (삭제됨)', preview: '비밀번호 변경 주기가 도래했습니다.', content: '비밀번호를 변경해주세요.', date: '11-15', isRead: true },
  { id: 8, folder: 'draft', sender: '나 (김태호)', senderEmail: 'me@b2b.com', title: '제휴 제안서 초안', preview: '작성 중인 제안서입니다.', content: '', date: '11-14', isRead: true },
];

const MailView: React.FC = () => {
  const [currentFolder, setCurrentFolder] = useState<'inbox' | 'sent' | 'draft' | 'trash' | 'spam'>('inbox');
  const [selectedMail, setSelectedMail] = useState<MailItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  
  // Filtering logic
  const filteredMails = useMemo(() => {
    return mockMails.filter(mail => {
      // 1. Folder filter
      if (mail.folder !== currentFolder) return false;
      // 2. Search filter
      if (searchTerm && !mail.title.includes(searchTerm) && !mail.sender.includes(searchTerm)) return false;
      return true;
    });
  }, [currentFolder, searchTerm]);

  const unreadCount = mockMails.filter(m => m.folder === 'inbox' && !m.isRead).length;

  const handleFolderChange = (folder: typeof currentFolder) => {
      setCurrentFolder(folder);
      setSelectedMail(null);
  };

  return (
    <div className="flex h-[calc(100vh-140px)] bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 relative">
      
      {/* Sidebar Navigation */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col shrink-0">
        <div className="p-5">
          <button 
            onClick={() => setIsComposeOpen(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Plus size={20} strokeWidth={2.5} /> 메일 쓰기
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto px-3 space-y-1">
          <button onClick={() => handleFolderChange('inbox')} className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${currentFolder === 'inbox' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:bg-gray-200'}`}>
            <div className="flex items-center gap-3"><Inbox size={18} /> 받은 메일함</div>
            {unreadCount > 0 && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow-sm">{unreadCount}</span>}
          </button>
          <button onClick={() => handleFolderChange('sent')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${currentFolder === 'sent' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:bg-gray-200'}`}>
             <Send size={18} /> 보낸 메일함
          </button>
          <button onClick={() => handleFolderChange('draft')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${currentFolder === 'draft' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:bg-gray-200'}`}>
             <File size={18} /> 임시 보관함
          </button>
          <button onClick={() => handleFolderChange('spam')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${currentFolder === 'spam' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:bg-gray-200'}`}>
             <AlertCircle size={18} /> 스팸 메일함
          </button>
          <button onClick={() => handleFolderChange('trash')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${currentFolder === 'trash' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:bg-gray-200'}`}>
             <Trash2 size={18} /> 휴지통
          </button>

          <div className="pt-8 pb-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
             Tags <div className="h-px bg-gray-200 flex-1"></div>
          </div>
          {['업무', '공지', '프로젝트', '개인'].map(tag => (
             <button key={tag} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-gray-200 transition-colors">
                <span className="w-2.5 h-2.5 rounded-md bg-slate-300"></span> {tag}
             </button>
          ))}
        </nav>
      </div>

      {/* Mail List */}
      <div className={`flex flex-col min-w-0 border-r border-gray-200 bg-white transition-all duration-300 ${selectedMail ? 'w-[400px] hidden xl:flex xl:flex-none' : 'w-full'}`}>
         {/* List Header */}
         <div className="h-16 border-b border-gray-200 flex items-center justify-between px-5 bg-white shrink-0 sticky top-0 z-10">
             <div className="flex items-center gap-3">
                 <h2 className="font-bold text-lg text-slate-800 capitalize">
                    {currentFolder === 'inbox' ? '받은 메일함' : 
                     currentFolder === 'sent' ? '보낸 메일함' :
                     currentFolder === 'draft' ? '임시 보관함' :
                     currentFolder === 'spam' ? '스팸 메일함' : '휴지통'}
                 </h2>
                 <span className="text-slate-400 text-sm font-medium bg-gray-100 px-2 py-0.5 rounded-full">{filteredMails.length}</span>
             </div>
             <div className="flex items-center gap-2">
                 <div className="relative group">
                     <Search className="absolute left-3 top-2.5 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                     <input 
                        type="text" 
                        placeholder="메일 검색" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-4 py-2 bg-gray-50 border border-transparent focus:bg-white rounded-lg text-sm focus:ring-2 focus:ring-blue-500 w-48 transition-all" 
                     />
                 </div>
                 <button className="p-2 text-slate-500 hover:bg-gray-100 rounded-lg"><Filter size={18} /></button>
                 <button className="p-2 text-slate-500 hover:bg-gray-100 rounded-lg"><RefreshCw size={18} /></button>
             </div>
         </div>

         {/* List Content */}
         <div className="flex-1 overflow-y-auto">
             {filteredMails.length > 0 ? (
                 filteredMails.map((mail) => (
                     <div 
                        key={mail.id}
                        onClick={() => setSelectedMail(mail)}
                        className={`p-4 border-b border-gray-50 cursor-pointer hover:bg-blue-50/40 transition-colors group relative
                            ${selectedMail?.id === mail.id ? 'bg-blue-50 border-l-4 border-l-blue-600 pl-[12px]' : 'border-l-4 border-l-transparent pl-[12px]'}
                            ${!mail.isRead ? 'bg-slate-50/50' : ''}
                        `}
                     >
                         <div className="flex justify-between items-start mb-1.5">
                             <div className="flex items-center gap-2 min-w-0">
                                 {mail.isImportant && <AlertCircle size={14} className="text-red-500 fill-red-50 shrink-0" />}
                                 <span className={`text-sm truncate ${!mail.isRead ? 'font-bold text-slate-900' : 'text-slate-600'}`}>{mail.sender}</span>
                                 {mail.tag && <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded font-medium border border-gray-200 shrink-0">{mail.tag}</span>}
                             </div>
                             <span className="text-xs text-slate-400 whitespace-nowrap ml-2 font-medium">{mail.date}</span>
                         </div>
                         <h4 className={`text-sm mb-1 truncate pr-8 ${!mail.isRead ? 'font-bold text-slate-900' : 'text-slate-700'}`}>{mail.title}</h4>
                         <p className="text-xs text-slate-500 truncate">{mail.preview}</p>
                         
                         {/* Icons Row */}
                         <div className="flex gap-2 mt-2.5">
                             {mail.hasAttachment && <span className="flex items-center gap-1 text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-500"><Paperclip size={10} /> 첨부</span>}
                             {mail.isVip && <span className="flex items-center gap-1 text-[10px] bg-yellow-50 px-2 py-0.5 rounded text-yellow-600 border border-yellow-100"><Star size={10} fill="currentColor" /> VIP</span>}
                         </div>

                         {/* Hover Actions */}
                         <div className="absolute right-4 bottom-4 hidden group-hover:flex gap-1 bg-white shadow-sm border border-gray-100 rounded-lg p-0.5">
                             <button className="p-1.5 hover:bg-gray-100 rounded text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
                             <button className="p-1.5 hover:bg-gray-100 rounded text-slate-400 hover:text-blue-500"><Mail size={14} /></button>
                             <button className="p-1.5 hover:bg-gray-100 rounded text-slate-400 hover:text-yellow-500"><Star size={14} /></button>
                         </div>
                     </div>
                 ))
             ) : (
                 <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                     <Inbox size={48} className="mb-4 opacity-20" />
                     <p>메일이 없습니다.</p>
                 </div>
             )}
         </div>
      </div>

      {/* Detail View */}
      <div className={`flex-[1.5] bg-gray-50 flex flex-col ${selectedMail ? 'flex' : 'hidden xl:flex'}`}>
         {selectedMail ? (
             <div className="flex-col h-full bg-white flex animate-fade-in relative z-0">
                 {/* Detail Header */}
                 <div className="px-8 py-6 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-10">
                     <div className="flex justify-between items-start mb-6">
                         <div className="flex gap-2">
                             <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-slate-600 transition-colors" title="답장"><Reply size={18} /></button>
                             <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-slate-600 transition-colors" title="전체 답장"><CornerUpLeft size={18} /></button>
                             <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-slate-600 transition-colors" title="전달"><Forward size={18} /></button>
                         </div>
                         <div className="flex gap-2">
                             <button className="p-2 hover:bg-gray-100 rounded text-slate-500" title="보관"><Archive size={18} /></button>
                             <button className="p-2 hover:bg-gray-100 rounded text-slate-500" title="삭제"><Trash2 size={18} /></button>
                             <button className="p-2 hover:bg-gray-100 rounded text-slate-500"><MoreVertical size={18} /></button>
                         </div>
                     </div>

                     <h1 className="text-2xl font-bold text-slate-900 leading-tight mb-6">{selectedMail.title}</h1>

                     <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm border-2 border-white ring-1 ring-gray-100">
                             {selectedMail.sender[0]}
                         </div>
                         <div className="flex-1">
                             <div className="flex items-baseline gap-2">
                                 <span className="font-bold text-slate-900 text-base">{selectedMail.sender}</span>
                                 <span className="text-slate-400 text-sm">&lt;{selectedMail.senderEmail}&gt;</span>
                             </div>
                             <div className="flex justify-between items-center mt-0.5">
                                 <span className="text-xs text-slate-500">받는사람: 나 (김태호)</span>
                                 <span className="text-xs text-slate-400 font-medium">{selectedMail.date}</span>
                             </div>
                         </div>
                     </div>
                 </div>

                 {/* Detail Body */}
                 <div className="p-8 flex-1 overflow-y-auto">
                     <div className="text-slate-800 leading-relaxed whitespace-pre-wrap text-base font-normal">
                        {selectedMail.content}
                     </div>
                     
                     {selectedMail.hasAttachment && (
                         <div className="mt-10 pt-6 border-t border-gray-100">
                             <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                 <Paperclip size={14} /> 첨부파일 (1)
                             </h5>
                             <div className="flex items-center p-3 border border-gray-200 rounded-xl bg-gray-50 w-full max-w-sm cursor-pointer hover:border-blue-300 hover:bg-blue-50/50 transition-all group">
                                 <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center text-red-500 shadow-sm group-hover:scale-110 transition-transform">
                                    <File size={20} />
                                 </div>
                                 <div className="ml-3 flex-1">
                                     <p className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors">Project_Report_vFinal.pdf</p>
                                     <p className="text-xs text-slate-500">2.4 MB</p>
                                 </div>
                             </div>
                         </div>
                     )}
                 </div>

                 {/* Quick Reply Box */}
                 <div className="p-6 border-t border-gray-200 bg-gray-50/50">
                     <div className="flex gap-4 items-start">
                         <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold">나</div>
                         <div className="flex-1 relative">
                             <textarea 
                                placeholder="빠른 답장 작성..." 
                                className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none h-20 shadow-sm"
                             ></textarea>
                             <button className="absolute bottom-2 right-2 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                                <Send size={14} />
                             </button>
                         </div>
                     </div>
                 </div>
             </div>
         ) : (
             <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50/50">
                 <div className="text-center">
                     <div className="w-24 h-24 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-6 border border-gray-100">
                         <Mail size={48} className="text-blue-200" />
                     </div>
                     <h3 className="text-xl font-bold text-slate-700 mb-2">메일을 선택하세요</h3>
                     <p className="text-slate-500 text-sm">왼쪽 목록에서 메일을 클릭하여 내용을 확인하세요.</p>
                 </div>
             </div>
         )}
      </div>

      {/* Compose Modal */}
      {isComposeOpen && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in p-10">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden animate-fade-in-up">
                  <div className="bg-slate-900 px-6 py-4 flex justify-between items-center shrink-0">
                      <span className="text-white font-bold flex items-center gap-2"><Send size={18} /> 새 메일 작성</span>
                      <button onClick={() => setIsComposeOpen(false)} className="text-slate-400 hover:text-white transition-colors"><X size={20} /></button>
                  </div>
                  <div className="flex-1 flex flex-col overflow-hidden">
                      <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-4">
                          <span className="text-sm font-bold text-slate-500 w-16">받는 사람</span>
                          <input type="text" className="flex-1 outline-none text-slate-800 font-medium" placeholder="이메일 주소 입력" autoFocus />
                      </div>
                      <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-4">
                          <span className="text-sm font-bold text-slate-500 w-16">참조</span>
                          <input type="text" className="flex-1 outline-none text-slate-800 font-medium" placeholder="참조 (선택)" />
                      </div>
                      <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-4">
                          <span className="text-sm font-bold text-slate-500 w-16">제목</span>
                          <input type="text" className="flex-1 outline-none text-slate-800 font-bold text-lg" placeholder="제목을 입력하세요" />
                      </div>
                      <textarea className="flex-1 p-6 outline-none text-slate-700 resize-none text-base leading-relaxed" placeholder="내용을 작성하세요..."></textarea>
                  </div>
                  <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center shrink-0">
                      <div className="flex gap-2">
                          <button className="p-2 hover:bg-gray-200 rounded text-slate-500"><Paperclip size={20} /></button>
                          <button className="p-2 hover:bg-gray-200 rounded text-slate-500"><File size={20} /></button>
                      </div>
                      <div className="flex gap-3">
                          <button onClick={() => setIsComposeOpen(false)} className="px-6 py-2.5 text-slate-600 font-bold hover:bg-gray-200 rounded-xl transition-colors">취소</button>
                          <button onClick={() => { setIsComposeOpen(false); alert('메일이 전송되었습니다.'); }} className="px-8 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2">
                              보내기 <Send size={16} />
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};

export default MailView;
