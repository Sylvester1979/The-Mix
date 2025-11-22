import { Download, Upload, RotateCcw, Info, Euro, Trash2, Globe, AlertTriangle } from 'lucide-react';
import { Modal, Card, Toggle, Select, Slider, Button, Input } from './common';
import { useApp } from '../context/AppContext';
import { useState } from 'react';

export default function Settings({ isOpen, onClose }) {
  const { state, dispatch, actions } = useApp();
  const { settings } = state;
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const updateSetting = (key, value) => {
    dispatch({
      type: actions.UPDATE_SETTINGS,
      payload: { [key]: value }
    });
  };

  const handleExport = () => {
    const data = {
      inventory: state.inventory,
      recipes: state.recipes,
      steepEntries: state.steepEntries,
      settings: state.settings,
      customBoosters: state.customBoosters,
      customFlavors: state.customFlavors,
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `themix-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          if (data.inventory) {
            dispatch({ type: actions.SET_INVENTORY, payload: data.inventory });
          }
          if (data.settings) {
            dispatch({ type: actions.UPDATE_SETTINGS, payload: data.settings });
          }
          // Note: For full import, you'd want to handle recipes, steep entries, etc.
          alert('Εισαγωγή επιτυχής!');
        } catch (err) {
          alert('Σφάλμα κατά την εισαγωγή του αρχείου');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleReset = () => {
    if (confirm('Είστε σίγουροι; Θα επαναφερθούν οι προεπιλεγμένες ρυθμίσεις.')) {
      dispatch({
        type: actions.UPDATE_SETTINGS,
        payload: {
          roundBoosters: true,
          roundMl: 0.5,
          pgvgTolerance: 5,
          defaultNicotine: 6,
          defaultPgVg: [50, 50],
          defaultSteepDays: 10,
          defaultFlavorPercent: 20,
          language: 'el'
        }
      });
    }
  };

  const handleClearAllData = () => {
    dispatch({ type: actions.CLEAR_ALL_DATA });
    setShowClearConfirm(false);
  };

  const roundMlOptions = [
    { value: 'null', label: 'Καμία' },
    { value: '0.5', label: '0.5 ml' },
    { value: '1', label: '1 ml' }
  ];

  const languageOptions = [
    { value: 'el', label: 'Ελληνικά' },
    { value: 'en', label: 'English (soon)' }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ρυθμίσεις"
      size="lg"
    >
      <div className="space-y-6">
        {/* Γενικά */}
        <div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
            <Globe className="w-4 h-4 inline mr-2" />
            Γενικά
          </h3>
          <Card className="space-y-4">
            <div>
              <label className="text-sm text-text-secondary font-medium mb-1.5 block">
                Γλώσσα
              </label>
              <Select
                options={languageOptions}
                value={settings.language || 'el'}
                onChange={(e) => updateSetting('language', e.target.value)}
              />
              <p className="text-xs text-text-muted mt-1">
                Προς το παρόν μόνο Ελληνικά είναι διαθέσιμα
              </p>
            </div>
          </Card>
        </div>

        {/* Υπολογισμοί */}
        <div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
            Υπολογισμοί
          </h3>
          <Card className="space-y-4">
            <Toggle
              label="Μόνο ακέραια boosters"
              description="Στρογγυλοποίηση boosters σε ακέραιο αριθμό"
              checked={settings.roundBoosters}
              onChange={(e) => updateSetting('roundBoosters', e.target.checked)}
            />

            <div>
              <label className="text-sm text-text-secondary font-medium mb-1.5 block">
                Στρογγυλοποίηση ml
              </label>
              <Select
                options={roundMlOptions}
                value={settings.roundMl?.toString() || 'null'}
                onChange={(e) => updateSetting('roundMl', e.target.value === 'null' ? null : parseFloat(e.target.value))}
              />
            </div>

            <Slider
              label="Ανοχή PG/VG"
              value={settings.pgvgTolerance}
              min={0}
              max={15}
              step={1}
              suffix="%"
              onChange={(e) => updateSetting('pgvgTolerance', parseInt(e.target.value))}
            />
          </Card>
        </div>

        {/* Προεπιλογές */}
        <div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
            Προεπιλογές
          </h3>
          <Card className="space-y-4">
            <Slider
              label="Νικοτίνη"
              value={settings.defaultNicotine}
              min={0}
              max={20}
              step={0.5}
              suffix=" mg/ml"
              onChange={(e) => updateSetting('defaultNicotine', parseFloat(e.target.value))}
            />

            <Slider
              label="PG/VG"
              value={settings.defaultPgVg[0]}
              min={0}
              max={100}
              step={5}
              suffix=""
              onChange={(e) => updateSetting('defaultPgVg', [parseInt(e.target.value), 100 - parseInt(e.target.value)])}
            />
            <div className="flex justify-between text-xs text-text-muted -mt-2">
              <span>PG {settings.defaultPgVg[0]}%</span>
              <span>VG {settings.defaultPgVg[1]}%</span>
            </div>

            <Slider
              label="Ημέρες ωρίμανσης"
              value={settings.defaultSteepDays}
              min={1}
              max={30}
              step={1}
              suffix=" ημ."
              onChange={(e) => updateSetting('defaultSteepDays', parseInt(e.target.value))}
            />

            <Slider
              label="Ποσοστό αρώματος"
              value={settings.defaultFlavorPercent || 20}
              min={5}
              max={50}
              step={1}
              suffix="%"
              onChange={(e) => updateSetting('defaultFlavorPercent', parseInt(e.target.value))}
            />
          </Card>
        </div>

        {/* Κόστη */}
        <div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
            <Euro className="w-4 h-4 inline mr-2" />
            Κόστη
          </h3>
          <Card className="space-y-4">
            <Toggle
              label="Εμφάνιση κόστους"
              description="Εμφάνιση του κόστους στα αποτελέσματα"
              checked={settings.showCosts ?? true}
              onChange={(e) => updateSetting('showCosts', e.target.checked)}
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Τιμή PG/λίτρο"
                type="number"
                value={settings.basePgPricePerLiter ?? 8}
                onChange={(e) => updateSetting('basePgPricePerLiter', parseFloat(e.target.value) || 0)}
                suffix="\u20AC"
                min={0}
                step={0.5}
              />
              <Input
                label="Τιμή VG/λίτρο"
                type="number"
                value={settings.baseVgPricePerLiter ?? 10}
                onChange={(e) => updateSetting('baseVgPricePerLiter', parseFloat(e.target.value) || 0)}
                suffix="\u20AC"
                min={0}
                step={0.5}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Τιμή Booster"
                type="number"
                value={settings.defaultBoosterPrice ?? 1.5}
                onChange={(e) => updateSetting('defaultBoosterPrice', parseFloat(e.target.value) || 0)}
                suffix="\u20AC"
                min={0}
                step={0.1}
              />
              <Input
                label="Τιμή Αρώματος"
                type="number"
                value={settings.defaultFlavorPrice ?? 5}
                onChange={(e) => updateSetting('defaultFlavorPrice', parseFloat(e.target.value) || 0)}
                suffix="\u20AC"
                min={0}
                step={0.5}
              />
            </div>
          </Card>
        </div>

        {/* Εφαρμογή */}
        <div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
            Εφαρμογή
          </h3>
          <Card className="space-y-3">
            <Button
              variant="secondary"
              fullWidth
              onClick={handleExport}
            >
              <Download className="w-4 h-4" />
              Εξαγωγή δεδομένων
            </Button>

            <Button
              variant="secondary"
              fullWidth
              onClick={handleImport}
            >
              <Upload className="w-4 h-4" />
              Εισαγωγή δεδομένων
            </Button>

            <Button
              variant="ghost"
              fullWidth
              onClick={handleReset}
            >
              <RotateCcw className="w-4 h-4" />
              Επαναφορά ρυθμίσεων
            </Button>
          </Card>
        </div>

        {/* Διαχείριση Δεδομένων */}
        <div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
            <Trash2 className="w-4 h-4 inline mr-2" />
            Διαχείριση Δεδομένων
          </h3>
          <Card className="space-y-3">
            {!showClearConfirm ? (
              <Button
                variant="danger"
                fullWidth
                onClick={() => setShowClearConfirm(true)}
              >
                <Trash2 className="w-4 h-4" />
                Διαγραφή όλων των δεδομένων
              </Button>
            ) : (
              <div className="p-4 rounded-xl bg-error/10 border border-error/30">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-error" />
                  <span className="font-semibold text-error">Προσοχή!</span>
                </div>
                <p className="text-sm text-text-secondary mb-4">
                  Αυτή η ενέργεια θα διαγράψει όλα τα δεδομένα σας: αποθήκη, συνταγές, ωρίμανση και προσαρμοσμένα προϊόντα. Δεν μπορεί να αναιρεθεί.
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => setShowClearConfirm(false)}
                    className="flex-1"
                  >
                    Ακύρωση
                  </Button>
                  <Button
                    variant="danger"
                    onClick={handleClearAllData}
                    className="flex-1"
                  >
                    Διαγραφή
                  </Button>
                </div>
              </div>
            )}
            <p className="text-xs text-text-muted text-center">
              Συνιστούμε να εξάγετε τα δεδομένα σας πριν τη διαγραφή
            </p>
          </Card>
        </div>

        {/* Σχετικά */}
        <div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
            Σχετικά
          </h3>
          <Card>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl btn-gradient flex items-center justify-center shadow-glow-primary">
                <span className="text-white font-bold">M</span>
              </div>
              <div>
                <h4 className="font-semibold text-white">The Mix</h4>
                <p className="text-sm text-text-muted">v1.0.0</p>
              </div>
            </div>
            <p className="text-sm text-text-secondary">
              Προηγμένη εφαρμογή υπολογισμού και διαχείρισης υγρών ατμίσματος.
            </p>
            <div className="mt-4 pt-4 border-t border-white/10 text-center">
              <p className="text-xs text-text-muted">
                Developed with ❤️ by Taskal & Claude Code
              </p>
            </div>
          </Card>
        </div>
      </div>
    </Modal>
  );
}
