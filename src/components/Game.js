import React, { useState, useEffect } from "react";

import Board from "./Board";
import RulesModal from "./RulesModal";
import { calculateWinner } from "../utils";

const Game = () => {
  const [stepNumber, setStepNumber] = useState(0);
  const [playerX, setPlayerX] = useState("");
  const [playerO, setPlayerO] = useState("");
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [statusText, setStatusText] = useState("");
  const [isShowingGameRules, setIsShowingGameRules] = useState(false);
  const [winningIndexes, setWinningIndexes] = useState([]);

  const current = history[stepNumber];
  const playerXName = playerX || "X";
  const playerOName = playerO || "O";

  useEffect(() => {
    const winner = calculateWinner(current.squares);
    // Max at 10 since first move is "start" game + 9 real moves
    const MAX_HISTORY = 10;
    if (winner) {
      setWinningIndexes(winner.indexes);
      return setStatusText(
        `Winner: ${winner.player === "X" ? playerXName : playerOName}`
      );
    }
    if (history.length >= MAX_HISTORY && !winner) {
      return setStatusText("Draw");
    }
    return setStatusText(`Next player: ${xIsNext ? playerXName : playerOName}`);
  }, [history, playerX, playerO]); // eslint-disable-line react-hooks/exhaustive-deps

  const showRules = () => {
    setIsShowingGameRules(!isShowingGameRules);
  };

  const hideRules = () => {
    setIsShowingGameRules(false);
  };

  const resetGame = () => {
    setStepNumber(0);
    setXIsNext(true);
    setHistory([{ squares: Array(9).fill(null) }]);
    setWinningIndexes([]);
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

  return (
    <div className="game">
      <div className="game__info">
        <h1 className="game__title">
          Tic-Tac-Toe
          <button onClick={showRules} className="button">
            ?
          </button>
        </h1>
        <div className="game__content">
          <div className="game__player">
            <div className="game__player-x">
              <label htmlFor="playerX">Player X Name</label>
              <input
                id="playerX"
                type="text"
                onChange={changePlayerX}
                value={playerX}
              />
            </div>
            <div className="game__player-o">
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
            onClick={index => handleClick(index)}
            squares={current.squares}
            winningIndexes={winningIndexes}
          />
        </div>
        <button className="game__reset" onClick={resetGame}>
          Reset
        </button>
      </div>
      {isShowingGameRules && <RulesModal onClose={hideRules} />}
    </div>
  );
};

export default Game;
