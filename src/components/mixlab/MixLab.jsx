import { useState, useCallback } from 'react';
import { TabBar } from '../layout';
import ForwardMode from './ForwardMode';
import BackwardMode from './BackwardMode';
import ResultPanel from './ResultPanel';
import SaveRecipeModal from '../recipes/SaveRecipeModal';

const tabs = [
  { id: 'forward', label: 'ΕΧΩ', tooltip: 'Έχω συγκεκριμένα υλικά - υπολόγισε τι υγρό θα βγει' },
  { id: 'backward', label: 'ΘΕΛΩ', tooltip: 'Θέλω συγκεκριμένο αποτέλεσμα - πες μου τι υλικά χρειάζομαι' }
];

export default function MixLab() {
  const [activeMode, setActiveMode] = useState('forward');
  const [result, setResult] = useState(null);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const handleResultChange = useCallback((newResult) => {
    setResult(newResult);
  }, []);

  const handleSave = () => {
    setShowSaveModal(true);
  };

  const handleAddSteep = () => {
    // TODO: Open steep modal with result data
    console.log('Add to steep tracker:', result);
  };

  return (
    <div className="px-4 py-4">
      <TabBar
        tabs={tabs}
        activeTab={activeMode}
        onTabChange={setActiveMode}
        className="mb-4"
      />

      {activeMode === 'forward' ? (
        <ForwardMode onResultChange={handleResultChange} />
      ) : (
        <BackwardMode onResultChange={handleResultChange} />
      )}

      <ResultPanel
        result={result}
        onSave={result?.totalMl > 0 ? handleSave : null}
        onAddSteep={result?.totalMl > 0 ? handleAddSteep : null}
        className="mt-4"
      />

      <SaveRecipeModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        result={result}
      />
    </div>
  );
}
