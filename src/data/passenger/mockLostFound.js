/**
 * SmartTransit OS — Passenger Lost & Found Mock Data
 */

export const INITIAL_LOST_FOUND_ITEMS = [
  {
    id: 'LF-2026-0412',
    passengerId: 'usr-pass-001',
    category: 'Electronics',
    categoryCode: 'ELECTRONICS',
    itemName: 'Noise-Cancelling Wireless Earbuds (Black)',
    description: 'Black Sony WF-1000XM4 charging case with earbuds left on seat row 4 near driver cabin.',
    vehicle: 'Bus 245',
    route: 'RT-108 (Metro Coastal Express)',
    journeyId: 'JRN-8921',
    reportedDate: '2026-08-21T11:20:00.000Z',
    status: 'MATCHED',
    contactPreference: 'Phone & WhatsApp',
    contactDetails: '+91 98765 43210',
    depotLocation: 'Depot 04 — Andheri West Lost Property Desk',
    matchNote: 'Found by cleaner during shift termination inspection. Stored at Depot 04 Locker #18.',
  },
  {
    id: 'LF-2026-0389',
    passengerId: 'usr-pass-001',
    category: 'Bags & Luggage',
    categoryCode: 'BAGS',
    itemName: 'Grey Canvas Backpack with Documents',
    description: 'Medium grey laptop backpack containing spiral notebook and ID badge left in overhead rack.',
    vehicle: 'Bus 112',
    route: 'RT-204 (Suburban Orbital Line)',
    journeyId: null,
    reportedDate: '2026-08-15T18:45:00.000Z',
    status: 'RESOLVED',
    contactPreference: 'Email',
    contactDetails: 'aarav.sharma@example.com',
    depotLocation: 'Depot 01 — Borivali Central Terminal',
    matchNote: 'Claimed and handed over to commuter on 2026-08-16 after identity verification.',
  },
];

export const LOST_FOUND_CATEGORIES = [
  'Electronics',
  'Bags & Luggage',
  'Wallets & Cards',
  'Documents & ID',
  'Clothing & Apparel',
  'Keys & Accessories',
  'Other',
];
