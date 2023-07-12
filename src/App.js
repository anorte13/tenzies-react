import "./styles.css";
import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(newDie());
    }
    return newDice;
  }
  function newDie() {
    return {
      value: Math.floor(Math.random() * (6 - 1 + 1) + 1),
      isHeld: false,
      id: nanoid(),
    };
  }
  function rollDice() {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : newDie();
      })
    );
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      id={die.id}
      holdDice={() => holdDice(die.id)}
    />
  ));
  return (
    <main>
      <div className="die-container">{diceElements}</div>
      <button className="roll-button" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}
