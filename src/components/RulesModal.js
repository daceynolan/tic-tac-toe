import React from "react";

import "./rulesmodal.css";

const RulesModal = props => {
  return (
    <div className="game-rules" onClick={props.onClose}>
      <div className="game-rules__container">
        <h2 className="game-rules__title">Game Rules</h2>
        <div className="game-rules__content">
          <ol>
            <li>Pick if you want to be player X or player O.</li>
            <li>
              Players take turns putting their marks in empty squares starting
              with player X.
            </li>
            <li>
              The first player to get 3 of their marks in a row (up, down,
              across, or diagonally) is the winner.
            </li>
            <li>
              When all 9 squares are full, the game is over. If no player has 3
              marks in a row, the game ends in a draw.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RulesModal;
