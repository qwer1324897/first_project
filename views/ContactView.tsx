import React, { useState } from 'react';
import { Search, User, Mail, Phone, Building2, Star, MoreHorizontal } from 'lucide-react';
import { ContactItem } from '../types';

const mockContacts: ContactItem[] = [
  { id: 1, name: '김태호', position: '책임', department: '디지털혁신팀', email: 'th.kim@b2b.com', phone: '010-1234-5678', company: 'Samsung SDS', group: '팀원', isVip: true },
  { id: 4, name: '남여원', position: '책임', department: '마케팅팀', email: 'yw.nam@b2b.com', phone: '010-4567-8901', company: 'Samsung SDS', group: '협력부서' },
  { id: 2, name: '연승민', position: '선임', department: '디지털혁신팀', email: 'sm.yeon@b2b.com', phone: '010-2345-6789', company: 'Samsung SDS', group: '팀원' },
  { id: 3, name: '강동훈', position: '수석', department: '클라우드운영팀', email: 'dh.kang@b2b.com', phone: '010-3456-7890', company: 'Samsung SDS', group: '협력부서', isVip: true },
  { id: 5, name: '이민규', position: '사원', department: '디지털혁신팀', email: 'ms.lee@b2b.com', phone: '010-5678-9012', company: 'Samsung SDS', group: '팀원' },
  { id: 6, name: '민진호', position: '팀장', department: '영업1팀', email: 'jh.min@b2b.com', phone: '010-6789-0123', company: 'Samsung SDS', group: '임원' },
];

const ContactView: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = mockContacts.filter(c => 
    c.name.includes(searchTerm) || c.department.includes(searchTerm)
  );

  return (
    <div className="flex h-[calc(100vh-140px)] bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
      
      <div className="w-96 border-r border-gray-200 flex flex-col bg-white">
          <div className="p-5 border-b border-gray-100 bg-gray-50/30">
              <h2 className="font-bold text-lg text-slate-800 mb-4">연락처</h2>
              <div className="relative group">
                   <Search className="absolute left-3 top-2.5 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                   <input 
                      type="text" 
                      placeholder="이름, 부서 검색" 
                      className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                      onChange={(e) => setSearchTerm(e.target.value)}
                   />
              </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
              <div className="px-5 py-2 text-xs font-bold text-slate-400 uppercase bg-gray-50/50 sticky top-0 backdrop-blur-sm z-10 border-b border-gray-100">전체 연락처 ({filteredContacts.length})</div>
              {filteredContacts.map(contact => (
                  <div 
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={`flex items-center gap-4 p-4 border-b border-gray-50 cursor-pointer transition-all hover:pl-5
                        ${selectedContact?.id === contact.id ? 'bg-blue-50/60 border-l-4 border-l-blue-600' : 'hover:bg-gray-50 border-l-4 border-l-transparent'}
                    `}
                  >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm
                          ${selectedContact?.id === contact.id ? 'bg-blue-200 text-blue-700' : 'bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600'}
                      `}>
                          {contact.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                          <h4 className={`font-bold text-sm truncate ${selectedContact?.id === contact.id ? 'text-blue-900' : 'text-slate-800'}`}>
                              {contact.name} <span className="text-slate-500 font-normal text-xs ml-1 bg-gray-100 px-1.5 py-0.5 rounded">{contact.position}</span>
                          </h4>
                          <p className="text-xs text-slate-500 truncate mt-0.5">{contact.department} | {contact.company}</p>
                      </div>
                      {contact.isVip && <Star size={14} className="text-yellow-400 fill-yellow-400 animate-pulse" />}
                  </div>
              ))}
          </div>
      </div>

      <div className="flex-1 bg-gray-50/50 flex items-center justify-center p-8 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl mix-blend-multiply filter opacity-50 pointer-events-none animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100/50 rounded-full blur-3xl mix-blend-multiply filter opacity-50 pointer-events-none"></div>

          {selectedContact ? (
              <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-fade-in border border-white/50 backdrop-blur-sm z-10 transform transition-all duration-500 hover:scale-[1.01]">
                  <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-700 relative p-6 flex flex-col items-center justify-center text-white overflow-hidden">
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                      <button className="absolute top-4 right-4 text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors"><MoreHorizontal /></button>
                      
                      <div className="relative group">
                          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/50 flex items-center justify-center mb-4 shadow-xl group-hover:scale-105 transition-transform">
                              <span className="text-3xl font-bold text-white">{selectedContact.name[0]}</span>
                          </div>
                          {selectedContact.isVip && <div className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 p-1.5 rounded-full shadow-md"><Star size={12} fill="currentColor" /></div>}
                      </div>
                      
                      <h2 className="text-2xl font-bold mb-1 tracking-tight">{selectedContact.name}</h2>
                      <p className="text-blue-100 text-sm font-medium bg-blue-800/30 px-3 py-0.5 rounded-full backdrop-blur-sm">{selectedContact.department} {selectedContact.position}</p>
                  </div>
                  
                  <div className="p-8">
                      <div className="flex justify-center gap-3 mb-8 -mt-2">
                          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-100 shadow-sm">{selectedContact.group}</span>
                          {selectedContact.isVip && <span className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold border border-yellow-100 shadow-sm">VIP 고객</span>}
                      </div>

                      <div className="space-y-4">
                          <div className="flex items-center gap-5 p-4 bg-white rounded-2xl hover:bg-blue-50 transition-colors cursor-pointer group border border-gray-100 hover:border-blue-200 hover:shadow-md">
                              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shadow-sm group-hover:bg-blue-500 group-hover:text-white transition-all">
                                  <Mail size={20} />
                              </div>
                              <div className="flex-1">
                                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">Email</p>
                                  <p className="text-slate-800 font-bold text-base">{selectedContact.email}</p>
                              </div>
                          </div>

                          <div className="flex items-center gap-5 p-4 bg-white rounded-2xl hover:bg-green-50 transition-colors cursor-pointer group border border-gray-100 hover:border-green-200 hover:shadow-md">
                              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 shadow-sm group-hover:bg-green-500 group-hover:text-white transition-all">
                                  <Phone size={20} />
                              </div>
                              <div className="flex-1">
                                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">Phone</p>
                                  <p className="text-slate-800 font-bold text-base">{selectedContact.phone}</p>
                              </div>
                          </div>

                          <div className="flex items-center gap-5 p-4 bg-white rounded-2xl hover:bg-purple-50 transition-colors cursor-pointer group border border-gray-100 hover:border-purple-200 hover:shadow-md">
                              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 shadow-sm group-hover:bg-purple-500 group-hover:text-white transition-all">
                                  <Building2 size={20} />
                              </div>
                              <div className="flex-1">
                                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">Company</p>
                                  <p className="text-slate-800 font-bold text-base">{selectedContact.company}</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          ) : (
              <div className="text-center text-slate-400">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <User size={48} className="opacity-30" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-600 mb-2">연락처 상세 정보</h3>
                  <p>목록에서 연락처를 선택하여 정보를 확인하세요.</p>
              </div>
          )}
      </div>
    </div>
  );
};

export default ContactView;