export type StationStatus = 'online' | 'offline' | 'maintenance';

export interface Station {
  id: string;
  name: string;
  city: string;
  longitude: number;
  latitude: number;
  status: StationStatus;
  utilization: number; // percent (0-100)
}

export const mockStations: Station[] = [
  // Bhopal
  { id: 'bpl-1', name: 'Bhopal Central', city: 'Bhopal', longitude: 77.4126, latitude: 23.2599, status: 'online', utilization: 82 },
  { id: 'bpl-2', name: 'Bhopal North', city: 'Bhopal', longitude: 77.45, latitude: 23.30, status: 'maintenance', utilization: 60 },
  // Indore
  { id: 'ind-1', name: 'Indore Main', city: 'Indore', longitude: 75.8577, latitude: 22.7196, status: 'online', utilization: 90 },
  { id: 'ind-2', name: 'Indore South', city: 'Indore', longitude: 75.90, latitude: 22.70, status: 'offline', utilization: 0 },
  // Gwalior
  { id: 'gwl-1', name: 'Gwalior Central', city: 'Gwalior', longitude: 78.1689, latitude: 26.2183, status: 'online', utilization: 75 },
  { id: 'gwl-2', name: 'Gwalior East', city: 'Gwalior', longitude: 78.20, latitude: 26.25, status: 'online', utilization: 68 },
  // Jabalpur
  { id: 'jbp-1', name: 'Jabalpur Main', city: 'Jabalpur', longitude: 79.9864, latitude: 23.1815, status: 'maintenance', utilization: 55 },
  { id: 'jbp-2', name: 'Jabalpur West', city: 'Jabalpur', longitude: 80.00, latitude: 23.20, status: 'online', utilization: 88 },
]; 