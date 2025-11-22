import React, { useState } from 'react';
import { Search, Plus, Cloud, FileText, FileSpreadsheet, FileImage, File, MoreVertical, Download, Trash2, Folder, HardDrive, Share2, Star } from 'lucide-react';
import { DriveItem } from '../types';

const mockFiles: DriveItem[] = [
  { id: 1, name: '2025_사업계획_최종본.pdf', type: 'pdf', size: '2.4 MB', date: '2025-11-20', owner: '김태호', isStarred: true },
  { id: 2, name: '디자인_리소스_모음', type: 'folder', size: '-', date: '2025-11-19', owner: '연승민' },
  { id: 3, name: '11월_마케팅_지표.xlsx', type: 'xls', size: '45 KB', date: '2025-11-18', owner: '남여원' },
  { id: 4, name: '워크샵_단체사진.zip', type: 'zip', size: '156 MB', date: '2025-11-15', owner: '강동훈' },
  { id: 5, name: '회의록_템플릿_v2.docx', type: 'doc', size: '12 KB', date: '2025-10-30', owner: '김태호' },
  { id: 6, name: '서비스_소개서_초안.ppt', type: 'ppt', size: '5.2 MB', date: '2025-11-21', owner: '김태호' },
];

const sharedFiles: DriveItem[] = [
  { id: 7, name: '전사_공유_폴더', type: 'folder', size: '-', date: '2025-01-01', owner: '관리자' },
  { id: 8, name: '프로젝트_협업_규칙.pdf', type: 'pdf', size: '1.2 MB', date: '2025-10-15', owner: '강동훈' },
];

const trashFiles: DriveItem[] = [
  { id: 9, name: '임시_파일_삭제.tmp', type: 'doc', size: '2 KB', date: '2025-11-01', owner: '김태호' },
];

const DriveView: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<DriveItem | null>(null);
  const [viewMode, setViewMode] = useState<'my' | 'shared' | 'trash'>('my');

  const getFileIcon = (type: string, size?: number) => {
    const props = size ? { size } : {};
    switch(type) {
      case 'pdf': return <FileText className="text-red-500" {...props} />;
      case 'xls': return <FileSpreadsheet className="text-green-500" {...props} />;
      case 'doc': return <FileText className="text-blue-500" {...props} />;
      case 'folder': return <Folder className="text-yellow-500 fill-yellow-100" {...props} />;
      case 'zip': return <File className="text-purple-500" {...props} />;
      case 'ppt': return <FileImage className="text-orange-500" {...props} />;
      default: return <File className="text-gray-400" {...props} />;
    }
  };

  const currentFiles = viewMode === 'my' ? mockFiles : viewMode === 'shared' ? sharedFiles : trashFiles;

  return (
    <div className="flex h-[calc(100vh-140px)] bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
      
      <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col p-4">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-sm transition-colors mb-6 flex items-center justify-center gap-2 transform active:scale-95 duration-150">
              <Plus size={18} /> 파일 업로드
          </button>
          
          <nav className="space-y-1 flex-1">
              <button 
                onClick={() => { setViewMode('my'); setSelectedFile(null); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${viewMode === 'my' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:bg-gray-200'}`}
              >
                  <HardDrive size={18} /> 내 드라이브
              </button>
              <button 
                onClick={() => { setViewMode('shared'); setSelectedFile(null); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${viewMode === 'shared' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:bg-gray-200'}`}
              >
                  <Share2 size={18} /> 공유 문서함
              </button>
              <button 
                onClick={() => { setViewMode('trash'); setSelectedFile(null); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${viewMode === 'trash' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:bg-gray-200'}`}
              >
                  <Trash2 size={18} /> 휴지통
              </button>
          </nav>

          <div className="mt-auto bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-slate-800 font-bold text-sm">
                  <Cloud size={16} /> 저장 공간
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                  <div className="bg-blue-500 h-2 rounded-full w-[75%]"></div>
              </div>
              <p className="text-xs text-slate-500">15GB 중 11.2GB 사용</p>
          </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0 bg-white">
          <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
              <h2 className="font-bold text-lg text-slate-800">
                  {viewMode === 'my' ? '내 드라이브' : viewMode === 'shared' ? '공유 문서함' : '휴지통'}
              </h2>
              <div className="flex items-center gap-4">
                  <div className="relative">
                      <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                      <input type="text" placeholder="파일 검색" className="pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-sm w-64 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div className="flex bg-gray-100 p-1 rounded-lg">
                      <button className="p-1.5 bg-white shadow-sm rounded text-slate-800"><MoreVertical size={16} /></button>
                  </div>
              </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {currentFiles.map(file => (
                      <div 
                        key={file.id} 
                        onClick={() => setSelectedFile(file)}
                        className={`p-4 border rounded-xl cursor-pointer transition-all flex flex-col hover:shadow-md group relative
                            ${selectedFile?.id === file.id ? 'border-blue-500 bg-blue-50/20 ring-1 ring-blue-500' : 'border-gray-200 bg-white hover:border-blue-300'}
                        `}
                      >
                          <div className="flex justify-between items-start mb-4">
                              <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                                  {getFileIcon(file.type)}
                              </div>
                              {file.isStarred && <Star size={16} className="text-yellow-400 fill-yellow-400" />}
                          </div>
                          <h4 className="font-bold text-slate-800 text-sm mb-1 truncate" title={file.name}>{file.name}</h4>
                          <p className="text-xs text-slate-500">{file.size} • {file.date}</p>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {selectedFile && (
          <div className="w-80 bg-gray-50 border-l border-gray-200 flex flex-col animate-fade-in shadow-xl z-10">
              <div className="p-6 border-b border-gray-200 bg-white flex justify-between items-center">
                  <span className="font-bold text-slate-700">상세 정보</span>
                  <button onClick={() => setSelectedFile(null)} className="text-slate-400 hover:text-slate-600"><MoreVertical size={20} className="rotate-90" /></button>
              </div>
              <div className="p-6 flex-1 overflow-y-auto">
                  <div className="flex flex-col items-center mb-8">
                      <div className="w-24 h-24 bg-white rounded-2xl border border-gray-200 flex items-center justify-center shadow-sm mb-4">
                          {getFileIcon(selectedFile.type, 48)}
                      </div>
                      <h3 className="text-center font-bold text-slate-800 break-all px-4">{selectedFile.name}</h3>
                  </div>

                  <div className="space-y-6">
                      <div>
                          <label className="text-xs font-bold text-slate-400 uppercase block mb-1">파일 형식</label>
                          <p className="text-sm font-medium text-slate-700 uppercase">{selectedFile.type}</p>
                      </div>
                      <div>
                          <label className="text-xs font-bold text-slate-400 uppercase block mb-1">크기</label>
                          <p className="text-sm font-medium text-slate-700">{selectedFile.size}</p>
                      </div>
                      <div>
                          <label className="text-xs font-bold text-slate-400 uppercase block mb-1">소유자</label>
                          <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-700">
                                  {selectedFile.owner[0]}
                              </div>
                              <p className="text-sm font-medium text-slate-700">{selectedFile.owner}</p>
                          </div>
                      </div>
                      <div>
                          <label className="text-xs font-bold text-slate-400 uppercase block mb-1">수정일</label>
                          <p className="text-sm font-medium text-slate-700">{selectedFile.date}</p>
                      </div>
                  </div>
              </div>
              <div className="p-4 border-t border-gray-200 bg-white">
                  <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-sm transition-colors">
                      <Download size={18} /> 다운로드
                  </button>
              </div>
          </div>
      )}
    </div>
  );
};

export default DriveView;