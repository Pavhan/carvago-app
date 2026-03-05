import path from 'node:path';
import dotenv from 'dotenv';
import { cars } from './schema';

function loadEnv() {
  const root = process.cwd();
  dotenv.config({ path: path.join(root, '.env.local') });
}

async function seed() {
  loadEnv();
  const { db } = await import('./db');
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
    {
      name: 'Audi Q5 40 TDI quattro S tronic 150 kW',
      slug: 'audi-q5-40-tdi-quattro-s-tronic-150-kw',
      imageUrl:
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80',
      mileageKm: 58200,
      firstRegistration: '09/2021',
      powerKw: 150,
      powerHp: 204,
      transmission: 'Automat',
      fuelType: 'Diesel',
      locationCountry: 'Rakousko',
      deliveryPriceCzk: 11900,
      monthlyPaymentCzk: 10490,
      totalPriceCzk: 979000,
      vatPriceCzk: 809091,
      priceRatingLabel: 'Velmi dobrá cena',
      partnerLabel: 'Ověřený partner',
      equipmentTags: ['Quattro', 'Virtual Cockpit', 'Apple CarPlay'],
    },
    {
      name: 'Volkswagen ID.4 Pro Performance 150 kW',
      slug: 'volkswagen-id-4-pro-performance-150-kw',
      imageUrl:
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1600&q=80',
      mileageKm: 21000,
      firstRegistration: '02/2023',
      powerKw: 150,
      powerHp: 204,
      transmission: 'Automat',
      fuelType: 'Elektro',
      locationCountry: 'Česko',
      deliveryPriceCzk: 9900,
      monthlyPaymentCzk: 11290,
      totalPriceCzk: 1049000,
      vatPriceCzk: 866942,
      priceRatingLabel: 'Dobrá cena',
      partnerLabel: 'Prémiový partner',
      equipmentTags: ['Tepelné čerpadlo', '360° kamera', 'Nabíjení DC'],
    },
  ]);

  console.log('Seed completed');
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
