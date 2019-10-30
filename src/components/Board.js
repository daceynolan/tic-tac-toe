import React from "react";

import Square from "./Square";

class Board extends React.Component {
  renderSquare(index) {
    const winningIndex = this.props.winningIndexes.indexOf(index);
    return (
      <Square
        delayMultiplier={winningIndex}
        isHighlighted={winningIndex > -1}
        onClick={() => this.props.onClick(index)}
        value={this.props.squares[index]}
      />
    );
  }

  render() {
    return (
      <div className="board">
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;
