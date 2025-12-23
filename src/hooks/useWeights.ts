import { useState, useCallback } from 'react';
import type { Weights } from '../types';
import { DEFAULT_WEIGHTS, WEIGHT_PRESETS } from '../utils/constants';

export function useWeights(initialWeights: Weights = DEFAULT_WEIGHTS) {
  const [weights, setWeights] = useState<Weights>(initialWeights);

  const updateWeight = useCallback((key: keyof Weights, newValue: number) => {
    setWeights(current => {
      const clampedValue = Math.max(0, Math.min(100, Math.round(newValue)));
      const otherKeys = (Object.keys(current) as (keyof Weights)[]).filter(k => k !== key);

      const otherTotal = otherKeys.reduce((sum, k) => sum + current[k], 0);
      const remaining = 100 - clampedValue;

      const newWeights = { ...current, [key]: clampedValue };

      if (otherTotal === 0) {
        // Edge case: distribute equally among others
        const perOther = Math.floor(remaining / otherKeys.length);
        otherKeys.forEach((k, i) => {
          newWeights[k] = i === 0
            ? remaining - perOther * (otherKeys.length - 1)
            : perOther;
        });
      } else {
        // Proportionally adjust other weights
        otherKeys.forEach(k => {
          newWeights[k] = Math.round((current[k] / otherTotal) * remaining);
        });

        // Ensure sum is exactly 100
        const sum = Object.values(newWeights).reduce((a, b) => a + b, 0);
        const diff = 100 - sum;
        if (diff !== 0) {
          newWeights[otherKeys[0]] += diff;
        }
      }

      return newWeights;
    });
  }, []);

  const applyPreset = useCallback((presetName: keyof typeof WEIGHT_PRESETS) => {
    const preset = WEIGHT_PRESETS[presetName];
    if (preset) {
      setWeights(preset);
    }
  }, []);

  const resetWeights = useCallback(() => {
    setWeights(DEFAULT_WEIGHTS);
  }, []);

  return {
    weights,
    updateWeight,
    applyPreset,
    resetWeights,
  };
}
