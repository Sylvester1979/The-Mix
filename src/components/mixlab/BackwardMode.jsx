import { useState, useEffect, useMemo } from 'react';
import { AlertCircle } from 'lucide-react';
import { Card, Select, Input, Slider, Toggle, Button, Tooltip } from '../common';
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
        <Tooltip content="Ορίστε τα χαρακτηριστικά του υγρού που θέλετε να φτιάξετε">
          <h3 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wide cursor-help">
            Στόχος
          </h3>
        </Tooltip>
        <Tooltip content="Πόσα ml υγρού θέλετε να φτιάξετε συνολικά. Συνήθως 30, 60 ή 120ml." position="bottom">
          <div className="w-full">
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
          </div>
        </Tooltip>
        <Tooltip content="Η περιεκτικότητα νικοτίνης που θέλετε. 3-6mg για DTL, 12-18mg για MTL." position="bottom">
          <div className="w-full">
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
          </div>
        </Tooltip>
        <Tooltip content="Η αναλογία PG/VG. Περισσότερο VG = πυκνός ατμός. Περισσότερο PG = δυνατή γεύση." position="bottom">
          <div className="w-full">
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
          </div>
        </Tooltip>
      </Card>

      {/* Άρωμα */}
      <Card>
        <Tooltip content="Επιλέξτε το άρωμα και πόσα ml έχετε διαθέσιμα">
          <h3 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wide cursor-help">
            Άρωμα
          </h3>
        </Tooltip>
        <Tooltip content="Επιλέξτε το άρωμα που θέλετε να χρησιμοποιήσετε" position="bottom">
          <div className="w-full">
            <Select
              options={flavorOptions}
              value={selectedFlavor}
              onChange={(e) => setSelectedFlavor(e.target.value)}
              className="mb-3"
            />
          </div>
        </Tooltip>
        <Tooltip content="Πόσα ml αρώματος έχετε και θέλετε να χρησιμοποιήσετε. Συνήθως 20-30ml για flavor shot." position="bottom">
          <div className="w-full">
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
          </div>
        </Tooltip>
      </Card>

      {/* Booster */}
      <Card>
        <Tooltip content="Επιλέξτε το booster νικοτίνης που θα χρησιμοποιήσετε">
          <h3 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wide cursor-help">
            Booster
          </h3>
        </Tooltip>
        <Tooltip content="Επιλέξτε τον τύπο booster. Διαφορετικά boosters έχουν διαφορετική σύσταση PG/VG." position="bottom">
          <div className="w-full">
            <Select
              options={boosterOptions}
              value={selectedBooster}
              onChange={(e) => setSelectedBooster(e.target.value)}
              className="mb-3"
            />
          </div>
        </Tooltip>
        <Tooltip content="Ενεργοποιήστε για να χρησιμοποιήσετε ακέραιο αριθμό boosters (πιο πρακτικό)" position="bottom">
          <div className="w-full">
            <Toggle
              label="Μόνο ακέραια τεμάχια"
              description="Στρογγυλοποίηση στον πλησιέστερο ακέραιο"
              checked={roundBoosters}
              onChange={(e) => setRoundBoosters(e.target.checked)}
            />
          </div>
        </Tooltip>
      </Card>

      {/* Αποτέλεσμα υπολογισμού */}
      {calculation && (
        <Tooltip content="Αυτά είναι τα υλικά που χρειάζεστε για να πετύχετε τον στόχο σας">
          <Card className="bg-accent-primary/5 border-accent-primary/20">
            <h3 className="text-sm font-semibold text-accent-primary mb-3">
              Χρειάζεσαι
            </h3>
            <div className="space-y-2">
              <Tooltip content="Ο αριθμός boosters νικοτίνης που πρέπει να προσθέσετε" position="left">
                <div className="flex justify-between text-white cursor-help">
                  <span>Boosters:</span>
                  <span className="font-bold">
                    {calculation.boosterCount} τεμ. ({calculation.boosterTotalMl} ml)
                  </span>
                </div>
              </Tooltip>
              <Tooltip content="Η ποσότητα βάσης PG χωρίς νικοτίνη που πρέπει να προσθέσετε" position="left">
                <div className="flex justify-between text-white cursor-help">
                  <span>Βάση PG:</span>
                  <span className="font-bold">{calculation.basePgMl} ml</span>
                </div>
              </Tooltip>
              <Tooltip content="Η ποσότητα βάσης VG χωρίς νικοτίνη που πρέπει να προσθέσετε" position="left">
                <div className="flex justify-between text-white cursor-help">
                  <span>Βάση VG:</span>
                  <span className="font-bold">{calculation.baseVgMl} ml</span>
                </div>
              </Tooltip>
            </div>

            {calculation.warnings.length > 0 && (
              <Tooltip content="Αυτές οι προειδοποιήσεις δείχνουν αποκλίσεις από τον στόχο σας" position="top">
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
              </Tooltip>
            )}
          </Card>
        </Tooltip>
      )}
    </div>
  );
}
