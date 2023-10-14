import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const users = ['Alice', 'John', 'Doe'];
const companies = [
  { name: '원티드랩', country: '한국', region: '서울' },
  { name: '원티드코리아', country: '한국', region: '부산' },
  { name: '네이버', country: '한국', region: '판교' },
  { name: '카카오', country: '한국', region: '판교' },
];

async function main() {
  // create users
  const usersPromise = users.map((u) =>
    prisma.user.create({ data: { name: u } })
  );

  Promise.allSettled(usersPromise)
    .then(() => console.info('[SEED] Succussfully create user records'))
    .catch((e) => console.error('[SEED] Failed to create user records', e));

  // create companies
  const companiesPromise = companies.map((c) =>
    prisma.company.create({
      data: { name: c.name, country: c.country, region: c.region },
    })
  );

  Promise.allSettled(companiesPromise)
    .then(() => console.info('[SEED] Succussfully create user records'))
    .catch((e) => console.error('[SEED] Failed to create user records', e));
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
