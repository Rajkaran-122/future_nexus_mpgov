import React from 'react';

interface EmergencyResponseModalProps {
  show: boolean;
  onClose: () => void;
}

const policeUnits = [
  { name: 'Unit 1: Ram Ghat Police', contact: '+91-9876543210', location: 'Ram Ghat' },
  { name: 'Unit 2: Shipra Bridge Patrol', contact: '+91-9876543222', location: 'Shipra Bridge' },
  { name: 'Unit 3: Ujjain Central Response', contact: '+91-9876543233', location: 'Central Ujjain' },
];

export const EmergencyResponseModal: React.FC<EmergencyResponseModalProps> = ({ show, onClose }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" role="dialog" aria-modal="true">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
          onClick={onClose}
          aria-label="Close emergency response"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-red-700">Emergency Response</h2>
        <div className="mb-2 text-sm text-muted-foreground">Nearest Police Units</div>
        <ul className="space-y-3">
          {policeUnits.map((unit, i) => (
            <li key={i} className="flex flex-col border rounded p-2 bg-gray-50">
              <span className="font-semibold text-gray-800">{unit.name}</span>
              <span className="text-xs text-gray-600">Location: {unit.location}</span>
              <span className="text-xs text-blue-700">Contact: {unit.contact}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}; 