import type { MarketListingKey } from '../../../context/ProtoContext';

/** Shared demo listings for marketplace grid + part detail PDP. */
export type MarketCategory = 'filters' | 'oil' | 'batteries' | 'tires' | 'brakes';

export type MarketListingRow = {
  key: MarketListingKey;
  category: MarketCategory;
  titleKey: string;
  titleEn: string;
  priceKey: string;
  priceEn: string;
  starKey: string;
  starEn: string;
  extraKey: string;
  extraEn: string;
  sellerKey: string;
  sellerEn: string;
  thumbGradient: string;
  iconName: 'package' | 'circle-dot' | 'battery-charging' | 'droplets';
  iconClass: string;
  skuKey: string;
  skuEn: string;
  shipKey: string;
  shipEn: string;
  bulletKeys: [string, string, string];
  bulletsEn: [string, string, string];
  relatedSku: MarketListingKey[];
};

export const MARKETPLACE_ROWS: MarketListingRow[] = [
  {
    key: 'p1',
    category: 'filters',
    titleKey: 'demo.market.p1_title',
    titleEn: 'Bosch cabin filter',
    priceKey: 'demo.market.p1_price',
    priceEn: 'EGP 185',
    starKey: 'demo.market.p1_star',
    starEn: '4.7',
    extraKey: 'demo.market.p1_extra',
    extraEn: '1.2k sold',
    sellerKey: 'demo.market.p1_seller',
    sellerEn: 'Cairo Parts',
    thumbGradient: 'from-slate-100 via-indigo-50/90 to-teal-50/70 dark:from-slate-800 dark:via-indigo-950/50 dark:to-teal-950/40',
    iconName: 'package',
    iconClass: 'text-indigo-500 dark:text-indigo-400',
    skuKey: 'demo.part.p1_sku',
    skuEn: 'BSH-0986AF5288',
    shipKey: 'demo.part.p1_ship',
    shipEn: 'EGP 25 · 1–2 days Cairo',
    bulletKeys: ['demo.part.p1_b1', 'demo.part.p1_b2', 'demo.part.p1_b3'],
    bulletsEn: ['OEM-compatible multi-layer filtration', 'Fits sedan / crossover cabin ducts', '12-month marketplace warranty'],
    relatedSku: ['p3', 'p4'],
  },
  {
    key: 'p2',
    category: 'tires',
    titleKey: 'demo.market.p2_title',
    titleEn: 'Michelin 205/55 R16',
    priceKey: 'demo.market.p2_price',
    priceEn: 'EGP 2,890',
    starKey: 'demo.market.p2_star',
    starEn: '4.8',
    extraKey: 'demo.market.p2_extra',
    extraEn: 'In stock',
    sellerKey: 'demo.market.p2_seller',
    sellerEn: 'Elite Tires',
    thumbGradient: 'from-amber-50 via-slate-100 to-orange-50/80 dark:from-amber-950/40 dark:via-slate-800 dark:to-orange-950/35',
    iconName: 'circle-dot',
    iconClass: 'text-amber-600 dark:text-amber-400',
    skuKey: 'demo.part.p2_sku',
    skuEn: 'MICH-2055516-P4',
    shipKey: 'demo.part.p2_ship',
    shipEn: 'Mounting quoted at checkout · Same-day Nasr City',
    bulletKeys: ['demo.part.p2_b1', 'demo.part.p2_b2', 'demo.part.p2_b3'],
    bulletsEn: ['EnergySaver compound', 'Dry/wet braking balance', 'DOT labeling on sidewall QR'],
    relatedSku: ['p1', 'p4'],
  },
  {
    key: 'p3',
    category: 'batteries',
    titleKey: 'demo.market.p3_title',
    titleEn: 'AGM battery 60Ah',
    priceKey: 'demo.market.p3_price',
    priceEn: 'EGP 3,200',
    starKey: 'demo.market.p3_star',
    starEn: '4.6',
    extraKey: 'demo.market.p3_extra',
    extraEn: '2–3d ship',
    sellerKey: 'demo.market.p3_seller',
    sellerEn: 'AutoBatt',
    thumbGradient: 'from-violet-50 via-slate-100 to-cyan-50/70 dark:from-violet-950/45 dark:via-slate-800 dark:to-cyan-950/35',
    iconName: 'battery-charging',
    iconClass: 'text-violet-600 dark:text-violet-400',
    skuKey: 'demo.part.p3_sku',
    skuEn: 'VARTA-D52-AGM60',
    shipKey: 'demo.part.p3_ship',
    shipEn: 'Core exchange rebate · Hazard label included',
    bulletKeys: ['demo.part.p3_b1', 'demo.part.p3_b2', 'demo.part.p3_b3'],
    bulletsEn: ['Start-stop ready', 'Recyclable AGM casing', 'Technician torque spec sheet'],
    relatedSku: ['p2', 'p1'],
  },
  {
    key: 'p4',
    category: 'oil',
    titleKey: 'demo.market.p4_title',
    titleEn: 'Castrol 5W-30 (4L)',
    priceKey: 'demo.market.p4_price',
    priceEn: 'EGP 450',
    starKey: 'demo.market.p4_star',
    starEn: '4.8',
    extraKey: 'demo.market.p4_extra',
    extraEn: 'EGP 50 delivery',
    sellerKey: 'demo.market.p4_seller',
    sellerEn: 'Lubrico',
    thumbGradient: 'from-cyan-50 via-blue-50/80 to-emerald-50/70 dark:from-cyan-950/40 dark:via-blue-950/35 dark:to-emerald-950/35',
    iconName: 'droplets',
    iconClass: 'text-cyan-600 dark:text-cyan-400',
    skuKey: 'demo.part.p4_sku',
    skuEn: 'CAS-EDGE-5W30-4L',
    shipKey: 'demo.part.p4_ship',
    shipEn: 'Sealed pouch · Verify batch code on pickup',
    bulletKeys: ['demo.part.p4_b1', 'demo.part.p4_b2', 'demo.part.p4_b3'],
    bulletsEn: ['ACEA C3 compliant', 'Turbo-compatible wear pack', 'Works with Bosch filter bundle'],
    relatedSku: ['p1', 'p3'],
  },
];

export function listingByKey(key: MarketListingKey): MarketListingRow {
  return MARKETPLACE_ROWS.find((r) => r.key === key) ?? MARKETPLACE_ROWS[0];
}
