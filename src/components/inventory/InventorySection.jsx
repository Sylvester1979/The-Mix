import { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, AlertTriangle } from 'lucide-react';
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

  // Count low stock and out of stock items
  const lowStockCount = items.filter(item => {
    const threshold = item.lowStockThreshold || 2;
    return item.quantity <= threshold && item.quantity > 0;
  }).length;

  const outOfStockCount = items.filter(item => item.quantity === 0).length;

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
          {(lowStockCount > 0 || outOfStockCount > 0) && (
            <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs
              ${outOfStockCount > 0 ? 'bg-error/20 text-error' : 'bg-warning/20 text-warning'}`}>
              <AlertTriangle className="w-3 h-3" />
              {outOfStockCount > 0 ? `${outOfStockCount} εξαντλήθηκε` :
               lowStockCount > 0 ? `${lowStockCount} χαμηλό` : ''}
            </span>
          )}
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
            <div className="text-center py-8">
              {Icon && (
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/5 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-text-muted" />
                </div>
              )}
              <p className="text-text-secondary mb-1">{emptyMessage}</p>
              <p className="text-text-muted text-sm mb-4">
                Πατήστε το κουμπί για να προσθέσετε
              </p>
              <button
                onClick={onAdd}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl
                  btn-gradient text-white text-sm font-medium
                  shadow-glow-primary"
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
