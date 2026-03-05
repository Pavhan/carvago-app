import path from 'node:path';
import dotenv from 'dotenv';
import { cars } from './schema';

function loadEnv() {
  const root = process.cwd();
  dotenv.config({ path: path.join(root, '.env.local') });
}

async function seed() {
  loadEnv();
  const { db } = await import('./index');
  await db.delete(cars);

  await db.insert(cars).values([
    {
      name: 'Cupra Formentor VZ 1.5 e-Hybrid Black Edition 200 kW',
      slug: 'cupra-formentor-vz-1-5-e-hybrid-black-edition-200-kw',
      imageUrl:
        'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1600&q=80',
      mileageKm: 10,
      firstRegistration: '12/2025',
      powerKw: 200,
      powerHp: 272,
      transmission: 'Automat',
      fuelType: 'Hybrid',
      locationCountry: 'Německo',
      deliveryPriceCzk: 13540,
      monthlyPaymentCzk: 9659,
      totalPriceCzk: 1184990,
      vatPriceCzk: 979331,
      priceRatingLabel: 'Velmi dobrá cena',
      partnerLabel: 'Prémiový partner',
      equipmentTags: [
        'TOP výbava',
        '360° parkovací kamera',
        'Regulace tuhosti podvozku',
      ],
    },
    {
      name: 'Škoda Octavia Combi RS 2.0 TSI 180 kW',
      slug: 'skoda-octavia-combi-rs-2-0-tsi-180-kw',
      imageUrl:
        'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1600&q=80',
      mileageKm: 32450,
      firstRegistration: '05/2022',
      powerKw: 180,
      powerHp: 245,
      transmission: 'Automat',
      fuelType: 'Benzín',
      locationCountry: 'Česko',
      deliveryPriceCzk: 8900,
      monthlyPaymentCzk: 7990,
      totalPriceCzk: 819000,
      vatPriceCzk: 676860,
      priceRatingLabel: 'Dobrá cena',
      partnerLabel: 'Ověřený partner',
      equipmentTags: ['Matrix LED', 'Adaptivní tempomat', 'Vyhřívaná sedadla'],
    },
  ]);

  console.log('Seed completed');
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
