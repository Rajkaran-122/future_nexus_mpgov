import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Station {
  id: string;
  name: string;
  city: string;
  longitude: number;
  latitude: number;
  status: 'online' | 'offline' | 'maintenance';
  utilization: number; // percent (0-100)
}

interface KpiData {
  totalEVs: number;
  totalSwaps: number;
  avgUtil: number;
  co2Saved: number;
  trend: 'up' | 'down' | 'neutral';
}

export function useRealtimeData(city: string, dateRange: { start: string; end: string }) {
  const [stations, setStations] = useState<Station[]>([]);
  const [kpis, setKpis] = useState<KpiData>({
    totalEVs: 0, totalSwaps: 0, avgUtil: 0, co2Saved: 0, trend: 'neutral'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let channel: any;
    setLoading(true);

    async function fetchData() {
      // Fetch stations for the selected city
      let { data: stationsData } = await supabase
        .from('stations')
        .select('*')
        .eq('city', city);

      // Fetch swaps for the selected city and date range
      let { data: swapsData } = await supabase
        .from('swaps_log')
        .select('*')
        .eq('city', city)
        .gte('timestamp', dateRange.start)
        .lte('timestamp', dateRange.end);

      // Calculate KPIs
      const totalEVs = stationsData?.length ? stationsData.length * 1500 : 0;
      const totalSwaps = swapsData?.length || 0;
      const avgUtil = stationsData?.length
        ? Math.round(stationsData.reduce((sum, s) => sum + s.utilization, 0) / stationsData.length)
        : 0;
      const co2Saved = Math.round(totalSwaps * 4.82);

      setStations(stationsData || []);
      setKpis({
        totalEVs,
        totalSwaps,
        avgUtil,
        co2Saved,
        trend: 'up', // TODO: Calculate trend based on previous period
      });
      setLoading(false);
    }

    fetchData();

    // Subscribe to real-time updates
    channel = supabase
      .channel('dashboard-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'stations' }, fetchData)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'swaps_log' }, fetchData)
      .subscribe();

    return () => {
      channel && supabase.removeChannel(channel);
    };
  }, [city, dateRange.start, dateRange.end]);

  return { stations, kpis, loading };
} 