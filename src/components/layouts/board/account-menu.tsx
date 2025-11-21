'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';

interface AccountMenuProps {
  totalPatients: number;
  diseaseCount: number;
}

export function AccountMenu({ totalPatients, diseaseCount }: AccountMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={() => setIsOpen(!isOpen)}>
        <User className="h-4 w-4" />
        <span className="hidden sm:inline">Admin</span>
      </Button>

      {isOpen && (
        <>
          {/* Overlay pour fermer le menu */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Menu dropdown */}
          <Card className="absolute right-0 top-full mt-2 w-64 z-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Compte Administrateur</CardTitle>
              <CardDescription>admin@vitalview.com</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Statistiques du compte */}
              <div className="grid grid-cols-2 gap-2 p-3 bg-muted rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground">Patients</p>
                  <p className="text-lg font-semibold">{totalPatients}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">À risque</p>
                  <p className="text-lg font-semibold text-red-600 dark:text-red-400">{diseaseCount}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-1 pt-2 border-t">
                <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => setIsOpen(false)}>
                  <Settings className="mr-2 h-4 w-4" />
                  Paramètres
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                  onClick={() => setIsOpen(false)}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Déconnexion
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
