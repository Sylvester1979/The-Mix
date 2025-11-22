import { useState } from 'react';
import { Plus, Search, Package, Droplet, FlaskConical } from 'lucide-react';
import { Card, Input, Button } from '../common';
import { useApp } from '../../context/AppContext';
import InventorySection from './InventorySection';
import AddItemModal from './AddItemModal';

export default function Inventory() {
  const { state, dispatch, actions, getAllBoosters, getAllFlavors } = useApp();
  const { inventory } = state;

  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [addType, setAddType] = useState('booster');

  const boosters = getAllBoosters();
  const flavors = getAllFlavors();

  // Get inventory items with product details
  const boosterItems = inventory.boosters.map(item => {
    const product = boosters.find(b => b.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product);

  const flavorItems = inventory.flavors.map(item => {
    const product = flavors.find(f => f.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product);

  // Filter by search
  const filterBySearch = (items) => {
    if (!searchQuery) return items;
    const query = searchQuery.toLowerCase();
    return items.filter(item =>
      item.product?.name?.toLowerCase().includes(query) ||
      item.product?.brand?.toLowerCase().includes(query)
    );
  };

  const handleAddItem = (type) => {
    setAddType(type);
    setShowAddModal(true);
  };

  const handleUpdateQuantity = (category, productId, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch({
        type: actions.REMOVE_INVENTORY_ITEM,
        payload: { category, productId }
      });
    } else {
      dispatch({
        type: actions.UPDATE_INVENTORY_ITEM,
        payload: { category, productId, data: { quantity: newQuantity } }
      });
    }
  };

  const handleUpdateBase = (type, value) => {
    dispatch({
      type: actions.UPDATE_INVENTORY_ITEM,
      payload: {
        category: 'bases',
        data: { [type]: value }
      }
    });
  };

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Αποθήκη</h2>
        <Button
          variant="primary"
          size="sm"
          onClick={() => handleAddItem('booster')}
        >
          <Plus className="w-4 h-4" />
          Προσθήκη
        </Button>
      </div>

      <Input
        type="text"
        placeholder="Αναζήτηση..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        prefix={<Search className="w-5 h-5" />}
        className="mb-4"
      />

      {/* Boosters Section */}
      <InventorySection
        title="Boosters"
        icon={Package}
        items={filterBySearch(boosterItems)}
        onUpdateQuantity={(productId, qty) => handleUpdateQuantity('boosters', productId, qty)}
        onAdd={() => handleAddItem('booster')}
        emptyMessage="Δεν έχετε boosters στην αποθήκη"
        className="mb-4"
      />

      {/* Bases Section */}
      <Card className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Droplet className="w-5 h-5 text-accent-primary" />
          <h3 className="font-semibold text-white">Βάσεις</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-white/5">
            <div className="text-sm text-text-secondary mb-1">PG</div>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={inventory.bases.pg}
                onChange={(e) => handleUpdateBase('pg', parseFloat(e.target.value) || 0)}
                suffix="ml"
                min={0}
                step={10}
                className="text-center"
              />
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white/5">
            <div className="text-sm text-text-secondary mb-1">VG</div>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={inventory.bases.vg}
                onChange={(e) => handleUpdateBase('vg', parseFloat(e.target.value) || 0)}
                suffix="ml"
                min={0}
                step={10}
                className="text-center"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Flavors Section */}
      <InventorySection
        title="Αρώματα"
        icon={FlaskConical}
        items={filterBySearch(flavorItems)}
        onUpdateQuantity={(productId, qty) => handleUpdateQuantity('flavors', productId, qty)}
        onAdd={() => handleAddItem('flavor')}
        emptyMessage="Δεν έχετε αρώματα στην αποθήκη"
      />

      <AddItemModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        type={addType}
      />
    </div>
  );
}
