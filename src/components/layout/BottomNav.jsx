import { FlaskConical, Package, BookOpen, Clock } from 'lucide-react';

const tabs = [
  { id: 'mixlab', label: 'Lab', icon: FlaskConical },
  { id: 'inventory', label: 'Αποθήκη', icon: Package },
  { id: 'recipes', label: 'Συνταγές', icon: BookOpen },
  { id: 'steep', label: 'Ωρίμανση', icon: Clock }
];

export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-bg-secondary/90 backdrop-blur-lg border-t border-white/5 safe-bottom">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex flex-col items-center gap-1 px-4 py-2 rounded-xl
                transition-all duration-200
                ${isActive
                  ? 'text-accent-primary'
                  : 'text-text-muted hover:text-text-secondary'
                }
              `}
            >
              <div className={`
                p-2 rounded-xl transition-all duration-200
                ${isActive ? 'bg-accent-primary/20' : ''}
              `}>
                <Icon className={`w-5 h-5 ${isActive ? 'drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]' : ''}`} />
              </div>
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
