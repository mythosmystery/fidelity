import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

async function seed() {
   await db.customer.create({
      data: {
         name: 'test testerson',
         phoneNumber: '111-111-1111'
      }
   });
   await db.customer.create({
      data: {
         name: 'test2 test2erson',
         phoneNumber: '222-222-2222'
      }
   });
}

seed();
