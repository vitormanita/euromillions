import type { Weights } from '../../types';
import { WEIGHT_PRESETS } from '../../utils/constants';

interface WeightSlidersProps {
  weights: Weights;
  onWeightChange: (key: keyof Weights, value: number) => void;
  onPresetApply: (preset: keyof typeof WEIGHT_PRESETS) => void;
}

const SLIDER_CONFIG: { key: keyof Weights; label: string; emoji: string; color: string }[] = [
  { key: 'overdue', label: 'Overdue', emoji: '⏰', color: 'from-orange-400 to-orange-500' },
  { key: 'frequency', label: 'Frequency', emoji: '🔥', color: 'from-red-400 to-red-500' },
  { key: 'randomness', label: 'Randomness', emoji: '🎲', color: 'from-purple-400 to-purple-500' },
];

const PRESET_BUTTONS: { key: keyof typeof WEIGHT_PRESETS; label: string; description: string }[] = [
  { key: 'balanced', label: 'Balanced', description: 'Equal weights' },
  { key: 'hotNumbers', label: 'Hot Numbers', description: 'Favor frequent numbers' },
  { key: 'overdueFocus', label: 'Overdue', description: 'Favor absent numbers' },
  { key: 'pureRandom', label: 'Random', description: 'Pure luck' },
];

export function WeightSliders({ weights, onWeightChange, onPresetApply }: WeightSlidersProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-ticket">
      <h2 className="text-lg font-semibold text-lottery-blue mb-4 flex items-center gap-2">
        <span className="text-2xl">⚖️</span>
        Adjust Probabilities
      </h2>

      {/* Presets */}
      <div className="flex flex-wrap gap-2 mb-6">
        {PRESET_BUTTONS.map(preset => (
          <button
            key={preset.key}
            onClick={() => onPresetApply(preset.key)}
            className="px-3 py-1.5 text-sm font-medium rounded-full border-2 border-lottery-blue/20
                       text-lottery-blue hover:bg-lottery-blue hover:text-white transition-all duration-200
                       hover:border-lottery-blue active:scale-95"
            title={preset.description}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Sliders */}
      <div className="space-y-5">
        {SLIDER_CONFIG.map(({ key, label, emoji, color }) => (
          <div key={key} className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <span>{emoji}</span>
                {label}
              </label>
              <span className="text-sm font-bold text-lottery-blue bg-lottery-blue/10 px-2 py-0.5 rounded-full">
                {weights[key]}%
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-0 h-2 rounded-full bg-gray-200" />
              <div
                className={`absolute h-2 rounded-full bg-gradient-to-r ${color} transition-all duration-150`}
                style={{ width: `${weights[key]}%` }}
              />
              <input
                type="range"
                min="0"
                max="100"
                value={weights[key]}
                onChange={(e) => onWeightChange(key, parseInt(e.target.value, 10))}
                className="relative w-full h-2 appearance-none bg-transparent cursor-pointer z-10"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Total indicator */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Total</span>
          <span className={`font-bold ${
            weights.overdue + weights.frequency + weights.randomness === 100
              ? 'text-green-600'
              : 'text-red-500'
          }`}>
            {weights.overdue + weights.frequency + weights.randomness}%
          </span>
        </div>
      </div>
    </div>
  );
}
