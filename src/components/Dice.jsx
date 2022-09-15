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

  const nextFreeCase = (playerTMP, n) => {
    console.log("Vérification prochaine case")
    let ok = true

    // Ci la case cible est libre
    if (!STORE.casesVisited.includes(playerTMP[STORE.currentPlayerId].position + n)) {
      console.log(`Case cible ${playerTMP[STORE.currentPlayerId].position + n} est libre !`)
    }
    else if (!STORE.casesVisited.includes(playerTMP[STORE.currentPlayerId].position + n + 1)) {
      console.log(`Case cible ${playerTMP[STORE.currentPlayerId].position + n} + 1 est libre !`)
      n++
    }
    else if (!STORE.casesVisited.includes(playerTMP[STORE.currentPlayerId].position + n - 1)) {
      console.log(`Case cible ${playerTMP[STORE.currentPlayerId].position + n} - 1 est libre !`)
      n--
    }
    else {        
      console.log(`Aucune cases n'est libre !`)
      n = 0
      STORE.nextPlayer()
    }

    return n
  }

  const movePlayer = (n) => {
    const playerTMP = STORE.players

    if (n <= 4) {
      // On fait avancer joueur
      playerTMP[STORE.currentPlayerId].position += nextFreeCase(playerTMP, n)
      // On marque la case comme visitée
      STORE.markCaseVisited(playerTMP[STORE.currentPlayerId].position)
    }
    else if (n === 5) {}
    else {
      STORE.nextPlayer()
    }    

    STORE.setPlayers([...playerTMP])

  }

  const DisplayDice = () => {
    if (diceNumber <= 4) return diceNumber;
    if (diceNumber === 5) return "?";
    if (diceNumber === 6) return "🙁";
  };

  // RENDER
  return <button className="dice" onClick={diceRoll}>{<DisplayDice />}</button>;
};

export default Dice;
