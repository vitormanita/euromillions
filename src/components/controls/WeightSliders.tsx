import { useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Weights } from '../../types';
import { WEIGHT_PRESETS } from '../../utils/constants';

interface WeightSlidersProps {
  weights: Weights;
  onWeightChange: (key: keyof Weights, value: number) => void;
  onPresetApply: (preset: keyof typeof WEIGHT_PRESETS) => void;
  headerRight?: ReactNode;
  footer?: ReactNode;
}

type PresetKey = keyof typeof WEIGHT_PRESETS | 'custom';

const PRESET_CONFIG: { key: PresetKey; label: string; icon: string }[] = [
  { key: 'balanced', label: 'Balanced', icon: '⚖️' },
  { key: 'hotNumbers', label: 'Hot', icon: '🔥' },
  { key: 'overdueFocus', label: 'Overdue', icon: '⏰' },
  { key: 'pureRandom', label: 'Random', icon: '🎲' },
];

const SLIDER_CONFIG: { key: keyof Weights; label: string; color: string }[] = [
  { key: 'overdue', label: 'Overdue', color: 'bg-orange-500' },
  { key: 'frequency', label: 'Frequency', color: 'bg-red-500' },
  { key: 'randomness', label: 'Random', color: 'bg-purple-500' },
];

function weightsMatch(a: Weights, b: Weights): boolean {
  return a.overdue === b.overdue && a.frequency === b.frequency && a.randomness === b.randomness;
}

export function WeightSliders({ weights, onWeightChange, onPresetApply, headerRight, footer }: WeightSlidersProps) {
  // Determine which preset is currently active
  const activePreset = useMemo((): PresetKey => {
    for (const [key, preset] of Object.entries(WEIGHT_PRESETS)) {
      if (weightsMatch(weights, preset)) {
        return key as keyof typeof WEIGHT_PRESETS;
      }
    }
    return 'custom';
  }, [weights]);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-ticket">
      {/* Top row: Preset buttons + header right content */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        {/* Preset buttons */}
        <div className="flex gap-2 flex-1 min-w-0">
          {PRESET_CONFIG.map(({ key, label, icon }) => {
            const isActive = activePreset === key;
            const isCustom = key === 'custom';

            if (isCustom) return null;

            return (
              <button
                key={key}
                onClick={() => onPresetApply(key as keyof typeof WEIGHT_PRESETS)}
                className={`
                  flex-1 py-2 px-2 md:px-3 rounded-lg font-medium text-sm transition-all duration-200
                  flex items-center justify-center gap-1 md:gap-1.5
                  ${isActive
                    ? 'bg-lottery-blue text-white shadow-md scale-[1.02]'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                `}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Header right slot (GameCountSelector) */}
        {headerRight && <div className="shrink-0">{headerRight}</div>}
      </div>

      {/* Custom indicator */}
      {activePreset === 'custom' && (
        <div className="flex items-center justify-center gap-2 mb-3 py-1.5 px-3 bg-lottery-pink/10 rounded-lg">
          <span className="text-sm font-medium text-lottery-pink">✨ Custom weights</span>
        </div>
      )}

      {/* Sliders */}
      <div className="space-y-3">
        {SLIDER_CONFIG.map(({ key, label, color }) => (
          <div key={key} className="flex items-center gap-3">
            <span className="text-xs font-medium text-gray-500 w-20">{label}</span>
            <div className="flex-1 relative">
              <input
                type="range"
                min="0"
                max="100"
                value={weights[key]}
                onChange={(e) => onWeightChange(key, parseInt(e.target.value, 10))}
                className="w-full h-2 appearance-none bg-gray-200 rounded-full cursor-pointer
                           [&::-webkit-slider-thumb]:appearance-none
                           [&::-webkit-slider-thumb]:w-4
                           [&::-webkit-slider-thumb]:h-4
                           [&::-webkit-slider-thumb]:rounded-full
                           [&::-webkit-slider-thumb]:bg-lottery-blue
                           [&::-webkit-slider-thumb]:shadow-md
                           [&::-webkit-slider-thumb]:cursor-pointer
                           [&::-webkit-slider-thumb]:transition-transform
                           [&::-webkit-slider-thumb]:hover:scale-110"
                style={{
                  background: `linear-gradient(to right, ${color === 'bg-orange-500' ? '#f97316' : color === 'bg-red-500' ? '#ef4444' : '#a855f7'} 0%, ${color === 'bg-orange-500' ? '#f97316' : color === 'bg-red-500' ? '#ef4444' : '#a855f7'} ${weights[key]}%, #e5e7eb ${weights[key]}%, #e5e7eb 100%)`
                }}
              />
            </div>
            <span className="text-xs font-bold text-lottery-blue w-10 text-right tabular-nums">
              {weights[key]}%
            </span>
          </div>
        ))}
      </div>

      {/* Footer slot (GenerateButton) */}
      {footer && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          {footer}
        </div>
      )}
    </div>
  );
}
