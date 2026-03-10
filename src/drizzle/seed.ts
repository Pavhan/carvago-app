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
      name: 'Cupra Formentor VZ 1.5 e-Hybrid',
      slug: 'cupra-formentor-vz-1-5-e-hybrid',
      imageUrl: '/images/cars/cupra-formentor.jpg',
      transmission: 'Automat',
      fuelType: 'Hybrid',
      price: 1184990,
    },
    {
      name: 'Škoda Octavia Combi RS 2.0 TSI',
      slug: 'skoda-octavia-combi-rs-2-0-tsi',
      imageUrl: '/images/cars/skoda-octavia.jpg',
      transmission: 'Manuál',
      fuelType: 'Benzín',
      price: 819000,
    },
    {
      name: 'Audi Q5 40 TDI quattro',
      slug: 'audi-q5-40-tdi-quattro',
      imageUrl: '/images/cars/audi-q5.jpg',
      transmission: 'Automat',
      fuelType: 'Nafta',
      price: 979000,
    },
    {
      name: 'Volkswagen ID.4 Pro Performance',
      slug: 'volkswagen-id-4-pro-performance',
      imageUrl: '/images/cars/vw-id4.jpg',
      transmission: 'Automat',
      fuelType: 'Elektro',
      price: 1049000,
    },
    {
      name: 'BMW 330i Touring xDrive M Sport',
      slug: 'bmw-330i-touring-xdrive-m-sport',
      imageUrl: '/images/cars/bmw-330i.jpg',
      transmission: 'Automat',
      fuelType: 'Benzín',
      price: 1299000,
    },
    {
      name: 'Mercedes-Benz GLC 220 d 4MATIC',
      slug: 'mercedes-benz-glc-220-d-4matic',
      imageUrl: '/images/cars/mercedes-glc.jpg',
      transmission: 'Automat',
      fuelType: 'Nafta',
      price: 1149000,
    },
    {
      name: 'Tesla Model 3 Long Range AWD',
      slug: 'tesla-model-3-long-range-awd',
      imageUrl: '/images/cars/tesla-model3.jpg',
      transmission: 'Automat',
      fuelType: 'Elektro',
      price: 1199000,
    },
    {
      name: 'Volvo XC60 B5 AWD Inscription',
      slug: 'volvo-xc60-b5-awd-inscription',
      imageUrl: '/images/cars/volvo-xc60.jpg',
      transmission: 'Automat',
      fuelType: 'Benzín',
      price: 1129000,
    },
    {
      name: 'Peugeot 3008 Hybrid4 GT',
      slug: 'peugeot-3008-hybrid4-gt',
      imageUrl: '/images/cars/peugeot-3008.jpg',
      transmission: 'Manuál',
      fuelType: 'Hybrid',
      price: 989000,
    },
  ]);

  console.log('Seed completed');
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
