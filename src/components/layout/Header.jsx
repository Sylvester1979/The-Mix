import { Settings } from 'lucide-react';

export default function Header({ onSettingsClick }) {
  return (
    <header className="sticky top-0 z-40 px-4 py-3 bg-bg-primary/80 backdrop-blur-lg border-b border-white/5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center shadow-glow-primary">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <h1 className="text-xl font-bold">
            <span className="text-white">The</span>
            <span className="gradient-text"> Mix</span>
          </h1>
        </div>
        <button
          onClick={onSettingsClick}
          className="p-2 rounded-xl hover:bg-white/5 transition-colors"
        >
          <Settings className="w-6 h-6 text-text-secondary" />
        </button>
      </div>
    </header>
  );
}
