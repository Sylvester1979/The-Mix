import { useState, useEffect, useMemo, useRef } from 'react';
import { Card, Select, Input, Stepper, Toggle, Tooltip, Button } from '../common';
import { useApp } from '../../context/AppContext';
import { calculateForward } from '../../utils/calculations';
import { X, BookOpen } from 'lucide-react';

export default function ForwardMode({ onResultChange, loadedRecipe, onClearLoadedRecipe }) {
  const { getAllBoosters, getAllFlavors, state } = useApp();

  const boosters = getAllBoosters();
  const flavors = getAllFlavors();
  const hasLoadedRecipeRef = useRef(false);

  const [selectedBooster, setSelectedBooster] = useState(boosters[0]?.id || '');
  const [selectedFlavor, setSelectedFlavor] = useState(flavors[0]?.id || '');
  const [flavorMl, setFlavorMl] = useState(20);
  const [boosterCount, setBoosterCount] = useState(3);
  const [basePgMl, setBasePgMl] = useState(0);
  const [baseVgMl, setBaseVgMl] = useState(30);
  const [wholeBoostersOnly, setWholeBoostersOnly] = useState(true);

  // Load recipe data when a recipe is loaded
  useEffect(() => {
    if (loadedRecipe && !hasLoadedRecipeRef.current) {
      hasLoadedRecipeRef.current = true;
      const { ingredients } = loadedRecipe;

      if (ingredients) {
        // Load flavor data
        if (ingredients.flavor?.id) {
          setSelectedFlavor(ingredients.flavor.id);
        }
        if (ingredients.flavor?.volumeMl) {
          setFlavorMl(ingredients.flavor.volumeMl);
        }

        // Load booster data
        if (ingredients.boosters?.id) {
          setSelectedBooster(ingredients.boosters.id);
        }
        if (typeof ingredients.boosters?.count === 'number') {
          setBoosterCount(ingredients.boosters.count);
        }

        // Load base data
        if (typeof ingredients.pgMl === 'number') {
          setBasePgMl(ingredients.pgMl);
        }
        if (typeof ingredients.vgMl === 'number') {
          setBaseVgMl(ingredients.vgMl);
        }
      }
    }

    // Reset when loadedRecipe becomes null
    if (!loadedRecipe) {
      hasLoadedRecipeRef.current = false;
    }
  }, [loadedRecipe]);

  const booster = useMemo(
    () => boosters.find(b => b.id === selectedBooster) || boosters[0],
    [selectedBooster, boosters]
  );

  const flavor = useMemo(
    () => flavors.find(f => f.id === selectedFlavor) || flavors[0],
    [selectedFlavor, flavors]
  );

  const result = useMemo(() => {
    if (!booster) return null;
    return calculateForward({
      flavorMl,
      flavorPgPercent: flavor?.pgPercent || 100,
      boosterCount,
      boosterVolume: booster.volumeMl,
      boosterNicotine: booster.nicotineMgMl,
      boosterPgPercent: booster.pgPercent,
      basePgMl,
      baseVgMl
    });
  }, [flavorMl, flavor, boosterCount, booster, basePgMl, baseVgMl]);

  useEffect(() => {
    // Pass both result and ingredients for cost calculation
    const ingredients = {
      flavorMl,
      flavorPrice: flavor?.defaultPrice || 5.00,
      flavorBottleVolume: flavor?.volumeMl || 30,
      boosterCount,
      boosterPrice: booster?.defaultPrice || 1.50,
      basePgMl,
      baseVgMl
    };
    onResultChange?.(result, ingredients);
  }, [result, onResultChange, flavorMl, flavor, boosterCount, booster, basePgMl, baseVgMl]);

  const boosterOptions = boosters.map(b => ({
    value: b.id,
    label: `${b.brand} - ${b.name} (${b.pgPercent}/${b.vgPercent})`
  }));

  const flavorOptions = flavors.map(f => ({
    value: f.id,
    label: `${f.brand} - ${f.name}`
  }));

  const setPreset = (preset) => {
    switch (preset) {
      case 'vg':
        setBasePgMl(0);
        setBaseVgMl(Math.max(0, 60 - flavorMl - boosterCount * (booster?.volumeMl || 10)));
        break;
      case '50/50':
        const remaining = Math.max(0, 60 - flavorMl - boosterCount * (booster?.volumeMl || 10));
        setBasePgMl(remaining / 2);
        setBaseVgMl(remaining / 2);
        break;
    }
  };

  return (
    <div className="space-y-4">
      {/* Recipe Loaded Banner */}
      {loadedRecipe && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-accent-primary/20 border border-accent-primary/30">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-accent-primary" />
            <span className="text-sm text-white">
              Φορτώθηκε: <span className="font-semibold">{loadedRecipe.name}</span>
            </span>
          </div>
          <button
            onClick={onClearLoadedRecipe}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4 text-text-secondary" />
          </button>
        </div>
      )}

      {/* Άρωμα */}
      <Card>
        <Tooltip content="Επιλέξτε το άρωμα που θα χρησιμοποιήσετε και την ποσότητά του σε ml">
          <h3 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wide cursor-help">
            Άρωμα
          </h3>
        </Tooltip>
        <Tooltip content="Επιλέξτε το άρωμα από τη λίστα. Κάθε άρωμα έχει διαφορετική σύσταση PG/VG." position="bottom" className="block w-full">
          <Select
            options={flavorOptions}
            value={selectedFlavor}
            onChange={(e) => setSelectedFlavor(e.target.value)}
            className="mb-3"
          />
        </Tooltip>
        <div className="flex gap-3 items-start">
          <Tooltip content="Πόσα ml αρώματος θέλετε να χρησιμοποιήσετε στο μείγμα σας" position="bottom" className="flex-1 min-w-0">
            <Input
              type="number"
              value={flavorMl}
              onChange={(e) => setFlavorMl(parseFloat(e.target.value) || 0)}
              suffix="ml"
              min={0}
              max={100}
              step={0.5}
            />
          </Tooltip>
          <Tooltip content="Το ποσοστό PG που περιέχει το άρωμα. Τα περισσότερα αρώματα είναι 100% PG." position="bottom">
            <div className="px-3 py-2 rounded-xl bg-white/5 text-text-secondary text-sm flex items-center cursor-help whitespace-nowrap">
              PG {flavor?.pgPercent || 100}%
            </div>
          </Tooltip>
        </div>
      </Card>

      {/* Boosters */}
      <Card>
        <Tooltip content="Τα boosters προσθέτουν νικοτίνη στο μείγμα. Επιλέξτε τύπο και ποσότητα.">
          <h3 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wide cursor-help">
            Boosters
          </h3>
        </Tooltip>
        <Tooltip content="Επιλέξτε το booster νικοτίνης. Το PG/VG δείχνει τη σύσταση του booster." position="bottom" className="block w-full">
          <Select
            options={boosterOptions}
            value={selectedBooster}
            onChange={(e) => setSelectedBooster(e.target.value)}
            className="mb-4"
          />
        </Tooltip>
        <Tooltip content="Πατήστε + ή - για να αυξήσετε ή να μειώσετε τον αριθμό των boosters" position="bottom" className="block w-full">
          <Stepper
            value={boosterCount}
            onChange={setBoosterCount}
            min={0}
            max={20}
            label="Τεμάχια"
          />
        </Tooltip>
        <div className="text-center text-sm text-text-secondary mt-2">
          {boosterCount} τεμ. = {boosterCount * (booster?.volumeMl || 10)} ml
        </div>
        <Tooltip content="Όταν είναι ενεργό, ο υπολογισμός θα χρησιμοποιεί μόνο ακέραιο αριθμό boosters" position="bottom" className="block w-full">
          <Toggle
            label="Μόνο ακέραια τεμάχια"
            checked={wholeBoostersOnly}
            onChange={(e) => setWholeBoostersOnly(e.target.checked)}
            className="mt-4"
          />
        </Tooltip>
      </Card>

      {/* Βάσεις */}
      <Card>
        <Tooltip content="Προσθέστε βάση PG ή/και VG χωρίς νικοτίνη για να φτάσετε τον επιθυμητό όγκο">
          <h3 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wide cursor-help">
            Βάσεις (χωρίς νικοτίνη)
          </h3>
        </Tooltip>
        <div className="flex gap-3 mb-3">
          <Tooltip content="Βάση Προπυλενογλυκόλης (PG): Δίνει πιο έντονο throat hit και γεύση" position="bottom" className="flex-1 min-w-0">
            <Input
              label="PG"
              type="number"
              value={basePgMl}
              onChange={(e) => setBasePgMl(parseFloat(e.target.value) || 0)}
              suffix="ml"
              min={0}
              max={500}
              step={0.5}
            />
          </Tooltip>
          <Tooltip content="Βάση Φυτικής Γλυκερίνης (VG): Δίνει πιο πυκνό ατμό και πιο απαλή αίσθηση" position="bottom" className="flex-1 min-w-0">
            <Input
              label="VG"
              type="number"
              value={baseVgMl}
              onChange={(e) => setBaseVgMl(parseFloat(e.target.value) || 0)}
              suffix="ml"
              min={0}
              max={500}
              step={0.5}
            />
          </Tooltip>
        </div>
        <div className="flex gap-2">
          <Tooltip content="Συμπληρώνει αυτόματα μόνο με VG για μέγιστο ατμό" position="top" className="flex-1">
            <button
              onClick={() => setPreset('vg')}
              className="w-full py-2 px-3 rounded-lg bg-white/5 text-text-secondary text-sm hover:bg-white/10 transition-colors"
            >
              Μόνο VG
            </button>
          </Tooltip>
          <Tooltip content="Συμπληρώνει με ίση αναλογία PG και VG" position="top" className="flex-1">
            <button
              onClick={() => setPreset('50/50')}
              className="w-full py-2 px-3 rounded-lg bg-white/5 text-text-secondary text-sm hover:bg-white/10 transition-colors"
            >
              50/50
            </button>
          </Tooltip>
        </div>
      </Card>
    </div>
  );
}
