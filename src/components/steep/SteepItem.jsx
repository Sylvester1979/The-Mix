import { useState } from 'react';
import { ChevronDown, ChevronUp, Archive, Trash2, Check } from 'lucide-react';
import { Card, ProgressBar } from '../common';

export default function SteepItem({
  entry,
  isReady = false,
  isArchived = false,
  onArchive,
  onDelete
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    batchName,
    startDate,
    targetDays,
    daysPassed,
    daysRemaining,
    progress,
    notes
  } = entry;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('el-GR', {
      day: 'numeric',
      month: 'short'
    });
  };

  const getProgressColor = () => {
    if (isReady) return 'success';
    if (progress >= 75) return 'warning';
    return 'primary';
  };

  return (
    <Card
      className={`${isReady ? 'border-success/30 bg-success/5' : ''} ${isArchived ? 'opacity-60' : ''}`}
      padding="none"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 text-left"
      >
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-white">{batchName}</h4>
          <div className="flex items-center gap-2">
            {isReady && !isArchived && (
              <span className="px-2 py-0.5 rounded-full bg-success/20 text-success text-xs font-medium flex items-center gap-1">
                <Check className="w-3 h-3" />
                Έτοιμο
              </span>
            )}
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-text-muted" />
            ) : (
              <ChevronDown className="w-5 h-5 text-text-muted" />
            )}
          </div>
        </div>

        <ProgressBar
          value={daysPassed}
          max={targetDays}
          color={getProgressColor()}
          size="md"
        />

        <div className="flex items-center justify-between mt-2 text-sm">
          <span className="text-text-muted">
            {formatDate(startDate)} · {daysPassed}/{targetDays} ημέρες
          </span>
          {!isReady && !isArchived && (
            <span className={`font-medium ${daysRemaining <= 2 ? 'text-warning' : 'text-text-secondary'}`}>
              {daysRemaining === 0 ? 'Σήμερα!' : `${daysRemaining} ημέρες ακόμα`}
            </span>
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-white/5 pt-3">
          {notes && (
            <p className="text-sm text-text-secondary mb-3">{notes}</p>
          )}

          <div className="flex gap-2">
            {!isArchived && onArchive && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onArchive();
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg
                  bg-white/5 text-text-secondary text-sm
                  hover:bg-white/10 transition-colors"
              >
                <Archive className="w-4 h-4" />
                Αρχειοθέτηση
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg
                bg-error/10 text-error text-sm
                hover:bg-error/20 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Διαγραφή
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}
