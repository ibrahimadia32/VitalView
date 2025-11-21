import prisma from '@/lib/prisma';

export async function getLastUpdate() {
  const lastUpdate = await prisma.cardiovascularData.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      createdAt: true,
    },
  });

  return lastUpdate?.createdAt || new Date();
}

export function LastUpdateBadge({ date }: { date: Date }) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  let timeAgo = '';
  if (days > 0) {
    timeAgo = `il y a ${days}j`;
  } else if (hours > 0) {
    timeAgo = `il y a ${hours}h`;
  } else if (minutes > 0) {
    timeAgo = `il y a ${minutes}min`;
  } else {
    timeAgo = "à l'instant";
  }

  return (
    <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
      <span>Dernière mise à jour : {timeAgo}</span>
    </div>
  );
}
