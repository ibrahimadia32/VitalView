import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Heart, Users, TrendingUp } from 'lucide-react';

interface StatsCardsProps {
  totalPatients: number;
  averageAge: number;
  diseaseRate: number;
  averageHeartRate: number;
}

export function StatsCards({ totalPatients, averageAge, diseaseRate, averageHeartRate }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPatients}</div>
          <p className="text-xs text-muted-foreground">Enregistrements totaux</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Âge Moyen</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageAge.toFixed(1)} ans</div>
          <p className="text-xs text-muted-foreground">Moyenne d&apos;âge</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Taux de Maladie</CardTitle>
          <Heart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{diseaseRate.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">Patients avec maladie cardiovasculaire</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Rythme Cardiaque</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageHeartRate.toFixed(0)} bpm</div>
          <p className="text-xs text-muted-foreground">Moyenne du rythme max</p>
        </CardContent>
      </Card>
    </div>
  );
}
