'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Patient {
  id: string;
  age: number;
  sex: number;
  bloodPressure: number;
  cholesterol: number;
  heartRate: number;
  disease: number;
}

interface DataTableProps {
  data: Patient[];
}

export function DataTable({ data }: DataTableProps) {
  const getSexLabel = (sex: number) => (sex === 0 ? 'F' : 'M');
  const getDiseaseLabel = (disease: number) => (disease === 0 ? 'Non' : 'Oui');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Données Patients</CardTitle>
        <CardDescription>Liste des {data.length} derniers enregistrements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 font-medium">Âge</th>
                <th className="text-left p-2 font-medium">Sexe</th>
                <th className="text-left p-2 font-medium">Pression (mmHg)</th>
                <th className="text-left p-2 font-medium">Cholestérol (mg/dl)</th>
                <th className="text-left p-2 font-medium">Rythme (bpm)</th>
                <th className="text-left p-2 font-medium">Maladie</th>
              </tr>
            </thead>
            <tbody>
              {data.map((patient) => (
                <tr key={patient.id} className="border-b hover:bg-muted/50">
                  <td className="p-2">{patient.age}</td>
                  <td className="p-2">{getSexLabel(patient.sex)}</td>
                  <td className="p-2">{patient.bloodPressure}</td>
                  <td className="p-2">{patient.cholesterol}</td>
                  <td className="p-2">{patient.heartRate}</td>
                  <td className="p-2">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs ${
                        patient.disease === 0
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}
                    >
                      {getDiseaseLabel(patient.disease)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
