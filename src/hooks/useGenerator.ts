import { useState, useCallback } from 'react';
import type { Statistics, Weights, GeneratedGame, GameState } from '../types';
import { generateNumbers } from '../utils/scoring';
import { NUMBERS_TO_SELECT, STARS_TO_SELECT } from '../utils/constants';

export function useGenerator(statistics: Statistics | null) {
  const [gameState, setGameState] = useState<GameState>({
    games: [],
    isGenerating: false,
    hasGenerated: false,
  });

  const generate = useCallback(async (weights: Weights, gameCount: number) => {
    if (!statistics) return;

    setGameState(prev => ({ ...prev, isGenerating: true }));

    // Small delay for animation effect
    await new Promise(resolve => setTimeout(resolve, 300));

    const games: GeneratedGame[] = [];

    for (let i = 0; i < gameCount; i++) {
      const mainScores = generateNumbers(
        statistics.mainNumbers,
        weights,
        NUMBERS_TO_SELECT
      );

      const starScores = generateNumbers(
        statistics.stars,
        weights,
        STARS_TO_SELECT
      );

      games.push({
        mainNumbers: mainScores.map(s => s.number),
        stars: starScores.map(s => s.number),
        mainScores,
        starScores,
      });
    }

    setGameState({
      games,
      isGenerating: false,
      hasGenerated: true,
    });
  }, [statistics]);

  const reset = useCallback(() => {
    setGameState({
      games: [],
      isGenerating: false,
      hasGenerated: false,
    });
  }, []);

  return {
    ...gameState,
    generate,
    reset,
  };
}
