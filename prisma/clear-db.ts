// prisma/clear-db.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearDatabase() {
  try {
    // Delete all records from the relevant Prisma models

    // for the time being this is not working 
    await prisma.pokemon.deleteMany({});
    await prisma.type.deleteMany({});

    console.log('Database cleared successfully');
  } catch (error) {
    console.error('Error clearing the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

clearDatabase();
