import ThemesToggle from '@/components/ui/theme-toggle';
import { Activity, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import prisma from '@/lib/prisma';
import { AccountMenu } from './account-menu';
import { HealthStatusBadge } from './health-status-badge';
import { NotificationCenter } from './notification-center';
import { getLastUpdate, LastUpdateBadge } from './last-update-badge';

async function getAccountStats() {
  const totalPatients = await prisma.cardiovascularData.count();
  const diseaseCount = await prisma.cardiovascularData.count({
    where: {
      disease: {
        gt: 0,
      },
    },
  });

  return {
    totalPatients,
    diseaseCount,
  };
}

export default async function BoardHeader() {
  const stats = await getAccountStats();
  const lastUpdate = await getLastUpdate();

  return (
    <header className="border-b fixed top-0 z-10 bg-background w-full">
      <div className="flex h-16 justify-between items-center px-4 gap-4">
        {/* Logo et Navigation */}
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">VitalView</h1>
          </Link>

          <nav className="hidden md:flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <LastUpdateBadge date={lastUpdate} />
          </nav>
        </div>

        {/* Stats et Actions */}
        <div className="flex items-center gap-4">
          {/* Badge de santé global */}
          <HealthStatusBadge totalPatients={stats.totalPatients} diseaseCount={stats.diseaseCount} />

          {/* Statistiques rapides */}
          <Card className="hidden lg:block">
            <CardContent className="p-2 px-4">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs">Patients</span>
                  <span className="font-semibold">{stats.totalPatients}</span>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs">À risque</span>
                  <span className="font-semibold text-red-600 dark:text-red-400">{stats.diseaseCount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Centre de notifications */}
          <NotificationCenter diseaseCount={stats.diseaseCount} totalPatients={stats.totalPatients} />

          {/* Menu compte utilisateur */}
          <AccountMenu totalPatients={stats.totalPatients} diseaseCount={stats.diseaseCount} />

          {/* Toggle thème */}
          <ThemesToggle />
        </div>
      </div>
    </header>
  );
}
