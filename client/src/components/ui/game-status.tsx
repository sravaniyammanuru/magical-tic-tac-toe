import React from 'react';
import { motion } from 'framer-motion';

interface GameStatusProps {
  currentPlayer: string;
  winner: string | null;
  isDraw: boolean;
  scores: {
    X: number;
    O: number;
    draws: number;
  };
}

const GameStatus: React.FC<GameStatusProps> = ({ currentPlayer, winner, isDraw, scores }) => {
  let gameMessage: JSX.Element;
  
  if (winner) {
    gameMessage = (
      <span>
        Player <span className={winner === 'X' ? 'text-purple font-bold' : 'text-blue-400 font-bold'}>
          {winner}
        </span> Wins!
      </span>
    );
  } else if (isDraw) {
    gameMessage = <span>Game is a Draw!</span>;
  } else {
    gameMessage = (
      <span>
        Player <span className={currentPlayer === 'X' ? 'text-purple font-bold' : 'text-blue-400 font-bold'}>
          {currentPlayer}
        </span>'s Turn
      </span>
    );
  }
  
  return (
    <motion.div 
      className="game-status glass-effect rounded-2xl p-4 mb-8 min-w-[260px] text-center relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.5,
          ease: "easeOut",
        }
      }}
      style={{ 
        animationName: 'float',
        animationDuration: '4s', 
        animationTimingFunction: 'ease-in-out', 
        animationIterationCount: 'infinite',
      }}
    >
      <div className="absolute -right-2 -top-2 w-10 h-10">
        <svg viewBox="0 0 30 30" className="animate-spin-slow opacity-70">
          <path d="M15 3C8.373 3 3 8.373 3 15s5.373 12 12 12 12-5.373 12-12S21.627 3 15 3z" fill="none" stroke="#A177E0" strokeWidth="0.5"></path>
          <path d="M15 8v0M15 22v0" stroke="#A177E0" strokeWidth="3" strokeLinecap="round"></path>
          <path d="M8 15h0M22 15h0" stroke="#A177E0" strokeWidth="3" strokeLinecap="round"></path>
        </svg>
      </div>
      <div className="mb-2 font-quicksand font-semibold text-xl text-purple-800">
        {gameMessage}
      </div>
      <div className="flex justify-center gap-4 items-center">
        <div className="text-center px-3 py-1">
          <div className="text-sm text-purple-700/70">Player X</div>
          <div className="font-bold text-lg text-purple">{scores.X}</div>
        </div>
        <div className="text-center px-3 py-1">
          <div className="text-sm text-purple-700/70">Draws</div>
          <div className="font-bold text-lg text-purple-800/70">{scores.draws}</div>
        </div>
        <div className="text-center px-3 py-1">
          <div className="text-sm text-purple-700/70">Player O</div>
          <div className="font-bold text-lg text-blue-400">{scores.O}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default GameStatus;
