import { useState, useEffect } from 'react';
import { PRIZE_AMOUNT } from '../utils/constants';

const RSS_URL = 'https://www.jogossantacasa.pt/web/SCRss/rssFeedJackpots';

const CORS_PROXIES = [
  (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url: string) => `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
];

export function useJackpot() {
  const [jackpot, setJackpot] = useState<number>(PRIZE_AMOUNT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJackpot() {
      let xml = '';

      // Try each proxy until one works
      for (const makeProxyUrl of CORS_PROXIES) {
        try {
          const proxyUrl = makeProxyUrl(RSS_URL);
          const response = await fetch(proxyUrl);
          if (response.ok) {
            xml = await response.text();
            break;
          }
        } catch {
          // Try next proxy
        }
      }

      if (!xml) {
        setLoading(false);
        return;
      }

      try {
        // Parse the RSS XML to find EuroMillions jackpot
        // The RSS has items with <title>Euromilhões</title> and description containing the jackpot
        // Description format: 1º prémio &euro;53.000.000,00 (HTML encoded)

        // Find the EuroMillions item block - use flexible pattern for encoding variations
        const euroMillionsItemMatch = xml.match(
          /<item>[\s\S]*?<title>[^<]*Euromilh[^<]*<\/title>[\s\S]*?<description>([\s\S]*?)<\/description>/i
        );

        if (euroMillionsItemMatch) {
          const description = euroMillionsItemMatch[1];

          // Match the jackpot value - handles various euro symbol encodings
          // Format examples: &amp;euro;53.000.000,00 or €53.000.000
          const jackpotMatch = description.match(
            /(?:&amp;euro;|&euro;|euro;|€)\s*(\d{1,3}(?:[.,]\d{3})*)/i
          );

          if (jackpotMatch) {
            // Parse the value - format is like "53.000.000" (Portuguese uses . as thousands separator)
            const valueStr = jackpotMatch[1].replace(/[.,]/g, '');
            const value = parseInt(valueStr, 10);

            if (!isNaN(value) && value > 0) {
              setJackpot(value);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching jackpot:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchJackpot();
  }, []);

  return { jackpot, loading };
}
