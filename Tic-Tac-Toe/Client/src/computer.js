
// Minimax function
const minimax = (board, isMaximizing) => {
  const winner = calculateWinner(board);
  if (winner === "O") return 1; // AI wins
  if (winner === "X") return -1; // Player wins
  if (!board.includes(null)) return 0; // Draw (No empty spaces left)

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = "O"; // AI plays
        let score = minimax(board, false); // Minimize for the player
        board[i] = null; // Undo move
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = "X"; // Player plays
        let score = minimax(board, true); // Maximize for the AI
        board[i] = null; // Undo move
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};

// Function to get the best move for the AI
const getAIMove = (board, playerSymbol) => {
  const aiSymbol = playerSymbol === "X" ? "O" : "X"; // AI is the opposite of player

  let bestScore = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = aiSymbol; // Simulate AI move
      let score = minimax(board, false); // Minimize the player's moves
      board[i] = null; // Undo move

      if (score > bestScore) {
        bestScore = score;
        bestMove = i; // Update best move
      }
    }
  }

  return bestMove; // Return the index of the best move
};

export default getAIMove;
