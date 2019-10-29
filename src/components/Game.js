import React, { useState, useEffect } from "react";

import Board from "./Board";
import Rules from "./Rules";

const Game = () => {
  const [stepNumber, setStepNumber] = useState(0);
  const [playerX, setPlayerX] = useState("");
  const [playerO, setPlayerO] = useState("");
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [statusText, setStatusText] = useState("");
  const [gameRules, showGameRules] = useState(false);

  const playerXName = playerX || "X";
  const playerOName = playerO || "O";

  useEffect(() => {
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    // Max at 10 since first move is "start" game + 9 real moves
    const MAX_HISTORY = 10;
    if (winner) {
      return setStatusText(`Winner: ${winner}`);
    }
    if (history.length >= MAX_HISTORY && !winner) {
      return setStatusText("Draw");
    }
    return setStatusText(`Next player: ${xIsNext ? playerXName : playerOName}`);
  }, [history, playerX, playerO]); // eslint-disable-line react-hooks/exhaustive-deps

  const showRules = () => {
    showGameRules(!gameRules);
  };

  const hideRules = () => {
    showGameRules(false);
  };

  const resetGame = () => {
    setStepNumber(0);
    setPlayerX("");
    setPlayerO("");
    setXIsNext(true);
    setHistory([{ squares: Array(9).fill(null) }]);
    setStatusText("");
    showGameRules(false);
  };

  const changePlayerX = event => {
    setPlayerX(event.target.value);
  };

  const changePlayerO = event => {
    setPlayerO(event.target.value);
  };

  const handleClick = index => {
    const sliceHistory = history.slice(0, stepNumber + 1);
    const current = sliceHistory[sliceHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[index]) {
      return;
    }
    squares[index] = xIsNext ? "X" : "O";
    setHistory(sliceHistory.concat([{ squares: squares }]));
    setStepNumber(sliceHistory.length);
    setXIsNext(!xIsNext);
  };

  const current = history[stepNumber];

  return (
    <div className="game">
      <div className="game-info">
        <h1 className="game-title">
          Tic-Tac-Toe
          <button onClick={showRules} className="button">
            ?
          </button>
        </h1>
        <div className="game-content">
          <div className="game-player__form">
            <div className="game-player__x">
              <label htmlFor="playerX">Player X Name</label>
              <input
                id="playerX"
                type="text"
                onChange={changePlayerX}
                value={playerX}
              />
            </div>
            <div className="game-player__o">
              <label htmlFor="playerO">Player O Name</label>
              <input
                id="playerO"
                type="text"
                onChange={changePlayerO}
                value={playerO}
              />
            </div>
          </div>

          <p>{statusText}</p>
          <Board
            squares={current.squares}
            onClick={index => handleClick(index)}
          />
        </div>
        <button className="game-reset" onClick={resetGame}>
          Reset
        </button>
      </div>
      {gameRules && <Rules onClick={hideRules} />}
    </div>
  );
};

export default Game;

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
