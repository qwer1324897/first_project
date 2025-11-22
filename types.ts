

export enum ViewState {
  MAIN = 'MAIN',
  MAIL = 'MAIL',
  CALENDAR = 'CALENDAR',
  TODO = 'TODO',
  MEMO = 'MEMO',
  MEETING_ROOM = 'MEETING_ROOM',
  CONTACTS = 'CONTACTS',
  MEETING = 'MEETING',
  DRIVE = 'DRIVE',
  NOTICE = 'NOTICE',
  QNA = 'QNA',
  AI = 'AI'
}

export interface User {
  name: string;
  position: string;
  department: string;
}

export interface MailItem {
  id: number;
  folder: 'inbox' | 'sent' | 'draft' | 'trash' | 'spam';
  sender: string;
  senderEmail: string;
  title: string;
  preview: string;
  content: string;
  date: string;
  isRead: boolean;
  tag?: string;
  hasAttachment?: boolean;
  isVip?: boolean;
  isImportant?: boolean;
  isMentioned?: boolean;
}

export interface NoticeItem {
  id: number;
  title: string;
  author: string;
  date: string;
  views: number;
  content: string;
  isImportant?: boolean;
  hasAttachment?: boolean;
}

export interface QnaItem {
  id: number;
  category: string;
  type: string;
  status: '접수' | '처리중' | '답변완료';
  isSecret: boolean;
  title: string;
  content: string;
  answer?: string;
  author: string;
  date: string;
  hasAttachment?: boolean;
}

export interface TodoItem {
  id: number;
  title: string;
  description?: string;
  project: string;
  dueDate: string;
  status: '대기' | '진행중' | '완료';
  priority: '상' | '중' | '하';
  assignee: string;
}

export interface MemoItem {
  id: number;
  title: string;
  content: string;
  date: string;
  group: string;
}

export interface MeetingRoomItem {
  id: number;
  name: string;
  capacity: number;
  location: string;
  facilities: string[];
  isAvailable: boolean;
  nextAvailableTime?: string;
}

export interface ContactItem {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  company: string;
  group: string;
  isVip?: boolean;
}

export interface DriveItem {
  id: number;
  name: string;
  type: 'folder' | 'pdf' | 'doc' | 'xls' | 'img' | 'zip' | 'ppt';
  size: string;
  date: string;
  owner: string;
  isStarred?: boolean;
}

export interface CalendarEvent {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  type: 'personal' | 'team' | 'company';
  color: string;
}