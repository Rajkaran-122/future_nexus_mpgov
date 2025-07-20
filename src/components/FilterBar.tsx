import React from 'react';

interface FilterBarProps {
  dateRange: { start: string; end: string };
  city: string;
  onDateRangeChange: (range: { start: string; end: string }) => void;
  onCityChange: (city: string) => void;
  cities: string[];
}

export const FilterBar: React.FC<FilterBarProps> = ({ dateRange, city, onDateRangeChange, onCityChange, cities }) => {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-between py-4 px-2 bg-card rounded-xl shadow mb-6">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Date Range:</label>
        <input
          type="date"
          value={dateRange.start}
          onChange={e => onDateRangeChange({ start: e.target.value, end: dateRange.end })}
          className="border rounded px-2 py-1 text-sm"
        />
        <span className="mx-1">to</span>
        <input
          type="date"
          value={dateRange.end}
          onChange={e => onDateRangeChange({ start: dateRange.start, end: e.target.value })}
          className="border rounded px-2 py-1 text-sm"
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">City/District:</label>
        <select
          value={city}
          onChange={e => onCityChange(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          {cities.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
    </div>
  );
}; 