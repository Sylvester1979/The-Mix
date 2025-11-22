import { Tooltip } from '../common';

export default function TabBar({
  tabs = [],
  activeTab,
  onTabChange,
  className = ''
}) {
  return (
    <div className={`flex p-1 bg-white/5 rounded-xl ${className}`}>
      {tabs.map((tab) => (
        <Tooltip key={tab.id} content={tab.tooltip} position="bottom">
          <button
            onClick={() => onTabChange(tab.id)}
            className={`
              flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold
              transition-all duration-200
              ${activeTab === tab.id
                ? 'btn-gradient text-white shadow-glow-primary'
                : 'text-text-secondary hover:text-white'
              }
            `}
          >
            {tab.label}
          </button>
        </Tooltip>
      ))}
    </div>
  );
}
