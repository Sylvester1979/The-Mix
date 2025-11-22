import { Droplets, Zap } from 'lucide-react';
import { Card, StarRating } from '../common';

export default function RecipeCard({
  recipe,
  onClick,
  onUpdateRating
}) {
  const { name, result, dateCreated, rating = 0 } = recipe;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('el-GR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Card
      className="cursor-pointer hover:bg-white/[0.04] transition-colors"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-semibold text-white">{name}</h3>
          <p className="text-sm text-text-muted">{formatDate(dateCreated)}</p>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <StarRating
            rating={rating}
            onChange={onUpdateRating}
            size="sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center gap-1.5 text-sm">
          <Droplets className="w-4 h-4 text-accent-primary" />
          <span className="text-white font-medium">{result.totalMl}</span>
          <span className="text-text-muted">ml</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm">
          <Zap className="w-4 h-4 text-warning" />
          <span className="text-white font-medium">{result.nicotineMgMl}</span>
          <span className="text-text-muted">mg/ml</span>
        </div>
        <div className="text-sm">
          <span className="text-info">{result.pgPercent}</span>
          <span className="text-text-muted">/</span>
          <span className="text-success">{result.vgPercent}</span>
        </div>
      </div>
    </Card>
  );
}
