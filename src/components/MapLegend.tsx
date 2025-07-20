import React from 'react';

interface MapLegendProps {
  showMelaZones: boolean;
  setShowMelaZones: (v: boolean) => void;
}

export const MapLegend: React.FC<MapLegendProps> = ({ showMelaZones, setShowMelaZones }) => {
  return (
    <div className="bg-white/90 rounded-lg shadow p-4 min-w-[200px]">
      <div className="font-semibold mb-2 text-sm">Map Layers</div>
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showMelaZones}
            onChange={e => setShowMelaZones(e.target.checked)}
            className="accent-orange-500"
          />
          <span>Mela Zones</span>
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
  );
}; 