import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AppShell } from './components/layout';
import { MixLab } from './components/mixlab';
import { Inventory } from './components/inventory';
import { Recipes } from './components/recipes';
import { SteepTracker } from './components/steep';
import Settings from './components/Settings';

function AppContent() {
  const { state, dispatch, actions } = useApp();
  const [showSettings, setShowSettings] = useState(false);

  const activeTab = state.activeTab;

  const setActiveTab = (tab) => {
    dispatch({ type: actions.SET_ACTIVE_TAB, payload: tab });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'mixlab':
        return <MixLab />;
      case 'inventory':
        return <Inventory />;
      case 'recipes':
        return <Recipes />;
      case 'steep':
        return <SteepTracker />;
      default:
        return <MixLab />;
    }
  };

  return (
    <>
      <AppShell
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSettingsClick={() => setShowSettings(true)}
      >
        {renderContent()}
      </AppShell>

      <Settings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
