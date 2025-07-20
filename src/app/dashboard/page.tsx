import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilterBar } from '@/components/FilterBar';
import { KpiCard } from '@/components/KpiCard';
import { MapDashboard } from '@/components/MapDashboard';
import { supabase } from '@/integrations/supabase/client';
import { Bus, Car, ParkingCircle, Leaf, Trash2 } from 'lucide-react';

const cities = ['Ujjain'];

function KpiSkeleton() {
  return (
    <div className="bg-card rounded-xl shadow p-4 flex flex-col items-start min-w-[180px] animate-pulse">
      <div className="h-4 w-24 bg-muted rounded mb-2" />
      <div className="h-8 w-32 bg-muted rounded mb-1" />
      <div className="h-3 w-16 bg-muted rounded" />
    </div>
  );
}

function MapSkeleton() {
  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden shadow bg-muted animate-pulse flex items-center justify-center">
      <span className="text-muted-foreground">Loading map...</span>
    </div>
  );
}

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState({ start: '2024-07-01', end: '2024-07-10' });
  const [city, setCity] = useState(cities[0]);
  // Placeholder static data for Simhastha KPIs
  const kpiList = [
    { title: 'Live Pilgrim Vehicle Inflow', value: 1240, unit: '', trend: 'up' as const, icon: Car },
    { title: 'E-Shuttle Bus Frequency', value: 38, unit: '/hr', trend: 'neutral' as const, icon: Bus },
    { title: 'Parking Zone Occupancy %', value: 67, unit: '%', trend: 'up' as const, icon: ParkingCircle },
    { title: 'AQI at Major Ghats', value: 92, unit: '', trend: 'down' as const, icon: Leaf, description: 'Air Quality Index' },
    { title: 'Solid Waste Cleared', value: 18, unit: 't', trend: 'up' as const, icon: Trash2, description: 'Tonnes' },
  ];

  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/login');
      }
    });
  }, [navigate]);

  return (
    <main className="min-h-screen bg-background px-2 py-4 md:px-4 md:py-8" aria-label="Dashboard main content">
      <div className="max-w-6xl mx-auto">
        {/* Simhastha 2028 Header */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 border-b pb-4">
          <div className="flex items-center gap-4">
            {/* Placeholder for Simhastha 2028 logo */}
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-xl font-bold">Logo</div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Simhastha Smart & Green Command Center</h1>
              <p className="text-sm text-muted-foreground">Kumbh Mela 2028 • Ujjain, Madhya Pradesh</p>
            </div>
          </div>
          {/* Placeholder for MP Government emblem */}
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-xs font-semibold">MP Emblem</div>
        </header>
        <nav aria-label="Dashboard filters">
          <FilterBar
            dateRange={dateRange}
            city={city}
            onDateRangeChange={setDateRange}
            onCityChange={setCity}
            cities={cities}
          />
        </nav>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8" aria-label="Key Performance Indicators">
          {kpiList.map((kpi, i) => (
            <KpiCard key={i} {...kpi} />
          ))}
        </section>
        <section aria-label="E-Mobility Map" className="mb-8 focus:outline-none" tabIndex={0}>
          <MapSkeleton /> {/* Replace with <MapDashboard ... /> when ready */}
        </section>
      </div>
    </main>
  );
} 