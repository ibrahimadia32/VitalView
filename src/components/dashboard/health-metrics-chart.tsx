'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

interface HealthMetricsChartProps {
  data: {
    age: string;
    bloodPressure: number;
    cholesterol: number;
    heartRate: number;
  }[];
}

const chartConfig = {
  bloodPressure: {
    label: 'Pression Artérielle',
    color: '#E63946', // Rouge corail pour la pression (indicateur critique)
  },
  cholesterol: {
    label: 'Cholestérol',
    color: '#E89137', // Orange pour le cholestérol
  },
  heartRate: {
    label: 'Rythme Cardiaque',
    color: '#2A9D8F', // Bleu-vert pour le rythme cardiaque
  },
} satisfies ChartConfig;

export function HealthMetricsChart({ data }: HealthMetricsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Métriques de Santé par Âge</CardTitle>
        <CardDescription>Évolution des indicateurs de santé en fonction de l&apos;âge</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="age" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line type="monotone" dataKey="bloodPressure" stroke="var(--color-bloodPressure)" strokeWidth={2} />
            <Line type="monotone" dataKey="cholesterol" stroke="var(--color-cholesterol)" strokeWidth={2} />
            <Line type="monotone" dataKey="heartRate" stroke="var(--color-heartRate)" strokeWidth={2} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
