import { useContext, useState } from "react";
import { Ctx } from "./store";

const Dice = () => {
  const STORE = useContext(Ctx);

  const [diceNumber, setDiceNumber] = useState(0);

  const rand = () => {
    return Math.ceil(Math.random() * 6);
  };

  const diceRoll = () => {
    const n = rand();
    setDiceNumber(n);
  };

  const DisplayDice = () => {
    if (diceNumber <= 4) return diceNumber;
    if (diceNumber === 5) return "?";
    if (diceNumber === 6) return "🙁";
  };

  return <p onClick={diceRoll}>Lancer le dé -- {<DisplayDice/>}</p>;
};

export default Dice;
