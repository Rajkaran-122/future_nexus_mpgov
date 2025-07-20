// Install react-map-gl and @types/react-map-gl for this component to work
// npm install react-map-gl
// npm install --save-dev @types/react-map-gl
import React, { useState } from 'react';
import Map, { Source, Layer, ViewState, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ghatsGeojson from '@/data/ghats.geojson';
import parkingZonesGeojson from '@/data/parkingZones.geojson';
import crowdHeatmapGeojson from '@/data/crowdHeatmap.geojson';
import emergencyRoutesGeojson from '@/data/emergencyRoutes.geojson';
import { Shield } from 'lucide-react';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN!;

interface MapDashboardProps {
  showEmergency?: boolean;
}

export const MapDashboard: React.FC<MapDashboardProps> = ({ showEmergency }) => {
  const initialViewState: ViewState = {
    longitude: 75.7781,
    latitude: 23.1824,
    zoom: 13.5,
  };
  const [viewState, setViewState] = useState<ViewState>(initialViewState);
  const [showHeatmap, setShowHeatmap] = useState(false);

  // Extract police points from emergencyRoutesGeojson
  const policePoints = emergencyRoutesGeojson.features.filter(
    (f): f is typeof f & { geometry: { type: 'Point'; coordinates: [number, number] } } =>
      f.properties?.type === 'police' &&
      f.geometry.type === 'Point' &&
      Array.isArray(f.geometry.coordinates) &&
      f.geometry.coordinates.length === 2 &&
      typeof f.geometry.coordinates[0] === 'number' &&
      typeof f.geometry.coordinates[1] === 'number'
  );

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
        {/* Ghats Layer */}
        <Source id="ghats" type="geojson" data={ghatsGeojson}>
          <Layer
            id="ghats-fill"
            type="fill"
            paint={{ 'fill-color': '#a21caf', 'fill-opacity': 0.18 }}
          />
          <Layer
            id="ghats-outline"
            type="line"
            paint={{ 'line-color': '#a21caf', 'line-width': 2 }}
          />
        </Source>
        {/* Parking Zones Layer */}
        <Source id="parking-zones" type="geojson" data={parkingZonesGeojson}>
          <Layer
            id="parking-zones-fill"
            type="fill"
            paint={{ 'fill-color': '#f59e42', 'fill-opacity': 0.18 }}
          />
          <Layer
            id="parking-zones-outline"
            type="line"
            paint={{ 'line-color': '#f59e42', 'line-width': 2 }}
          />
        </Source>
        {/* Crowd Density Heatmap Layer */}
        {showHeatmap && (
          <Source id="crowd-heatmap" type="geojson" data={crowdHeatmapGeojson}>
            <Layer
              id="crowd-heatmap-layer"
              type="heatmap"
              paint={{
                'heatmap-weight': ["get", "density"],
                'heatmap-intensity': 2,
                'heatmap-radius': 32,
                'heatmap-color': [
                  'interpolate',
                  ['linear'],
                  ['heatmap-density'],
                  0, 'rgba(255,255,178,0)',
                  0.2, 'rgba(254,204,92,0.7)',
                  0.4, 'rgba(253,141,60,0.8)',
                  0.6, 'rgba(240,59,32,0.9)',
                  1, 'rgba(189,0,38,1)'
                ],
                'heatmap-opacity': 0.7
              }}
            />
          </Source>
        )}
        {/* Emergency Response: Routes and Police Units */}
        {showEmergency && (
          <Source id="emergency-routes" type="geojson" data={emergencyRoutesGeojson}>
            <Layer
              id="emergency-routes-line"
              type="line"
              filter={["==", "type", "route"]}
              paint={{ 'line-color': '#2563eb', 'line-width': 6, 'line-opacity': 0.85 }}
            />
            {/* Police unit icons as markers */}
            {policePoints.map((f, i) => (
              <Marker
                key={i}
                longitude={f.geometry.coordinates[0]}
                latitude={f.geometry.coordinates[1]}
              >
                <Shield className="h-7 w-7 text-blue-700 drop-shadow-lg" aria-label={f.properties.name} />
              </Marker>
            ))}
          </Source>
        )}
      </Map>
      {/* Map Legend with Crowd Density Toggle */}
      <div className="absolute top-4 right-4 z-10 bg-white/90 rounded-lg shadow p-4 min-w-[200px]">
        <div className="font-semibold mb-2 text-sm">Map Layers</div>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showHeatmap}
              onChange={e => setShowHeatmap(e.target.checked)}
              className="accent-red-600"
            />
            <span>Crowd Density</span>
          </label>
          <label className="flex items-center gap-2 cursor-not-allowed opacity-60">
            <input type="checkbox" disabled />
            <span>Ghats</span>
          </label>
          <label className="flex items-center gap-2 cursor-not-allowed opacity-60">
            <input type="checkbox" disabled />
            <span>Parking Zones</span>
          </label>
          <label className="flex items-center gap-2 cursor-not-allowed opacity-60">
            <input type="checkbox" disabled />
            <span>EV-Only Zones</span>
          </label>
        </div>
      </div>
    </div>
  );
}; 