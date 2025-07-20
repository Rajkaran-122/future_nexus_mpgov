// Install react-map-gl and @types/react-map-gl for this component to work
// npm install react-map-gl
// npm install --save-dev @types/react-map-gl
import React, { useState } from 'react';
import Map, { Marker, Popup, ViewState } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mockStations, Station } from '@/data/mockStations';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

const statusColor = {
  online: 'bg-green-500',
  offline: 'bg-red-500',
  maintenance: 'bg-yellow-400',
};

interface MapDashboardProps {
  city?: string;
  stations: Station[];
}

export const MapDashboard: React.FC<MapDashboardProps> = ({ city, stations }) => {
  const [hovered, setHovered] = useState<Station | null>(null);
  // Center on Madhya Pradesh
  const initialViewState: ViewState = {
    longitude: 78.6569,
    latitude: 23.2599,
    zoom: 6.2,
  };
  // Optionally zoom to city
  const cityCenters: Record<string, { longitude: number; latitude: number; zoom: number }> = {
    Bhopal: { longitude: 77.4126, latitude: 23.2599, zoom: 10 },
    Indore: { longitude: 75.8577, latitude: 22.7196, zoom: 10 },
    Gwalior: { longitude: 78.1689, latitude: 26.2183, zoom: 10 },
    Jabalpur: { longitude: 79.9864, latitude: 23.1815, zoom: 10 },
  };
  const [viewState, setViewState] = useState<ViewState>(
    city && cityCenters[city] ? cityCenters[city] : initialViewState
  );

  React.useEffect(() => {
    if (city && cityCenters[city]) {
      setViewState(cityCenters[city]);
    } else {
      setViewState(initialViewState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden shadow">
      <Map
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        viewState={viewState}
        onViewStateChange={({ viewState }) => setViewState(viewState)}
        width="100%"
        height="100%"
      >
        {stations.map(station => (
          <Marker
            key={station.id}
            longitude={station.longitude}
            latitude={station.latitude}
          >
            <div
              className={`w-4 h-4 rounded-full border-2 border-white shadow ${statusColor[station.status]}`}
              title={station.name}
              onMouseEnter={() => setHovered(station)}
              onMouseLeave={() => setHovered(null)}
            />
          </Marker>
        ))}
        {hovered && (
          <Popup
            longitude={hovered.longitude}
            latitude={hovered.latitude}
            closeButton={false}
            anchor="top"
            onClose={() => setHovered(null)}
          >
            <div className="text-sm font-semibold mb-1">{hovered.name}</div>
            <div className="text-xs mb-1">Status: <span className={`font-bold ${hovered.status === 'online' ? 'text-green-500' : hovered.status === 'offline' ? 'text-red-500' : 'text-yellow-500'}`}>{hovered.status}</span></div>
            <div className="text-xs">Utilization (24h): <span className="font-bold">{hovered.utilization}%</span></div>
          </Popup>
        )}
      </Map>
    </div>
  );
}; 