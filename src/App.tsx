import { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { WeightSliders } from './components/controls/WeightSliders';
import { GenerateButton } from './components/controls/GenerateButton';
import { Bulletin } from './components/bulletin/Bulletin';
import { StatsPanel } from './components/stats/StatsPanel';
import { useWeights } from './hooks/useWeights';
import { useStatistics } from './hooks/useStatistics';
import { useGenerator } from './hooks/useGenerator';
import { Confetti } from './components/effects/Confetti';

function App() {
  const { weights, updateWeight, applyPreset } = useWeights();
  const { statistics, loading, error } = useStatistics();
  const { games, isGenerating, hasGenerated, generate } = useGenerator(statistics);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleGenerate = async () => {
    setIsAnimating(false);
    await generate(weights);
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
        <Header lastUpdated={statistics?.lastUpdated} />

        <main className="space-y-6">
          {/* Controls section */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <WeightSliders
                weights={weights}
                onWeightChange={updateWeight}
                onPresetApply={applyPreset}
              />
            </div>
            <div className="flex items-end">
              <GenerateButton
                onClick={handleGenerate}
                isGenerating={isGenerating}
                hasGenerated={hasGenerated}
              />
            </div>
          </div>

          {/* Bulletin */}
          <Bulletin games={games} isAnimating={isAnimating} />

          {/* Stats panel */}
          <StatsPanel games={games} statistics={statistics} />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
