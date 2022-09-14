import { useContext, useState } from "react";
import { Ctx } from "./store";

const Dice = () => {
  //
  const STORE = useContext(Ctx);
  const [diceNumber, setDiceNumber] = useState(0);

  // REACTION
  const rand = () => {
    return Math.ceil(Math.random() * 6);
  };

  const diceRoll = () => {
    const n = rand();
    setDiceNumber(n);

    // Faire avancer le joueur
    // Vérification si la case cible est disponible. Si pas: +1. Si pas: -1. Sinon on passe au joueur suivant
    movePlayer(n)
    // (Composant Cell)
    // On rend la précédante case indisponible (piétinée)

    // (Composant Question)
    // Affichage de la question correspondant à la nouvelle position du joueur actuel
    // Lancement du chrono de la question
  };

  const movePlayer = (n) => {
    const playerTMP = STORE.players

    if (n <= 4) playerTMP[STORE.currentPlayerId].position += n
    else if (n === 5) {}
    else {}

    

    STORE.setPlayers([...playerTMP])

    console.log("Move", n)
  }

  const DisplayDice = () => {
    if (diceNumber <= 4) return diceNumber;
    if (diceNumber === 5) return "?";
    if (diceNumber === 6) return "🙁";
  };

  // RENDER
  return <button onClick={diceRoll}>Lancer le dé -- {<DisplayDice />}</button>;
};

export default Dice;
