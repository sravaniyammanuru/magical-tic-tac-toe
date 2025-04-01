import React from 'react';
import { RefreshCw, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

interface GameControlsProps {
  onReset: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({ onReset, soundEnabled, onToggleSound }) => {
  return (
    <motion.div 
      className="mt-8 flex flex-wrap justify-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <motion.button 
        className="btn-primary"
        onClick={onReset}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <RefreshCw className="h-5 w-5" />
        New Game
      </motion.button>
      
      <motion.button 
        className="btn-secondary"
        onClick={onToggleSound}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {soundEnabled ? (
          <>
            <Volume2 className="h-5 w-5" />
            Sound: On
          </>
        ) : (
          <>
            <VolumeX className="h-5 w-5" />
            Sound: Off
          </>
        )}
      </motion.button>
    </motion.div>
  );
};

export default GameControls;
