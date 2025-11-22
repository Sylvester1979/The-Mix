import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Modal, Select, Input, Button } from '../common';
import { TabBar } from '../layout';
import { useApp } from '../../context/AppContext';

const tabs = [
  { id: 'booster', label: 'Booster' },
  { id: 'flavor', label: 'Άρωμα' }
];

export default function AddItemModal({
  isOpen,
  onClose,
  type: initialType = 'booster'
}) {
  const { state, dispatch, actions, getAllBoosters, getAllFlavors } = useApp();

  const [type, setType] = useState(initialType);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isCustom, setIsCustom] = useState(false);

  // Custom product fields
  const [customName, setCustomName] = useState('');
  const [customBrand, setCustomBrand] = useState('');
  const [customVolume, setCustomVolume] = useState(10);
  const [customNicotine, setCustomNicotine] = useState(20);
  const [customPgPercent, setCustomPgPercent] = useState(50);

  const boosters = getAllBoosters();
  const flavors = getAllFlavors();

  const products = type === 'booster' ? boosters : flavors;
  const productOptions = [
    ...products.map(p => ({
      value: p.id,
      label: `${p.brand} - ${p.name}`
    })),
    { value: 'custom', label: '+ Νέο προϊόν...' }
  ];

  const handleProductChange = (e) => {
    const value = e.target.value;
    if (value === 'custom') {
      setIsCustom(true);
      setSelectedProduct('');
    } else {
      setIsCustom(false);
      setSelectedProduct(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let productId = selectedProduct;

    // If custom, create the product first
    if (isCustom) {
      productId = `custom-${uuidv4()}`;
      const customProduct = {
        id: productId,
        name: customName,
        brand: customBrand,
        volumeMl: customVolume,
        pgPercent: customPgPercent,
        vgPercent: 100 - customPgPercent,
        isCustom: true,
        ...(type === 'booster' && {
          nicotineMgMl: customNicotine,
          type: 'freebase'
        }),
        ...(type === 'flavor' && {
          recommendedPercent: 20,
          steepDays: 7
        })
      };

      dispatch({
        type: type === 'booster' ? actions.ADD_CUSTOM_BOOSTER : actions.ADD_CUSTOM_FLAVOR,
        payload: customProduct
      });
    }

    // Add to inventory
    const category = type === 'booster' ? 'boosters' : 'flavors';
    const existingItem = state.inventory[category].find(i => i.productId === productId);

    if (existingItem) {
      dispatch({
        type: actions.UPDATE_INVENTORY_ITEM,
        payload: {
          category,
          productId,
          data: { quantity: existingItem.quantity + quantity }
        }
      });
    } else {
      dispatch({
        type: actions.ADD_INVENTORY_ITEM,
        payload: {
          category,
          item: {
            productId,
            quantity,
            dateAdded: new Date().toISOString()
          }
        }
      });
    }

    // Reset and close
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setSelectedProduct('');
    setQuantity(1);
    setIsCustom(false);
    setCustomName('');
    setCustomBrand('');
    setCustomVolume(10);
    setCustomNicotine(20);
    setCustomPgPercent(50);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Προσθήκη στην Αποθήκη"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <TabBar
          tabs={tabs}
          activeTab={type}
          onTabChange={setType}
        />

        {!isCustom ? (
          <Select
            label="Προϊόν"
            options={productOptions}
            value={selectedProduct}
            onChange={handleProductChange}
            placeholder="Επιλέξτε προϊόν..."
          />
        ) : (
          <div className="space-y-3">
            <Input
              label="Όνομα"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="π.χ. My Custom Booster"
              required
            />
            <Input
              label="Εταιρεία"
              value={customBrand}
              onChange={(e) => setCustomBrand(e.target.value)}
              placeholder="π.χ. DIY"
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Όγκος"
                type="number"
                value={customVolume}
                onChange={(e) => setCustomVolume(parseFloat(e.target.value) || 0)}
                suffix="ml"
                min={1}
              />
              {type === 'booster' && (
                <Input
                  label="Νικοτίνη"
                  type="number"
                  value={customNicotine}
                  onChange={(e) => setCustomNicotine(parseFloat(e.target.value) || 0)}
                  suffix="mg/ml"
                  min={0}
                />
              )}
            </div>
            <Input
              label="PG %"
              type="number"
              value={customPgPercent}
              onChange={(e) => setCustomPgPercent(parseFloat(e.target.value) || 0)}
              suffix="%"
              min={0}
              max={100}
            />
            <button
              type="button"
              onClick={() => setIsCustom(false)}
              className="text-sm text-accent-primary hover:underline"
            >
              ← Επιλογή από λίστα
            </button>
          </div>
        )}

        <Input
          label="Ποσότητα"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          suffix="τεμ."
          min={1}
        />

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
            disabled={!isCustom && !selectedProduct}
          >
            Προσθήκη
          </Button>
        </div>
      </form>
    </Modal>
  );
}
