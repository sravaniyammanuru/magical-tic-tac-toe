import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSoundEffect } from '@/hooks/use-sound-effect';
import { createSparkles } from '@/lib/utils/particles';

interface GameBoardProps {
  board: Array<string | null>;
  currentPlayer: string;
  winningCombo: number[] | null;
  winner: string | null;
  isDraw: boolean;
  onCellClick: (index: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ 
  board, 
  currentPlayer,
  winningCombo, 
  winner,
  isDraw,
  onCellClick 
}) => {
  const boardRef = useRef<HTMLDivElement>(null);
  const { playWinSound } = useSoundEffect();
  
  // Play win sound when there's a winner
  useEffect(() => {
    if (winner) {
      playWinSound();
      
      // Create victory sparkles
      if (boardRef.current) {
        const sparklesContainer = boardRef.current.querySelector('.sparkles');
        if (sparklesContainer) {
          createSparkles(sparklesContainer as HTMLElement, 15);
        }
      }
    }
  }, [winner, playWinSound]);
  
  const handleCellHover = (element: HTMLElement) => {
    createSparkles(element, 3);
  };
  
  const isWinningCell = (index: number) => {
    return winningCombo ? winningCombo.includes(index) : false;
  };
  
  return (
    <div 
      ref={boardRef}
      className="relative grid grid-cols-3 gap-3 md:gap-4 p-4 md:p-6 rounded-2xl board-shadow bg-white/50 backdrop-blur-sm max-w-md w-full mx-auto"
    >
      {/* Victory animation overlay */}
      <AnimatePresence>
        {winner && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-purple/20 to-yellow-400/20 rounded-2xl flex items-center justify-center z-10"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              scale: [1, 1.05, 1],
              transition: { 
                opacity: { duration: 0.3 },
                scale: { 
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1, 
                  ease: "easeInOut" 
                }
              }
            }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center">
              <h2 className="text-3xl font-quicksand font-bold text-purple mb-2">
                Player {winner} Wins!
              </h2>
              <div className="sparkles relative h-40 w-full"></div>
            </div>
          </motion.div>
        )}
        
        {isDraw && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-purple/10 to-blue-400/10 rounded-2xl flex items-center justify-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center">
              <h2 className="text-3xl font-quicksand font-bold text-purple-800 mb-2">
                It's a Draw!
              </h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Game cells */}
      {board.map((cell, index) => (
        <motion.div
          key={index}
          className={`cell aspect-square relative cursor-pointer rounded-xl overflow-hidden bg-white/70 cell-shadow ${
            isWinningCell(index) ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-transparent' : ''
          }`}
          onClick={() => onCellClick(index)}
          onMouseEnter={(e) => handleCellHover(e.currentTarget)}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300, damping: 17 }}
        >
          <div className="cell-glow absolute inset-0 bg-lavender/20 rounded-xl transform scale-90 transition-all duration-300"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence>
              {cell === 'X' && (
                <motion.svg
                  className="w-2/3 h-2/3 x-symbol"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="#A177E0"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </motion.svg>
              )}
              
              {cell === 'O' && (
                <motion.svg
                  className="w-2/3 h-2/3 o-symbol"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.circle
                    cx="12"
                    cy="12"
                    r="8"
                    stroke="#95C8F0"
                    strokeWidth="2.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default GameBoard;
