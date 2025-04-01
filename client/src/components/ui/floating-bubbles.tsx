import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Bubble {
  id: number;
  x: string;
  y: string;
  size: number;
  color: string;
  delay: number;
}

const colors = [
  'bg-purple-500/40', // vibrant purple
  'bg-emerald-400/40', // vibrant mint
  'bg-pink-400/40',   // vibrant pink
  'bg-sky-400/40',   // vibrant sky blue
  'bg-amber-400/30', // vibrant gold
];

const FloatingBubbles: React.FC = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  
  useEffect(() => {
    // Create 5 bubbles with different positions and sizes
    const newBubbles = Array.from({ length: 5 }, (_, index) => ({
      id: index,
      x: `${Math.random() * 80 + 10}%`,
      y: `${Math.random() * 80 + 10}%`,
      size: Math.random() * 16 + 12,
      color: colors[index % colors.length],
      delay: index * 0.5,
    }));
    
    setBubbles(newBubbles);
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className={`absolute rounded-full ${bubble.color}`}
          style={{
            top: bubble.y,
            left: bubble.x,
            width: `${bubble.size}rem`,
            height: `${bubble.size}rem`,
          }}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: bubble.delay,
          }}
        />
      ))}
      
      <motion.div
        className="absolute w-16 h-16 rounded-full bg-amber-400/40"
        style={{ top: '50%', right: '20px' }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default FloatingBubbles;
