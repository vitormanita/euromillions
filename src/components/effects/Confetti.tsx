import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  velocityX: number;
  velocityY: number;
}

const COLORS = ['#e91e8c', '#fbbf24', '#1a4b8c', '#22c55e', '#8b5cf6', '#f97316'];
const PARTICLE_COUNT = 50;

export function Confetti() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Create particles
    const newParticles: Particle[] = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -20,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 8 + 4,
      rotation: Math.random() * 360,
      velocityX: (Math.random() - 0.5) * 8,
      velocityY: Math.random() * 3 + 2,
    }));

    setParticles(newParticles);

    // Animate particles
    let animationFrame: number;
    let startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;

      if (elapsed > 2000) {
        setParticles([]);
        return;
      }

      setParticles(prev =>
        prev.map(p => ({
          ...p,
          x: p.x + p.velocityX,
          y: p.y + p.velocityY,
          velocityY: p.velocityY + 0.1, // gravity
          rotation: p.rotation + 5,
        }))
      );

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            transform: `rotate(${particle.rotation}deg)`,
            opacity: Math.max(0, 1 - particle.y / window.innerHeight),
          }}
        />
      ))}
    </div>
  );
}
