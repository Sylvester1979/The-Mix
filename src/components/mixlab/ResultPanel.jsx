import { Droplets, Zap, Percent, FlaskConical } from 'lucide-react';
import { Card } from '../common';
import PgVgBar from './PgVgBar';

export default function ResultPanel({
  result,
  onSave,
  onAddSteep,
  className = ''
}) {
  if (!result || result.totalMl === 0) {
    return (
      <Card className={`${className}`}>
        <div className="text-center py-4 text-text-muted">
          Προσθέστε υλικά για να δείτε το αποτέλεσμα
        </div>
      </Card>
    );
  }

  const stats = [
    {
      icon: Droplets,
      label: 'Σύνολο',
      value: result.totalMl,
      suffix: 'ml',
      color: 'text-accent-primary'
    },
    {
      icon: Zap,
      label: 'Νικοτίνη',
      value: result.nicotineMgMl,
      suffix: 'mg/ml',
      color: 'text-warning'
    },
    {
      icon: FlaskConical,
      label: 'Άρωμα',
      value: result.flavorPercent,
      suffix: '%',
      color: 'text-accent-secondary'
    }
  ];

  return (
    <Card className={`${className}`}>
      <PgVgBar pgPercent={result.pgPercent} vgPercent={result.vgPercent} />

      <div className="grid grid-cols-3 gap-3 mt-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="text-center p-3 rounded-xl bg-white/5"
            >
              <Icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
              <div className="text-lg font-bold text-white">
                {stat.value}
                <span className="text-xs text-text-secondary ml-1">{stat.suffix}</span>
              </div>
              <div className="text-xs text-text-muted">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {(onSave || onAddSteep) && (
        <div className="flex gap-2 mt-4">
          {onSave && (
            <button
              onClick={onSave}
              className="flex-1 py-2.5 px-4 rounded-xl bg-white/5 border border-white/10
                text-white text-sm font-medium
                hover:bg-white/10 transition-colors"
            >
              Αποθήκευση
            </button>
          )}
          {onAddSteep && (
            <button
              onClick={onAddSteep}
              className="flex-1 py-2.5 px-4 rounded-xl btn-gradient
                text-white text-sm font-semibold
                shadow-glow-primary hover:shadow-lg transition-shadow"
            >
              Steep Timer
            </button>
          )}
        </div>
      )}
    </Card>
  );
}
