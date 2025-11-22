import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Modal, Input, Button, StarRating } from '../common';
import { useApp } from '../../context/AppContext';

export default function SaveRecipeModal({
  isOpen,
  onClose,
  result,
  ingredients = {}
}) {
  const { dispatch, actions } = useApp();

  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [rating, setRating] = useState(0);

  const handleSave = (e) => {
    e.preventDefault();

    if (!name.trim() || !result) return;

    const recipe = {
      id: uuidv4(),
      name: name.trim(),
      dateCreated: new Date().toISOString(),
      ingredients: {
        flavor: ingredients.flavor || { id: null, volumeMl: 0 },
        boosters: ingredients.boosters || { id: null, count: 0 },
        pgMl: ingredients.pgMl || 0,
        vgMl: ingredients.vgMl || 0
      },
      result: {
        totalMl: result.totalMl,
        nicotineMgMl: result.nicotineMgMl,
        pgPercent: result.pgPercent,
        vgPercent: result.vgPercent,
        flavorPercent: result.flavorPercent
      },
      notes: notes.trim(),
      rating
    };

    dispatch({ type: actions.ADD_RECIPE, payload: recipe });

    // Reset and close
    setName('');
    setNotes('');
    setRating(0);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Αποθήκευση Συνταγής"
    >
      <form onSubmit={handleSave} className="space-y-4">
        <Input
          label="Όνομα συνταγής"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="π.χ. Tribeca 6mg"
          required
          autoFocus
        />

        <div>
          <label className="text-sm text-text-secondary font-medium mb-1.5 block">
            Βαθμολογία
          </label>
          <StarRating
            rating={rating}
            onChange={setRating}
            size="lg"
          />
        </div>

        <div>
          <label className="text-sm text-text-secondary font-medium mb-1.5 block">
            Σημειώσεις (προαιρετικό)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Προσθέστε σημειώσεις για τη συνταγή..."
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl
              px-4 py-3 text-white placeholder:text-text-muted
              transition-all duration-200 resize-none
              focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20"
          />
        </div>

        {result && (
          <div className="p-3 rounded-xl bg-white/5">
            <div className="text-sm text-text-secondary mb-2">Αποτέλεσμα:</div>
            <div className="flex gap-4 text-sm">
              <span className="text-white">{result.totalMl} ml</span>
              <span className="text-warning">{result.nicotineMgMl} mg</span>
              <span>
                <span className="text-info">{result.pgPercent}</span>
                <span className="text-text-muted">/</span>
                <span className="text-success">{result.vgPercent}</span>
              </span>
            </div>
          </div>
        )}

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
            disabled={!name.trim()}
          >
            Αποθήκευση
          </Button>
        </div>
      </form>
    </Modal>
  );
}
