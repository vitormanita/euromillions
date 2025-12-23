import { useState, useEffect } from 'react';
import type { Statistics } from '../types';

const FALLBACK_URL = '/data/statistics.json';

export function useStatistics() {
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<'live' | 'cached'>('cached');

  useEffect(() => {
    async function fetchStatistics() {
      setLoading(true);
      setError(null);

      try {
        // For now, we use the cached data
        // In production, we could try a CORS proxy first
        const response = await fetch(FALLBACK_URL);

        if (!response.ok) {
          throw new Error('Failed to fetch statistics');
        }

        const data: Statistics = await response.json();
        setStatistics(data);
        setSource('cached');
      } catch (err) {
        console.error('Error fetching statistics:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchStatistics();
  }, []);

  return {
    statistics,
    loading,
    error,
    source,
  };
}
