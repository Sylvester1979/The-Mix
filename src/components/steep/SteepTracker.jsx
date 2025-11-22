import { useState, useMemo } from 'react';
import { Plus, Clock, CheckCircle, Archive } from 'lucide-react';
import { Button, Card } from '../common';
import { useApp } from '../../context/AppContext';
import SteepItem from './SteepItem';
import AddSteepModal from './AddSteepModal';

export default function SteepTracker() {
  const { state, dispatch, actions } = useApp();
  const { steepEntries } = state;

  const [showAddModal, setShowAddModal] = useState(false);

  // Calculate days for each entry
  const entriesWithDays = useMemo(() => {
    return steepEntries.map(entry => {
      const startDate = new Date(entry.startDate);
      const now = new Date();
      const diffTime = now - startDate;
      const daysPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const daysRemaining = Math.max(0, entry.targetDays - daysPassed);
      const progress = Math.min(100, (daysPassed / entry.targetDays) * 100);

      return {
        ...entry,
        daysPassed,
        daysRemaining,
        progress,
        isReady: daysPassed >= entry.targetDays
      };
    });
  }, [steepEntries]);

  // Group by status
  const steeping = entriesWithDays.filter(e => e.status === 'steeping' && !e.isReady);
  const ready = entriesWithDays.filter(e => e.status === 'steeping' && e.isReady);
  const archived = entriesWithDays.filter(e => e.status === 'archived');

  const handleUpdateStatus = (id, status) => {
    dispatch({
      type: actions.UPDATE_STEEP,
      payload: { id, status }
    });
  };

  const handleDelete = (id) => {
    dispatch({ type: actions.DELETE_STEEP, payload: id });
  };

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Ωρίμανση</h2>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="w-4 h-4" />
          Νέο
        </Button>
      </div>

      {/* Steeping Section */}
      {steeping.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-warning" />
            <h3 className="font-semibold text-white">Ωριμάζουν</h3>
            <span className="text-sm text-text-muted">({steeping.length})</span>
          </div>
          <div className="space-y-3">
            {steeping.sort((a, b) => a.daysRemaining - b.daysRemaining).map(entry => (
              <SteepItem
                key={entry.id}
                entry={entry}
                onArchive={() => handleUpdateStatus(entry.id, 'archived')}
                onDelete={() => handleDelete(entry.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Ready Section */}
      {ready.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <h3 className="font-semibold text-white">Έτοιμα!</h3>
            <span className="text-sm text-text-muted">({ready.length})</span>
          </div>
          <div className="space-y-3">
            {ready.map(entry => (
              <SteepItem
                key={entry.id}
                entry={entry}
                isReady
                onArchive={() => handleUpdateStatus(entry.id, 'archived')}
                onDelete={() => handleDelete(entry.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Archived Section */}
      {archived.length > 0 && (
        <div>
          <details className="group">
            <summary className="flex items-center gap-2 mb-3 cursor-pointer list-none">
              <Archive className="w-5 h-5 text-text-muted" />
              <h3 className="font-semibold text-text-secondary">Αρχείο</h3>
              <span className="text-sm text-text-muted">({archived.length})</span>
            </summary>
            <div className="space-y-3 mt-3">
              {archived.map(entry => (
                <SteepItem
                  key={entry.id}
                  entry={entry}
                  isArchived
                  onDelete={() => handleDelete(entry.id)}
                />
              ))}
            </div>
          </details>
        </div>
      )}

      {/* Empty State */}
      {steepEntries.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
            <Clock className="w-8 h-8 text-text-muted" />
          </div>
          <p className="text-text-secondary mb-2">Δεν παρακολουθείτε κάποιο υγρό</p>
          <p className="text-text-muted text-sm mb-4">
            Προσθέστε ένα υγρό για να παρακολουθήσετε την ωρίμανσή του
          </p>
          <Button
            variant="primary"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="w-4 h-4" />
            Προσθήκη
          </Button>
        </div>
      )}

      <AddSteepModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
}
