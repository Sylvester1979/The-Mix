import { useState } from 'react';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { Card } from '../common';
import InventoryItem from './InventoryItem';

export default function InventorySection({
  title,
  icon: Icon,
  items = [],
  onUpdateQuantity,
  onAdd,
  emptyMessage = 'Δεν υπάρχουν αντικείμενα',
  className = ''
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  const totalMl = items.reduce((sum, item) => {
    const volumeMl = item.product?.volumeMl || 0;
    return sum + (item.quantity * volumeMl);
  }, 0);

  return (
    <Card className={className} padding="none">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4"
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5 text-accent-primary" />}
          <h3 className="font-semibold text-white">{title}</h3>
          <span className="text-sm text-text-muted">
            ({items.length} | {totalMl} ml)
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-text-muted" />
        ) : (
          <ChevronDown className="w-5 h-5 text-text-muted" />
        )}
      </button>

      {isExpanded && (
        <div className="px-4 pb-4">
          {items.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-text-muted mb-3">{emptyMessage}</p>
              <button
                onClick={onAdd}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl
                  bg-white/5 text-accent-primary text-sm font-medium
                  hover:bg-white/10 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Προσθήκη
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {items.map((item) => (
                <InventoryItem
                  key={item.productId}
                  item={item}
                  onUpdateQuantity={(qty) => onUpdateQuantity(item.productId, qty)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
