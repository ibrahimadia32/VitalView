'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

interface AgeDistributionChartProps {
  data: {
    ageRange: string;
    count: number;
    healthy: number;
    diseased: number;
  }[];
}

const chartConfig = {
  healthy: {
    label: 'Sains',
    color: '#2ECC71', // Vert pour les patients sains
  },
  diseased: {
    label: 'Malades',
    color: '#E63946', // Rouge corail pour les patients malades
  },
} satisfies ChartConfig;

export function AgeDistributionChart({ data }: AgeDistributionChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribution par Âge</CardTitle>
        <CardDescription>Répartition des patients sains vs malades par tranche d&apos;âge</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ageRange" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="healthy" fill="var(--color-healthy)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="diseased" fill="var(--color-diseased)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
