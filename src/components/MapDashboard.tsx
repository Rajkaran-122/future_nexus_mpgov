// Install react-map-gl and @types/react-map-gl for this component to work
// npm install react-map-gl
// npm install --save-dev @types/react-map-gl
import React, { useState } from 'react';
import Map, { Marker, Popup, Source, Layer, ViewState } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Station } from '@/hooks/useRealtimeData';
import { MapLegend } from './MapLegend';
import melaZonesGeojson from '@/data/melaZones.geojson';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN!;

const statusColor = {
  online: 'bg-green-500',
  offline: 'bg-red-500',
  maintenance: 'bg-yellow-400',
};

interface MapDashboardProps {
  city?: string;
  stations?: Station[];
}

export const MapDashboard: React.FC<MapDashboardProps> = ({ city, stations = [] }) => {
  const [hovered, setHovered] = useState<Station | null>(null);
  const [showMelaZones, setShowMelaZones] = useState(true);
  // Ujjain Shipra riverfront view
  const initialViewState: ViewState = {
    longitude: 75.7781,
    latitude: 23.1824,
    zoom: 13.5,
  };
  const [viewState, setViewState] = useState<ViewState>(initialViewState);

  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden shadow relative" tabIndex={0} aria-label="Map of Ujjain and Shipra riverfront">
      <Map
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/light-v11"
        viewState={viewState}
        onViewStateChange={({ viewState }) => setViewState(viewState)}
        width="100%"
        height="100%"
      >
        {/* Mela Zones Layer */}
        {showMelaZones && (
          <Source id="mela-zones" type="geojson" data={melaZonesGeojson}>
            <Layer
              id="mela-zones-fill"
              type="fill"
              paint={{ 'fill-color': '#f59e42', 'fill-opacity': 0.25 }}
            />
            <Layer
              id="mela-zones-outline"
              type="line"
              paint={{ 'line-color': '#f59e42', 'line-width': 2 }}
            />
          </Source>
        )}
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
              tabIndex={0}
              aria-label={`${station.name}, status: ${station.status}, utilization: ${station.utilization}%`}
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
      <div className="absolute top-4 right-4 z-10">
        <MapLegend
          showMelaZones={showMelaZones}
          setShowMelaZones={setShowMelaZones}
        />
      </div>
    </div>
  );
}; 