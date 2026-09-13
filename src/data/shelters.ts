export type ShelterStatus = 'Safe' | 'Moderate' | 'High' | 'Critical';

export type Shelter = {
  id: string;
  name: string;
  location: string;
  maxCapacity: number;
  currentOccupancy: number;
  status: ShelterStatus;
  medicalSupport: boolean;
  foodAvailable: boolean;
  waterAvailable: boolean;
  wheelchairAccessible: boolean;
  updatedAt: string;
  district: string;
};

export type TrendPoint = { time: string; occupancy: number };

export const shelters: Shelter[] = [
  { id: 'harbor-view', name: 'Harborview Civic Center', location: '18 Seaport Avenue', district: 'North Shore', maxCapacity: 820, currentOccupancy: 604, status: 'Moderate', medicalSupport: true, foodAvailable: true, waterAvailable: true, wheelchairAccessible: true, updatedAt: '2 min ago' },
  { id: 'ridgeway', name: 'Ridgeway High School', location: '440 Juniper Road', district: 'East Ridge', maxCapacity: 540, currentOccupancy: 518, status: 'Critical', medicalSupport: true, foodAvailable: true, waterAvailable: true, wheelchairAccessible: true, updatedAt: '4 min ago' },
  { id: 'meridian', name: 'Meridian Community Hall', location: '72 Meridian Street', district: 'Central', maxCapacity: 310, currentOccupancy: 196, status: 'Moderate', medicalSupport: false, foodAvailable: true, waterAvailable: true, wheelchairAccessible: false, updatedAt: '8 min ago' },
  { id: 'oak-line', name: 'Oak Line Recreation Hub', location: '903 Oak Line Drive', district: 'Westbank', maxCapacity: 680, currentOccupancy: 273, status: 'Safe', medicalSupport: true, foodAvailable: true, waterAvailable: true, wheelchairAccessible: true, updatedAt: '11 min ago' },
  { id: 'st-annes', name: 'St. Anne Parish Hall', location: '6 Orchard Crescent', district: 'South Quarter', maxCapacity: 240, currentOccupancy: 211, status: 'High', medicalSupport: false, foodAvailable: false, waterAvailable: true, wheelchairAccessible: false, updatedAt: '15 min ago' },
  { id: 'lakeside', name: 'Lakeside Exhibition Center', location: '1 Lakefront Boulevard', district: 'Lakes District', maxCapacity: 1200, currentOccupancy: 488, status: 'Safe', medicalSupport: true, foodAvailable: true, waterAvailable: true, wheelchairAccessible: true, updatedAt: '18 min ago' },
  { id: 'northstar', name: 'Northstar Library Annex', location: '211 Northstar Way', district: 'North Shore', maxCapacity: 185, currentOccupancy: 93, status: 'Safe', medicalSupport: false, foodAvailable: true, waterAvailable: true, wheelchairAccessible: true, updatedAt: '22 min ago' },
  { id: 'cypress', name: 'Cypress Transit Shelter', location: '30 Cypress Terminal', district: 'South Quarter', maxCapacity: 430, currentOccupancy: 365, status: 'High', medicalSupport: true, foodAvailable: true, waterAvailable: true, wheelchairAccessible: true, updatedAt: '27 min ago' },
];

export const cityTrend: TrendPoint[] = [
  { time: '06:00', occupancy: 31 }, { time: '08:00', occupancy: 38 }, { time: '10:00', occupancy: 42 },
  { time: '12:00', occupancy: 49 }, { time: '14:00', occupancy: 57 }, { time: '16:00', occupancy: 61 },
  { time: '18:00', occupancy: 66 }, { time: '20:00', occupancy: 69 },
];

export const historyByShelter: Record<string, TrendPoint[]> = {
  'harbor-view': [{ time: '06:00', occupancy: 48 }, { time: '09:00', occupancy: 56 }, { time: '12:00', occupancy: 62 }, { time: '15:00', occupancy: 68 }, { time: '18:00', occupancy: 74 }, { time: '21:00', occupancy: 73 }],
  ridgeway: [{ time: '06:00', occupancy: 58 }, { time: '09:00', occupancy: 71 }, { time: '12:00', occupancy: 80 }, { time: '15:00', occupancy: 88 }, { time: '18:00', occupancy: 94 }, { time: '21:00', occupancy: 96 }],
  meridian: [{ time: '06:00', occupancy: 31 }, { time: '09:00', occupancy: 39 }, { time: '12:00', occupancy: 48 }, { time: '15:00', occupancy: 55 }, { time: '18:00', occupancy: 62 }, { time: '21:00', occupancy: 63 }],
  'oak-line': [{ time: '06:00', occupancy: 26 }, { time: '09:00', occupancy: 30 }, { time: '12:00', occupancy: 35 }, { time: '15:00', occupancy: 39 }, { time: '18:00', occupancy: 41 }, { time: '21:00', occupancy: 40 }],
};

export const alerts = [
  { id: 'a-1', type: 'capacity', title: 'Ridgeway nearing capacity', message: '22 spaces remaining. Consider routing new arrivals to Lakeside.', severity: 'Critical', timestamp: '4 min ago' },
  { id: 'a-2', type: 'supply', title: 'St. Anne food supply low', message: 'Meal service may be impacted within 3 hours at current intake.', severity: 'High', timestamp: '15 min ago' },
  { id: 'a-3', type: 'weather', title: 'Wind advisory updated', message: 'North Shore gusts expected to increase after 21:00.', severity: 'Moderate', timestamp: '28 min ago' },
  { id: 'a-4', type: 'movement', title: 'Cypress intake accelerating', message: 'Occupancy has risen 8% in the last 90 minutes.', severity: 'Moderate', timestamp: '42 min ago' },
];