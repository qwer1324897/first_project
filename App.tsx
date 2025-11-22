import { useState } from 'react';
import Layout from './components/Layout';
import MainDashboard from './views/MainDashboard';
import MailView from './views/MailView';
import CalendarView from './views/CalendarView';
import TodoView from './views/TodoView';
import MemoView from './views/MemoView';
import MeetingRoomView from './views/MeetingRoomView';
import ContactView from './views/ContactView';
import MeetingView from './views/MeetingView';
import DriveView from './views/DriveView';
import NoticeView from './views/NoticeView';
import QnaView from './views/QnaView';
import AIView from './views/AIView';
import { ViewState, User } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.MAIN);
  
  const user: User = {
    name: "김태호",
    position: "책임",
    department: "디지털혁신팀"
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.MAIN:
        return <MainDashboard user={user.name} onNavigate={setCurrentView} />;
      case ViewState.MAIL:
        return <MailView />;
      case ViewState.CALENDAR:
        return <CalendarView />;
      case ViewState.TODO:
        return <TodoView />;
      case ViewState.MEMO:
        return <MemoView />;
      case ViewState.MEETING_ROOM:
        return <MeetingRoomView />;
      case ViewState.CONTACTS:
        return <ContactView />;
      case ViewState.MEETING:
        return <MeetingView />;
      case ViewState.DRIVE:
        return <DriveView />;
      case ViewState.NOTICE:
        return <NoticeView />;
      case ViewState.QNA:
        return <QnaView />;
      case ViewState.AI:
        return <AIView />;
      default:
        return <MainDashboard user={user.name} onNavigate={setCurrentView} />;
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView} user={user}>
      {renderContent()}
    </Layout>
  );
}

export default App;