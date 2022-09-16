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
    console.log("Lancer du dé -> ", n)
    setDiceNumber(n);
    movePlayer(n);
    if (n !== 6) STORE.setQuestionVisible(true)    
  };

  const nextChallengeCase = (currentPosition) => {
    // Récupère les prochaines cases challenges
    const nextChallengeCases = STORE.questions.filter(q => q.challenge && q.number > currentPosition && !q.visited).slice(0, 1)
    
    console.log("Case CHALLENGE", nextChallengeCases[0].number, "disponible")
    
    return nextChallengeCases[0].number
  }

  const nextFreeCase = (currentPosition, nCases) => {
    const targetPosition = currentPosition + nCases;

    // Ci la case cible n'est pas visitée ET qu'elle n'est pas une case challenge => OK
    if (
      !STORE.questions[targetPosition - 1].visited &&
      !STORE.questions[targetPosition - 1].challenge
    ) {
      console.log("Case", targetPosition, "disponible")
    }
    // SINON on teste la suivante
    else if (
      !STORE.questions[targetPosition - 1 + 1].visited &&
      !STORE.questions[targetPosition - 1 + 1].challenge
    ) {
      console.log("Case", targetPosition, "+ 1 disponible")
      nCases++;
    }
    // SINON on teste la précédente
    else if (
      !STORE.questions[targetPosition - 1 - 1].visited &&
      !STORE.questions[targetPosition - 1 - 1].challenge
    ) {
      console.log("Case", targetPosition, "- 1 disponible")
      nCases--;
    }
    // SINON le joueur reste à sa place et on passe au joueur suivant
    else {
      nCases = 0;
      STORE.nextPlayer();
    }

    // On retourn le nombre de case à avancer
    return nCases;
  };

  const movePlayer = (n) => {
    const playersTMP = STORE.players;

    // Si le dé affiche 1 à 4
    if (n <= 4) {
      // On fait avancer joueur à la prochaine case libre
      playersTMP[STORE.currentPlayerId].position += nextFreeCase(playersTMP[STORE.currentPlayerId].position, n);
      // On marque la case comme visitée
      STORE.markCaseVisited(playersTMP[STORE.currentPlayerId].position);
    }
    // Si face "CHALLENGE"
    else if (n === 5) {
      playersTMP[STORE.currentPlayerId].position = nextChallengeCase(playersTMP[STORE.currentPlayerId].position)
      STORE.markCaseVisited(playersTMP[STORE.currentPlayerId].position);
    }
    // Face 6 "☹️", passer son tour
    else {
      STORE.nextPlayer();
    }

    STORE.setPlayers([...playersTMP]);
  };

  const DisplayDice = () => {
    if (diceNumber <= 4) return diceNumber;
    if (diceNumber === 5) return "?";
    if (diceNumber === 6) return "🙁";
  };

  // RENDER
  return (
    <button className={"dice " + (STORE.questionVisible ? "hidden" : "")} onClick={diceRoll}>
      {<DisplayDice />}
    </button>
  );
};

export default Dice;
