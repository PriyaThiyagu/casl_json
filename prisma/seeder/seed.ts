import { cloneDeep } from 'lodash';

import { PrismaClient } from '@prisma/client';

import userData from './seed-data/user';
import roleData from './seed-data/role';

const prisma = new PrismaClient();

async function main() {

  for (const user of userData) {
    const createAtts = cloneDeep(user);
    delete createAtts.id;
    await prisma.user.upsert({
      where: {
        id: user.id
      },
      create: { ...createAtts },
      update: { ...user }
    });
  }
  for (const role of roleData) {
    const createAtts = cloneDeep(role);
    delete createAtts.id;
    await prisma.role.upsert({
      where: {
        id: role.id
      },
      create: { ...createAtts },
      update: { ...role }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.log(err)
    await prisma.$disconnect();
  });
