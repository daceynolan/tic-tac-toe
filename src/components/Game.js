import React from "react";

import Board from "./Board";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      playerX: "",
      playerO: ""
    };
  }

  changePlayerX = event => {
    this.setState({
      playerX: event.target.value
    });
  };
  changePlayerO = event => {
    this.setState({
      playerO: event.target.value
    });
  };

  handleClick(index) {
    const { stepNumber, xIsNext } = this.state;
    const history = this.state.history.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[index]) {
      return;
    }
    squares[index] = xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,

      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  statusText() {
    const { history, xIsNext, stepNumber, playerX, playerO } = this.state;
    console.log(playerO);
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    const maxHistory = 10;
    //step 1 of history is game start. Does not count moves until step 2
    if (winner) {
      return "Winner: " + winner;
    } else if (history.length >= maxHistory && !winner) {
      return "Draw";
    } else {
      return "Next player: " + (xIsNext ? playerX || "X" : playerO || "O");
    }
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={index => this.handleClick(index)}
          />
        </div>
        <div className="game-info">
          <div>{this.statusText()}</div>
          <ol>{moves}</ol>
        </div>
        <div className="game-player">
          Enter name
          <form>
            <label>
              Player X:
              <input
                type="text"
                value={this.state.playerX}
                onChange={this.changePlayerX}
              />
            </label>
            <label>
              Player O:
              <input
                type="text"
                onChange={this.changePlayerO}
                value={this.state.playerO}
              />
            </label>
          </form>
        </div>
      </div>
    );
  }
}

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
