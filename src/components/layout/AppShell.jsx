import Header from './Header';
import BottomNav from './BottomNav';

export default function AppShell({
  children,
  activeTab,
  onTabChange,
  onSettingsClick
}) {
  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <Header onSettingsClick={onSettingsClick} />

      <main className="flex-1 pb-24 overflow-y-auto">
        {children}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
