import { useState, useEffect, useMemo } from 'react';
import { Card, Select, Input, Stepper, Toggle } from '../common';
import { useApp } from '../../context/AppContext';
import { calculateForward } from '../../utils/calculations';

export default function ForwardMode({ onResultChange }) {
  const { getAllBoosters, getAllFlavors, state } = useApp();

  const boosters = getAllBoosters();
  const flavors = getAllFlavors();

  const [selectedBooster, setSelectedBooster] = useState(boosters[0]?.id || '');
  const [selectedFlavor, setSelectedFlavor] = useState(flavors[0]?.id || '');
  const [flavorMl, setFlavorMl] = useState(20);
  const [boosterCount, setBoosterCount] = useState(3);
  const [basePgMl, setBasePgMl] = useState(0);
  const [baseVgMl, setBaseVgMl] = useState(30);
  const [wholeBoostersOnly, setWholeBoostersOnly] = useState(true);

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
    onResultChange?.(result);
  }, [result, onResultChange]);

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
      {/* Άρωμα */}
      <Card>
        <h3 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wide">
          Άρωμα
        </h3>
        <Select
          options={flavorOptions}
          value={selectedFlavor}
          onChange={(e) => setSelectedFlavor(e.target.value)}
          className="mb-3"
        />
        <div className="flex gap-3">
          <Input
            type="number"
            value={flavorMl}
            onChange={(e) => setFlavorMl(parseFloat(e.target.value) || 0)}
            suffix="ml"
            min={0}
            max={100}
            step={0.5}
            className="flex-1"
          />
          <div className="px-3 py-2 rounded-xl bg-white/5 text-text-secondary text-sm flex items-center">
            PG {flavor?.pgPercent || 100}%
          </div>
        </div>
      </Card>

      {/* Boosters */}
      <Card>
        <h3 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wide">
          Boosters
        </h3>
        <Select
          options={boosterOptions}
          value={selectedBooster}
          onChange={(e) => setSelectedBooster(e.target.value)}
          className="mb-4"
        />
        <Stepper
          value={boosterCount}
          onChange={setBoosterCount}
          min={0}
          max={20}
          label="Τεμάχια"
        />
        <div className="text-center text-sm text-text-secondary mt-2">
          {boosterCount} τεμ. = {boosterCount * (booster?.volumeMl || 10)} ml
        </div>
        <Toggle
          label="Μόνο ακέραια τεμάχια"
          checked={wholeBoostersOnly}
          onChange={(e) => setWholeBoostersOnly(e.target.checked)}
          className="mt-4"
        />
      </Card>

      {/* Βάσεις */}
      <Card>
        <h3 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wide">
          Βάσεις (χωρίς νικοτίνη)
        </h3>
        <div className="flex gap-3 mb-3">
          <Input
            label="PG"
            type="number"
            value={basePgMl}
            onChange={(e) => setBasePgMl(parseFloat(e.target.value) || 0)}
            suffix="ml"
            min={0}
            max={500}
            step={0.5}
            containerClassName="flex-1"
          />
          <Input
            label="VG"
            type="number"
            value={baseVgMl}
            onChange={(e) => setBaseVgMl(parseFloat(e.target.value) || 0)}
            suffix="ml"
            min={0}
            max={500}
            step={0.5}
            containerClassName="flex-1"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPreset('vg')}
            className="flex-1 py-2 px-3 rounded-lg bg-white/5 text-text-secondary text-sm
              hover:bg-white/10 transition-colors"
          >
            Μόνο VG
          </button>
          <button
            onClick={() => setPreset('50/50')}
            className="flex-1 py-2 px-3 rounded-lg bg-white/5 text-text-secondary text-sm
              hover:bg-white/10 transition-colors"
          >
            50/50
          </button>
        </div>
      </Card>
    </div>
  );
}
