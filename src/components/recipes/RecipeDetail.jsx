import { Trash2, Clock, FlaskConical } from 'lucide-react';
import { Modal, Button, StarRating, Card } from '../common';
import PgVgBar from '../mixlab/PgVgBar';

export default function RecipeDetail({
  recipe,
  isOpen,
  onClose,
  onDelete,
  onUpdateRating,
  onStartSteep
}) {
  if (!recipe) return null;

  const { name, result, ingredients, notes, rating = 0, dateCreated } = recipe;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('el-GR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

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

        {/* Result Summary */}
        <Card className="bg-white/[0.02]">
          <PgVgBar pgPercent={result.pgPercent} vgPercent={result.vgPercent} />

          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="text-center">
              <div className="text-lg font-bold text-white">{result.totalMl}</div>
              <div className="text-xs text-text-muted">ml</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-warning">{result.nicotineMgMl}</div>
              <div className="text-xs text-text-muted">mg/ml</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-accent-secondary">{result.flavorPercent}%</div>
              <div className="text-xs text-text-muted">Άρωμα</div>
            </div>
          </div>
        </Card>

        {/* Ingredients */}
        <div>
          <h4 className="font-semibold text-white mb-2">Υλικά</h4>
          <div className="space-y-2">
            {ingredients.flavor && (
              <div className="flex justify-between p-3 rounded-xl bg-white/5">
                <span className="text-text-secondary">Άρωμα</span>
                <span className="text-white font-medium">{ingredients.flavor.volumeMl} ml</span>
              </div>
            )}
            {ingredients.boosters && (
              <div className="flex justify-between p-3 rounded-xl bg-white/5">
                <span className="text-text-secondary">Boosters</span>
                <span className="text-white font-medium">{ingredients.boosters.count} τεμ.</span>
              </div>
            )}
            {ingredients.pgMl > 0 && (
              <div className="flex justify-between p-3 rounded-xl bg-white/5">
                <span className="text-text-secondary">Βάση PG</span>
                <span className="text-white font-medium">{ingredients.pgMl} ml</span>
              </div>
            )}
            {ingredients.vgMl > 0 && (
              <div className="flex justify-between p-3 rounded-xl bg-white/5">
                <span className="text-text-secondary">Βάση VG</span>
                <span className="text-white font-medium">{ingredients.vgMl} ml</span>
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
            onClick={onClose}
            fullWidth
          >
            <FlaskConical className="w-4 h-4" />
            Στο Lab
          </Button>
        </div>
      </div>
    </Modal>
  );
}
