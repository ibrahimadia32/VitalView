import { PrismaClient } from '@/prisma/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const { Pool } = pg;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: process.env.POSTGRES_USER || 'vitalview',
  password: process.env.POSTGRES_PASSWORD || 'vitalview_dev_password',
  database: process.env.POSTGRES_DB || 'vitalview_db',
});

const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
