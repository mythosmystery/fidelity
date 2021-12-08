import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();
async function seed() {
   await db.customer.create({ data: { name: 'test', phoneNumber: '111-111-1111' } });
   await db.customer.create({ data: { name: 'test2', phoneNumber: '222-222-2222' } });
}
seed();
