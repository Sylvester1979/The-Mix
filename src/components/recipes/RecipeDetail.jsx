import { useState, useMemo } from 'react';
import { Trash2, Clock, FlaskConical, Scale } from 'lucide-react';
import { Modal, Button, StarRating, Card } from '../common';
import PgVgBar from '../mixlab/PgVgBar';
import { round } from '../../utils/calculations';

export default function RecipeDetail({
  recipe,
  isOpen,
  onClose,
  onDelete,
  onUpdateRating,
  onMakeAgain,
  onStartSteep
}) {
  const [scaleFactor, setScaleFactor] = useState(1);

  // Extract values safely (for hooks)
  const result = recipe?.result;
  const ingredients = recipe?.ingredients;
  const name = recipe?.name;
  const notes = recipe?.notes;
  const rating = recipe?.rating ?? 0;
  const dateCreated = recipe?.dateCreated;

  // Calculate scaled values
  const scaledResult = useMemo(() => {
    if (!result) return null;
    return {
      totalMl: round(result.totalMl * scaleFactor, 1),
      nicotineMgMl: result.nicotineMgMl,
      pgPercent: result.pgPercent,
      vgPercent: result.vgPercent,
      flavorPercent: result.flavorPercent
    };
  }, [result, scaleFactor]);

  const scaledIngredients = useMemo(() => {
    if (!ingredients) return null;
    return {
      flavor: ingredients.flavor ? {
        ...ingredients.flavor,
        volumeMl: round(ingredients.flavor.volumeMl * scaleFactor, 1)
      } : null,
      boosters: ingredients.boosters ? {
        ...ingredients.boosters,
        count: round(ingredients.boosters.count * scaleFactor, 1)
      } : null,
      pgMl: round((ingredients.pgMl || 0) * scaleFactor, 1),
      vgMl: round((ingredients.vgMl || 0) * scaleFactor, 1)
    };
  }, [ingredients, scaleFactor]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('el-GR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const scalePresets = [0.5, 1, 2, 3];

  // Early return after all hooks
  if (!recipe || !scaledResult || !scaledIngredients) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={name}
      size="lg"
    >
      <div className="space-y-4">
        {/* Rating & Date */}
        <div className="flex items-center justify-between">
          <StarRating
            rating={rating}
            onChange={onUpdateRating}
            size="md"
          />
          <span className="text-sm text-text-muted">{formatDate(dateCreated)}</span>
        </div>

        {/* Batch Scaling */}
        <Card className="bg-gradient-to-r from-accent-primary/5 to-accent-secondary/5 border border-accent-primary/20">
          <div className="flex items-center gap-2 mb-3">
            <Scale className="w-4 h-4 text-accent-primary" />
            <h4 className="font-semibold text-white text-sm">Κλιμάκωση Συνταγής</h4>
          </div>
          <div className="flex gap-2 mb-3">
            {scalePresets.map((preset) => (
              <button
                key={preset}
                onClick={() => setScaleFactor(preset)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all
                  ${scaleFactor === preset
                    ? 'bg-accent-primary text-white shadow-glow-primary'
                    : 'bg-white/5 text-text-secondary hover:bg-white/10'}`}
              >
                {preset === 1 ? '1x' : `${preset}x`}
              </button>
            ))}
          </div>
          <div className="text-center text-sm text-text-muted">
            {scaleFactor !== 1 && (
              <span className="text-accent-primary font-medium">
                {result.totalMl}ml &rarr; {scaledResult.totalMl}ml
              </span>
            )}
          </div>
        </Card>

        {/* Result Summary */}
        <Card className="bg-white/[0.02]">
          <PgVgBar pgPercent={scaledResult.pgPercent} vgPercent={scaledResult.vgPercent} />

          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="text-center">
              <div className="text-lg font-bold text-white">{scaledResult.totalMl}</div>
              <div className="text-xs text-text-muted">ml</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-warning">{scaledResult.nicotineMgMl}</div>
              <div className="text-xs text-text-muted">mg/ml</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-accent-secondary">{scaledResult.flavorPercent}%</div>
              <div className="text-xs text-text-muted">Άρωμα</div>
            </div>
          </div>
        </Card>

        {/* Ingredients */}
        <div>
          <h4 className="font-semibold text-white mb-2">
            Υλικά
            {scaleFactor !== 1 && (
              <span className="text-xs text-accent-primary ml-2">({scaleFactor}x)</span>
            )}
          </h4>
          <div className="space-y-2">
            {scaledIngredients.flavor && (
              <div className="flex justify-between p-3 rounded-xl bg-white/5">
                <span className="text-text-secondary">Άρωμα</span>
                <span className="text-white font-medium">{scaledIngredients.flavor.volumeMl} ml</span>
              </div>
            )}
            {scaledIngredients.boosters && (
              <div className="flex justify-between p-3 rounded-xl bg-white/5">
                <span className="text-text-secondary">Boosters</span>
                <span className="text-white font-medium">{scaledIngredients.boosters.count} τεμ.</span>
              </div>
            )}
            {scaledIngredients.pgMl > 0 && (
              <div className="flex justify-between p-3 rounded-xl bg-white/5">
                <span className="text-text-secondary">Βάση PG</span>
                <span className="text-white font-medium">{scaledIngredients.pgMl} ml</span>
              </div>
            )}
            {scaledIngredients.vgMl > 0 && (
              <div className="flex justify-between p-3 rounded-xl bg-white/5">
                <span className="text-text-secondary">Βάση VG</span>
                <span className="text-white font-medium">{scaledIngredients.vgMl} ml</span>
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        {notes && (
          <div>
            <h4 className="font-semibold text-white mb-2">Σημειώσεις</h4>
            <p className="text-text-secondary text-sm p-3 rounded-xl bg-white/5">
              {notes}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="danger"
            onClick={onDelete}
            className="flex-shrink-0"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button
            variant="secondary"
            onClick={onStartSteep}
            fullWidth
          >
            <Clock className="w-4 h-4" />
            Steep Timer
          </Button>
          <Button
            variant="primary"
            onClick={onMakeAgain}
            fullWidth
          >
            <FlaskConical className="w-4 h-4" />
            Ξανά στο Lab
          </Button>
        </div>
      </div>
    </Modal>
  );
}
