import { useState, useEffect, useMemo } from 'react';
import { AlertCircle } from 'lucide-react';
import { Card, Select, Input, Slider, Toggle, Button } from '../common';
import { useApp } from '../../context/AppContext';
import { calculateBackward } from '../../utils/calculations';

export default function BackwardMode({ onResultChange }) {
  const { getAllBoosters, getAllFlavors, state } = useApp();
  const { settings } = state;

  const boosters = getAllBoosters();
  const flavors = getAllFlavors();

  const [targetMl, setTargetMl] = useState(60);
  const [targetNicotine, setTargetNicotine] = useState(settings.defaultNicotine);
  const [targetPgPercent, setTargetPgPercent] = useState(settings.defaultPgVg[0]);
  const [selectedBooster, setSelectedBooster] = useState(boosters[0]?.id || '');
  const [selectedFlavor, setSelectedFlavor] = useState(flavors[0]?.id || '');
  const [flavorMl, setFlavorMl] = useState(20);
  const [roundBoosters, setRoundBoosters] = useState(settings.roundBoosters);

  const booster = useMemo(
    () => boosters.find(b => b.id === selectedBooster) || boosters[0],
    [selectedBooster, boosters]
  );

  const flavor = useMemo(
    () => flavors.find(f => f.id === selectedFlavor) || flavors[0],
    [selectedFlavor, flavors]
  );

  const calculation = useMemo(() => {
    if (!booster) return null;
    return calculateBackward({
      targetMl,
      targetNicotine,
      targetPgPercent,
      flavorMl,
      flavorPgPercent: flavor?.pgPercent || 100,
      boosterVolume: booster.volumeMl,
      boosterNicotine: booster.nicotineMgMl,
      boosterPgPercent: booster.pgPercent,
      roundBoosters
    });
  }, [targetMl, targetNicotine, targetPgPercent, flavorMl, flavor, booster, roundBoosters]);

  useEffect(() => {
    onResultChange?.(calculation?.result || null);
  }, [calculation, onResultChange]);

  const boosterOptions = boosters.map(b => ({
    value: b.id,
    label: `${b.brand} - ${b.name} (${b.pgPercent}/${b.vgPercent})`
  }));

  const flavorOptions = flavors.map(f => ({
    value: f.id,
    label: `${f.brand} - ${f.name}`
  }));

  return (
    <div className="space-y-4">
      {/* Στόχος */}
      <Card>
        <h3 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wide">
          Στόχος
        </h3>
        <Slider
          label="Τελικά ml"
          value={targetMl}
          min={10}
          max={200}
          step={5}
          suffix=" ml"
          onChange={(e) => setTargetMl(parseInt(e.target.value))}
          className="mb-4"
        />
        <Slider
          label="Νικοτίνη"
          value={targetNicotine}
          min={0}
          max={20}
          step={0.5}
          suffix=" mg/ml"
          onChange={(e) => setTargetNicotine(parseFloat(e.target.value))}
          className="mb-4"
        />
        <Slider
          label="PG/VG"
          value={targetPgPercent}
          min={0}
          max={100}
          step={5}
          suffix=""
          onChange={(e) => setTargetPgPercent(parseInt(e.target.value))}
        />
        <div className="flex justify-between text-xs text-text-muted mt-1">
          <span>PG {targetPgPercent}%</span>
          <span>VG {100 - targetPgPercent}%</span>
        </div>
      </Card>

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
        <Input
          label="Διαθέσιμη ποσότητα"
          type="number"
          value={flavorMl}
          onChange={(e) => setFlavorMl(parseFloat(e.target.value) || 0)}
          suffix="ml"
          min={0}
          max={100}
          step={0.5}
        />
      </Card>

      {/* Booster */}
      <Card>
        <h3 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wide">
          Booster
        </h3>
        <Select
          options={boosterOptions}
          value={selectedBooster}
          onChange={(e) => setSelectedBooster(e.target.value)}
          className="mb-3"
        />
        <Toggle
          label="Μόνο ακέραια τεμάχια"
          description="Στρογγυλοποίηση στον πλησιέστερο ακέραιο"
          checked={roundBoosters}
          onChange={(e) => setRoundBoosters(e.target.checked)}
        />
      </Card>

      {/* Αποτέλεσμα υπολογισμού */}
      {calculation && (
        <Card className="bg-accent-primary/5 border-accent-primary/20">
          <h3 className="text-sm font-semibold text-accent-primary mb-3">
            Χρειάζεσαι
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-white">
              <span>Boosters:</span>
              <span className="font-bold">
                {calculation.boosterCount} τεμ. ({calculation.boosterTotalMl} ml)
              </span>
            </div>
            <div className="flex justify-between text-white">
              <span>Βάση PG:</span>
              <span className="font-bold">{calculation.basePgMl} ml</span>
            </div>
            <div className="flex justify-between text-white">
              <span>Βάση VG:</span>
              <span className="font-bold">{calculation.baseVgMl} ml</span>
            </div>
          </div>

          {calculation.warnings.length > 0 && (
            <div className="mt-3 p-3 rounded-lg bg-warning/10 border border-warning/20">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <div className="text-sm text-warning">
                  {calculation.warnings.map((w, i) => (
                    <p key={i}>{w}</p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
