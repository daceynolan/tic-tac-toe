import React from "react";

import "./square.css";

const Square = ({ onClick, value, isHighlighted, delayMultiplier }) => {
  return (
    <button
      className={`square ${isHighlighted ? "square--highlight" : ""}`}
      onClick={onClick}
      style={{ transitionDelay: `${Number(delayMultiplier) * 0.3}s` }}
    >
      {value}
    </button>
  );
};

export default Square;
