import { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { WeightSliders } from './components/controls/WeightSliders';
import { GameCountSelector } from './components/controls/GameCountSelector';
import { GenerateButton } from './components/controls/GenerateButton';
import { Bulletin } from './components/bulletin/Bulletin';
import { StatsPanel } from './components/stats/StatsPanel';
import { useWeights } from './hooks/useWeights';
import { useStatistics } from './hooks/useStatistics';
import { useGenerator } from './hooks/useGenerator';
import { useJackpot } from './hooks/useJackpot';
import { Confetti } from './components/effects/Confetti';

function App() {
  const { weights, updateWeight, applyPreset } = useWeights();
  const { statistics, loading, error } = useStatistics();
  const { games, isGenerating, generate } = useGenerator(statistics);
  const { jackpot } = useJackpot();
  const [gameCount, setGameCount] = useState(2);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleGenerate = async () => {
    setIsAnimating(false);
    await generate(weights, gameCount);
    setIsAnimating(true);
    setShowConfetti(true);

    // Reset animation state after animations complete
    setTimeout(() => {
      setIsAnimating(false);
    }, 1500);
  };

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">🎰</div>
          <p className="text-lottery-blue">Loading statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <p className="text-xl mb-2">Oops! Something went wrong.</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {showConfetti && <Confetti />}

      <div className="max-w-7xl mx-auto px-4 py-4">
        <Header lastUpdated={statistics?.lastUpdated} jackpot={jackpot} />

        <main className="space-y-4">
          {/* Unified Controls */}
          <WeightSliders
            weights={weights}
            onWeightChange={updateWeight}
            onPresetApply={applyPreset}
            headerRight={<GameCountSelector count={gameCount} onChange={setGameCount} />}
            footer={<GenerateButton onClick={handleGenerate} isGenerating={isGenerating} />}
          />

          {/* Bulletin */}
          <Bulletin games={games} gameCount={gameCount} isAnimating={isAnimating} />

          {/* Stats panel */}
          <StatsPanel games={games} statistics={statistics} />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
