import { PrismaClient } from '@prisma/client';

declare global {
  // para ambientes Node.js:
  var prisma: PrismaClient | undefined;
}
