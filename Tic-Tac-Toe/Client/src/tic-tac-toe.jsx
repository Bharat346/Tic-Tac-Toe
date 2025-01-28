import React, { useState, useRef } from "react";
import "./TicTacToe.css";
import musicFile from "./assets/tick.wav";
import getAIMove from "./computer.js";
import musicFile2 from "./assets/winning.mp3";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerSymbol, setPlayerSymbol] = useState("X");
  const [currSymbol, setCurrSymbol] = useState("X");
  const [mode, setMode] = useState("friend");
  const [musicVolume, setMusicVolume] = useState(0.7);
  const [winner, setWinner] = useState(null);

  const audioRef = useRef(new Audio(musicFile));
  const audioRef2 = useRef(new Audio(musicFile2));
  audioRef2.current.volume = musicVolume;

  const Tap_music = () => {
    audioRef.current.volume = musicVolume;
    if (musicVolume === 0) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const handleCellClick = (ind) => {
    if (board[ind] || winner) return;  // Ignore click if there's already a winner or cell is filled.

    const newBoard = [...board];
    newBoard[ind] = currSymbol;
    setBoard(newBoard);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);  // Set the winner state.
      return;
    }

    // Switch player if mode is "friend"
    if (mode === "friend") {
      setCurrSymbol(currSymbol === "X" ? "O" : "X");
    } else if (mode === "computer" && currSymbol === playerSymbol) {
      let aiSymbol = playerSymbol === "X" ? "O" : "X";
      let aiMove = getAIMove(newBoard, playerSymbol);

      if (aiMove !== -1) {
        newBoard[aiMove] = aiSymbol;
        setBoard([...newBoard]);

        const aiWinner = calculateWinner(newBoard);
        if (aiWinner) {
          setWinner(aiWinner);
        } else {
          setCurrSymbol(aiSymbol);
        }
      }
    }
  };

  const calculateWinner = (board) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        audioRef.current.pause();  // Pause the ongoing music when there's a winner.
        audioRef2.current.play();  // Play the winning sound.
        return board[a];  // Return the winner symbol (X or O)
      }
    }
    return null;  // Return null if no winner
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrSymbol(playerSymbol); // Reset to the chosen player symbol
    setWinner(null);
  };

  const handleSymbolChange = (symbol) => {
    if (winner) return;  // Prevent changing symbol if there's a winner.
    setPlayerSymbol(symbol);
    setCurrSymbol(symbol);
    resetGame(); // Reset the board when symbol changes
  };

  return (
    <>
      <div className="container">
      <div className="game">
        <h2>Tic-Tac-Toe Game</h2>
        <div className="board">
          {board.map((cell, ind) => (
            <div
              key={ind}
              className={`cell ${"cell-" + (ind + 1)}`}
              onClick={() => {
                Tap_music();
                handleCellClick(ind);
              }}
            >
              {cell}
            </div>
          ))}
        </div>
        <br />
        <button onClick={resetGame}>Reset</button>
      </div>

      <div className="setting">
        <h2>Settings</h2>
        <div className="option">
          <label>Choose Symbol:</label>
          <button
            onClick={() => handleSymbolChange("X")}
            className={`setting-btn ${playerSymbol === "X" ? "active" : ""}`}
          >
            X
          </button>
          <button
            onClick={() => handleSymbolChange("O")}
            className={`setting-btn ${playerSymbol === "O" ? "active" : ""}`}
          >
            O
          </button>
        </div>
        <br />
        <hr />
        <br />
        <div className="option">
          <label>Mode:</label>
          <button
            onClick={() => setMode("friend")}
            className={`setting-btn ${mode === "friend" ? "active" : ""}`}
          >
            Friend
          </button>
          <button
            onClick={() => setMode("computer")}
            className={`setting-btn ${mode === "computer" ? "active" : ""}`}
          >
            Computer
          </button>
        </div>
        <br />
        <hr />
        <br />
        <div className="option">
          <label>Music Volume:</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={musicVolume}
            onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
          />
        </div>
      </div>
      <div className={`result ${winner ? "show" : "hide"}`}>
        <h3>Result:</h3>
        <p>{winner ? `${winner} is the winner!` : ""}</p>
      </div>
    </div>
    </>
  );
};

export default TicTacToe;
