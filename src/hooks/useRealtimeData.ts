import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { mockStations, Station } from '@/data/mockStations';

interface KpiData {
  totalEVs: number;
  totalSwaps: number;
  avgUtil: number;
  co2Saved: number;
}

export function useRealtimeData(city: string) {
  const [stations, setStations] = useState<Station[]>(mockStations.filter(s => !city || s.city === city));
  const [kpis, setKpis] = useState<KpiData>({ totalEVs: 0, totalSwaps: 0, avgUtil: 0, co2Saved: 0 });
  const [loading, setLoading] = useState(true);

  // Helper to recalculate KPIs
  const recalcKpis = (stations: Station[]) => {
    const totalEVs = stations.length * 1500;
    const totalSwaps = stations.reduce((sum, s) => sum + Math.round(s.utilization * 20 / 100), 0);
    const avgUtil = stations.length ? Math.round(stations.reduce((sum, s) => sum + s.utilization, 0) / stations.length) : 0;
    const co2Saved = Math.round(totalSwaps * 4.82);
    setKpis({ totalEVs, totalSwaps, avgUtil, co2Saved });
  };

  useEffect(() => {
    let unsubSwaps: any, unsubStations: any, interval: any;
    setLoading(true);
    // If Supabase env vars are present, use realtime
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      // Listen for new swaps
      unsubSwaps = supabase
        .channel('swaps-log')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'swaps_log' }, payload => {
          // Simulate: increment swaps and co2Saved
          setKpis(prev => ({ ...prev, totalSwaps: prev.totalSwaps + 1, co2Saved: prev.co2Saved + 5 }));
        })
        .subscribe();
      // Listen for station status/utilization changes
      unsubStations = supabase
        .channel('stations')
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'stations' }, payload => {
          setStations(prev => prev.map(s => s.id === payload.new.id ? { ...s, ...payload.new } : s));
        })
        .subscribe();
      // Initial fetch (replace with real fetch if needed)
      setStations(mockStations.filter(s => !city || s.city === city));
      recalcKpis(mockStations.filter(s => !city || s.city === city));
      setLoading(false);
      return () => {
        unsubSwaps && supabase.removeChannel(unsubSwaps);
        unsubStations && supabase.removeChannel(unsubStations);
      };
    } else {
      // Local simulation: update utilization and swaps every 3s
      interval = setInterval(() => {
        setStations(prev => prev.map(s => {
          // Randomly change utilization and status
          const utilization = Math.max(0, Math.min(100, s.utilization + Math.round(Math.random() * 10 - 5)));
          const statusRand = Math.random();
          let status: Station['status'] = s.status;
          if (statusRand < 0.85) status = 'online';
          else if (statusRand < 0.95) status = 'maintenance';
          else status = 'offline';
          return { ...s, utilization, status };
        }));
        setKpis(prev => ({ ...prev, totalSwaps: prev.totalSwaps + Math.floor(Math.random() * 3), co2Saved: prev.co2Saved + Math.floor(Math.random() * 10) }));
      }, 3000);
      setStations(mockStations.filter(s => !city || s.city === city));
      recalcKpis(mockStations.filter(s => !city || s.city === city));
      setLoading(false);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  // Recalculate KPIs when stations change
  useEffect(() => {
    recalcKpis(stations);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stations]);

  return { stations, kpis, loading };
} 