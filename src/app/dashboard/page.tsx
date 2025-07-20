import React, { useState } from 'react';
import { FilterBar } from '@/components/FilterBar';
import { KpiCard } from '@/components/KpiCard';
import { MapDashboard } from '@/components/MapDashboard';
import { useRealtimeData } from '@/hooks/useRealtimeData';

const cities = ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur'];

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
  const { stations, kpis, loading } = useRealtimeData(city);
  const kpiList = [
    { title: 'Total Active EVs', value: kpis.totalEVs, unit: '', trend: 'up' as const },
    { title: 'Battery Swaps (24h)', value: kpis.totalSwaps, unit: '', trend: 'up' as const },
    { title: 'Network Utilization %', value: kpis.avgUtil, unit: '%', trend: 'neutral' as const },
    { title: 'CO₂ Emissions Saved', value: kpis.co2Saved, unit: 't', trend: 'up' as const, description: 'Tonnes' },
  ];

  return (
    <main className="min-h-screen bg-background px-2 py-4 md:px-4 md:py-8" aria-label="Dashboard main content">
      <div className="max-w-6xl mx-auto">
        <nav aria-label="Dashboard filters">
          <FilterBar
            dateRange={dateRange}
            city={city}
            onDateRangeChange={setDateRange}
            onCityChange={setCity}
            cities={cities}
          />
        </nav>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8" aria-label="Key Performance Indicators">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <KpiSkeleton key={i} />)
            : kpiList.map((kpi, i) => (
                <KpiCard key={i} {...kpi} />
              ))}
        </section>
        <section aria-label="E-Mobility Map" className="mb-8 focus:outline-none" tabIndex={0}>
          {loading ? <MapSkeleton /> : <MapDashboard city={city} stations={stations} />}
        </section>
      </div>
    </main>
  );
} 