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
      imageUrl: '/images/cars/cupra-formentor.avif',
      transmission: 'Automat',
      fuelType: 'Hybrid',
      price: 1184990,
    },
    {
      name: 'Škoda Octavia Combi RS 2.0 TSI',
      slug: 'skoda-octavia-combi-rs-2-0-tsi',
      imageUrl: '/images/cars/skoda-octavia.avif',
      transmission: 'Manuál',
      fuelType: 'Benzín',
      price: 819000,
    },
    {
      name: 'Audi Q5 40 TDI quattro',
      slug: 'audi-q5-40-tdi-quattro',
      imageUrl: '/images/cars/audi-q5.avif',
      transmission: 'Automat',
      fuelType: 'Nafta',
      price: 979000,
    },
    {
      name: 'Volkswagen ID.4 Pro Performance',
      slug: 'volkswagen-id-4-pro-performance',
      imageUrl: '/images/cars/vw-id4.avif',
      transmission: 'Automat',
      fuelType: 'Elektro',
      price: 1049000,
    },
    {
      name: 'BMW 330i Touring xDrive M Sport',
      slug: 'bmw-330i-touring-xdrive-m-sport',
      imageUrl: '/images/cars/bmw-330i.avif',
      transmission: 'Automat',
      fuelType: 'Benzín',
      price: 1299000,
    },
    {
      name: 'Mercedes-Benz GLC 220 d 4MATIC',
      slug: 'mercedes-benz-glc-220-d-4matic',
      imageUrl: '/images/cars/mercedes-glc.avif',
      transmission: 'Automat',
      fuelType: 'Nafta',
      price: 1149000,
    },
    {
      name: 'Tesla Model 3 Long Range AWD',
      slug: 'tesla-model-3-long-range-awd',
      imageUrl: '/images/cars/tesla-model3.avif',
      transmission: 'Automat',
      fuelType: 'Elektro',
      price: 1199000,
    },
    {
      name: 'Volvo XC60 B5 AWD Inscription',
      slug: 'volvo-xc60-b5-awd-inscription',
      imageUrl: '/images/cars/volvo-xc60.avif',
      transmission: 'Automat',
      fuelType: 'Benzín',
      price: 1129000,
    },
    {
      name: 'Peugeot 3008 Hybrid4 GT',
      slug: 'peugeot-3008-hybrid4-gt',
      imageUrl: '/images/cars/peugeot-3008.avif',
      transmission: 'Manuál',
      fuelType: 'Hybrid',
      price: 989000,
    },
    {
      name: 'Audi A4 Avant 40 TFSI S tronic',
      slug: 'audi-a4-avant-40-tfsi-s-tronic',
      imageUrl: '/images/cars/audi-a4-avant.avif',
      transmission: 'Automat',
      fuelType: 'Benzín',
      price: 1049000,
    },
    {
      name: 'Škoda Superb Combi 2.0 TDI Style',
      slug: 'skoda-superb-combi-2-0-tdi-style',
      imageUrl: '/images/cars/skoda-superb-combi.avif',
      transmission: 'Automat',
      fuelType: 'Nafta',
      price: 949000,
    },
    {
      name: 'Audi Q3 35 TDI S tronic',
      slug: 'audi-q3-35-tdi-s-tronic',
      imageUrl: '/images/cars/audi-q3.avif',
      transmission: 'Automat',
      fuelType: 'Nafta',
      price: 899000,
    },
    {
      name: 'Volkswagen Golf GTE eHybrid',
      slug: 'volkswagen-golf-gte-ehybrid',
      imageUrl: '/images/cars/vw-golf-gte.avif',
      transmission: 'Automat',
      fuelType: 'Hybrid',
      price: 799000,
    },
    {
      name: 'BMW X3 xDrive20d M Sport',
      slug: 'bmw-x3-xdrive20d-m-sport',
      imageUrl: '/images/cars/bmw-x3.avif',
      transmission: 'Automat',
      fuelType: 'Nafta',
      price: 1379000,
    },
    {
      name: 'Mercedes-Benz C 220 d Avantgarde',
      slug: 'mercedes-benz-c-220-d-avantgarde',
      imageUrl: '/images/cars/mercedes-c220d.avif',
      transmission: 'Automat',
      fuelType: 'Nafta',
      price: 1229000,
    },
    {
      name: 'Tesla Model Y Long Range AWD',
      slug: 'tesla-model-y-long-range-awd',
      imageUrl: '/images/cars/tesla-model-y.avif',
      transmission: 'Automat',
      fuelType: 'Elektro',
      price: 1269000,
    },
    {
      name: 'Volvo V60 B4 Plus Dark',
      slug: 'volvo-v60-b4-plus-dark',
      imageUrl: '/images/cars/volvo-v60.avif',
      transmission: 'Automat',
      fuelType: 'Benzín',
      price: 1089000,
    },
    {
      name: 'Peugeot 508 SW Plug-in Hybrid',
      slug: 'peugeot-508-sw-plug-in-hybrid',
      imageUrl: '/images/cars/peugeot-508-sw.avif',
      transmission: 'Automat',
      fuelType: 'Hybrid',
      price: 939000,
    },
    {
      name: 'SEAT Leon FR 1.5 eTSI',
      slug: 'seat-leon-fr-1-5-etsi',
      imageUrl: '/images/cars/seat-leon-fr.avif',
      transmission: 'Automat',
      fuelType: 'Benzín',
      price: 679000,
    },
    {
      name: 'Škoda Kodiaq 2.0 TDI DSG 4x4',
      slug: 'skoda-kodiaq-2-0-tdi-dsg-4x4',
      imageUrl: '/images/cars/skoda-kodiaq.avif',
      transmission: 'Automat',
      fuelType: 'Nafta',
      price: 1099000,
    },
    {
      name: 'Audi A6 Avant 45 TDI quattro',
      slug: 'audi-a6-avant-45-tdi-quattro',
      imageUrl: '/images/cars/audi-a6-avant.avif',
      transmission: 'Automat',
      fuelType: 'Nafta',
      price: 1489000,
    },
    {
      name: 'Volkswagen Tiguan 2.0 TSI 4MOTION',
      slug: 'volkswagen-tiguan-2-0-tsi-4motion',
      imageUrl: '/images/cars/vw-tiguan.avif',
      transmission: 'Automat',
      fuelType: 'Benzín',
      price: 1029000,
    },
    {
      name: 'BMW 520d Touring xDrive',
      slug: 'bmw-520d-touring-xdrive',
      imageUrl: '/images/cars/bmw-520d.avif',
      transmission: 'Automat',
      fuelType: 'Nafta',
      price: 1569000,
    },
    {
      name: 'Mercedes-Benz E 300 e AMG Line',
      slug: 'mercedes-benz-e-300-e-amg-line',
      imageUrl: '/images/cars/mercedes-e300e.avif',
      transmission: 'Automat',
      fuelType: 'Hybrid',
      price: 1679000,
    },
    {
      name: 'Tesla Model S Dual Motor',
      slug: 'tesla-model-s-dual-motor',
      imageUrl: '/images/cars/tesla-model-s.avif',
      transmission: 'Automat',
      fuelType: 'Elektro',
      price: 2299000,
    },
    {
      name: 'Volvo XC40 Recharge Twin',
      slug: 'volvo-xc40-recharge-twin',
      imageUrl: '/images/cars/volvo-xc40.avif',
      transmission: 'Automat',
      fuelType: 'Elektro',
      price: 1199000,
    },
    {
      name: 'Peugeot 2008 1.2 PureTech Allure',
      slug: 'peugeot-2008-1-2-puretech-allure',
      imageUrl: '/images/cars/peugeot-2008.avif',
      transmission: 'Manuál',
      fuelType: 'Benzín',
      price: 589000,
    },
    {
      name: 'Cupra Born e-Boost 77 kWh',
      slug: 'cupra-born-e-boost-77-kwh',
      imageUrl: '/images/cars/cupra-born.avif',
      transmission: 'Automat',
      fuelType: 'Elektro',
      price: 1029000,
    },
    {
      name: 'Škoda Enyaq Coupé 80x',
      slug: 'skoda-enyaq-coupe-80x',
      imageUrl: '/images/cars/skoda-enyaq-coupe.avif',
      transmission: 'Automat',
      fuelType: 'Elektro',
      price: 1249000,
    },
  ]);

  console.log('Seed completed');
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
