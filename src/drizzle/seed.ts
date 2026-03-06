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
        '/images/cars/cupra-formentor.jpg',
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
        '/images/cars/skoda-octavia.jpg',
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
        '/images/cars/audi-q5.jpg',
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
        '/images/cars/vw-id4.jpg',
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
    {
      name: 'BMW 330i Touring xDrive M Sport 185 kW',
      slug: 'bmw-330i-touring-xdrive-m-sport-185-kw',
      imageUrl:
        '/images/cars/bmw-330i.jpg',
      mileageKm: 27800,
      firstRegistration: '07/2022',
      powerKw: 185,
      powerHp: 252,
      transmission: 'Automat',
      fuelType: 'Benzín',
      locationCountry: 'Německo',
      deliveryPriceCzk: 12400,
      monthlyPaymentCzk: 12890,
      totalPriceCzk: 1299000,
      vatPriceCzk: 1073554,
      priceRatingLabel: 'Velmi dobrá cena',
      partnerLabel: 'Prémiový partner',
      equipmentTags: ['xDrive', 'M Sport', 'Head-up displej'],
    },
    {
      name: 'Mercedes-Benz GLC 220 d 4MATIC 143 kW',
      slug: 'mercedes-benz-glc-220-d-4matic-143-kw',
      imageUrl:
        '/images/cars/mercedes-glc.jpg',
      mileageKm: 46500,
      firstRegistration: '11/2021',
      powerKw: 143,
      powerHp: 194,
      transmission: 'Automat',
      fuelType: 'Diesel',
      locationCountry: 'Rakousko',
      deliveryPriceCzk: 12900,
      monthlyPaymentCzk: 11990,
      totalPriceCzk: 1149000,
      vatPriceCzk: 949587,
      priceRatingLabel: 'Dobrá cena',
      partnerLabel: 'Ověřený partner',
      equipmentTags: ['4MATIC', 'Multibeam LED', 'Bezklíčové odemykání'],
    },
    {
      name: 'Tesla Model 3 Long Range AWD 366 kW',
      slug: 'tesla-model-3-long-range-awd-366-kw',
      imageUrl:
        '/images/cars/tesla-model3.jpg',
      mileageKm: 32000,
      firstRegistration: '03/2022',
      powerKw: 366,
      powerHp: 498,
      transmission: 'Automat',
      fuelType: 'Elektro',
      locationCountry: 'Česko',
      deliveryPriceCzk: 9900,
      monthlyPaymentCzk: 13990,
      totalPriceCzk: 1199000,
      vatPriceCzk: 991736,
      priceRatingLabel: 'Dobrá cena',
      partnerLabel: 'Prémiový partner',
      equipmentTags: ['AWD', 'Autopilot', 'Tepelné čerpadlo'],
    },
    {
      name: 'Volvo XC60 B5 AWD Inscription 184 kW',
      slug: 'volvo-xc60-b5-awd-inscription-184-kw',
      imageUrl:
        '/images/cars/volvo-xc60.jpg',
      mileageKm: 39200,
      firstRegistration: '06/2021',
      powerKw: 184,
      powerHp: 250,
      transmission: 'Automat',
      fuelType: 'Benzín',
      locationCountry: 'Švédsko',
      deliveryPriceCzk: 12200,
      monthlyPaymentCzk: 12490,
      totalPriceCzk: 1129000,
      vatPriceCzk: 932231,
      priceRatingLabel: 'Velmi dobrá cena',
      partnerLabel: 'Ověřený partner',
      equipmentTags: ['AWD', 'Pilot Assist', 'Panoramatická střecha'],
    },
    {
      name: 'Peugeot 3008 Hybrid4 GT 221 kW',
      slug: 'peugeot-3008-hybrid4-gt-221-kw',
      imageUrl:
        '/images/cars/peugeot-3008.jpg',
      mileageKm: 19800,
      firstRegistration: '04/2023',
      powerKw: 221,
      powerHp: 300,
      transmission: 'Automat',
      fuelType: 'Hybrid',
      locationCountry: 'Francie',
      deliveryPriceCzk: 10500,
      monthlyPaymentCzk: 10990,
      totalPriceCzk: 989000,
      vatPriceCzk: 817355,
      priceRatingLabel: 'Dobrá cena',
      partnerLabel: 'Prémiový partner',
      equipmentTags: ['Plug-in hybrid', 'i-Cockpit', 'Matrix LED'],
    },
  ]);

  console.log('Seed completed');
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
