import React from "react";

const Square = ({ onClick, value }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
