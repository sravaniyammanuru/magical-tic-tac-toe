interface WinnerResult {
  winner: string | null;
  combo: number[] | null;
}

// Winning combinations (rows, columns, diagonals)
const WINNING_COMBINATIONS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal top-left to bottom-right
  [2, 4, 6]  // Diagonal top-right to bottom-left
];

/**
 * Check if there's a winner on the board
 */
export function checkWinner(board: Array<string | null>): WinnerResult {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        winner: board[a],
        combo: combo
      };
    }
  }
  
  return {
    winner: null,
    combo: null
  };
}

/**
 * Check if the game is a draw
 */
export function checkDraw(board: Array<string | null>): boolean {
  // If there's no winner and all cells are filled, it's a draw
  return !board.includes(null) && !checkWinner(board).winner;
}
