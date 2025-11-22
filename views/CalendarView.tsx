import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Settings, Search, Plus, X, Clock, MapPin, AlignLeft, Calendar as CalendarIcon } from 'lucide-react';
import { CalendarEvent } from '../types';

const CalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 22)); 
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  useEffect(() => {
    setEvents([
      { id: 101, title: '3분기 성과 리뷰', startDate: new Date(2025, 9, 15, 14, 0), endDate: new Date(2025, 9, 15, 16, 0), type: 'company', color: 'bg-blue-100 text-blue-700 border-l-4 border-blue-600' },
      { id: 102, title: '팀 워크샵', startDate: new Date(2025, 9, 20), endDate: new Date(2025, 9, 21), type: 'team', color: 'bg-green-100 text-green-700 border-l-4 border-green-600' },
      { id: 1, title: '주간 업무 보고', startDate: new Date(2025, 10, 22, 10, 0), endDate: new Date(2025, 10, 22, 11, 30), type: 'team', color: 'bg-blue-100 text-blue-700 border-l-4 border-blue-600' },
      { id: 2, title: '프로젝트 킥오프', startDate: new Date(2025, 10, 22, 14, 0), endDate: new Date(2025, 10, 22, 15, 0), type: 'company', color: 'bg-purple-100 text-purple-700 border-l-4 border-purple-600' },
      { id: 3, title: '디자인 시안 리뷰', startDate: new Date(2025, 10, 24, 13, 0), endDate: new Date(2025, 10, 24, 14, 0), type: 'team', color: 'bg-orange-100 text-orange-700 border-l-4 border-orange-600' },
      { id: 4, title: '연차 (남여원)', startDate: new Date(2025, 10, 25), endDate: new Date(2025, 10, 25), type: 'personal', color: 'bg-gray-100 text-gray-700' },
      { id: 5, title: '전사 타운홀 미팅', startDate: new Date(2025, 10, 28, 9, 0), endDate: new Date(2025, 10, 28, 10, 30), type: 'company', color: 'bg-red-100 text-red-700 border-l-4 border-red-600' },
      { id: 6, title: '개발 스프린트 미팅', startDate: new Date(2025, 10, 26, 10, 0), endDate: new Date(2025, 10, 26, 12, 0), type: 'team', color: 'bg-green-100 text-green-700 border-l-4 border-green-600' },
      { id: 7, title: '마케팅 전략 회의', startDate: new Date(2025, 11, 1, 14, 0), endDate: new Date(2025, 11, 1, 16, 0), type: 'team', color: 'bg-blue-100 text-blue-700 border-l-4 border-blue-600' },
      { id: 8, title: '연말 회식', startDate: new Date(2025, 11, 5, 18, 0), endDate: new Date(2025, 11, 5, 21, 0), type: 'team', color: 'bg-indigo-100 text-indigo-700 border-l-4 border-indigo-600' },
      { id: 9, title: '종무식', startDate: new Date(2025, 11, 31, 10, 0), endDate: new Date(2025, 11, 31, 12, 0), type: 'company', color: 'bg-red-100 text-red-700 border-l-4 border-red-600' },
      { id: 10, title: '서비스 정기 점검', startDate: new Date(2025, 11, 15), endDate: new Date(2025, 11, 15), type: 'company', color: 'bg-gray-200 text-slate-700' },
    ]);
  }, []);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const daysInPrevMonth = getDaysInMonth(year, month - 1);

    const days = [];
    
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: daysInPrevMonth - i, currentMonth: false, date: new Date(year, month - 1, daysInPrevMonth - i) });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, currentMonth: true, date: new Date(year, month, i) });
    }
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push({ day: i, currentMonth: false, date: new Date(year, month + 1, i) });
    }
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleDateClick = (date: Date) => {
    setCurrentDate(date);
  };

  const calendarDays = generateCalendarDays();
  const year = currentDate.getFullYear();
  const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
  const currentMonthName = monthNames[currentDate.getMonth()];

  return (
    <div className="flex h-[calc(100vh-140px)] bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 relative">
      
      <div className="w-72 bg-gray-50 border-r border-gray-200 p-6 hidden md:flex flex-col">
        <button 
            onClick={() => setShowAddModal(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-sm transition-colors mb-8 flex items-center justify-center gap-2 transform active:scale-95 duration-150"
        >
            <Plus size={18} /> 일정 등록
        </button>

        <div className="mb-8">
             <div className="flex justify-between items-center mb-4">
                 <span className="font-bold text-lg text-slate-800">{year}년 {currentMonthName}</span>
                 <div className="flex gap-1">
                    <button onClick={() => navigateMonth('prev')} className="p-1 hover:bg-gray-200 rounded text-slate-500"><ChevronLeft size={16} /></button>
                    <button onClick={() => navigateMonth('next')} className="p-1 hover:bg-gray-200 rounded text-slate-500"><ChevronRight size={16} /></button>
                 </div>
             </div>
             <div className="grid grid-cols-7 text-center text-xs font-medium text-slate-400 mb-2">
                <div>일</div><div>월</div><div>화</div><div>수</div><div>목</div><div>금</div><div>토</div>
             </div>
             <div className="grid grid-cols-7 text-center gap-y-3">
                {calendarDays.slice(0, 35).map((d, i) => {
                    const isSelected = d.date.getDate() === currentDate.getDate() && d.date.getMonth() === currentDate.getMonth();
                    return (
                        <div 
                            key={i} 
                            onClick={() => handleDateClick(d.date)}
                            className={`text-sm w-8 h-8 flex items-center justify-center rounded-full mx-auto cursor-pointer transition-all
                            ${!d.currentMonth ? 'text-gray-300' : 'text-slate-700 hover:bg-blue-100'}
                            ${isSelected ? 'bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-md' : ''}
                        `}>
                            {d.day}
                        </div>
                    );
                })}
             </div>
        </div>

        <div className="space-y-4">
            <h4 className="font-bold text-slate-700 text-sm">내 캘린더</h4>
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer hover:bg-gray-100 p-2 rounded">
                    <input type="checkbox" checked readOnly className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    기본 캘린더
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer hover:bg-gray-100 p-2 rounded">
                    <input type="checkbox" checked readOnly className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                    프로젝트 일정
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer hover:bg-gray-100 p-2 rounded">
                    <input type="checkbox" checked readOnly className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    팀 휴가 공유
                </div>
            </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-white">
         <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6">
             <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-slate-800">{year}년 {currentMonthName}</h2>
                <div className="flex gap-2">
                    <button onClick={() => navigateMonth('prev')} className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-slate-500"><ChevronLeft size={18} /></button>
                    <button onClick={() => { setCurrentDate(new Date()) }} className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-bold hover:bg-gray-50 text-slate-600">오늘</button>
                    <button onClick={() => navigateMonth('next')} className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-slate-500"><ChevronRight size={18} /></button>
                </div>
             </div>
             
             <div className="flex items-center gap-3">
                 <div className="hidden md:flex bg-gray-100 p-1 rounded-lg">
                     <button className="px-3 py-1 bg-white shadow-sm rounded-md text-sm font-bold text-slate-800">월간</button>
                     <button className="px-3 py-1 text-sm font-medium text-slate-500 hover:text-slate-800">주간</button>
                     <button className="px-3 py-1 text-sm font-medium text-slate-500 hover:text-slate-800">일간</button>
                     <button className="px-3 py-1 text-sm font-medium text-slate-500 hover:text-slate-800">목록</button>
                 </div>
                 <div className="relative">
                    <input type="text" placeholder="일정 검색" className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-48" />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                 </div>
                 <button className="p-2 text-slate-500 hover:bg-gray-100 rounded-lg"><Settings size={20} /></button>
             </div>
         </div>

         <div className="grid grid-cols-7 border-b border-gray-200">
            {['일', '월', '화', '수', '목', '금', '토'].map((day, i) => (
                <div key={day} className={`py-3 text-center text-sm font-bold ${i === 0 ? 'text-red-500' : i === 6 ? 'text-blue-500' : 'text-slate-600'}`}>
                    {day}
                </div>
            ))}
         </div>

         <div className="flex-1 grid grid-cols-7 grid-rows-6 overflow-hidden">
            {calendarDays.map((dateObj, idx) => {
                const dayEvents = events.filter(e => 
                    e.startDate.getDate() === dateObj.date.getDate() && 
                    e.startDate.getMonth() === dateObj.date.getMonth() &&
                    e.startDate.getFullYear() === dateObj.date.getFullYear()
                );

                const isToday = dateObj.date.getDate() === new Date().getDate() && dateObj.date.getMonth() === new Date().getMonth() && dateObj.date.getFullYear() === new Date().getFullYear();

                return (
                    <div 
                        key={idx} 
                        className={`border-b border-r border-gray-100 p-1 relative hover:bg-gray-50/50 transition-colors min-h-[100px] flex flex-col gap-1 overflow-hidden
                            ${!dateObj.currentMonth ? 'bg-gray-50/30' : ''}
                        `}
                    >
                        <span className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ml-1 mt-1
                            ${!dateObj.currentMonth ? 'text-gray-300' : (idx % 7 === 0 ? 'text-red-500' : idx % 7 === 6 ? 'text-blue-500' : 'text-slate-700')}
                            ${isToday ? 'bg-blue-600 text-white shadow-md' : ''}
                        `}>
                            {dateObj.day}
                        </span>

                        <div className="flex-1 flex flex-col gap-1 overflow-y-auto no-scrollbar">
                            {dayEvents.map(evt => (
                                <div 
                                    key={evt.id} 
                                    onClick={(e) => { e.stopPropagation(); setSelectedEvent(evt); }}
                                    className={`text-[11px] px-1.5 py-0.5 rounded truncate cursor-pointer shadow-sm hover:shadow-md transition-all hover:scale-[1.02] ${evt.color}`}
                                >
                                    {evt.type !== 'personal' && <span className="font-bold mr-1">{evt.startDate.getHours()}:00</span>}
                                    {evt.title}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
         </div>
      </div>

      {showAddModal && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
              <div className="bg-white rounded-2xl shadow-2xl w-[500px] overflow-hidden transform transition-all scale-100">
                  <div className="h-14 bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-between px-6">
                      <h3 className="text-white font-bold">새 일정 등록</h3>
                      <button onClick={() => setShowAddModal(false)} className="text-white/80 hover:text-white"><X size={20} /></button>
                  </div>
                  <div className="p-8 space-y-6">
                      <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase">제목</label>
                          <input type="text" placeholder="일정 제목을 입력하세요" className="w-full border-b-2 border-gray-200 focus:border-blue-600 py-2 text-lg font-bold outline-none bg-transparent" />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-500 uppercase">시작 일시</label>
                              <div className="relative">
                                  <CalendarIcon className="absolute left-0 top-2.5 text-slate-400" size={16} />
                                  <input type="datetime-local" className="w-full pl-6 py-2 border-b border-gray-200 outline-none font-medium text-slate-700" />
                              </div>
                          </div>
                          <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-500 uppercase">종료 일시</label>
                              <div className="relative">
                                  <CalendarIcon className="absolute left-0 top-2.5 text-slate-400" size={16} />
                                  <input type="datetime-local" className="w-full pl-6 py-2 border-b border-gray-200 outline-none font-medium text-slate-700" />
                              </div>
                          </div>
                      </div>
                      <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase">장소</label>
                          <div className="relative">
                               <MapPin className="absolute left-0 top-2.5 text-slate-400" size={16} />
                               <input type="text" placeholder="위치 정보 없음" className="w-full pl-6 py-2 border-b border-gray-200 outline-none font-medium text-slate-700" />
                          </div>
                      </div>
                      <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase">설명</label>
                          <textarea className="w-full bg-gray-50 rounded-lg p-3 text-sm outline-none border border-gray-200 focus:border-blue-400 h-24 resize-none" placeholder="상세 내용을 입력하세요..."></textarea>
                      </div>
                  </div>
                  <div className="p-6 bg-gray-50 flex justify-end gap-3">
                      <button onClick={() => setShowAddModal(false)} className="px-5 py-2.5 text-slate-500 font-bold hover:bg-gray-200 rounded-lg transition-colors">취소</button>
                      <button onClick={() => { setShowAddModal(false); alert('일정이 등록되었습니다.'); }} className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-sm transition-colors">저장</button>
                  </div>
              </div>
          </div>
      )}

      {selectedEvent && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
              <div className="bg-white rounded-2xl shadow-2xl w-[400px] overflow-hidden">
                  <div className={`h-32 p-6 flex flex-col justify-between text-slate-800 relative overflow-hidden ${selectedEvent.color.split(' ')[0]}`}>
                      <div className="flex justify-between items-start z-10">
                          <span className="px-2 py-1 bg-white/50 backdrop-blur-sm rounded text-xs font-bold uppercase">{selectedEvent.type}</span>
                          <div className="flex gap-2">
                              <button className="p-1 hover:bg-black/10 rounded"><Settings size={16} /></button>
                              <button onClick={() => setSelectedEvent(null)} className="p-1 hover:bg-black/10 rounded"><X size={18} /></button>
                          </div>
                      </div>
                      <h2 className="text-2xl font-bold z-10 leading-tight">{selectedEvent.title}</h2>
                  </div>
                  <div className="p-6 space-y-6">
                      <div className="flex items-start gap-4">
                          <Clock className="text-slate-400 mt-1" size={20} />
                          <div>
                              <p className="font-bold text-slate-800">
                                  {selectedEvent.startDate.toLocaleDateString()}
                              </p>
                              <p className="text-sm text-slate-500">
                                  {selectedEvent.startDate.getHours()}:00 - {selectedEvent.endDate.getHours()}:00
                              </p>
                          </div>
                      </div>
                      <div className="flex items-start gap-4">
                          <AlignLeft className="text-slate-400 mt-1" size={20} />
                          <p className="text-sm text-slate-600 leading-relaxed">
                              이 일정에 대한 상세 설명이 여기에 표시됩니다. 관련 문서나 메모를 추가할 수 있습니다.
                          </p>
                      </div>
                  </div>
                  <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-3">
                      <button className="flex-1 py-2 border border-gray-300 rounded-lg font-bold text-slate-600 hover:bg-gray-100 transition-colors">수정</button>
                      <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">참여하기</button>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};

export default CalendarView;