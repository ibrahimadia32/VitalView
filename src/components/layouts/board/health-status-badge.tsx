interface HealthStatusBadgeProps {
  totalPatients: number;
  diseaseCount: number;
}

export function HealthStatusBadge({ totalPatients, diseaseCount }: HealthStatusBadgeProps) {
  const healthyCount = totalPatients - diseaseCount;
  const healthRate = totalPatients > 0 ? (healthyCount / totalPatients) * 100 : 0;

  const getStatusColor = () => {
    if (healthRate >= 70) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (healthRate >= 50) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  };

  const getStatusText = () => {
    if (healthRate >= 70) return 'Bon';
    if (healthRate >= 50) return 'Moyen';
    return 'Critique';
  };

  return (
    <div className="hidden xl:flex items-center gap-2">
      <span className="text-xs text-muted-foreground">État de santé global :</span>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
        {getStatusText()} ({healthRate.toFixed(0)}%)
      </span>
    </div>
  );
}
