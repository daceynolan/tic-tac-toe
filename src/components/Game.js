import React, { useState } from "react";

import Board from "./Board";

const Game = () => {
  const [stepNumber, setStepNumber] = useState(0);
  const [playerX, setPlayerX] = useState("");
  const [playerO, setPlayerO] = useState("");
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);

  const playerXName = playerX || "X";
  const playerOName = playerO || "O";

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

  const jumpTo = step => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const statusText = () => {
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    // Max at 10 since first move is "start" game + 9 real moves
    const MAX_HISTORY = 10;
    if (winner) {
      return `Winner: ${winner}`;
    }
    if (history.length >= MAX_HISTORY && !winner) {
      return "Draw";
    }
    return `Next player: ${xIsNext ? playerXName : playerOName}`;
  };

  const current = history[stepNumber];
  const moves = history.map((step, move) => {
    const desc = move ? `Go to move # ${move}` : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  console.log(current);
  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={index => handleClick(index)}
        />
      </div>
      <div className="game-info">
        <div>{statusText()}</div>
        <ol>{moves}</ol>
      </div>
      <div className="game-player">
        Enter name
        <form>
          <label>
            Player X
            <input type="text" onChange={changePlayerX} value={playerX} />
          </label>
          <label>
            Player O
            <input type="text" onChange={changePlayerO} value={playerO} />
          </label>
        </form>
      </div>
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
