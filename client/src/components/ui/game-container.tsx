import React from 'react';
import { useGame } from '@/hooks/use-game';
import GameBoard from './game-board';
import GameStatus from './game-status';
import GameControls from './game-controls';
import FloatingBubbles from './floating-bubbles';
import { motion } from 'framer-motion';

const GameContainer: React.FC = () => {
  const {
    board,
    currentPlayer,
    winner,
    winningCombo,
    isDraw,
    scores,
    handleCellClick,
    resetGame,
    soundEnabled,
    toggleSound
  } = useGame();

  return (
    <div className="relative w-full max-w-4xl flex flex-col items-center">
      <FloatingBubbles />
      
      {/* Game Header */}
      <header className="text-center mb-6 relative">
        <motion.h1 
          className="font-quicksand font-bold text-4xl md:text-5xl mb-2 text-gradient"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Enchanted Tic-Tac-Toe
        </motion.h1>
        <motion.p 
          className="text-lg text-purple-800/80 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          A magical game of X's and O's with delightful surprises
        </motion.p>
      </header>
      
      {/* Game Status */}
      <GameStatus 
        currentPlayer={currentPlayer} 
        winner={winner} 
        isDraw={isDraw} 
        scores={scores} 
      />
      
      {/* Game Board */}
      <GameBoard 
        board={board} 
        currentPlayer={currentPlayer}
        winningCombo={winningCombo}
        onCellClick={handleCellClick}
        winner={winner}
        isDraw={isDraw}
      />
      
      {/* Game Controls */}
      <GameControls 
        onReset={resetGame} 
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound} 
      />
      
      {/* Footer */}
      <footer className="mt-10 text-center text-purple-800/60 text-sm">
        <p>Created with ✨ magical code ✨</p>
      </footer>
    </div>
  );
};

export default GameContainer;
