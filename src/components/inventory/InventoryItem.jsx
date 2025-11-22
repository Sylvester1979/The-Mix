import { Minus, Plus, Trash2 } from 'lucide-react';

export default function InventoryItem({
  item,
  onUpdateQuantity
}) {
  const { product, quantity } = item;
  const totalMl = quantity * (product?.volumeMl || 0);

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
    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 group">
      <div className="flex-1 min-w-0">
        <div className="font-medium text-white truncate">
          {product?.name}
        </div>
        <div className="text-sm text-text-secondary">
          {product?.brand} · {product?.volumeMl}ml
          {product?.nicotineMgMl && ` · ${product.nicotineMgMl}mg`}
        </div>
      </div>

      <div className="flex items-center gap-2 ml-3">
        <div className="text-right mr-2">
          <div className="font-semibold text-white">{quantity} τεμ.</div>
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
