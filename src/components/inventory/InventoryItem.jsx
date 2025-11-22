import { Minus, Plus, Trash2, AlertTriangle } from 'lucide-react';

export default function InventoryItem({
  item,
  onUpdateQuantity,
  onUpdateThreshold
}) {
  const { product, quantity, lowStockThreshold = 2 } = item;
  const totalMl = quantity * (product?.volumeMl || 0);
  const isLowStock = quantity <= lowStockThreshold && quantity > 0;
  const isOutOfStock = quantity === 0;

  const handleIncrease = () => {
    onUpdateQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    onUpdateQuantity(quantity - 1);
  };

  const handleDelete = () => {
    onUpdateQuantity(0);
  };

  return (
    <div className={`flex items-center justify-between p-3 rounded-xl group transition-colors
      ${isOutOfStock ? 'bg-error/10 border border-error/30' :
        isLowStock ? 'bg-warning/10 border border-warning/30' : 'bg-white/5'}`}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <div className="font-medium text-white truncate">
            {product?.name}
          </div>
          {isLowStock && !isOutOfStock && (
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-xs bg-warning/20 text-warning">
              <AlertTriangle className="w-3 h-3" />
              Χαμηλό
            </span>
          )}
          {isOutOfStock && (
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-xs bg-error/20 text-error">
              <AlertTriangle className="w-3 h-3" />
              Εξαντλήθηκε
            </span>
          )}
        </div>
        <div className="text-sm text-text-secondary">
          {product?.brand} · {product?.volumeMl}ml
          {product?.nicotineMgMl && ` · ${product.nicotineMgMl}mg`}
        </div>
      </div>

      <div className="flex items-center gap-2 ml-3">
        <div className="text-right mr-2">
          <div className={`font-semibold ${isOutOfStock ? 'text-error' : isLowStock ? 'text-warning' : 'text-white'}`}>
            {quantity} τεμ.
          </div>
          <div className="text-xs text-text-muted">{totalMl} ml</div>
        </div>

        <button
          onClick={handleDecrease}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <Minus className="w-4 h-4 text-white" />
        </button>

        <button
          onClick={handleIncrease}
          className="p-2 rounded-lg btn-gradient shadow-glow-primary"
        >
          <Plus className="w-4 h-4 text-white" />
        </button>

        <button
          onClick={handleDelete}
          className="p-2 rounded-lg bg-error/10 hover:bg-error/20 transition-colors
            opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="w-4 h-4 text-error" />
        </button>
      </div>
    </div>
  );
}
