import React from "react";

const Square = props => {
  return (
    <button
      className="square"
      onClick={() => {
        alert("click");
      }}
    >
      {props.value}
    </button>
  );
};

export default Square;
