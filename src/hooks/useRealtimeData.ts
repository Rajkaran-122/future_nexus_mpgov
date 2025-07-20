import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { RealtimeChannel } from '@supabase/supabase-js';

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
    let isMounted = true;
    const fetchData = async () => {
      const { data: stationsData } = await supabase
        .from('stations')
        .select('*')
        .eq('city', city);

      const { data: swapsData } = await supabase
        .from('swaps_log')
        .select('*')
        .eq('city', city)
        .gte('timestamp', dateRange.start)
        .lte('timestamp', dateRange.end);

      if (!isMounted) return;
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
    };

    fetchData();

    const channel: RealtimeChannel = supabase
      .channel('dashboard-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'stations' }, fetchData)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'swaps_log' }, fetchData)
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [city, dateRange.start, dateRange.end]);

  return { stations, kpis, loading };
} 