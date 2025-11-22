import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Modal, Input, Select, Button, Slider } from '../common';
import { useApp } from '../../context/AppContext';

export default function AddSteepModal({
  isOpen,
  onClose,
  defaultRecipeId = null
}) {
  const { state, dispatch, actions } = useApp();
  const { recipes, settings } = state;

  const [batchName, setBatchName] = useState('');
  const [recipeId, setRecipeId] = useState(defaultRecipeId || '');
  const [targetDays, setTargetDays] = useState(settings.defaultSteepDays);
  const [notes, setNotes] = useState('');

  const recipeOptions = [
    { value: '', label: 'Χωρίς σύνδεση' },
    ...recipes.map(r => ({
      value: r.id,
      label: r.name
    }))
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!batchName.trim()) return;

    const entry = {
      id: uuidv4(),
      recipeId: recipeId || null,
      batchName: batchName.trim(),
      startDate: new Date().toISOString(),
      targetDays,
      status: 'steeping',
      notes: notes.trim()
    };

    dispatch({ type: actions.ADD_STEEP, payload: entry });

    // Reset and close
    setBatchName('');
    setRecipeId('');
    setTargetDays(settings.defaultSteepDays);
    setNotes('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Νέα Ωρίμανση"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Όνομα παρτίδας"
          value={batchName}
          onChange={(e) => setBatchName(e.target.value)}
          placeholder="π.χ. Tribeca #1"
          required
          autoFocus
        />

        {recipes.length > 0 && (
          <Select
            label="Σύνδεση με συνταγή"
            options={recipeOptions}
            value={recipeId}
            onChange={(e) => setRecipeId(e.target.value)}
          />
        )}

        <Slider
          label="Ημέρες ωρίμανσης"
          value={targetDays}
          min={1}
          max={30}
          step={1}
          suffix=" ημ."
          onChange={(e) => setTargetDays(parseInt(e.target.value))}
        />

        <div>
          <label className="text-sm text-text-secondary font-medium mb-1.5 block">
            Σημειώσεις (προαιρετικό)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Προσθέστε σημειώσεις..."
            rows={2}
            className="w-full bg-white/5 border border-white/10 rounded-xl
              px-4 py-3 text-white placeholder:text-text-muted
              transition-all duration-200 resize-none
              focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            fullWidth
          >
            Ακύρωση
          </Button>
          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={!batchName.trim()}
          >
            Προσθήκη
          </Button>
        </div>
      </form>
    </Modal>
  );
}
