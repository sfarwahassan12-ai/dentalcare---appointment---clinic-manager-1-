import React from 'react';
import { Info } from 'lucide-react';

interface ToothChartProps {
  selectedTooth: number | null;
  onSelectTooth: (toothNum: number) => void;
  flaggedTeeth?: { toothNumber: number; condition: string; notes?: string }[];
}

export const ToothChart: React.FC<ToothChartProps> = ({
  selectedTooth,
  onSelectTooth,
  flaggedTeeth = []
}) => {
  // Universal Numbering System:
  // Upper Right (1-8) to Upper Left (9-16)
  const upperTeeth = Array.from({ length: 16 }, (_, i) => i + 1);
  // Lower Left (17-24) to Lower Right (25-32) -- represented visually from 32 down to 17
  const lowerTeeth = Array.from({ length: 16 }, (_, i) => 32 - i);

  const getToothStatus = (num: number) => {
    return flaggedTeeth.find((t) => t.toothNumber === num);
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-semibold text-slate-900 flex items-center space-x-2">
            <span>Interactive Dental Tooth Chart</span>
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Click any tooth to highlight symptoms, past restorations, or request targeted care.
          </p>
        </div>
        <div className="flex items-center space-x-3 text-xs">
          <span className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 inline-block"></span>
            <span className="text-slate-600">Selected</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
            <span className="text-slate-600">Flagged Issue</span>
          </span>
        </div>
      </div>

      {/* Upper Arch */}
      <div className="mb-6">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2 text-center">
          Upper Arch (Maxillary Teeth 1–16)
        </span>
        <div className="grid grid-cols-8 sm:grid-cols-16 gap-1.5 justify-center">
          {upperTeeth.map((num) => {
            const isSelected = selectedTooth === num;
            const flagged = getToothStatus(num);

            return (
              <button
                key={num}
                type="button"
                onClick={() => onSelectTooth(num)}
                className={`relative group flex flex-col items-center justify-between p-2 rounded-xl transition border text-xs ${
                  isSelected
                    ? 'bg-teal-600 text-white border-teal-700 shadow-md scale-105'
                    : flagged
                    ? 'bg-amber-50 border-amber-300 text-amber-900 font-medium hover:bg-amber-100'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-teal-400 hover:bg-teal-50/50'
                }`}
              >
                {/* Visual Tooth Silhouette Representation */}
                <div
                  className={`w-5 h-7 rounded-t-md border ${
                    isSelected
                      ? 'bg-white/20 border-white/40'
                      : flagged
                      ? 'bg-amber-200/60 border-amber-400'
                      : 'bg-slate-100 border-slate-300'
                  } flex items-center justify-center`}
                >
                  <span className="text-[10px] font-bold">
                    {num <= 3 || num >= 14 ? 'M' : num <= 5 || num >= 12 ? 'P' : 'I'}
                  </span>
                </div>
                <span className="text-[11px] font-semibold mt-1">#{num}</span>

                {flagged && !isSelected && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border border-white"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lower Arch */}
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2 text-center">
          Lower Arch (Mandibular Teeth 17–32)
        </span>
        <div className="grid grid-cols-8 sm:grid-cols-16 gap-1.5 justify-center">
          {lowerTeeth.map((num) => {
            const isSelected = selectedTooth === num;
            const flagged = getToothStatus(num);

            return (
              <button
                key={num}
                type="button"
                onClick={() => onSelectTooth(num)}
                className={`relative group flex flex-col items-center justify-between p-2 rounded-xl transition border text-xs ${
                  isSelected
                    ? 'bg-teal-600 text-white border-teal-700 shadow-md scale-105'
                    : flagged
                    ? 'bg-amber-50 border-amber-300 text-amber-900 font-medium hover:bg-amber-100'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-teal-400 hover:bg-teal-50/50'
                }`}
              >
                <span className="text-[11px] font-semibold mb-1">#{num}</span>
                <div
                  className={`w-5 h-7 rounded-b-md border ${
                    isSelected
                      ? 'bg-white/20 border-white/40'
                      : flagged
                      ? 'bg-amber-200/60 border-amber-400'
                      : 'bg-slate-100 border-slate-300'
                  } flex items-center justify-center`}
                >
                  <span className="text-[10px] font-bold">
                    {num <= 19 || num >= 30 ? 'M' : num <= 21 || num >= 28 ? 'P' : 'I'}
                  </span>
                </div>

                {flagged && !isSelected && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border border-white"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tooth Spec Details */}
      {selectedTooth && (
        <div className="mt-4 p-3 bg-white rounded-xl border border-teal-200 flex items-start space-x-3 text-xs">
          <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold text-slate-900">
              Selected Tooth #{selectedTooth}
            </span>
            {getToothStatus(selectedTooth) ? (
              <p className="text-amber-800 font-medium mt-0.5">
                Flagged Note: {getToothStatus(selectedTooth)?.condition} - {getToothStatus(selectedTooth)?.notes || 'No extra details'}
              </p>
            ) : (
              <p className="text-slate-600 mt-0.5">
                No prior clinical alerts logged for Tooth #{selectedTooth}. You can mention sensitivity or pain in your appointment notes below.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
