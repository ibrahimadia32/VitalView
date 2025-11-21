import { StatsCards } from '@/components/dashboard/stats-cards';
import { AgeDistributionChart } from '@/components/dashboard/age-distribution-chart';
import { HealthMetricsChart } from '@/components/dashboard/health-metrics-chart';
import { DiseaseFactorsChart } from '@/components/dashboard/disease-factors-chart';
import { DataTable } from '@/components/dashboard/data-table';
import prisma from '@/lib/prisma';

async function getDashboardData() {
  // Récupérer toutes les données cardiovasculaires
  const allData = await prisma.cardiovascularData.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Calculer les statistiques
  const totalPatients = allData.length;
  const averageAge = allData.reduce((sum, d) => sum + d.age, 0) / totalPatients || 0;
  const diseaseCount = allData.filter((d) => d.disease > 0).length;
  const diseaseRate = (diseaseCount / totalPatients) * 100 || 0;
  const averageHeartRate = allData.reduce((sum, d) => sum + d.heartRate, 0) / totalPatients || 0;

  // Distribution par âge
  const ageRanges = [
    { min: 0, max: 40, label: '< 40' },
    { min: 40, max: 50, label: '40-50' },
    { min: 50, max: 60, label: '50-60' },
    { min: 60, max: 70, label: '60-70' },
    { min: 70, max: 100, label: '> 70' },
  ];

  const ageDistribution = ageRanges.map((range) => {
    const inRange = allData.filter((d) => d.age >= range.min && d.age < range.max);
    return {
      ageRange: range.label,
      count: inRange.length,
      healthy: inRange.filter((d) => d.disease === 0).length,
      diseased: inRange.filter((d) => d.disease > 0).length,
    };
  });

  // Métriques de santé par âge (moyennes par tranche d'âge)
  const healthMetrics = ageRanges.map((range) => {
    const inRange = allData.filter((d) => d.age >= range.min && d.age < range.max);
    const count = inRange.length || 1;
    return {
      age: range.label,
      bloodPressure: inRange.reduce((sum, d) => sum + d.bloodPressure, 0) / count || 0,
      cholesterol: inRange.reduce((sum, d) => sum + d.cholesterol, 0) / count || 0,
      heartRate: inRange.reduce((sum, d) => sum + d.heartRate, 0) / count || 0,
    };
  });

  // Facteurs de risque
  const highBloodPressure = allData.filter((d) => d.bloodPressure > 140).length;
  const highCholesterol = allData.filter((d) => d.cholesterol > 240).length;
  const highGlycemia = allData.filter((d) => d.glycemia === 1).length;
  const anginaPresent = allData.filter((d) => d.anginaAfterSport === 1).length;

  const riskFactors = [
    { name: 'Hypertension', value: highBloodPressure, color: 'hsl(var(--chart-1))' },
    { name: 'Cholestérol Élevé', value: highCholesterol, color: 'hsl(var(--chart-2))' },
    { name: 'Glycémie Élevée', value: highGlycemia, color: 'hsl(var(--chart-3))' },
    { name: 'Angine', value: anginaPresent, color: 'hsl(var(--chart-4))' },
  ];

  // Derniers enregistrements pour le tableau
  const recentData = allData.slice(0, 10).map((d) => ({
    id: d.id,
    age: d.age,
    sex: d.sex,
    bloodPressure: d.bloodPressure,
    cholesterol: d.cholesterol,
    heartRate: d.heartRate,
    disease: d.disease,
  }));

  return {
    stats: {
      totalPatients,
      averageAge,
      diseaseRate,
      averageHeartRate,
    },
    ageDistribution,
    healthMetrics,
    riskFactors,
    recentData,
  };
}

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard Cardiovasculaire</h2>
          <p className="text-muted-foreground mt-1">Vue d&apos;ensemble des données de santé cardiovasculaire</p>
        </div>
        x
      </div>

      <StatsCards {...data.stats} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <AgeDistributionChart data={data.ageDistribution} />
        </div>
        <div className="col-span-3">
          <DiseaseFactorsChart data={data.riskFactors} />
        </div>
      </div>

      <div className="grid gap-4">
        <HealthMetricsChart data={data.healthMetrics} />
      </div>

      <DataTable data={data.recentData} />
    </div>
  );
}
