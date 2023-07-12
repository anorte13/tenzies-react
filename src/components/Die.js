import React from "react";

export default function Die(props) {
  return (
    <div
      className={props.isHeld ? "die background-color" : "die"}
      onClick={props.holdDice}
    >
      <h2>{props.value}</h2>
    </div>
  );
}
