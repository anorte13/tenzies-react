import "./styles.css";
import React from "react";
import Die from "./components/Die";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(Math.floor(Math.random() * (6 - 1 + 1) + 1));
    }
    return newDice;
  }
  function rollDice() {
    setDice(allNewDice());
  }
  const diceElements = dice.map((die) => <Die value={die} />);
  return (
    <main>
      <div className="die-container">{diceElements}</div>
      <button className="roll-button" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}
