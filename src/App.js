import "./styles.css";
import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [seconds, setSeconds] = React.useState(0);
  const [turns, setTurns] = React.useState(0);
  const [record, setRecord] = React.useState(
    parseInt(localStorage.getItem("record")) || 0
  );

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      if (record === 0) {
        setRecord(seconds);
        localStorage.setItem("record", seconds);
      } else if (seconds < record || record === Infinity) {
        setRecord(seconds);
        localStorage.setItem("record", seconds);
      }
    }
  }, [dice]);

  React.useEffect(() => {
    let interval = null;

    if (tenzies === false) {
      interval = setInterval(() => {
        setSeconds((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [tenzies]);

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
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : newDie();
        })
      );
      setTurns((prevTurn) => prevTurn + 1);
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setTurns(0);
      setSeconds(0);
    }
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
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="die-container">{diceElements}</div>
      <button className="roll-button" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      <div className="game-stats">
        <p>Time: {seconds}</p>
        <p>Turn: {turns}</p>
        <p>Fastest Time: {record}</p>
      </div>
    </main>
  );
}
