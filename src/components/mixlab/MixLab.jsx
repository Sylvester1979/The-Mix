import { useState, useCallback, useMemo } from 'react';
import { TabBar } from '../layout';
import ForwardMode from './ForwardMode';
import BackwardMode from './BackwardMode';
import ResultPanel from './ResultPanel';
import SaveRecipeModal from '../recipes/SaveRecipeModal';
import AddSteepModal from '../steep/AddSteepModal';
import { useApp } from '../../context/AppContext';
import { calculateMixCost } from '../../utils/costCalculations';

const tabs = [
  { id: 'forward', label: 'ΕΧΩ', tooltip: 'Έχω συγκεκριμένα υλικά - υπολόγισε τι υγρό θα βγει' },
  { id: 'backward', label: 'ΘΕΛΩ', tooltip: 'Θέλω συγκεκριμένο αποτέλεσμα - πες μου τι υλικά χρειάζομαι' }
];

export default function MixLab() {
  const { state, dispatch, actions } = useApp();
  const { settings, loadedRecipe } = state;

  const [activeMode, setActiveMode] = useState('forward');
  const [result, setResult] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showSteepModal, setShowSteepModal] = useState(false);

  const handleResultChange = useCallback((newResult, newIngredients = null) => {
    setResult(newResult);
    if (newIngredients) {
      setIngredients(newIngredients);
    }
  }, []);

  // Calculate cost based on current mix
  const costInfo = useMemo(() => {
    if (!result || !ingredients) return null;

    return calculateMixCost({
      flavorMl: ingredients.flavorMl || 0,
      flavorPrice: ingredients.flavorPrice || settings.defaultFlavorPrice,
      flavorBottleVolume: ingredients.flavorBottleVolume || 30,
      boosterCount: ingredients.boosterCount || 0,
      boosterPrice: ingredients.boosterPrice || settings.defaultBoosterPrice,
      basePgMl: ingredients.basePgMl || 0,
      baseVgMl: ingredients.baseVgMl || 0,
      basePgPricePerLiter: settings.basePgPricePerLiter,
      baseVgPricePerLiter: settings.baseVgPricePerLiter
    });
  }, [result, ingredients, settings]);

  const handleSave = () => {
    setShowSaveModal(true);
  };

  const handleAddSteep = () => {
    setShowSteepModal(true);
  };

  const handleClearLoadedRecipe = useCallback(() => {
    dispatch({ type: actions.CLEAR_LOADED_RECIPE });
  }, [dispatch, actions]);

  return (
    <div className="px-4 py-4">
      <TabBar
        tabs={tabs}
        activeTab={activeMode}
        onTabChange={setActiveMode}
        className="mb-4"
      />

      {activeMode === 'forward' ? (
        <ForwardMode
          onResultChange={handleResultChange}
          loadedRecipe={loadedRecipe}
          onClearLoadedRecipe={handleClearLoadedRecipe}
        />
      ) : (
        <BackwardMode onResultChange={handleResultChange} />
      )}

      <ResultPanel
        result={result}
        costInfo={costInfo}
        showCosts={settings.showCosts}
        onSave={result?.totalMl > 0 ? handleSave : null}
        onAddSteep={result?.totalMl > 0 ? handleAddSteep : null}
        className="mt-4"
      />

      <SaveRecipeModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        result={result}
      />

      <AddSteepModal
        isOpen={showSteepModal}
        onClose={() => setShowSteepModal(false)}
      />
    </div>
  );
}
