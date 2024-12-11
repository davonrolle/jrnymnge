/* eslint-disable no-var */

import { PrismaClient } from '@prisma/client';

// Augment the global type with PrismaClient
declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  // Use let or const instead of var
  globalThis.prisma = db;
}

/* eslint-enable no-var */