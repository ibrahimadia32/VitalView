'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell } from 'lucide-react';
import { useState } from 'react';

interface NotificationCenterProps {
  diseaseCount: number;
  totalPatients: number;
}

export function NotificationCenter({ diseaseCount, totalPatients }: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const criticalRate = (diseaseCount / totalPatients) * 100;

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" className="relative" onClick={() => setIsOpen(!isOpen)}>
        <Bell className="h-4 w-4" />
        {diseaseCount > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
            {diseaseCount > 9 ? '9+' : diseaseCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <Card className="absolute right-0 top-full mt-2 w-80 z-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Notifications</CardTitle>
              <CardDescription>Alertes et mises à jour</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {diseaseCount > 0 && (
                <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center shrink-0">
                      <Bell className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-900 dark:text-red-100">Patients à risque</p>
                      <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                        {diseaseCount} patient{diseaseCount > 1 ? 's' : ''} avec maladie cardiovasculaire détectée (
                        {criticalRate.toFixed(0)}% du total)
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {diseaseCount === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Aucune notification</p>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
