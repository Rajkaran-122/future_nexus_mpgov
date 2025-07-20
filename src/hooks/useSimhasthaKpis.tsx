import React, { useEffect, useState } from 'react';
import { Bus, Car, ParkingCircle, Leaf, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export function useSimhasthaKpis(city = 'Ujjain') {
  const [kpis, setKpis] = useState([
    {
      title: 'Live Pilgrim Vehicle Inflow',
      value: 1240,
      unit: '',
      trend: 'up' as const,
      icon: <Car className="w-7 h-7" />,
    },
    {
      title: 'E-Shuttle Bus Frequency',
      value: 38,
      unit: 'buses/hr',
      trend: 'up' as const,
      icon: <Bus className="w-7 h-7" />,
    },
    {
      title: 'Parking Zone Occupancy %',
      value: 67,
      unit: '%',
      trend: 'neutral' as const,
      icon: <ParkingCircle className="w-7 h-7" />,
    },
    {
      title: 'AQI at Major Ghats',
      value: 92,
      unit: '',
      trend: 'down' as const,
      icon: <Leaf className="w-7 h-7" />,
    },
    {
      title: 'Solid Waste Cleared',
      value: 18,
      unit: 't',
      trend: 'up' as const,
      icon: <Trash2 className="w-7 h-7" />,
      description: 'Tonnes',
    },
  ]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    let cancelled = false;
    async function fetchKpis() {
      // Only fetch if Supabase is configured
      if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
        // Example: fetch and aggregate data for each KPI
        // 1. Live Pilgrim Vehicle Inflow (count of vehicle entries in last 10 min)
        const { data: inflowData } = await supabase
          .from('vehicle_inflow')
          .select('id')
          .eq('city', city)
          .gte('timestamp', new Date(Date.now() - 10 * 60 * 1000).toISOString());
        // 2. E-Shuttle Bus Frequency (buses/hr)
        const { data: busData } = await supabase
          .from('bus_frequency')
          .select('count')
          .eq('city', city)
          .order('timestamp', { ascending: false })
          .limit(1);
        // 3. Parking Zone Occupancy % (average of all zones)
        const { data: parkingData } = await supabase
          .from('parking_zones')
          .select('occupancy')
          .eq('city', city);
        // 4. AQI at Major Ghats (average of all ghats)
        const { data: aqiData } = await supabase
          .from('ghat_aqi')
          .select('aqi')
          .eq('city', city);
        // 5. Solid Waste Cleared (sum for today)
        const { data: wasteData } = await supabase
          .from('waste_cleared')
          .select('amount')
          .eq('city', city)
          .gte('timestamp', new Date().toISOString().slice(0, 10));

        // Aggregate values
        const inflow = inflowData?.length || 0;
        const busFreq = busData?.[0]?.count || 0;
        const parking = parkingData && parkingData.length
          ? Math.round(parkingData.reduce((sum, z) => sum + z.occupancy, 0) / parkingData.length)
          : 0;
        const aqi = aqiData && aqiData.length
          ? Math.round(aqiData.reduce((sum, g) => sum + g.aqi, 0) / aqiData.length)
          : 0;
        const waste = wasteData && wasteData.length
          ? Math.round(wasteData.reduce((sum, w) => sum + w.amount, 0))
          : 0;

        if (!cancelled) {
          setKpis([
            {
              title: 'Live Pilgrim Vehicle Inflow',
              value: inflow,
              unit: '',
              trend: inflow > kpis[0].value ? 'up' : inflow < kpis[0].value ? 'down' : 'neutral',
              icon: <Car className="w-7 h-7" />,
            },
            {
              title: 'E-Shuttle Bus Frequency',
              value: busFreq,
              unit: 'buses/hr',
              trend: busFreq > kpis[1].value ? 'up' : busFreq < kpis[1].value ? 'down' : 'neutral',
              icon: <Bus className="w-7 h-7" />,
            },
            {
              title: 'Parking Zone Occupancy %',
              value: parking,
              unit: '%',
              trend: parking > kpis[2].value ? 'up' : parking < kpis[2].value ? 'down' : 'neutral',
              icon: <ParkingCircle className="w-7 h-7" />,
            },
            {
              title: 'AQI at Major Ghats',
              value: aqi,
              unit: '',
              trend: aqi < kpis[3].value ? 'down' : aqi > kpis[3].value ? 'up' : 'neutral',
              icon: <Leaf className="w-7 h-7" />,
            },
            {
              title: 'Solid Waste Cleared',
              value: waste,
              unit: 't',
              trend: waste > kpis[4].value ? 'up' : waste < kpis[4].value ? 'down' : 'neutral',
              icon: <Trash2 className="w-7 h-7" />,
              description: 'Tonnes',
            },
          ]);
          setLastUpdated(new Date());
        }
      }
    }
    fetchKpis();
    const interval = setInterval(fetchKpis, 10000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [city]);

  return { kpis, lastUpdated };
} 