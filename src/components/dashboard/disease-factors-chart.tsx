'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { Cell, Pie, PieChart } from 'recharts';

interface DiseaseFactorsChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

const chartConfig = {
  value: {
    label: 'Patients',
  },
} satisfies ChartConfig;

const COLORS = [
  '#E63946', // Rouge corail pour Hypertension (danger)
  '#E89137', // Orange pour Cholestérol (avertissement)
  '#9B59B6', // Violet pour Glycémie
  '#2A9D8F', // Bleu-vert pour Angine
];

export function DiseaseFactorsChart({ data }: DiseaseFactorsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Facteurs de Risque</CardTitle>
        <CardDescription>Distribution des principaux facteurs de risque</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <ChartContainer config={chartConfig} className="h-[300px]">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
