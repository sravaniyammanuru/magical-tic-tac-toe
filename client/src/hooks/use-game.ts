import { useState, useCallback, useEffect } from 'react';
import { checkWinner, checkDraw } from '@/lib/utils/game-logic';
import { useSoundEffect } from './use-sound-effect';

interface GameScores {
  X: number;
  O: number;
  draws: number;
}

export function useGame() {
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<string>('X');
  const [winner, setWinner] = useState<string | null>(null);
  const [winningCombo, setWinningCombo] = useState<number[] | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isDraw, setIsDraw] = useState<boolean>(false);
  const [scores, setScores] = useState<GameScores>({ X: 0, O: 0, draws: 0 });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  
  const { playClickSound } = useSoundEffect();
  
  const handleCellClick = useCallback((index: number) => {
    // Do nothing if cell is already filled or game is over
    if (board[index] || gameOver) return;
    
    // Play click sound if enabled
    if (soundEnabled) {
      playClickSound();
    }
    
    // Create new board with the move
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    
    // Check for winner
    const result = checkWinner(newBoard);
    if (result.winner) {
      setWinner(result.winner);
      setWinningCombo(result.combo);
      setGameOver(true);
      
      // Update scores
      setScores(prevScores => ({
        ...prevScores,
        [result.winner as keyof GameScores]: prevScores[result.winner as keyof GameScores] + 1
      }));
      return;
    }
    
    // Check for draw
    if (checkDraw(newBoard)) {
      setIsDraw(true);
      setGameOver(true);
      
      // Update draw score
      setScores(prevScores => ({
        ...prevScores,
        draws: prevScores.draws + 1
      }));
      return;
    }
    
    // Switch player
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  }, [board, currentPlayer, gameOver, soundEnabled, playClickSound]);
  
  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setWinningCombo(null);
    setGameOver(false);
    setIsDraw(false);
  }, []);
  
  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);
  
  // Auto-start a new game when the current one ends after a delay
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (gameOver) {
      timeoutId = setTimeout(() => {
        resetGame();
      }, 3000);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [gameOver, resetGame]);
  
  return {
    board,
    currentPlayer,
    winner,
    winningCombo,
    gameOver,
    isDraw,
    scores,
    handleCellClick,
    resetGame,
    soundEnabled,
    toggleSound
  };
}
